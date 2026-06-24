import type { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from 'config'
import User from "../models/User";


declare global {
    namespace Express {
        interface Request {
            userId: string,
            userRole: string
        }
    }
}

export default function authEnforce(request: Request, response: Response, next: NextFunction) {
    // this middleware objective are:
    // extract the jwt from the headers
    // realize from the jwt who is the user
    // get their userId, and load it on the request
    // so any middleware that runs after me, 
    // can access the userId using request.userId
    const authHeader = request.get('Authorization')

    if (!authHeader) return next({
        status: 401,
        message: 'Auth header is missing!'
    })

    if (!authHeader.startsWith('Bearer')) return next({
        status: 401,
        message: 'Probably the wrong auth mechanism is used'
    })

    const [bearerWord, jwt] = authHeader.split(' ')

    if (!jwt) return next({
        status: 401,
        message: 'Can not extract a jwt token from auth header'
    })

    const key = config.get<string>('app.encryptionKey')
    const { id, role } = verify(jwt, key) as User

    request.userId = id
    request.userRole = role

    next()
}