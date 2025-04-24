import express, {response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {AzureChatOpenAI, AzureOpenAIEmbeddings} from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { FaissStore } from "@langchain/community/vectorstores/faiss"; // Import FaissStore
// import { InferenceClient }  from "@huggingface/inference";

dotenv.config();

// const client = new InferenceClient("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");

const embeddings = new AzureOpenAIEmbeddings({
    temperature: 0,
    azureOpenAIApiEmbeddingsDeploymentName: process.env.AZURE_EMBEDDINGS_DEPLOYMENT_NAME
});

const loader = new TextLoader("lotrintro.txt")

const data = await loader.load()

const textSplitter = new RecursiveCharacterTextSplitter(
    {chunkSize: 1500, chunkOverlap: 100}
)

const splitDocs = await textSplitter.splitDocuments(data)

let vectorStore = await FaissStore.fromDocuments(splitDocs, embeddings);
// // const vectordata = await embeddings.embedQuery("Hello World!");
// console.log(vectordata)
// console.log(`Created vector with ${vectordata.length} values`)

async function createVectorstore() {
    const loader = new TextLoader("lotrintro.txt"); // Path to your text file
    const docs = await loader.load();  // Load documents from the file
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });  // Split documents into chunks
    const splitDocs = await textSplitter.splitDocuments(docs);  // Split the docs into smaller chunks
    console.log(`Document split into ${splitDocs.length} chunks. Now saving into vector store`);
    vectorStore = await FaissStore.fromDocuments(splitDocs, embeddings);  // Create the vector store
    await vectorStore.save("vectordb"); // Save vectors to the specified directory
}

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
const model = new AzureChatOpenAI({temperature: 1})
const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", ""],
    ["human", "{input}"]
]);

splitDocs.forEach((doc, index) => {
    console.log(doc.pageContent);
    console.log();
});

// TEST IF END POINT IS BEING CALLED

// app.get('/', async (req, res) => {
//     const result = await tellJoke()
//     res.json({message: result})
// });

app.get('/', async (req, res) => {
    const response = await fetch('https://the-one-api.dev/v2/quote', {
        headers: {
            Authorization: `Bearer ${process.env.LOTR_API_KEY}`,
            Accept: 'application/json'
        }
    });
    const data = await response.json();
    res.json(data);
});
// END TEST END POINT CALL

app.post('/', async (req, res) => {
    let prompt = req.body.prompt

    const result = await vectorStore.similaritySearch(prompt, 3)
    const context = result.map(item => item.pageContent).join("\n\n")

    //DEEPSEEK R1 MODEL
    // const messages = [
    //     {
    //         role: "user",
    //         content: `${context}\n\nUser: ${prompt}`,
    //     },
    // ];
    //
    // // Send the prompt to the DeepSeek LLM via Hugging Face's InferenceClient
    // const chatCompletion = await client.chatCompletion({
    //     provider: "novita",
    //     model: "deepseek-ai/DeepSeek-V3-0324",  // Use the DeepSeek model here
    //     messages: messages,
    //     max_tokens: 512,
    // });
    //
    // console.log("The user asked for: " + prompt);
    // console.log("Response from DeepSeek:", chatCompletion.choices[0].message.content);
    //
    // res.json({ message: chatCompletion.choices[0].message.content });

    //END DEEPSEEK R1 MODEL

    const messages = await promptTemplate.formatMessages({ input: `${context}\n\nUser: ${prompt}` });

        const response = await model.invoke(messages);

        console.log("The user asked for :" + prompt)

        res.json({ message: response.content });

    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    }); // End
