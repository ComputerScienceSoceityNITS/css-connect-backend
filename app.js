import Express from "express";
import BodyParser from "body-parser";
import Cors from "cors";
import Helmet from "helmet";
import MongoSanitize from "express-mongo-sanitize";
import Morgan from "morgan";
import Dotenv from "dotenv";

Dotenv.config("./.env");

import * as Utils from "./utils/index.js";
import * as Middlewares from "./middlewares/index.js";
import * as Routers from "./routers/index.js";
import * as Globals from "./globals/index.js";

const app = Express();

app.use(Morgan("short"));
app.use(Express.urlencoded({ extended: true }));
app.use(BodyParser.json({ extended: true }));
app.use(
  Cors({
    credentials: true,
    origin: "*",
  })
);
app.use(Helmet());
app.use(MongoSanitize());

// Middlewares

// Routers
// app.get("/", (req, res) => {
//   res.send("Hello");
// });

// If no endpoint found
app.all("*", (req, res) => {
  return res.status(404).json(Globals.Responses.notFound);
});

app.use(Utils.Error.globalErrorHandler);

Utils.Database.connectDataBase()
  .then(() => {
    app.listen(Globals.Constants.PORT, () => {
      console.log(`Server is listening on http://localhost:${Globals.Constants.PORT}`);
    });
  })
  .catch(() => {
    console.log("Connecting to database failed");
    process.exit(1);
  });
