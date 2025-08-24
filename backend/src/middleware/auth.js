import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  if (!token) {
    console.error("No token provided in Authorization header.");
    return res.status(401).json({ message: "NO TOKEN PROVIDED" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.error("JWT Verification Error:", err.message);
      // Print the token and decoded payload for debugging
      try {
        const decoded = jwt.decode(token, { complete: true });
        console.error("Decoded token:", JSON.stringify(decoded, null, 2));
      } catch (decodeErr) {
        console.error("Could not decode token:", decodeErr.message);
      }
      console.error("JWT_SECRET used:", process.env.JWT_SECRET);
      console.log("Token:", token);
      return res.status(403).json({ message: "INVALID OR EXPIRED TOKEN", error: err.message });
    }
    req.user = payload;
    next();
  });
}