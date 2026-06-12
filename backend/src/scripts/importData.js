import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { fileURLToPath } from "url";

import connectDB from "../config/db.js";
import Show from "../models/Show.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const importData = async () => {
    try {
        await connectDB();

        console.log("Removing existing shows...");

        await Show.deleteMany({});

        const results = [];

        const csvPath = path.join(
            __dirname,
            "../../netflix_titles.csv"
        );

        fs.createReadStream(csvPath)
            .pipe(csv())
            .on("data", (row) => {
                results.push({
                    show_id: row.show_id,
                    type: row.type,
                    title: row.title,
                    director: row.director,

                    cast: row.cast
                        ? row.cast.split(",").map((item) => item.trim())
                        : [],

                    country: row.country,
                    date_added: row.date_added,

                    release_year: Number(row.release_year),

                    rating: row.rating,
                    duration: row.duration,

                    listed_in: row.listed_in
                        ? row.listed_in.split(",").map((item) => item.trim())
                        : [],

                    description: row.description
                });
            })
            .on("end", async () => {
                await Show.insertMany(results);

                console.log(
                    `${results.length} shows imported successfully`
                );

                process.exit();
            });
    } catch (error) {
        console.error(error);

        process.exit(1);
    }
};

importData();