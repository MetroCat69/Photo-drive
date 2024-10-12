import express, { Request, Response } from "express";
import { getUvInfo } from "./routes/uvInfo";
// import { SkinType } from "./types";
import { loadEnv } from "./utils/env";

loadEnv();

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.get("/api/uvInfo", getUvInfo);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
