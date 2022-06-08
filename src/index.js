import express from "express";
import routes from "./routes/routes.js";
import dotenv from "dotenv/config";
import database from "./database/database.js"

database.connectToDatabase();

const app = express();

app.use(express.json());
app.use("/v1", routes);


app.route("/healthcheck").get((_, res) => res.status(200).json({ msg: "OK" }));

app.all("*", (_, res) => res.status(404).json({ message: "Not found!" }));

app.listen(process.env.PORT, () => {
    console.log("OK");
});