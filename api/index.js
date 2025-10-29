import express from "express";
import dotenv from "dotenv";
import authRoutes from '../backend/routes/auth.route.js';
import userRoutes from '../backend/routes/user.route.js';
import postRoutes from '../backend/routes/post.route.js';
import notificationRoutes from '../backend/routes/notification.route.js';
import connectionRoutes from '../backend/routes/connection.route.js';
import { connectDB } from "../backend/lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
	cors({
		origin: process.env.CLIENT_URL || '*',
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
	})
);

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error'
    });
});

export default app;
