import { Router } from "express";
import { loginRouter, loginUserSchema } from "./loginRouter";
import { logoutRouter } from "./logoutRouter";
import { signupRouter, signupUserSchema } from "./signupRouter";
import { googleRouter } from "./googleRouter";
import { validate } from "../../../middlewares/validate";

const router: Router = Router();

// LOGIN
router.post("/login", validate(loginUserSchema), loginRouter);

// SIGNUP
router.post("/signup", validate(signupUserSchema), signupRouter);

// GOOGLE LOGIN
router.get("/oauth2/google", googleRouter);

// LOGOUT+
router.get("/logout", logoutRouter);

export default router;
