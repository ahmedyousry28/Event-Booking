import { Request, Response } from "express";
import { Event } from "../models/event";
import User from "../models/user";
import mongoose from "mongoose";

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.json({ message: "Events fetched successfully", events });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getClosingSoonEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find({
      $and: [
        { availableSpots: { $gt: 0, $lte: 15 } },
        { date: { $gt: new Date() } },
      ],
    });
    res.json({ message: "Events fetched successfully", events });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getCompletedEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find({
      $and: [{ availableSpots: { $eq: 0 } }, { date: { $gt: new Date() } }],
    });
    res.json({ message: "Events fetched successfully", events });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const registerEvent = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const registeredEvent = await User.findOne({
      _id: userId,
      regEvents: req.params.id,
    });

    if (registeredEvent) {
      await User.findByIdAndUpdate(userId, {
        $pull: { regEvents: req.params.id },
      });
      await Event.findByIdAndUpdate(req.params.id, {
        $inc: { availableSpots: 1 },
      });
      return res.sendStatus(204);
    } else {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { regEvents: req.params.id },
      });
      await Event.findByIdAndUpdate(req.params.id, {
        $inc: { availableSpots: -1 },
      });
      return res.status(200).json({ message: "Event registered successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const favouriteEvent = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const favourite = await User.findOne({
      _id: userId,
      favEvents: req.params.id,
    });

    if (favourite) {
      await User.findByIdAndUpdate(userId, {
        $pull: { favEvents: req.params.id },
      });
      return res.sendStatus(204);
    } else {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { favEvents: req.params.id },
      });
      return res.status(200).json({ message: "Event added to favourites" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const CheckEvent = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(200).json({ eventExists: false, favExists: false });
    }
    const eventId = new mongoose.Types.ObjectId(req.params.id);
    const eventExists = user.regEvents.includes(eventId);
    const favExists = user.favEvents.includes(eventId);
    return res.status(200).json({ eventExists, favExists });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
