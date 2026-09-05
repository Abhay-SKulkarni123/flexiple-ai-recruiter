import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { profileSchema } from "../schemas/profile.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const profiles = JSON.parse(
  readFileSync(join(__dirname, "../../data/profiles.json"), "utf-8")
);

export const candidates: ReturnType<typeof profileSchema.parse>[] = profiles.map((p: unknown) =>
  profileSchema.parse(p)
);