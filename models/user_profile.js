import mongoose from "mongoose";

const user_profile = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    about: { type: String },
    website: { type: String },
    username: { type: String, unique: true, required: true },
    photo: { type: String, default: '/defaultpp.jpg' },
    createdAt: { type: Date, default: Date.now },
    followersNum: { type: Number, default: 0 },
    followingNum: { type: Number, default: 0 },
    followers: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'user_profile', default: [] }],
    following: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'user_profile', default: [] }],
    boards: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'user_board', default: [] }]
  }, { timestamps: true })

export default mongoose.models.user_profile || mongoose.model('user_profile', user_profile);