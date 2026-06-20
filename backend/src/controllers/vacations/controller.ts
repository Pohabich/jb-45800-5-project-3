import { Request, Response, NextFunction } from "express"
import Vacation from "../../models/Vacation"


////////////////
// Common use //
////////////////
export async function getAllVacations(request: Request, response: Response, next: NextFunction) {
    try {
        // TO DO: should users and likes count be added ?
        const vacations = await Vacation.findAll()

        response.json(vacations)
    } catch (error) {
        next(error)
    }
}

////////////////////
// ADMIN only !!! //
////////////////////
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
/** Returns vacations liked by current (authed) user*/
export async function getUserVacations(request: Request, response: Response, next: NextFunction) {
    //TODO
    //add stuff
    //getUserLikes?
}
export async function getActiveVacations(request: Request, response: Response, next: NextFunction) {
    //TODO
    //add stuff
}
export async function getFutureVacations(request: Request, response: Response, next: NextFunction) {
    //TODO
    //add stuff
}
export async function getVacationLocations(request: Request, response: Response, next: NextFunction) ) {
    //TODO
    //add stuff
}