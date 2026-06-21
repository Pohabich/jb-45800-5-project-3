import { Request, Response, NextFunction } from "express"
import Vacation from "../../models/Vacation"
import Like from "../../models/Like"


////////////////
// Common use //
////////////////
export async function getAllVacations(request: Request, response: Response, next: NextFunction) {
    try {
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
        const { id } = request.params
        const vacation = await Vacation.findByPk(id)

        response.json(vacation)
    } catch (error) {
        next(error)
    }
}
export async function createVacation(request: Request<{}, {}, { location: string, description: string, startDate: Date, endDate: Date, price: number }>, response: Response, next: NextFunction) {
    try {
        const { imageUrl } = request
        const newVacation = await Vacation.create({
            ...request.body,
            imageUrl
        })

        await newVacation.reload({
            include: [Like]
        })

        response.json(newVacation)

        // io
        /*
        const clientId = request.header('x-client-id')
        
                socket.emit(SocketMessages.NEW_VACATION, {
                    clientId,
                    vacation: newVacation, 
                })
        */
    } catch (error) {
        next(error)
    }
}
export async function updateVacation(request: Request<{ id: string, imageUrl?: string }, {}, { location: string, description: string, startDate: Date, endDate: Date, price: number }>, response: Response, next: NextFunction) {
    try {
        const { id, imageUrl } = request.params
        const { location, description, startDate, endDate, price } = request.body
        const updateVacation = await Vacation.findByPk(id, {
            include: [Like]
        })

        updateVacation.location = location
        updateVacation.description = description
        updateVacation.startDate = startDate
        updateVacation.endDate = endDate
        updateVacation.price = price
        if (imageUrl) updateVacation.imageUrl = imageUrl

        response.json(updateVacation)

        // io
        /*
        const clientId = request.header('x-client-id')
        
                socket.emit(SocketMessages.NEW_VACATION, {
                    clientId,
                    vacation: updateVacation, 
                })
        */
    } catch (error) {
        next(error)
    }
}
export async function deleteVacation(request: Request<{ id: string }>, response: Response, next: NextFunction) {
    try {
        const { id } = request.params
        const numberOfDeletions = await Vacation.destroy({ where: { id } })

        if (numberOfDeletions === 0) return next({
            status: 404,
            message: 'Trying to delete an non-existing vacation'
        })

        response.json({ succes: true })

        // io
        /*
        const clientId = request.header('x-client-id')
        
                socket.emit(SocketMessages.DELETE_VACATION, {
                    clientId,
                    vacation: id, 
                })
        */
    } catch (error) {
        next(error)
    }
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
export async function getVacationLocations(request: Request, response: Response, next: NextFunction) {
    //TODO
    //add stuff
}