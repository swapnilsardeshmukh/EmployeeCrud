const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const BlogPostSchema = new Schema({
    Cname:String,
    Cdesc:String,
    Cno:String,
    Cemail:String,
    Clogo:String,
    CState:String,
    Ccity:String
});

const BlogPost =mongoose.model('BlogPost',BlogPostSchema);

module.exports = BlogPost;