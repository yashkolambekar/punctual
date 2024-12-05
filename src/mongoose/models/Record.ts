import mongoose from 'mongoose';
import Project from './Project';

const RecordSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Project,
        required: true,
    },
    startTime: {
        type: Date,
        required: false,
    },
    endTime: {
        type: Date,
        required: false,
    },
    numericValue: {
        type: Number,
        required: false,
    }
});

export default mongoose.models.Record || mongoose.model('Record', RecordSchema);