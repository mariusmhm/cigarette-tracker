import { getLogs } from "../../utils/Fauna";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const logs = await getLogs();
    return res.status(200).json(logs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong." });
  }
}
