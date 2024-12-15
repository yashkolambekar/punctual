import api from '@/lib/api';
import { create } from 'zustand'

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

interface IProjectStore {
    projects: IProject[];
    fetchProjects: () => void;
}

const useProjectStore = create<IProjectStore>((set) => ({
    projects: <IProject[]>[],
    fetchProjects: async () => {
        api.get('/projects').then((response) => {
            set({ projects: response.data.projects });
        }).catch((error) => {
            console.error(error);
        });
    },
}))

export default useProjectStore;
export type { IProject };