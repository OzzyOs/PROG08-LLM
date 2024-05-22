import Layout from "../components/Layout.tsx";
import DialogueWindow from "../components/DialogueWindow.tsx";
// import DialogueWindow from "../components/DialogueWindow.tsx";

export default function HomePage () {
    return (
         <Layout>
             <div className='family-wrapper || flex flex-col justify-center align-middle'>
                 <h1 className='h1-wrapper || flex justify-center'>Homepage</h1>
                     <div className='flex justify-center'>
                         <DialogueWindow />
                     </div>
             </div>
         </Layout>
    )
}

//This page is responsible for displaying information related to the homepage.