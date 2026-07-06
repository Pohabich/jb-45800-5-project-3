import './Like.css'


interface LikeProps {
    likes: number
    liked: boolean
    onClick: () => void
}

export default function Like({ likes, liked, onClick }: LikeProps) {

    return (
        <button
            className='Like'
            style={setStyle(liked)}
            onClick={onClick}
        >
          ❤️ <span> {likes}</span>
        </button>
    )
}

function setStyle(liked: boolean): import("react").CSSProperties | undefined {
    return liked ? { color: 'white', fontWeight: 'bold' } : { color: 'black', fontWeight: 'normal' }
}
