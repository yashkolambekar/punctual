import mongoose from "mongoose";    

interface IProject {
    name: string,
    description: string | null,
    recordType: string,
    owner: string,
    startTime: Date | null
}

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    recordType: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    startTime: {
        type: Date,
        required: false,
    }
});

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);