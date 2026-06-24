import { Router } from "express";
import bodyValidation from "../middlewares/body-validation";
import { loginValidator, signupValidator } from "../controllers/auth/validator";
import { login, signup } from "../controllers/auth/controller";


const authRouter = Router()

authRouter.post('/signup', bodyValidation(signupValidator), signup)
authRouter.post('/login', bodyValidation(loginValidator), login)

export default authRouter