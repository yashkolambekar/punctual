import api from "@/lib/api";
import toast from "react-hot-toast";
import ProjectInfo from "./ProjectInfo";

const ProjectId = async ({params}: {params: Promise<{projectId: string}>}) => {
    
    const projectId = (await params).projectId;

    return(
        <>  
        <div className="h-6 w-full">

        </div>
            <ProjectInfo projectId={projectId} />
        </>
    )
}

export default ProjectId;