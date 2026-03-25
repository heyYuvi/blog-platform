import commentCheck from "../validators/commentValidtion.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import updateCommentCheck from "../validators/updateCommentValidation.js";
import { success } from "zod";

//Comment on post


export const addPostComment = async (req, res) =>{
    try{
        const result = commentCheck.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            success: false,
            error: result.error.issues
        });
    }

    console.log(result.data);

    const data = result.data;
    
    const post = await Post.findById(data.post);
    if(!post){
        return res.status(404).json({
            success:  false,
            message: "Post not found"
        });
    }

    const comment = await Comment.create({
        text: data.text.trim(),
        author: req.user._id,
        post: post._id
    });

    await comment.populate('author', 'name email');
    
    return res.status(201).json({
        success: true,
        message: "Comment added",
        data:{
            id: comment._id,
            text: comment.text,
            author:{
                id: comment.author._id,
                name: comment.author.name,
                email: comment.author.email
            },
            post: comment.post,
            createdAt: comment.createdAt
        }
    });
    
    }catch(error){
        console.error(`Add comment error: ${error.message}`)
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

// Get Comments

export const getComments = async (req, res) =>{
    try{
        
    const post = await Post.findById(req.params.id);
    if(!post){
        return res.status(403).json({
            success: false,
            message: "Post not found"
        });
    }

    const comments = await Comment.find({ post: post._id} ).populate('author', 'name email');;
    if(!comments){
        return res.json({
            success: true,
            comments: []
        });
    }

    return res.json({
        success: true,
        data: comments.map(comment =>({
            id: comment._id,
            text: comment.text,
            author: {
                id: comment.author.id,
                name: comment.author.name,
                email: comment.author.email
            },
            createdAt: comment.createdAt
        }))
    });
    }catch(error){
        console.error(`Get comments error: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

//Delete Comment

export const deleteComment = async (req, res) =>{
    try{
        
    const { id } = req.params;

    const comment = await Comment.findById(id);
    if(!comment){
        return res.status(404).json({
            success: false,
            message: "Comment not found"
        });
    }

    await comment.deleteOne();
    await comment.populate('author', 'name email')

    return res.json({
        success: true,
        message: "Comment deleted",
        data:{
            text: comment.text,
            author:{
                id: comment.author._id,
                name: comment.author.name,
                email: comment.author.email
            }
        }
    });
    }catch(error){
        console.log(`Comment delete error: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

//Update Comment

export const updateComment = async (req, res) =>{
    try{
        const { id } = req.params;
    const result = updateCommentCheck.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            success: false,
            error: result.error.issues
        });
    }

    const data = result.data;
    
    const comment = await Comment.findById(id);
    if(!comment){
        return res.status(404).json({
            success: false,
            message: "Comment not found"
        });
    }

    if(data.text != undefined){
        comment.text = data.text;
    }

    await comment.save();
    
    await comment.populate("author", "name email");

    return res.json({
        success: true,
        message: "Comment updated",
        data:{
            text: comment.text,
            author:{
                id: comment.author._id,
                name: comment.author.name,
                email: comment.author.email
            },
            updatedAt : comment.updatedAt
        }
    });
    }catch(error){
        console.error(`Comment update error: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}