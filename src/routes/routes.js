import express from "express";
import UserController from "../controllers/UserController.js";
import validateUser from "../validate/validateUser.js";
import validateAuth from "../middlewares/auth.js";
import validateRoutes from "../middlewares/validateRoutes.js"
const routes = express.Router();

routes.get(
    "/users",
    validateAuth.auth,
    UserController.search
);
routes.get(
    "/users/:_id",
    validateAuth.auth,
    UserController.searchById
);
routes.post(
    "/users",
    validateRoutes.validateRouteUsers(),
    validateRoutes.validateResultUsers,
    validateUser.validationInsert,
    UserController.insert
);
routes.post(
    "/login",
    validateRoutes.validateRouteLogin(),
    validateRoutes.validateResultLogin,
    UserController.login
);
routes.delete(
    "/users/:_id",
    validateAuth.auth,
    UserController.deleteById
);
routes.put(
    "/users/:_id",
    validateAuth.auth,
    UserController.updateById
);

export default routes;