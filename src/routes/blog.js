import { Router } from "express";
import multer from "multer";
import path from "path";
import Blog from "../models/blog.js";
import Comment from "../models/comments.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./src/public/uploads/`));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = Router();

router.get("/add", (req, res) => {
  res.render("addBlog", { user: req.user || null });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id).populate(
    "author",
    "username profileImageUrl"
  );
  const comments = await Comment.find({ blog: id }).populate(
    "author",
    "username profileImageUrl"
  );
  if (!blog) {
    return res.status(404).render("home", { error: "Blog not found" });
  }
  //   console.log(req.user);
  res.render("blog", { user: req.user || null, blog, comments });
});

//
router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, content } = req.body;
  const { filename, path } = req.file;
  //   console.log(req.user);
  //   console.log(req.body);
  //   console.log(req.file);
  await Blog.create({
    title,
    content,
    coverImageUrl: `/uploads/${filename}`,
    author: req.user?.id,
  });
  res.redirect("/");
});

// comments :

router.post("/comment/:id", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  await Comment.create({
    content,
    author: req.user?.id,
    blog: id,
  });

  res.redirect(`/blog/${id}`);
});

export { router };
