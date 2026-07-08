// npm install react-paginate
// npm i @types/react-paginate

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import VacationCard from '../../common/vacation/VacationCard'
import Like from '../../common/like/Like'
import './Home.css'
import './Pagination.css'
import { showErrorToast } from '../../common/show-error-toast'
import type Vacation from '../../../models/Vacation'
import type VacationResponse from '../../../models/VacationResponse'
import VacationsService from '../../../services/auth-aware/Vacations'
import useService from '../../../hooks/use-service'
import LikesService from '../../../services/auth-aware/users/Likes'
// Next is only way to get react-paginate to work with TypeScript and Vite
import * as ReactPaginateModule from 'react-paginate'
const ReactPaginate = ((ReactPaginateModule as any).default?.default ||
    (ReactPaginateModule as any).default ||
    ReactPaginateModule) as any


const ITEMS_PER_PAGE = 9

const Filters = {
    All: 'All',
    Active: 'Active',
    Future: 'Future',
    Favorites: 'Favorites'
} as const

export default function Home() {
    const vacationsService = useService(VacationsService)
    const likesService = useService(LikesService)

    const [vacations, setVacations] = useState<Vacation[]>([])
    const [totalPages, setTotalPages] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const currentFilter = searchParams.get('filter') || Filters.All
    const page = parseInt(searchParams.get('page') || '1', 10)

    useEffect(() => {
        const fetchVacations = async () => {
            try {
                let response: VacationResponse

                setLoading(true)
                switch (currentFilter) {
                    case Filters.All:
                        response = await vacationsService.getAllVacationsByPage(page, ITEMS_PER_PAGE)
                        break;

                    case Filters.Active:
                        response = await vacationsService.getPresentVacationsByPage(page, ITEMS_PER_PAGE)
                        break;

                    case Filters.Future:
                        response = await vacationsService.getFutureVacationsByPage(page, ITEMS_PER_PAGE)
                        break;

                    case Filters.Favorites:
                        console.log('Favorites filter selected')
                        response = await vacationsService.getFavoriteVacationsByPage(page, ITEMS_PER_PAGE)
                        break;

                    default:
                        response = await vacationsService.getAllVacationsByPage(page, ITEMS_PER_PAGE)
                }

                setVacations(response!.mappedData)
                setTotalPages(response!.totalPages)
            } catch (error) {
                console.error("Error fetching vacations:", error)
                showErrorToast('Failed to load vacations')
            } finally {
                setLoading(false)
            }
        }

        fetchVacations()
    }, [currentFilter, page])

    const handleFilterChange = (filterType: string) => {
        setSearchParams({ filter: filterType, page: '1' })
    }

    const handlePageChange = (selectedItem: { selected: number }) => {
        const targetPage = selectedItem.selected + 1
        setSearchParams({ filter: currentFilter, page: targetPage.toString() })
    }

    const handleLikeClick = async (vacationId: string, isCurrentlyLiked: boolean) => {
        try {
            if (!isCurrentlyLiked) {
                await likesService.likeVacation(vacationId)
            } else {
                await likesService.dislikeVacation(vacationId)
            }

            // Handle like status (aspesially for "My Vacations" filter)
            if (currentFilter === Filters.Favorites && isCurrentlyLiked) {
                setVacations(prev => prev.filter(item => item.vacationId !== vacationId))
            } else {
                setVacations(prev => prev.map(item => {
                    if (item.vacationId === vacationId) {
                        return {
                            ...item,
                            isLiked: !item.isLiked,
                            totalLikes: item.isLiked ? item.totalLikes - 1 : item.totalLikes + 1
                        }
                    }
                    return item
                }))
            }
        } catch (error) {
            showErrorToast('Could not update like status. Try again later')
        }
    }

    return (
        <div className="Home">
            <div className="filters-panel">
                {Object.entries(Filters).map(([key, value]) => (
                    <button key={key}
                        className={currentFilter === key ? 'active-filter' : ''}
                        onClick={() => handleFilterChange(key)}>
                        {value}
                    </button>
                ))}
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
                            <Like
                                likes={item.totalLikes}
                                liked={item.isLiked}
                                onClick={() => handleLikeClick(item.vacationId, item.isLiked)}
                            />
                        </VacationCard>
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    previousLabel="<"
                    onPageChange={handlePageChange}
                    pageCount={totalPages}
                    forcePage={page - 1}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={2}
                    containerClassName="pagination"
                    pageClassName="page-item"
                    activeClassName="active"
                    disabledClassName="disabled"
                />
            )}
        </div>
    )
}