import "./Reports.css"
import type DestinationLikes from "../../../models/DestinationLikes"
import { useEffect, useState } from "react"
import useService from "../../../hooks/use-service"
import LikesService from "../../../services/auth-aware/admin-only/Likes"
import { showErrorToast } from "../../common/show-error-toast"
import ChartComponent from "../../common/chart/ChartComponent"


const TABLE_COLUMNS = ['Destination', 'Likes']
const CSV_REPORT_NAME = 'report'

export default function Reports() {
    const [loading, setLoading] = useState<boolean>(false)
    const likesService = useService(LikesService)
    const [locationsLikes, setLocationsLikes] = useState<DestinationLikes[]>([])

    function getDataCsv(): string {
        return locationsLikes.reduce((acc, item) => acc + `${item.location},${item.totalLikes}\n`, 'sep=,\n' + TABLE_COLUMNS.join() + '\n')
    }
    const handleExport = () => {
        // 1. Create a Blob with CSV data
        const blob = new Blob([getDataCsv()], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        // 2. Create a temporary hidden anchor element
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${CSV_REPORT_NAME}.csv`);

        // 3. Trigger the download programmatically
        document.body.appendChild(link);
        link.click();

        // 4. Clean up the DOM and memory
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                setLoading(true)
                const data = await likesService.getVacationsLikes()
                setLocationsLikes(data)
            } catch (error) {
                console.error("Error fetching destinations likes:", error)
                showErrorToast('Failed to load destinations likes')
            } finally {
                setLoading(false)
            }
        }

        fetchLikes()
    }, [])

    return (
        <div className="Reports">
            {loading ? (
                <div className="loader">Loading data...</div>
            ) : locationsLikes.length === 0 ? (
                <div className="empty-state">No distinations found</div>
            ) : (
                <div>
                    <div className="chart-container">
                        <ChartComponent data={locationsLikes} title='Distination popularity' />
                    </div>
                    <br />
                    <button onClick={handleExport}>Export to CSV</button>
                </div>)
            }
        </div>
    )
}