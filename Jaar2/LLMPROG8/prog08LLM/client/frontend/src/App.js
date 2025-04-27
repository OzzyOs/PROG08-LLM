import { useState} from 'react';

function App() {
    const [question, setQuestion] = useState('');
    const [prompt, setPrompt] = useState('');
    const [history, setHistory] = useState(()=>{
        const saved = localStorage.getItem('history');
        return saved ? JSON.parse(saved) : [];
    });

    const askQuestion = async () => {
        // When function is called, do a post request, with the prompt state as input.

        // Go through the conversation history and turn each question/response pair
        // into a string, separated by a newline. Then join them all into one big string.
        const combinedHistory = history.map(item => `${item.question}\n${item.system?.message}`).join("\n");

        // Add the latest user prompt to the end of the combined history.
        // This full string will be sent to the server so it has full context.
        const updatedPrompt = `${combinedHistory}\n${prompt}`;

        // Basically you send ALL the previous questions/answers WITH the new prompt to the server, this way the server can also "see" the previous questions.

        try {
            const options = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: updatedPrompt }),
            };
            // After the post request, perform fetch request, set fetched data to setJoke (setJoke).
            const response = await fetch("http://localhost:5000/", options);
            if (response.ok) {
                const data = await response.json();
                const newHistory = { question: prompt, system: data };
                const updatedHistory = [...history, newHistory];

                setHistory(updatedHistory);
                setQuestion(data.message);

                localStorage.setItem('history', JSON.stringify(updatedHistory));

                console.log(updatedPrompt);
            } else {
                console.error("Server error:", response.status);
            }
        } catch (err) {
            console.error("Network error:", err);
        }
    };

    // Call askQuestion function on submit.
    const handleSubmit = (e) => {
        e.preventDefault();
        askQuestion();
    };

    return (

        <div style={{  textAlign: 'center',
            backgroundColor: 'green',
            height: '100vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2em'}}>

            <header style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2em',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div>
                    <h1 style={{color:"wheat"}}>Welcome to Knowledge of the Rings!</h1>
                    <p style={{color:"wheat"}}>Ask my anything regarding the Lord of the Rings, and I shall answer!</p>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>

                    <form onSubmit={handleSubmit} style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '2em'
                    }}>
                        <div style={{
                            marginRight: '1em'
                        }}>
                            <input
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Enter Question"
                                style={{
                                    height: 40,
                                    width: 350,
                                    backgroundColor: 'wheat',
                                    borderRadius: 5,
                                    border:'1px solid black'
                            }}
                            />
                        </div>
                        <div>
                            <button type="submit" style={{
                                height: 40,
                                width: 80,
                                borderRadius: 5,
                                border:'1px solid black'
                            }}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <div style={{
                    padding: 5,
                    border:'2px solid black',
                    height: '35vh',
                    overflow: 'hidden',
                    overflowY: 'scroll',
                    marginTop: '1em',
                    width: '100vh',
                    borderRadius: 5,
                    backgroundColor: "wheat"
                }}>
                    <p>
                        {question || "Ask me a question, laddy or lassie!"}
                    </p>
                </div>
            </header>


            <div style={{
                backgroundColor: 'wheat',
                width: '300px',
                height: '50vh',
                overflowY: 'scroll',
                border: '2px solid black',
                borderRadius: 5,
                padding: 15
            }}>
                {history.map((item, index) => (
                    item.question ? (
                      <div key={index} style={{borderBottom: '1px solid black'}}>
                          <p style={{ fontWeight: 'bold' }}>Question</p>
                          <p>{item.question}</p>
                          <p style={{ fontWeight: 'bold' }}>Answer</p>
                          <p>{item.system?.message ? item.system.message : "No answer was given.." }</p>
                      </div>
                    ) : (
                        <p key={index}>There is no data..</p>
                    )
                ))}
            </div>
        </div>

    );
}

export default App;
