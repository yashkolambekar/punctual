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
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    startTime: {
        type: Date,
        required: false,
    },
    numericValue: {
        type: Number,
        required: false,
    },
    lastUpdate : {
        type: Date,
        required: false,
    }
});

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);