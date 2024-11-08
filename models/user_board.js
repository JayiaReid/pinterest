import mongoose from "mongoose";

const user_board = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    private: { type: Boolean, default: false },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'Profile', required: true },
    pins: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Pin', default: [] }],
    sections: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Section', default: [] }],
    cover: { type: String, default: '/blank.jpg' },
    images: {
        type: [String],
        default: ['/blank.jpg', '/blank.jpg']
    }
}, { timestamps: true })

export default mongoose.models.user_board || mongoose.model('user_board', user_board)