import { Router } from "express";
import { createVacation, deleteVacation, getAllVacations, getVacationById, updateVacation } from "../controllers/vacations/controller";
import paramsValidation from "../middlewares/params-validation";
import { deleteVacationValidatior, getVacationValidator, newVacationFilesValidator, newVacationValidator, updateVacationValidator } from "../controllers/vacations/validator";
import bodyValidation from "../middlewares/body-validation";
import fileUploader from "../middlewares/file-uploader";
import filesValidation from "../middlewares/files-validation";
import { getLikesCount } from "../controllers/likes/controller";
import fileUpload from 'express-fileupload'


const adminRouter = Router()
adminRouter.use('/', fileUpload()) // middelware to handle with Content-type

adminRouter.get('/vacations', getAllVacations)
adminRouter.get('/vacation/:vacationId', paramsValidation(getVacationValidator), getVacationById)
adminRouter.post('/vacation', bodyValidation(newVacationValidator), filesValidation(newVacationFilesValidator), fileUploader, createVacation)
adminRouter.patch('/vacation/:vacationId', paramsValidation(getVacationValidator), bodyValidation(updateVacationValidator), filesValidation(newVacationFilesValidator), fileUploader, updateVacation)
adminRouter.delete('/vacation/:vacationId', paramsValidation(deleteVacationValidatior), deleteVacation)

adminRouter.get('/report/chart', getLikesCount)
// adminRouter.get('report/csv',getCsv)

export default adminRouter