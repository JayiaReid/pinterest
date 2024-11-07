
import mongoose from "mongoose";

const Section = new mongoose.Schema({
    title: { type: String, required: true },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'user_profile', required: true },
    pins:  [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Pin', default: [] }],
    board: {type: mongoose.SchemaTypes.ObjectId, ref: 'user_board', required: true},
    images: { 
        type: [String], 
        default: ['/blank.jpg', '/blank.jpg', '/blank.jpg']
    }
}, { timestamps: true })

export default mongoose.models.Section ||  mongoose.model('Section', Section)