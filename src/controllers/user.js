import User from "../models/user.js";
import { createTokenForUser } from "../utils/auth.js";

export const handleUserSignup = async (req, res) => {
  // console.log(req.body);
  const { username, email, password, role } = req.body;
  const user = await User.create({ username, email, password, role });

  return res.status(201).redirect("/user/login");
};

export const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;

  // console.log("login check ", email, password); // login check :

  try {
    const user = await User.matchPassword(email, password);
    const token = createTokenForUser(user);
    return res
      .cookie("token", token, { httpOnly: true, secure: true })
      .redirect("/");
  } catch (err) {
    // console.log(err);
    return res.status(401).render("login", { error: err.message });
  }
};
