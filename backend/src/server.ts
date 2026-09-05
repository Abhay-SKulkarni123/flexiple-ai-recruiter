import express from "express";
import { healthRouter } from "./api/health.js";

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(express.json());
app.use("/api/health", healthRouter);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
