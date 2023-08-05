import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { mongodbConnection } from "./Db connections/connection.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

const app = express();
const port = process.env.port || 8999;
dotenv.config();
const mode = process.env.Dev_mode;

mongodbConnection();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
//routes
app.use("/api/v1/userauth/", userRoutes);
app.use("/api/v1/blogs/", blogRoutes)


app.get("/", (req, res) => {
      return res.status(201).send("<h1> Mern Blog Page </h1>")
});

app.listen(port, () => {
      console.log(`server listening to port : ${port} in ${mode} mode.`)
});