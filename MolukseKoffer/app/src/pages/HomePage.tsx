import Layout from "../components/Layout.tsx";
import DialogueWindow from "../components/DialogueWindow.tsx";
import UpdateDialogue from "../components/homepage/UpdateDialogue.tsx";

export default function HomePage () {
    return (
         <Layout>
             <div className='family-wrapper || flex flex-col justify-center align-middle'>
                 <h1 className='h1-wrapper || flex justify-center mt-5'>Homepage</h1>
                     <div className='dialogue-container || flex justify-center'>
                         <DialogueWindow />
                     </div>
                 <div className='update-container || flex justify-center'>
                     <UpdateDialogue />
                 </div>
             </div>
         </Layout>
    )
}

//This page is responsible for displaying information related to the homepage.