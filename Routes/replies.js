const { Comment, validateComment } = require('../models/comment');
const { Reply, validateReply } = require("../Models/reply")
const express = require("express");
const { Router } = require('express');
const router = express.Router();


//POST a reply to a comment
router.post("/:commentId/replies", async (req, res) => {
try {
    let { error } = validateReply(req.body);
    if (error) return res.status(400).send(`Body for reply not valid! ${error}`);

    let comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(400).send(`Comment with Id ${req.params.commentId}`)

    let reply = await new Reply(req.body);
    comment.replies.push(reply);
    await comment.save();
    return res.send(comment.replies)
} catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`)
}
})