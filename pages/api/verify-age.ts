import type { NextApiRequest, NextApiResponse } from "next";
import { is21OrOlder } from "../../utils/age";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { dob } = req.body;

  const date = new Date(dob);

  if (!is21OrOlder(date)) {
    return res.status(403).json({
      success: false,
      message: "You must be at least 21 years old.",
    });
  }

  res.status(200).json({
    success: true,
  });
}
