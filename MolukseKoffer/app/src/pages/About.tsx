import Layout from "../components/Layout.tsx";
import DialogueWindow from "../components/DialogueWindow.tsx";

export default function About() {
    return (
        <Layout>
            <div className='family-wrapper || flex flex-col justify-center align-middle'>
                <h1 className='h1-wrapper || flex justify-center mt-5'>About</h1>
                    <div className='flex justify-center'>
                        <DialogueWindow />
                    </div>
            </div>
        </Layout>
    )
}