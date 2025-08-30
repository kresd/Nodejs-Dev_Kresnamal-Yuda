import { VercelRequest, VercelResponse } from "@vercel/node";
import serverless from "serverless-http";
import app from "../src/app";

const handler = serverless(app);

export default (req: VercelRequest, res: VercelResponse) => {
  return handler(req, res);
};
