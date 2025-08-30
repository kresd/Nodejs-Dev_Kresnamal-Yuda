import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import { router } from "./routes/index";
import { authGuard } from "./middleware/auth";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ quiet: true });
}

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("JWT_SECRET exist?", !!process.env.JWT_SECRET);
console.log("SUPABASE_URL:", process.env.SUPABASE_URL?.slice(0, 30));


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(process.cwd(), "public")));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));


app.use(expressLayouts);
app.set("layout", "layouts/main");

app.use(authGuard);
app.use("/", router);

export default app;
