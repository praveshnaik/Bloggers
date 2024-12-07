const mongoose = require("mongoose");
const User = require('../models/User');

const blogSchema =new mongoose.Schema({
    name: { type: String, required: true },
    design: { type: Object, required: true },
    html: { type: String, required: true },
    wrappedHtml: { type: String, required: true },
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // }
  });
  const Blog = mongoose.model('Blog',blogSchema);

  module.exports = Blog;