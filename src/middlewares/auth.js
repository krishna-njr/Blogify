import { verifyToken } from "../utils/auth.js";

export function authenticateUser(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) return next();
    try {
      const userPayload = verifyToken(tokenCookieValue);
      // if (!userPayload) return next();
      req.user = userPayload;
    } catch (err) {
      // return next();
    }
    return next();
  };
}
