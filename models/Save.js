import mongoose from "mongoose";

const Save = new mongoose.Schema({
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'user_profile', required: true },
    pin: { type: mongoose.SchemaTypes.ObjectId, ref: 'Pin', required: true},
    board: { type: mongoose.SchemaTypes.ObjectId, ref: 'user_board'},
    section: { type: mongoose.SchemaTypes.ObjectId, ref: 'Section'},
})

export default mongoose.models.Save || mongoose.model('Save', Save)