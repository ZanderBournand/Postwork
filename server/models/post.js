import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    details: String,
    user: String,
    tag: String,
    votesCount: Number,
    bookmarks: {
        type: [String],
        default: [],
    },
    votes: {
        type: [{
            user: String,
            type: String,
        }],
        default: []
    },
    comments: {
        type: [{
            comment: String,
            parentId: String,
            user: String,
            id: String,
            timestamp: { type: Date, default: new Date()},
        }],
        default: []
    },
    timestamp: {
        type: Date,
        default: new Date(),
    },
})

export default mongoose.model('Post', postSchema)