import express, { json } from 'express'
import logError from './middlewares/error/log-error'
import config from 'config'
import respondError from './middlewares/error/error-responder'
import notFound from './middlewares/not-found'
import cors from 'cors'
import sequelize from './db/sequelize'
import authRouter from './routers/auth'
import authEnforce from './middlewares/auth-enforce'
import { adminValidation, userValidation } from './middlewares/role-validation'
import adminRouter from './routers/admin'
import userRouter from './routers/user'
import { createAppBucketsIfNotExist } from './aws/aws'


(async () => {
    const port = config.get<number>('app.port')
    const name = config.get<string>('app.name')
    const app = express()

    // middlewares
    app.use('/', cors())
    app.use('/', json())
    app.use('/auth', authRouter)
    app.use('/', authEnforce)

    app.use('/api/user', userValidation, userRouter)
    app.use('/api/admin', adminValidation, adminRouter)

    app.use('/', notFound)

    // error middlewares
    app.use('/', logError)
    app.use('/', respondError)

    // sync database
    await sequelize.sync({ force: !!config.get('app.sync.force') })

    // create S3 bucket
    await createAppBucketsIfNotExist()

    // starting the server
    app.listen(port, () => console.log(`app ${name} started on port ${port}....`))
})()
