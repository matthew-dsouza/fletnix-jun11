import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
    getShows,
    getShowById
} from "../controllers/showController.js";

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    getShows
);

router.get(
    "/:id",
    authMiddleware,
    getShowById
);

export default router;