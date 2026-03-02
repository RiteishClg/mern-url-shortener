import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./src/config/db.js";
import ShortUrlRouter from "./src/routes/shortUrlRoutes.js"
import redirectRouter from "./src/routes/redirectRoutes.js"
import cors from "cors"

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: "https://mern-url-shortener-4iy1.onrender.com",
  })
);

app.use(express.json());

app.use("/api/shortUrl",ShortUrlRouter)

app.use("/r",redirectRouter)

const startServer = async () => {
    try {
        await connectDb(); 
        app.listen(port, () => {
            console.log(`Listening on Port : http://localhost:${port}/api/shortUrl`);
        });
    } catch (error) {
        console.error("Server not started");
        process.exit(1);
    }
};

startServer();