import { Router } from 'express'
import { AuthController } from '../controller/authController';
import {requireSuperadmin, validate} from "../middlewares/validate";
import {
    signUpValidationSchema,
    logInValidationSchema,
    logOutValidationSchema,
    refreshTokenValidationSchema
} from "../validations/schemas/auth";

const authRouter = Router()
const controller = new AuthController()

authRouter.post('/signup',validate(signUpValidationSchema), controller.signup);
authRouter.post('/signin', validate(logInValidationSchema),controller.signin);
authRouter.get("/users",controller.getAllUsers);
authRouter.post('/signout', validate(logOutValidationSchema), controller.signout)
authRouter.post('/create-admin', validate(signUpValidationSchema), controller.createAdmin);

// authRouter.post(
//     "/refresh-token",
//     validate(refreshTokenValidationSchema),
//     controller.refreshToken
//   );

export { authRouter }