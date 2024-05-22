import Layout from "../components/Layout.tsx";
import DialogueWindow from "../components/DialogueWindow.tsx";

const FamilyLine = () => {
    return (
        <Layout>
            <div className='family-wrapper || flex flex-col justify-center align-middle'>
                <h1 className='h1-wrapper || flex justify-center mt-5'>Family Line</h1>
                    <div className='dialogue-container || flex justify-center'>
                        <DialogueWindow />
                    </div>
            </div>
        </Layout>
    )
};

export default FamilyLine;