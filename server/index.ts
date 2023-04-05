import express, { Request, Response } from "express";
import cors from "cors";
import { SubmitTextProps } from "./types";

const port = process.env.PORT || 3001;
const MIN_IN_MS = 60 * 1000;

const app = express();

app.use(express.json());
app.use(cors());

const sendCurrentTime = (res: Response) => {
  // get the current time and format as HH:MM
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  res.write(`data: ${JSON.stringify({ time })}`);
  res.write("\n\n");
};

/**
 * Response with uppercase of text sent by request
 */
app.post("/submit-text", (req: Request, res: Response) => {
  const { text }: SubmitTextProps = req.body;

  if (text == null || typeof text !== "string") {
    res.status(400).send("text must be a string");
  }

  res.status(200).send(text.toUpperCase());
});

/**
 * Send current time to client every minute
 */
app.get("/current-time", (_req: Request, res: Response) => {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });

  // send initial time on connection
  sendCurrentTime(res);

  // send time every minute
  setInterval(() => {
    sendCurrentTime(res);
  }, MIN_IN_MS);
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
