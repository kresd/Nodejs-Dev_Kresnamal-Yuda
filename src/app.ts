import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import expressLayouts from "express-ejs-layouts";
import { router } from "@routes/index";
import { authGuard } from "@middleware/auth";
import path from "path";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../public')));

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.set('views', path.join(__dirname, '../views'));


app.use(expressLayouts);
app.set("layout", "layouts/main"); 

app.use(authGuard);
app.use("/", router);

export default app;
