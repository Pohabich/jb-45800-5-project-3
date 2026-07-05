import './Like.css'


interface LikeProps {
    likes: number
    liked: boolean
    onClick: () => void
}

export default function Like({ likes, liked, onClick }: LikeProps) {

    return (
        <button
            className={`Like ${liked ? 'liked' : ''}`}
            onClick={onClick}
        >
            ❤️ {likes}
        </button>
    )
}