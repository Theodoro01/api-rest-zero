import express from "express";
import UserController from "../controllers/UserController.js";
import validateUser from "../validate/validateUser.js"

const app = express();
const routes = express.Router();

routes.get("/users", UserController.search);
routes.post("/users", validateUser.validationInsert, UserController.insert);
routes.get("/users/:_id", UserController.searchById);
routes.delete("/users/:_id", UserController.deleteById);

export default routes;