import { Router } from "express";
import { healthResponseSchema } from "../schemas/health.js";

export const healthRouter = Router();

healthRouter.get("/", (_request, response) => {
  const payload = healthResponseSchema.parse({
    status: "ok",
    service: "sourcing-api"
  });

  response.json(payload);
});
