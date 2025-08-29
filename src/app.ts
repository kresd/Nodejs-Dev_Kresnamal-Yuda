import express from "express";
import bodyParser from "body-parser";
import path from "path";
import sequelize from "./config/database";
import routes from "./routes";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
});