import type { NextFunction, Request, Response } from "express";
import { UniqueConstraintError } from 'sequelize';
import config from "config"
import { createHmac } from "crypto";
import { sign } from "jsonwebtoken";
import User from "../../models/User"


function hashPassword(plainTextPassword: string): string {
    const key = config.get<string>('app.encryptionKey')
    return createHmac('sha256', key).update(plainTextPassword).digest('hex')
}
/**
 * Generates a JWT token for the given user.
 * @param user - The user object for which to generate the JWT.
 * @returns A signed JWT token as a string.
 */
function generateJwt(user: User): string {
    const payload = user.get({ plain: true })
    const key = config.get<string>('app.encryptionKey')
    return sign(payload, key)
}

export async function login(request: Request<{}, {}, { email: string, password: string }>, response: Response, next: NextFunction) {
    try {
        const { email, password } = request.body

        const user = await User.findOne({
            where: {
                email,
                password: hashPassword(password)
            }
        })

        if (!user) return next({
            status: 401,
            message: 'wrong credentials'
        })

        const jwt = generateJwt(user)

        response.json({ jwt })

    } catch (e) {
        next(e)
    }
}

export async function signup(request: Request<{}, {}, { id: string, firstName: String, lastName: string, email: string, password: string, role: string }>, response: Response, next: NextFunction) {
    try {
        // hash and salt the password
        request.body.password = hashPassword(request.body.password)

        // save the user in database with hashed and salted password
        const newUser = await User.create(request.body)

        // generate jwt from the user record
        const jwt = generateJwt(newUser)

        response.json({ jwt })
    } catch (e) {
        if (e instanceof UniqueConstraintError) {
            next({
                status: 409,
                message: 'The email is already in use'
            });
        }

        next(e)
    }
}