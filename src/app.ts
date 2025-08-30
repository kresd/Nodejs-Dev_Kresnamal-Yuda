import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import expressLayouts from "express-ejs-layouts";
import path from "path";
// import { router } from "./routes";
// import { authGuard } from "./middleware/auth";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Public folder
app.use(express.static(path.join(process.cwd(), "public")));

// Views
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.use(expressLayouts);
app.set("layout", "layouts/main");

// Routes
// app.use(authGuard);
// app.use("/", router);
app.get("/", (req, res) => res.send("Hello from Express + Vercel!"));
app.get("/ping", (req, res) => res.send("pong"));

export default app;
