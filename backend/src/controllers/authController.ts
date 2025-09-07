import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/token";
export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: "This email address is already registered!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const accessToken = generateAccessToken(user._id as string);
    return res.status(201).json({
      message: "Signed up successfully",
      accessToken,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        favEvents: user.favEvents,
        regEvents: user.regEvents,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }
    const accessToken = generateAccessToken(user._id as string);
    res.json({
      message: "Logged in successfully",
      accessToken,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        favEvents: user.favEvents,
        regEvents: user.regEvents,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
