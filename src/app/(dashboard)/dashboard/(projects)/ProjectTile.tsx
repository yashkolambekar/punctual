import { IProject } from "@/store/atoms/ProjectsState";

const ProjectTile = ({data} : {data: IProject}) => {
    return (
        <>
            <div className="p-2 border-[1px] border-[rgba(0,0,0,0.2)] border-solid rounded-lg">
                <p className="m-0">{data.name}</p>
            </div>
        </>
    )
}

export default ProjectTile;