import express from "express";
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog, getUserBlogsById } from "../controllers/blogControllers.js";

const router = express.Router();
//get all blogs
router.get("/all-blogs", getAllBlogs);

//create new blog
router.post("/create-new-blog", createBlog);

//get one blog using blog id
router.get("/get-one-blog/:id", getBlogById);

//get all blogs for one user
router.get("/user-blogs/:id", getUserBlogsById);

//update a blog
router.put("/update-blog/:id", updateBlog);

//delete a blog
router.delete("/delete-blog/:id", deleteBlog);

export default router;