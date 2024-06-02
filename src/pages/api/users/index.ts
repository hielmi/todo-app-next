import { retriveData } from "@/lib/firebase/services";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const users = await retriveData("users");
    console.log(users);
    res.status(200).json(users);
  }
}
