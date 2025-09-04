import { Router } from "express";
// import User from "../models/user.js";
import { handleUserLogin, handleUserSignup } from "../controllers/user.js";

const router = Router();

router.get("/login", (req, res) => {
  // res.send("User login");r
  return res.render("login");
});

router.get("/signup", (req, res) => {
  //   res.send("User signup");
  return res.render("signup");
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.redirect("/");
});

router.post("/login", handleUserLogin);

router.post("/signup", handleUserSignup);

export { router };
