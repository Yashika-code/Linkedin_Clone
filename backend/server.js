import express from "express";
import dotenv from "dotenv";
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';
import notificationRoutes from './routes/notification.route.js';
import connectionRoutes from './routes/connection.route.js';
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(
	cors({
		origin: [
			"http://localhost:5173",
			"http://localhost:5174",
			"https://linkedin-clone-frontend.vercel.app" // ✅ Add your frontend URL
		],
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
	})
);

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error'
    });
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend", "dist")));

    // Use a RegExp catch-all to avoid path-to-regexp parsing issues across
    // different versions of Express / path-to-regexp. Regex paths are passed
    // directly and won't be interpreted as named parameters.
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    });
}

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`✅ Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
