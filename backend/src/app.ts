import express, { json } from 'express'
import logError from './middlewares/error/log-error'
import config from 'config'
import respondError from './middlewares/error/error-responder'
import notFound from './middlewares/not-found'
import cors from 'cors'
import sequelize from './db/sequelize'
import authRouter from './routers/auth'
import authEnforce from './middlewares/auth-enforce'


(async () => {
    const port = config.get<number>('app.port')
    const name = config.get<string>('app.name')
    const app = express()

    // middlewares
    app.use('/', cors())
    app.use('/', json())
    app.use('/auth', authRouter)
    app.use('/', authEnforce)

    /*
    Next 2 MWs are only needed for vacation add/edit route (admin-mode)
     so move them to (when the route will be implemented) !!!
     */
    // app.use('/', json())

    /*
    Each of next routers should use one of the role-validation validation !!!
    */

    app.use('/', notFound)

    // error middlewares
    app.use('/', logError)
    app.use('/', respondError)

    // sync database
    await sequelize.sync({ force: !!config.get('app.sync.force') })

    // create S3 bucket
    //await createAppBucketsIfNotExist()

    // starting the server
    app.listen(port, () => console.log(`app ${name} started on port ${port}....`))
})()
