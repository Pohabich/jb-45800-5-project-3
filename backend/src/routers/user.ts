import { Router } from "express";
import { getActiveVacations, getAllVacationsPaginated, getFutureVacations, getUserVacations, getVacationsLocation } from "../controllers/vacations/controller";
import { getVacationsValidator } from "../controllers/vacations/validator";
import paramsValidation from "../middlewares/params-validation";
import { setLikeValidator, unLikeValidator } from "../controllers/likes/validator";
import { setLike, unLike } from "../controllers/likes/controller";
import bodyValidation from "../middlewares/body-validation";


const userRouter = Router()

// Likes
userRouter.post('/vacation/like', bodyValidation(setLikeValidator), setLike)
userRouter.delete('/vacation/unlike', bodyValidation(unLikeValidator), unLike)

// Vacation filters
//TODO: add middelware to extract page and limit values
userRouter.get('/vacations/favorite/:page/:limit', paramsValidation(getVacationsValidator), getUserVacations)
userRouter.get('/vacations/present/:page/:limit', paramsValidation(getVacationsValidator), getActiveVacations)
userRouter.get('/vacations/future/:page/:limit', paramsValidation(getVacationsValidator), getFutureVacations)
userRouter.get('/vacations/:page/:limit', paramsValidation(getVacationsValidator), getAllVacationsPaginated)

// AI
userRouter.get('/vacations/locations', getVacationsLocation)
// see aiRouter for get data

// MCP
// separated part

export default userRouter