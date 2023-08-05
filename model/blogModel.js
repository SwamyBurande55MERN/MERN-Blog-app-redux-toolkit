import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
      title: {
            type: String,
            required: [true, "title is required"]
      },
      shortDescription: {
            type: String,
            required: [true, "description is required"]
      },
      img: {
            type: String,
            required: [true, "image is required"]
      },
      user: {
            type: mongoose.Types.ObjectId,
            ref: "USERS",
            required: [true, "user id is required"]
      },
      longDescription: {
            type: String,
            required: [true, "longDescription is required"]
      }

}, { timeStamps: true });

export const BlogModel = mongoose.model("BLOGS", blogSchema);
