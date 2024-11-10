import mongoose from 'mongoose';

const User = new mongoose.Schema({
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
  followers: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User', default: [] }],
  following: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User', default: [] }],
  boards: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Board', default: [] }]
}, { timestamps: true })

export default mongoose.models.User || mongoose.model('User', User)
