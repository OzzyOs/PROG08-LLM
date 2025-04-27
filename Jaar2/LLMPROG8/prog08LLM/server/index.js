import express, {response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {AzureChatOpenAI, AzureOpenAIEmbeddings} from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { FaissStore } from "@langchain/community/vectorstores/faiss"; // Import FaissStore
import { InferenceClient } from "@huggingface/inference";             // Import Inference Client for Hugging Face

dotenv.config();

// HUGGING FACE
const client = new InferenceClient(process.env.HUGGING_FACE);   // Client instance for use of Hugging Face API's.
// END HUGGING FACE

const embeddings = new AzureOpenAIEmbeddings({
    temperature: 0,
    azureOpenAIApiEmbeddingsDeploymentName: process.env.AZURE_EMBEDDINGS_DEPLOYMENT_NAME
});

let vectorStore;

// CREATE VECTOR FUNCTION
async function createVectorstore() {
    const loader = new TextLoader("lotrintro.txt");     // Path to your text file
    const docs = await loader.load();                   // Call 'load' instance, to load documents from the file
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });  // Split long documents into smaller chunks
                                                                                                                                // Try, ideally, create text blocks of 1000 characters max.
                                                                                                                                // Overlap of 200 characters, to help maintain better context
    const splitDocs = await textSplitter.splitDocuments(docs);  // Split the docs into smaller chunks
    console.log(`Document split into ${splitDocs.length} chunks. Now saving into vector store`); // Log amount of chunks are being saved.
    vectorStore = await FaissStore.fromDocuments(splitDocs, embeddings);    // Create the vector store using FaissStore
    await vectorStore.save("vectordb"); // Save vector to the specified directory
    splitDocs.forEach((doc, index) => { // Log the data
        console.log(doc.pageContent);
        console.log();
    });
}

// END CREATE VECTOR FUNCTION

// Call the createVectorstore function to initialize the vector store before server starts handling requests
createVectorstore().then(() => {
    console.log("Vector store created successfully.");
}).catch((error) => {
    console.error("Error creating vector store:", error);
});

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = 5000;

// GPT3.5 MODEL

// const model = new AzureChatOpenAI({temperature: 1})
// const promptTemplate = ChatPromptTemplate.fromMessages([ // Prompt template for GPT 3.5
//     ["system", "You are a knowledgable Hobbit, that takes a smoke from his pipe after every answer."],
//     ["human", "{input}"]
// ]);

// END GPT3.5 MODEL

const deepSeekPromptTemplate = (context, prompt) => [       // Prompt template for Deep Seek
    {
        role:"system", content:"You are a knowledgable Hobbit, that takes a smoke from his pipe after every answer.",
    },
    {
        role: "user", content: `${context}\n\nUser: ${prompt}`,
    },
];



// TEST IF END POINT IS BEING CALLED

// app.get('/', async (req, res) => {
//     const result = await tellJoke()
//     res.json({message: result})
// });

// app.get('/', async (req, res) => {
//     const result = await tellJoke()
//     res.json({message: result})
// });
// END TEST END POINT CALL

app.post('/', async (req, res) => {
    let prompt = req.body.prompt

    const result = await vectorStore.similaritySearch(prompt, 3)
    const context = result.map(item => item.pageContent).join("\n\n")

    //DEEPSEEK R1 MODEL

    const messages = deepSeekPromptTemplate(context, prompt); // Messages variable defined by custom Template.

    // Send the prompt to the DeepSeek LLM via Hugging Face's InferenceClient
    const chatCompletion = await client.chatCompletion({
        provider: "novita",                                                 // Selected Inference Provider
        model: "deepseek-ai/DeepSeek-R1",                                   // Use the DeepSeek model here
        messages: messages,                                                 // Property refering to message variable.
        max_tokens: 512,                                                    // Max Tokens to be used in a prompt request.
    });

    console.log("The user asked for: " + prompt);
    console.log("Response from DeepSeek:", chatCompletion.choices[0].message.content);

    res.json({ message: chatCompletion.choices[0].message.content });

    //END DEEPSEEK R1 MODEL

    // GPT 3.5 TURBO MODEL
    // const messages = await promptTemplate.formatMessages({ input: `${context}\n\nUser: ${prompt}` });
    //
    //     const response = await model.invoke(messages);
    //
    //     console.log("The user asked for :" + prompt)
    //
    //     res.json({ message: response.content });

    })
    // END GPT TURBO 3.5 MODEL
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    }); // End
