import { Request, Response } from "express";
import User from "../models/user";

export const getUserEvents = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(userId).populate("regEvents");

    if (user) {
      res.json({
        message: "Events fetched successfully",
        events: user.regEvents,
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getUserFavourites = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(userId).populate("favEvents");
    if (user) {
      res.json({
        message: "Favourites fetched successfully",
        events: user.favEvents,
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
