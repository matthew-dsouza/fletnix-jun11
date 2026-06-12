import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
    {
        show_id: String,
        type: String,
        title: String,
        director: String,

        cast: [String],

        country: String,
        date_added: String,
        release_year: Number,
        rating: String,
        duration: String,

        listed_in: [String],

        description: String
    },
    {
        timestamps: true
    }
);

const Show = mongoose.model("Show", showSchema);

export default Show;