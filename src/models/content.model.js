const mongoose = require("mongoose");

const contentSchema = mongoose.Schema(
  {
    // meta data
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
      required: false,
    },
    author: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    readingTime: {
      type: Number,
      required: true,
    },
    // actual content
    hash: {
      type: String,
      required: true,
    },
    intro: {
      type: String,
      required: true,
    },
    toc: {
      type: String,
      required: true,
    },
    html: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Content
 */
const Content = mongoose.model("Content", contentSchema);

module.exports = Content;
