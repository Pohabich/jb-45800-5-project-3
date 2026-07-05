import Like from "../../common/like/Like"
import VacationCard from "../../common/vacation/VacationCard"
import "./Home.css"


export default function Home() {
    return (
        <div className="Home">
            <div className="filters-panel"><button>All</button> <button>Active</button> <button>Future</button> <button>My Vacations</button></div>
            <div className="vacations-container">
                <VacationCard key="1"
                    id="1"
                    location="Rhodes"
                    imageUrl="https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
                    startDate="2027.08.11"
                    endDate="2027.11.22"
                    description="It's time to take a break and enjoy a cocktail by the sea..."
                    price={462}
                >
                    <Like
                        likes={1}
                        liked={false}
                        onClick={() => console.log('Like')}
                    />
                </VacationCard>
 <VacationCard key="2"
                    id="2"
                    location="Rhodes"
                    imageUrl="https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
                    startDate="2026.08.11"
                    endDate="2026.11.22"
                    description="It's time to take a break and enjoy a cocktail by the sea..."
                    price={462}
                >
                    <Like
                        likes={1}
                        liked={false}
                        onClick={() => console.log('Like')}
                    />
                </VacationCard>
            </div>
            <div className="pagination"><button>Prev</button> <span>1</span> <button>Next</button></div>
        </div>
    )
}