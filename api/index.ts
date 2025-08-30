import { VercelRequest, VercelResponse } from '@vercel/node';
import { createServer } from 'http';
import app from 'src/app';
import { parse } from 'url';

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url!, true);
  (app as any)(req, res);
});

export default function handler(req: VercelRequest, res: VercelResponse) {
  return (app as any)(req, res);
}
