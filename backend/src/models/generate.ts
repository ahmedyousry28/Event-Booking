import { Event } from "./event";

const faker = require("@faker-js/faker");
const connect = require("../db/connect");

const generateRandomEvents = async () => {
  await connect();

  const eventsData = Array.from({ length: 25 }).map(() => {
    const isOnline = Math.random() < 0.3;
    return {
      name: faker.company.catchPhrase(),
      location: isOnline
        ? "Online"
        : `${faker.location.city()}, ${faker.location.country()}`,
      description: faker.lorem.paragraphs(3),
      speakers: [faker.person.fullName(), faker.person.fullName()],
      image: faker.image.urlPicsumPhotos({ width: 640, height: 480 }),
    };
  });

  const events = await Event.insertMany(eventsData);
  console.log("✅ 25 events created!");
  return events;
};

generateRandomEvents();
