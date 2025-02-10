import { Router } from "express";
import { loginRouter } from "./loginRouter";
import { logoutRouter } from "./logoutRouter";
import { signupRouter } from "./signupRouter";
import { googleRouter } from "./googleRouter";

const router: Router = Router();

// LOGIN
router.get("/login", loginRouter);

// SIGNUP
router.get("/signup", signupRouter);

// GOOGLE LOGIN
router.get("/oauth2/google", googleRouter);

// LOGOUT+
router.get("/logout", logoutRouter);

export default router;
