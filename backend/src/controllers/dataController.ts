import { Request, Response } from "express";
const { faker } = require("@faker-js/faker");
import { Event } from "../models/event";
export const generateMockData = async (req: Request, res: Response) => {
  try {
    const count = req.query.count || 25;
    const eventsData = Array.from({ length: Number(count) }).map(() => {
      const isOnline = Math.random() < 0.3;
      return {
        name: faker.company.catchPhrase(),
        location: isOnline
          ? "Online"
          : `${faker.location.city()}, ${faker.location.country()}`,
        description: faker.lorem.paragraphs(3),
        speakers: [faker.person.fullName(), faker.person.fullName()],
        image: faker.image.urlPicsumPhotos({
          blur: 0,
          width: 300,
          height: 200,
        }),
      };
    });
    const events = await Event.insertMany(eventsData);
    res.json({ message: "events created!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
