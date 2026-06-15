import Show from "../models/Show.js";
import User from "../models/User.js";

export const getShows = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;

        const limit = 15;

        const skip = (page - 1) * limit;

        const { search, type } = req.query;

        const query = {};

        if (type) {
            query.type = type;
        }

        if (search) {
            query.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    cast: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        const user = await User.findById(
            req.user.userId
        );

        if (user && user.age < 18) {
            query.rating = {
                $ne: "R"
            };
        }

        const totalShows =
            await Show.countDocuments(query);

        const shows = await Show.find(query)
            .skip(skip)
            .limit(limit)
            .sort({
                title: 1
            });

        res.status(200).json({
            currentPage: page,
            totalPages: Math.ceil(
                totalShows / limit
            ),
            totalShows,
            shows
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const getShowById = async (
    req,
    res
) => {
    try {
        const show = await Show.findById(
            req.params.id
        );

        const restrictedRatings = ["R"];

        if (!show) {
            return res.status(404).json({
                message: "Show not found"
            });
        }

        const user = await User.findById(
            req.user.userId
        );

        if (
            user.age < 18 &&
            restrictedRatings.includes(show.rating)
        ) {
            return res.status(403).json({
                message:
                    "You are not allowed to view this content"
            });
        }

        res.status(200).json(show);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};