import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";

// Require an IP string in the payload
const PayloadSchema = z.object({
  ip: z.string(),
});

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  if (!req.headers["content-type"]?.includes("application/json")) {
    return res.status(415).json({ error: "Unsupported Media Type" });
  }

  try {
    const { ip } = PayloadSchema.parse(req.body);
    return res.status(200).json({ message: "Valid IP received", ip });
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error("Validation error:", err);
      return res
        .status(400)
        .json({ error: "Invalid payload", details: err.issues });
    }

    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
