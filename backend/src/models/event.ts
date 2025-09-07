import mongoose, { Schema, Document } from "mongoose";
export interface IEvent extends Document {
  id: string;
  name: string;
  date: Date;
  time: string; // "HH:mm" format
  location: string;
  description: string;
  speakers: string[];
  price: number;
  image: string;
  capacity: number;
  availableSpots: number;
}

const eventSchema = new Schema(
  {
    name: { type: String, required: true },
    date: {
      type: Date,
      required: true,
      default: () => {
        const today = new Date();
        const randomDays = Math.floor(Math.random() * 60);
        today.setDate(today.getDate() + randomDays);
        return today;
      },
    },
    time: {
      type: String,
      required: true,
      default: () => {
        const hour = Math.floor(Math.random() * (21 - 9 + 1)) + 9;
        const minute = Math.random() < 0.5 ? "00" : "30";
        return `${hour.toString().padStart(2, "0")}:${minute}`;
      },
    },
    location: { type: String, required: true },
    description: { type: String, required: true },
    speakers: [{ type: String }],
    price: {
      type: Number,
      required: true,
      default: () => Math.floor(Math.random() * 800),
    },
    image: { type: String, required: true },
    capacity: {
      type: Number,
      required: true,
      default: () => Math.floor(Math.random() * (250 - 70 + 1)) + 70,
    },
    availableSpots: {
      type: Number,
      required: true,
      default: () => Math.floor(Math.random() * 60),
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model<IEvent>("Event", eventSchema);
