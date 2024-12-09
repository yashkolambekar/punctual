import Link from "next/link";
import ProjectInfo from "./ProjectInfo";
import arrowIcon from "@/assets/back-svgrepo-com.svg";
import Image from "next/image";
import BackToDashboard from "@/components/BackToDashboard";
import NumericChart from "./NumericChart";

const ProjectId = async ({params}: {params: Promise<{projectId: string}>}) => {
    
    const projectId = (await params).projectId;

    return(
        <>  
        <div className="h-6 w-full">
        </div>
        <div className="px-4">
            <BackToDashboard />
            <ProjectInfo projectId={projectId} />
            <NumericChart />
        </div>
        </>
    )
}

export default ProjectId;