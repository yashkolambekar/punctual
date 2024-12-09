import Link from "next/link";
import ProjectInfo from "./ProjectInfo";
import arrowIcon from "@/assets/back-svgrepo-com.svg";
import Image from "next/image";
import BackToDashboard from "@/components/BackToDashboard";

const ProjectId = async ({params}: {params: Promise<{projectId: string}>}) => {
    
    const projectId = (await params).projectId;

    return(
        <>  
        <div className="h-6 w-full">
        </div>
            <BackToDashboard />
            <ProjectInfo projectId={projectId} />
        </>
    )
}

export default ProjectId;