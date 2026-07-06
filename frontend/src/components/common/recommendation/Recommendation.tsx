import type RecommendationResponse from '../../../models/RecommendationResponse'
import './Recommendation.css'


interface RecommendationProps {
    data: RecommendationResponse
}

export default function Recommendation({ data }: RecommendationProps) {
    return (
        <div className="Recommendation">
            <h1 className="rec-title">
                <span className="emoji">🌴</span> {data.title}
            </h1>

            <div className="key-place-section">
                <h2 className="key-place-title">
                    <span className="emoji">🏰</span> {data.keyPlace.name}
                </h2>
                <p className="key-place-desc">{data.keyPlace.description}</p>
            </div>

            <div className="highlights-section">
                <h3 className="section-subtitle">Highlights:</h3>
                <ul className="highlights-list">
                    {data.highlights.map((item, index) => (
                        <li key={index} className="highlight-item">
                            <strong className="highlight-name">{item.name}</strong>
                            <span className="dash"> – </span>
                            <span className="highlight-desc">{item.description}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="tips-section">
                <h3 className="section-subtitle">Tips:</h3>
                {data.tips.map((tip, index) => (
                    <p key={index} className="tip-text">
                        <span className="tip-bulb">💡</span>
                        <strong className="tip-topic">{tip.topic}: </strong>
                        {tip.text}
                    </p>
                ))}
            </div>
        </div>
    )
}