import "dotenv/config";
import express from "express";
import { healthRouter } from "./api/health.js";
import { searchRouter } from "./api/search.js";

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(express.json());
app.use("/api/health", healthRouter);
app.use("/api/search", searchRouter);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
