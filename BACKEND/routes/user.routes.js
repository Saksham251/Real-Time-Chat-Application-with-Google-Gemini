import {Router} from "express";
import {body} from "express-validator";
import * as userController from "../controllers/user.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";

const routes = Router();

routes.post("/register",
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
    userController.createUserController
);

routes.post("/login",
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
    userController.loginController
);


routes.get("/profile",
    authMiddleware.authUser,
    userController.profileController
);
routes.get("/logout",
    authMiddleware.authUser,
    userController.logoutController
);

export default routes;