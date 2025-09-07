import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";

export const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization;
    const token = req.cookies.token || (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1]:null);
    if (!token) return res.status(401).json({ message: "Unauthorized User" });

    const isBlacklisted = await redisClient.get(token);
    if (isBlacklisted) {
      res.cookie('token', '');
      return res.status(401).send({ error: "Unauthorized User" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ message: "Unauthorized User" });

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
