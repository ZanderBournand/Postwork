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

    const post = await PostMessage.findById(id);
    const index = post.bookmarks.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        post.bookmarks.push(req.userId);
    } else {
        post.bookmarks = post.bookmakrs.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);

}

export const createPost = async (req, res) => {
    
    const post = req.body;

    const newPost = new PostMessage({...post, user: req.userId, votesCount: 0, timestamp: new Date().toISOString()});

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

    const post = await PostMessage.findById(id);
    const index = post.votes.findIndex((p) => p.user === String(req.userId));

    if (index === -1) {
        post.votes.push({
            user: req.userId,
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

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);

}

export const commentPost = async (req, res) => {

    const { id } = req.params;
    const comment = req.body;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);
    post.comments.push({
        ...comment, 
        user: req.userId,
        id: ObjectId().toString(),
        timestamp: new Date().toISOString()
    });

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);

}

export const deleteComment = async (req, res) => {

    const { id, commentId } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);
    post.comments = post.comments.filter((c) => c.id !== commentId)

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);

}

export const updateComment = async (req, res) => {

    const { id, commentId } = req.params;

    const comment = req.body;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);
    commentIndex = post.comments.findIndex((c) => c.id === commentId)
    post.comments[commentIndex].comment = comment

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
    
}

