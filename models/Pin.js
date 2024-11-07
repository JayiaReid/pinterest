import mongoose from "mongoose"

const Pin = new mongoose.Schema({
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'user_profile', required: true },
    image: {type: String, required: true},
    title: { type: String, required: true },
    description: { type: String, default: ''},
    comments: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Comment', default: []}],
    likes: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Like', default: []}],
    keywords: [{type: String, default: []}],
    link: {type: String, default: ''},
    saves: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Save', default: []}]
})

export default mongoose.models.Pin ||  mongoose.model('Pin', Pin)