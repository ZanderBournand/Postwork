import mongoose from "mongoose";

const voteSchema = mongoose.Schema({
    user: String,
    type: String,
})

const commentSchema = mongoose.Schema({
    comment: String,
    parentId: String,
    user: String,
    id: String,
    timestamp: { type: Date, default: new Date()},
})

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
        type: [voteSchema],
        default: []
    },
    comments: {
        type: [commentSchema],
        default: []
    },
    timestamp: {
        type: Date,
        default: new Date(),
    },
})

export default mongoose.model('Post', postSchema)