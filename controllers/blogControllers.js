import { BlogModel } from "../model/blogModel.js";
import { UserModel } from "../model/userModel.js";
import mongoose from "mongoose";



export const getAllBlogs = async (req, res) => {
      try {
            const allBlogs = await BlogModel.find().populate("user");
            if (!allBlogs.length) {
                  return res.status(404).json({
                        success: false,
                        message: `No blogs found`
                  });
            }
            return res.status(200).json({
                  success: true,
                  message: "all blogs :",
                  allblogs: allBlogs,
                  //print length of all available blogs
                  length: allBlogs.length,

            });
      } catch (err) {
            console.log(`error in get all blogs :`, err);
            return res.status(500).json({
                  error: err,
                  success: false,
                  message: `error while getting all blogs`
            });
      }
}

export const createBlog = async (req, res) => {
      try {
            const { title, shortDescription, img, user, longDescription } = req.body;
            if (!title) {
                  return res.status(403).json({ error: `title is required!` });
            }
            if (!shortDescription) {
                  return res.status(403).json({ error: `shortDescription is required!` });
            }
            if (!img) {
                  return res.status(403).json({ error: `img is required!` });
            }
            if (!user) {
                  return res.status(403).json({ error: `user is required!` });
            }
            if (!longDescription) {
                  return res.status(403).json({ error: `longDescription is required!` });
            }

            const existingUser = await UserModel.findById(user);
            if (!existingUser) {
                  return res.status(403).json({
                        success: false,
                        message: `unable to find user`
                  })
            }

            const newBlog = new BlogModel({
                  title,
                  shortDescription,
                  img,
                  user,
                  longDescription
            });

            //mongoose session creation
            const session = await mongoose.startSession();
            session.startTransaction();
            await newBlog.save({ session });
            existingUser.blogs.push(newBlog);
            await existingUser.save({ session });
            await session.commitTransaction();

            // save new blog
            await newBlog.save();

            return res.status(201).json({
                  message: `new blog created successfully`,
                  success: true,
                  newBlog: newBlog
            });
      } catch (err) {
            console.log(`error in create blog :`, err);
            return res.status(500).json({
                  error: err,
                  success: false,
                  message: `error while creating new blog`
            });
      }
}

export const getBlogById = async (req, res) => {
      try {
            const { id } = req.params;
            const oneBlog = await BlogModel.findById(id);
            if (!oneBlog) {
                  return res.status(404).json({
                        success: false,
                        error: "No blogs found with this id"
                  });
            }
            return res.status(201).json({
                  success: true,
                  message: `single blog fetching successfull`,
                  blog: oneBlog,

            });
      } catch (err) {
            console.log(`error in get all blogs :`, err);
            return res.status(500).json({
                  error: err,
                  success: false,
                  message: `error while geting a blog`
            });
      }
}

export const getUserBlogsById = async (req, res) => {
      try {
            const { id } = req.params;
            const userBlogs = await UserModel.findById(id).populate("blogs");

            if (!userBlogs) {
                  return res.status(404).json({
                        success: false,
                        message: `Blogs with this user not found`
                  })
            }

            return res.status(200).json({
                  success: true,
                  message: `user's blogs received successfully`,
                  userBlogs
            })

      } catch (err) {
            console.log(err);
            return res.status(403).json({
                  message: `error while getting a user blog by id`,
                  success: false,
                  error: err
            })
      }
}

export const updateBlog = async (req, res) => {
      try {
            const { id } = req.params;
            const updateBlogs = await BlogModel.findByIdAndUpdate(id, {
                  ...req.body     //$set: req.body
            }, {
                  new: true
            })
            if (!updateBlogs) {
                  return res.status(404).json({
                        success: false,
                        error: "No blogs found with this id"
                  });
            }
            return res.status(201).json({ success: true, message: `blog updated successfully`, blog: updateBlogs });
      } catch (err) {
            console.log(`error in get all blogs :`, err);
            return res.status(500).json({
                  error: err,
                  success: false,
                  message: `error wile updating blog`
            });
      }
}

export const deleteBlog = async (req, res) => {
      try {
            const { id } = req.params;

            const blog = await BlogModel

                  .findByIdAndDelete(id)
                  .populate("user");
            await blog.user.blogs.pull(blog);
            await blog.user.save();

            return res.status(200).json({
                  message: `blog deleted successfully`,
                  success: true,
                  blog,
            });
      } catch (err) {
            console.log(`error in get all blogs :`, err);
            return res.status(500).json({
                  error: err,
                  success: false,
                  message: `error while deleting blog`
            });
      }
}

