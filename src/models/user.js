import { Schema, model } from "mongoose";
import { createHmac, randomBytes } from "crypto";

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    salt: { type: String },
    password: { type: String, required: true },
    profileImageUrl: {
      type: String,
      default: "/images/default_avatar.png",
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!this.isModified("password")) return;

  // console.log(this); // User document before hashing
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  user.password = hashedPassword;
  user.salt = salt;
  next();
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found");

  const hashedPassword = createHmac("sha256", user.salt)
    .update(password)
    .digest("hex");
  if (hashedPassword !== user.password) throw new Error("Wrong Password");
  return user;
});

const User = model("User", userSchema);
export default User;
