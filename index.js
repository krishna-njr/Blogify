import express from "express";

import cors from "cors";
import connectDB from "./src/db/connection.js";
import dotenv from "dotenv";
import { router as userRouter } from "./src/routes/user.js";
import { router as blogRouter } from "./src/routes/blog.js";
import cookieParser from "cookie-parser";
import { authenticateUser } from "./src/middlewares/auth.js";
import Blog from "./src/models/blog.js";
import path from "path";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(authenticateUser("token"));
app.use(express.static(path.resolve("src/public")));

app.set("view engine", "ejs");
app.set("views", "./src/views");

const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  //   res.send("Hello World!");
  // console.log(req.user);
  const allBlogs = await Blog.find({});
  // const allBlogs = await Blog.find({ author: req.user?.id });
  return res.render("home", {
    user: req.user || null,
    blogs: allBlogs,
  });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(PORT, async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); //
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
  console.log(`API is available at http://localhost:${PORT}`);
});
