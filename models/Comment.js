import mongoose from "mongoose";

const Comment = new mongoose.Schema({
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'user_profile', required: true },
    pin: { type: mongoose.SchemaTypes.ObjectId, ref: 'Pin', required: true},
    content: {type: String, required: true}
})

export default mongoose.models.Comment || mongoose.model('Comment', Comment)