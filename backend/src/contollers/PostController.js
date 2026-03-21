import postCheck from "../validators/postValidation.js";
import Post from '../models/Post.js'
import updatePostCheck from "../validators/updatePostValidation.js";

// Post something

export const sharePost = async (req, res) => {
    try {
        const result = postCheck.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: result.error.issues
            });
        }

        const data = result.data

        const post = await Post.create({
            title: data.title,
            content: data.content,
            author: req.user._id,
        });

        await post.populate('author', 'name email');

        return res.status(201).json({
            success: true,
            message: "Post created",
            data: {
                id: post._id,
                title: post.title,
                content: post.content,
                author: {
                    id: post.author._id,
                    name: post.author.name,
                    email: post.author.email
                },
                createdAt: post.createdAt
            }
        });
    } catch (error) {
        console.error(`Post Error ${error.message}`);
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}

// Update post

export const updatePost = async (req, res) => {
    try {

        const id = req.params.id;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed"
            });
        }

        const result = updatePostCheck.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: result.error.issues
            });
        }

        const data = result.data

        if (data.title !== undefined)
            post.title = data.title

        if (data.content !== undefined)
            post.content = data.content

        await post.save();

        await post.populate('author', 'name email');

        return res.json({
            success: true,
            message: "Post updated",
            data: {
                id: post._id,
                title: post.title,
                content: post.content,
                author: {
                    id: post.author._id,
                    name: post.author.name,
                    email: post.author.email
                },
                createdAt: post.createdAt
            }
        });
    } catch (error) {
        console.error(`Update error: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

// Delete post

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "User not allowed"
            });
        }

        await post.deleteOne();

        return res.json({
            success: true,
            message: "Post deleted",
            data:{
                id: post._id
            }
        });
    } catch (error) {
        console.error(`Delete error: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}