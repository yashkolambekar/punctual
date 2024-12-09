"use client";

import api from "@/lib/api";
import { IProject } from "@/store/atoms/ProjectsState";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const ProjectInfo = ({projectId} : {projectId: string}) => {

    const [project, setProject] = useState<IProject>()

    useEffect(() => {
        api.get(`/projects?id=${projectId}`).then((res) => {
            setProject(res.data.project);
        }).catch((e) => {
            console.error(e);
            toast.error("Failed to get project info");
        })
    }, [projectId]);


    return (
        <>
        <div>
            <p className="text-[0.7em] font-light m-0">Project Name</p>
            <p className="text-[2em] font-bold m-0" >{project?.name}</p>
            {
                project?.description ? (
                    <p className="mt-3">{project?.description}</p>
                ) : ""
            }
        </div>
        </>
    )
}

export default ProjectInfo;