import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

connectDB();

app.listen(5000, () => {
    console.log("Server running");
});