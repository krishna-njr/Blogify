import jwt from "jsonwebtoken";

export function createTokenForUser(user) {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
