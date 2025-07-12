import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  const response = await fetch("https://api.vercel.app/products");
  const products = await response.json();
  res.status(200).json(products);
}
