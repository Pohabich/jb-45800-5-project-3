import { Request, Response, NextFunction } from "express"
import Like from "../../models/Like"
import { fn, col } from 'sequelize'


///////////////////
// USER only !!! //
///////////////////
export async function setLike(request: Request<{}, {}, { userId: string, vacationId: string }>, response: Response, next: NextFunction) {
    try {
        const newLike = await Like.create({ ...request.body })

        await newLike.reload()

        response.json(newLike)
    } catch (error) {
        next(error)
    }

}
export async function unLike(request: Request<{}, {}, { userId: string, vacationId: string }>, response: Response, next: NextFunction) {
    try {
        const { userId, vacationId } = request.body

        const numberOfDeletions = await Like.destroy({ where: { userId, vacationId } })

        if (numberOfDeletions === 0) return next({
            status: 404,
            message: 'Trying to unlike an non-existing vacation or vactaion already unliked'
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
 * @returns array of objects {vacationId, likes}
 */
export async function getLikesCount(request: Request, response: Response, next: NextFunction) {
    try {
        const likes = await Like.findAll({
            attributes: [
                'vacationId',
                [fn('COUNT', col('user_id')), 'likes']
            ],
            group: ['vacationId'],
            raw: true
        })

        return likes
    } catch (error) {
        next(error)
    }
}