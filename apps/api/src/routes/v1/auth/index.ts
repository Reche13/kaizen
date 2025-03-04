import { Router } from "express";
import { loginRouter, loginUserSchema } from "./loginRouter";
import { logoutRouter } from "./logoutRouter";
import { signupRouter, signupUserSchema } from "./signupRouter";
import { googleRouter } from "./googleRouter";
import { validate } from "../../../middlewares/validate";
import { verifyRouter } from "./verifyRoute";

const router: Router = Router();

// LOGIN
router.post("/login", validate(loginUserSchema), loginRouter);

// SIGNUP
router.post("/signup", validate(signupUserSchema), signupRouter);

// VERIFY EMAIL
router.get("/verify", verifyRouter);

// GOOGLE LOGIN
router.get("/oauth2/google", googleRouter);

// LOGOUT
router.post("/logout", logoutRouter);

export default router;
