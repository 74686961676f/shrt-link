import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { createServer as createViteServer } from "vite";

const database: Record<string, string> = {};

const formatUrl = (url: string): string => {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

const start = async () => {
  const app = express();

  app.use(express.json());

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });

  app.post("/api/shorten", (req: Request, res: Response) => {
    const { longUrl } = req.body;
    if (!longUrl) return res.status(400).json({ error: "URL required" });

    const normalizedUrl = formatUrl(longUrl);
    const existingCode = Object.keys(database).find(
      (key) => database[key] === normalizedUrl
    );

    if (existingCode) {
      return res.json({ shortCode: existingCode });
    }

    const shortCode = Math.random().toString(36).substring(2, 7);
    database[shortCode] = normalizedUrl;

    return res.json({ shortCode });
  });

  app.get("/:code", (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.params;
    //@ts-ignore
    const destination = database[code];
    console.log(destination,code)
    if (destination) return res.redirect(302, destination);
    next();
  });

  app.use(vite.middlewares);

  app.listen(5173, () => {
    console.log("Server running at localhost:5173");
  });
};

start();
