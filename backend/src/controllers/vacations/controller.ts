import { Request, Response, NextFunction } from "express"
import Vacation from "../../models/Vacation"
import Like from "../../models/Like"
import { VacationTimeFilter } from "../enums"
import { getVacationsPaginatedHelper } from "../helpers"
import { fn, col } from 'sequelize'


////////////////////
// ADMIN only !!! //
////////////////////
export async function getAllVacations(request: Request, response: Response, next: NextFunction) {
    try {
        const vacations = await Vacation.findAll({ order: [['startDate', 'ASC']] })

        response.json(vacations)
    } catch (error) {
        next(error)
    }
}

export async function getVacationById(request: Request<{ vacationId: string }>, response: Response, next: NextFunction) {
    try {
        const { vacationId } = request.params
        const vacation = await Vacation.findByPk(vacationId)

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
export async function updateVacation(request: Request<{ vacationId: string, imageUrl?: string }, {}, { location: string, description: string, startDate: Date, endDate: Date, price: number }>, response: Response, next: NextFunction) {
    try {
        const { vacationId, imageUrl } = request.params
        const { location, description, startDate, endDate, price } = request.body
        const updateVacation = await Vacation.findByPk(vacationId, {
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
export async function deleteVacation(request: Request<{ vacationId: string }>, response: Response, next: NextFunction) {
    try {
        const { vacationId } = request.params
        const numberOfDeletions = await Vacation.destroy({ where: { vacationId } })

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
                    vacation: vacationId, 
                })
        */
    } catch (error) {
        next(error)
    }
}

///////////////////
// USER only !!! //
///////////////////
export async function getAllVacationsPaginated(request: Request<{ page: string, limit?: string }>, response: Response, next: NextFunction) {
    try {
        const { page, limit } = request.params
        const vacations = await getVacationsPaginatedHelper({
            currentUserId: request.userId,
            page,
            limit
        })
        response.json(vacations)
    } catch (error) {
        next(error)
    }
}
/** Returns vacations liked by current (authed) user*/
export async function getUserVacations(request: Request<{ page: string, limit?: string }>, response: Response, next: NextFunction) {
    try {
        const { page, limit } = request.params
        const vacations = await getVacationsPaginatedHelper({
            currentUserId: request.userId,
            onlyLikedByUser: true,
            page,
            limit
        })

        response.json(vacations)
    } catch (error) {
        next(error)
    }
}
export async function getActiveVacations(request: Request<{ page: string, limit?: string }>, response: Response, next: NextFunction) {
    try {
        const { page, limit } = request.params
        const vacations = await getVacationsPaginatedHelper({
            currentUserId: request.userId,
            timeFilter: VacationTimeFilter.Ongoing,
            page,
            limit
        })

        response.json(vacations)
    } catch (error) {
        next(error)
    }
}
export async function getFutureVacations(request: Request<{ page: string, limit?: string }>, response: Response, next: NextFunction) {
    try {
        const { page, limit } = request.params
        const vacations = await getVacationsPaginatedHelper({
            currentUserId: request.userId,
            timeFilter: VacationTimeFilter.Upcoming,
            page,
            limit
        })

        response.json(vacations)
    } catch (error) {
        next(error)
    }
}
export async function getVacationsLocation(request: Request, response: Response, next: NextFunction) {
    try {
        const result = await Vacation.findAll({
            attributes: [
                [fn('DISTINCT', fn('TRIM', col('location'))), 'location']
            ],
            raw: true,
            order: [['location', 'ASC']]
        })

        const locations = (result as unknown as { location: string }[]).map(item => item.location);

        response.json(locations)
    } catch (error) {
        next(error)
    }
}