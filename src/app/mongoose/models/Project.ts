import mongoose from "mongoose";    

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
    status: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);