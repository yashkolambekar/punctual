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
    default: <IProject[]>[
        {
            id: 1,
            name: "Website Redesign",
            description: "Redesign the company website to improve user experience",
            status: "active",
            recordType: "number",
        },
        {
            _id: 2,
            name: "Mobile App Development",
            description: "Develop a mobile application for our services",
            status: "inactive",
            recordType: "time",
        },
        {
            id: 3,
            name: "Marketing Campaign",
            description: "Launch a new marketing campaign for the upcoming product",
            status: "active",
            recordType: "number",
        },
        {
            id: 4,
            name: "Data Migration",
            description: "Migrate data from the old system to the new system",
            status: "inactive",
            recordType: "time",
        },
        {
            id: 5,
            name: "Customer Feedback Analysis",
            description: "Analyze customer feedback to improve product features",
            status: "active",
            recordType: "number",
        },
        {
            id: 6,
            name: "Cloud Infrastructure Setup",
            description: "Set up cloud infrastructure for the new project",
            status: "inactive",
            recordType: "time",
        },
        {
            id: 7,
            name: "SEO Optimization",
            description: "Optimize the website for search engines",
            status: "active",
            recordType: "number",
        },
        {
            id: 8,
            name: "Employee Training Program",
            description: "Conduct training sessions for employees on new software",
            status: "inactive",
            recordType: "time",
        },
        {
            id: 9,
            name: "Product Launch Event",
            description: "Organize an event for the launch of the new product",
            status: "active",
            recordType: "number",
        },
        {
            id: 10,
            name: "Security Audit",
            description: "Perform a security audit of the company's IT infrastructure",
            status: "inactive",
            recordType: "time",
        }
    ]
});

export default ProjectsState;
export type { IProject };