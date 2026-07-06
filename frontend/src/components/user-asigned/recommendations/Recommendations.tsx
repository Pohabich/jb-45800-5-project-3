import { useEffect, useState } from "react"
import "./Recommendations.css"
import Recommendation from "../../common/recommendation/Recommendation"
import useService from "../../../hooks/use-service"
import RecommendationService from "../../../services/auth-aware/users/Recommendation"
import { showErrorToast } from "../../common/show-error-toast"
import type RecommendationResponse from "../../../models/RecommendationResponse"


export default function Recommendtions() {
    const [locations, setLocations] = useState<string[]>([])
    const [selectedLocation, setSelectedLocation] = useState<string>("")
    const [previousLocation, setPreviousLocation] = useState<string>("")
    const [recommendation, setRecommendation] = useState<RecommendationResponse>(null as unknown as RecommendationResponse)
    const [loading, setLoading] = useState<boolean>(false)
    const recommendationService = useService(RecommendationService)

    useEffect(() => {
        async function fetchLocations() {
            const locations = await recommendationService.getLocations()
            setLocations(locations)
        }
        fetchLocations()
    }, [])

    async function getRecommendation() {
        if (!selectedLocation)
            return showErrorToast("Please select a location first!")
        if (selectedLocation === previousLocation)
            return showErrorToast("You have already fetched recommendation for this location.\nPlease select a different location.")

        try {
            setLoading(true)
            const response = await recommendationService.getRecommendation(selectedLocation)
            setRecommendation(response)
            setPreviousLocation(selectedLocation)
        } catch (error) {
            console.error("Error fetching recommendation:", error)
            showErrorToast("Failed to fetch recommendation.\nPlease try again later.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="Recommendations">
            <div className="recommendation-form">
                <select onChange={(e) => setSelectedLocation(e.currentTarget.value)}>
                    <option disabled selected>Select a city</option>
                    {locations.map((location: string) => (
                        <option key={location} value={location}>
                            {location}
                        </option>
                    ))}
                </select>
                <button onClick={getRecommendation}>Get Recommendation</button>
            </div>
            <br />
            {loading ? (
                <div className="loader">Loading data...</div>
            ) :
                !recommendation ? (
                    <div></div>
                ) : (
                    <Recommendation data={recommendation} />
                )}
        </div>
    )
}