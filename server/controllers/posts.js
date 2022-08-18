import mongoose from "mongoose";
import Post from '../models/post.js'

export const getPosts = async (req, res) => {
    try {

        const posts = await Post.find().sort({ timestamp: -1 });
        res.status(200).json({data: posts})

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
} 

export const getPostsByUser = async (req, res) => {

    const { user } = req.query;

    try {
        
        const posts = await Post.find({ user })
        res.status(200).json({data: posts})

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getBookmarksByUser = async (req, res) => {

    const { bookmarks } = req.query;

    try {
        
        const posts = await Post.find({ bookmarks: { $in:  bookmarks }})
        res.status(200).json({data: posts})

    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

export const bookmarkPost = async (req, res) => {

    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await Post.findById(id);
    const index = post.bookmarks.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        post.bookmarks.push(req.userId);
    } else {
        post.bookmarks = post.bookmarks.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);

}

export const createPost = async (req, res) => {
    
    const post = req.body;

    const newPost = new Post({...post, user: req.userId, votesCount: 0, timestamp: new Date().toISOString()});

    try {

        await newPost.save();
        res.status(201).json(newPost)

    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const votePost = async (req, res) => {

    const { id, type } = req.params;
 
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await Post.findById(id);
    const index = post.votes.findIndex((p) => p.user === String(req.userId));

    if (index === -1) {
        post.votes.push({
            user: String(req.userId),
            type: type
        });
        post.votesCount = (type === "up") ? post.votesCount + 1 : post.votesCount - 1
    } else {
        if (post.votes[index].type === type) {
            post.votes = post.votes.filter((p) => p.user !== String(req.userId))
            post.votesCount = (type === "up") ? post.votesCount - 1 : post.votesCount + 1
        }
        else {
            post.votes[index].type = type
            post.votesCount = (type === "up") ? post.votesCount + 2 : post.votesCount - 2
        }
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);

}

export const commentPost = async (req, res) => {

    const { id } = req.params;
    const comment = req.body;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await Post.findById(id);
    post.comments.push({
        comment: comment?.comment,
        parentId: (comment?.parentId) ? comment.parentId: null,
        user: req.userId,
        timestamp: new Date().toISOString()
    });

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);

}

export const deleteComment = async (req, res) => {

    const { id, commentId } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await Post.findById(id);
    post.comments = post.comments.filter((c) => c._id.toString() !== commentId)

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);

}

export const updateComment = async (req, res) => {

    const { id, commentId } = req.params;

    const comment = req.body;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await Post.findById(id);
    post.comments = post.comments.map((c) => (c._id.toString() === commentId) ? { ...c, comment: comment.body} : c)

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
    
}

