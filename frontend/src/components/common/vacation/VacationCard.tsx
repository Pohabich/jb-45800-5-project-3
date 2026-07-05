import type { PropsWithChildren } from "react"
import { displayDate } from "../../../utils/dates"
import "./VacationCard.css"


interface VacationCardProps extends PropsWithChildren {
    id: string
    location: string
    description: string
    startDate: Date | string
    endDate: Date | string
    price: number
    imageUrl: string
}

export default function VacationCard(props: VacationCardProps) {
    const { location, description, startDate, endDate, price, imageUrl, children } = props
    return (
        <div className="VacationCard">
            <div className="vacation-image" style={{ backgroundImage: `url(${imageUrl})` }}>
                {children}
                <h2 className="location">{location}</h2>
            </div>

            <div className="dates">
                    📅 {displayDate(startDate)} - {displayDate(endDate)}
            </div>

            <div className="description">
                {description}
            </div>

            <button className="price-button">
                ${price.toFixed(0)}
            </button>
        </div>
    )
}