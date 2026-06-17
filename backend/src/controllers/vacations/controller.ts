import { Request, Response, NextFunction } from "express"
import Vacation from "../../models/Vacation"
import { Roles } from "@tab761/role-enums"


////////////////
// Common use //
////////////////
export async function getAllVacations(request: Request, response: Response, next: NextFunction) {
    try {
        const vacations = await Vacation.findAll() // TO DO: should users and likes count be added?

        response.json(vacations)
    } catch (error) {
        next(error)
    }
}

////////////////////
// ADMIN only !!! //
////////////////////
/*
// Should be a middleware of validation
  if (request.userRole !== Roles.ADMIN) {
            return next({403,'Access Denied'});
        }
 */
export async function getVacationById(request: Request<{ id: string }>, response: Response, next: NextFunction) {
    try {
        const id = request.params.id
        const vacation = await Vacation.findByPk(id)

        response.json(vacation)
    } catch (error) {
        next(error)
    }
}
export async function newVacation(request: Request<{}, {}, { id: string, title: string, description: string, startDate: Date, endDate: Date, price: number, imageUrl: string }>, response: Response, next: NextFunction) {
    try {
        const vacation = {}
        //TODO
        //add stuff

        response.json(vacation)
    } catch (error) {
        next(error)
    }
}
export async function updateVacation(request: Request<{ id: string }, {}, { id: string, title: string, description: string, startDate: Date, endDate: Date, price: number, imageUrl: string }>, response: Response, next: NextFunction) {
    try {
        const id = request.params.id
        const vacation = await Vacation.findByPk(id)
        //TODO
        //add stuff

        response.json(vacation)
    } catch (error) {
        next(error)
    }
}
export async function deleteVacation(request: Request<{ id: string }>, response: Response, next: NextFunction) {
    //TODO
    //add stuff
}

///////////////////
// USER only !!! //
///////////////////
/*
// Should be a middleware of validation
  if (request.userRole !== Roles.USER) {
            return next({403,'Access Denied'});
        }
 */

/** Returns vacations liked by current (authed) user*/
export async function getUserVacations(request: Request, response: Response, next: NextFunction) {
    //TODO
    //add stuff
}
export async function getActiveVacations(request: Request, response: Response, next: NextFunction) {
    //TODO
    //add stuff
} export async function getFutureVacations(request: Request, response: Response, next: NextFunction) {
    //TODO
    //add stuff
}