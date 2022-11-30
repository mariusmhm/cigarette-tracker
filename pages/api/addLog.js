import { createLog } from "../../utils/Fauna";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    const log = await createLog();
    return res.status(200).json(log);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong." });
  }
}
