import mongoose from 'mongoose';

const User = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  about: { type: String },
  website: { type: String },
  username: { type: String, unique: true, required: true }, //by default user_id
  photo: { type: String, default: '/default-profile.jpg' }, 
  createdAt: { type: Date, default: Date.now },
  followersNum: {type: Number,default: 0},
  followingNum: {type: Number,default: 0},
  followers: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' }], default: [] },
  following: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' }], default: [] },

}, { timestamps: true })

export default mongoose.models.User || mongoose.model('User', User)
