import express, { Request, Response } from "express";
import connect from "./db/connect";
import Routes from "./routes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", Routes);
app.get("/", (req, res) => {
  res.send("Server running");
});
connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error: any) => {
    console.error("Failed to start server:", error);
  });
