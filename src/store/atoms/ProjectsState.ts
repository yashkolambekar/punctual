import { atom } from "recoil";

interface IProject {
    _id: number;
    name: string;
    description: string;
    status: string;
    recordType: "number" | "time",
    startTime?: Date | null;
};

const ProjectsState = atom({
    key: 'ProjectsState',
    default: <IProject[]>[]
});

export default ProjectsState;
export type { IProject };