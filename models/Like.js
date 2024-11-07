import mongoose from "mongoose";

const Like = new mongoose.Schema({
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'user_profile', required: true },
    pin: { type: mongoose.SchemaTypes.ObjectId, ref: 'Pin', required: true},
})

export default mongoose.models.Like || mongoose.model('Like', Like)