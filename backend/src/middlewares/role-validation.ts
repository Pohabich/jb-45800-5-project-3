import { Roles } from "@tab761/role-enums"
import { Request, Response, NextFunction } from "express"


export function adminValidation(request: Request, response: Response, next: NextFunction) {
  if (request.userRole !== Roles.ADMIN) return next({
    status: 403,
    message: 'Access Denied'
  })

  next()
}

export function userValidation(request: Request, response: Response, next: NextFunction) {
  if (request.userRole !== Roles.USER) return next({
    status: 403,
    message: 'Access Denied'
  })

  next()
}