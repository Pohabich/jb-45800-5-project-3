import { Request, Response, NextFunction } from "express"
import Vacation from "../../models/Vacation"


export async function getAllVacations(request: Request, response: Response, next: NextFunction) {
    try {
        const vacations = await Vacation.findAll() // TO DO: should users and likes count be added?

        response.json(vacations)
    } catch (error) {
        next(error)
    }
}

export async function getVacationById(request: Request<{ id: string }>, response: Response, next: NextFunction) {
    try {
        const id = request.params.id
        const vacation = await Vacation.findByPk(id)

        response.json(vacation)
    } catch (error) {
        next(error)
    }
}