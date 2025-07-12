import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";

// Define a schema for the expected override payload
const OverrideSchema = z.object({
  ip: z.string().optional(), // IP string validation can be done separately if needed
});

// Infer the TypeScript type from the Zod schema
type OverridePayload = z.infer<typeof OverrideSchema>;

// Define the shape of the fraud result
export type FraudResult = {
  fraudFlags: string[];
  riskScoreAdjustment: number;
  signals: {
    ipMismatch: boolean;
  };
};

/**
 * Simulate only IP mismatch fraud check.
 * If an override IP is provided, assume no mismatch.
 * Otherwise, randomly decide mismatch with a 10% chance.
 */
function simulateIpMismatch(overrideIp?: string): FraudResult {
  const ipMismatch = overrideIp ? false : Math.random() < 0.1; // 10% random mismatch

  const fraudFlags = ipMismatch ? ["IP_ADDRESS_MISMATCH"] : [];
  const riskScoreAdjustment = ipMismatch ? 15 : 0;

  return {
    fraudFlags,
    riskScoreAdjustment,
    signals: { ipMismatch },
  };
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Ensure JSON content type
  if (!req.headers["content-type"]?.includes("application/json")) {
    return res.status(415).json({ error: "Unsupported Media Type" });
  }

  try {
    // Parse and validate request body
    const parsedBody: OverridePayload = OverrideSchema.parse(req.body ?? {});
    const { ip } = parsedBody;

    // Run the IP mismatch simulation
    const result = simulateIpMismatch(ip);

    return res.status(200).json(result);
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Validation error
      return res
        .status(400)
        .json({ error: "Invalid payload", details: err.issues });
    }
    // Unexpected error
    console.error("Simulation error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
