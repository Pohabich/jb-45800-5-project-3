import { Request, Response, NextFunction } from "express"
import Like from "../../models/Like"
import { fn, col, literal, UniqueConstraintError } from 'sequelize'
import Vacation from "../../models/Vacation"


///////////////////
// USER only !!! //
///////////////////
export async function setLike(request: Request<{}, {}, { vacationId: string }>, response: Response, next: NextFunction) {
    try {
        const userId = request.userId
        const { vacationId } = request.body
        const newLike = await Like.create({ userId, vacationId })

        await newLike.reload()

        response.json(newLike)
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            next({
                status: 409,
                message: 'The logged-in user has already liked this vacation'
            });
        }
        next(error)
    }

}
export async function unLike(request: Request<{}, {}, { vacationId: string }>, response: Response, next: NextFunction) {
    try {
        const userId = request.userId
        const { vacationId } = request.body
        const numberOfDeletions = await Like.destroy({ where: { userId, vacationId } })

        if (numberOfDeletions === 0) return next({
            status: 404,
            message: 'Trying to unlike a non-existing vacation or vacation already unliked'
        })

        response.json({ succes: true })
    } catch (error) {
        next(error)
    }
}

////////////////////
// ADMIN only !!! //
////////////////////
/**
 * 
 * @param request 
 * @param response 
 * @param next 
 * @returns array of object {vacationId, likes}
 */
export async function getLikesCount(request: Request, response: Response, next: NextFunction) {
    try {
        const likes = await Vacation.findAll({
            attributes: [
                [fn('DISTINCT', col('location')), 'location'],
                [
                    literal(`COALESCE((
                            SELECT COUNT(*)
                            FROM likes l
                            WHERE l.vacation_Id = Vacation.id
                          ), 0)`
                    ),
                    'totalLikes'
                ]
            ],
            order: [['location', 'ASC']]
        })

        response.json(likes)
    } catch (error) {
        next(error)
    }
}