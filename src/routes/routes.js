import express from "express";
import UserController from "../controllers/UserController.js";
import validateUser from "../validate/validateUser.js";
import validateAuth from "../middlewares/auth.js";

const app = express();
const routes = express.Router();

routes.get("/users", validateAuth.auth, UserController.search);
routes.get("/users/:_id", validateAuth.auth, UserController.searchById);
routes.post("/users", validateUser.validationInsert, UserController.insert);
routes.post("/login", UserController.login);
routes.delete("/users/:_id", validateAuth.auth, UserController.deleteById);
routes.put("/users/:_id", validateAuth.auth, UserController.updateById);

export default routes;