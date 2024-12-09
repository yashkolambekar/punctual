import { atom } from "recoil";

interface IProject {
    _id: number;
    name: string;
    description: string;
    status: string;
    recordType: "numeric" | "time";
    startTime?: Date | null;
    numericValue?: number | null;
    lastUpdate: Date | null;
};

const ProjectsState = atom({
    key: 'ProjectsState',
    default: <IProject[]>[]
});

export default ProjectsState;
export type { IProject };