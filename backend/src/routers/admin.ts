import { json, Router } from "express";
import { adminValidation } from "../middlewares/role-validation";
import fileUpload from "express-fileupload";
import { createVacation, deleteVacation, getAllVacations, getVacationById, updateVacation } from "../controllers/vacations/controller";
import paramsValidation from "../middlewares/params-validation";
import { deleteVacationValidatior, getVacationValidator, newVacationFilesValidator, newVacationValidator, updateVacationValidator } from "../controllers/vacations/validator";
import bodyValidation from "../middlewares/body-validation";
import fileUploader from "../middlewares/file-uploader";
import filesValidation from "../middlewares/files-validation";
import { getLikesCount } from "../controllers/likes/controller";


const adminRouter = Router()

adminRouter.use('/', json)
adminRouter.use('/', adminValidation)
adminRouter.use('/', fileUpload())

adminRouter.get('/vacations', getAllVacations)
adminRouter.get('/vacation/:id', paramsValidation(getVacationValidator), getVacationById)
adminRouter.post('/vacation', bodyValidation(newVacationValidator), filesValidation(newVacationFilesValidator), fileUploader, createVacation)
adminRouter.patch('/vacation/:id', paramsValidation(getVacationValidator), bodyValidation(updateVacationValidator), filesValidation(newVacationFilesValidator), fileUploader, updateVacation)
adminRouter.delete('/vacation/:id', paramsValidation(deleteVacationValidatior), deleteVacation)

adminRouter.get('/report/chart', getLikesCount)
// adminRouter.get('report/csv',getCsv)

export default adminRouter