import "./Vacations.css"
import { useEffect, useState } from "react"
import useService from "../../../../hooks/use-service"
import type Vacation from "../../../../models/Vacation"
import { showErrorToast } from "../../../common/show-error-toast"
import VacationCard from "../../../common/vacation/VacationCard"
import { useNavigate } from "react-router-dom"
import Crud from "../../../common/crud-panel/Crud"
import VacationsService from "../../../../services/auth-aware/admin-only/Vacations"


export default function Vacations() {
    const vacationsService = useService(VacationsService)
    const [vacations, setVacations] = useState<Vacation[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleDeleteVacation = (vacationId: string) => {
        if (!confirm("Are you sure you want to delete this vacation?")) {
            showErrorToast("Vacation deletion canceled")
            return
        }
        try {
            vacationsService.deleteVacation(vacationId)
            setVacations(vacations.filter(vacation => vacation.vacationId !== vacationId))
        } catch (error) {
            console.error("Error deleting vacation:", error)
            showErrorToast("Failed to delete vacation")
        }
    }

    useEffect(() => {
        const fetchVacations = async () => {
            try {
                setLoading(true)
                const data = await vacationsService.getAllVacations()
                setVacations(data)
            } catch (error) {
                console.error("Error fetching vacations:", error)
                showErrorToast('Failed to load vacations')
            } finally {
                setLoading(false)
            }
        }

        fetchVacations()
    }, [])

    return (
        <div className="Vacations">
            <div className="top-panel">
                <button onClick={() => navigate("/vacations/add")}>Add Vacation</button>
            </div>
            {loading ? (
                <div className="loader">Loading data...</div>
            ) : vacations.length === 0 ? (
                <div className="empty-state">No vacations found</div>
            ) : (
                <div className="vacations-container">
                    {vacations.map((item) => (
                        <VacationCard
                            key={item.vacationId}
                            id={item.vacationId}
                            location={item.location}
                            imageUrl={item.image}
                            startDate={item.startDate}
                            endDate={item.endDate}
                            description={item.description}
                            price={item.price}
                        >
                            <Crud onDelete={() => handleDeleteVacation(item.vacationId)}
                                onEdit={() => navigate(`/vacations/edit/${item.vacationId}`)} />
                        </VacationCard>
                    ))}
                </div>
            )}
        </div>
    )
}