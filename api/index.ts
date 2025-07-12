import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  const response = {
    ok: true,
  };
  res.status(200).json(response);
}
