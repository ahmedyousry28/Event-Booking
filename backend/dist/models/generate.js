"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
const faker = require("@faker-js/faker");
const connect = require("../db/connect");
const generateRandomEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    yield connect();
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
    const events = yield event_1.Event.insertMany(eventsData);
    console.log("✅ 25 events created!");
    return events;
});
generateRandomEvents();
