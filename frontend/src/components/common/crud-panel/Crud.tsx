import './Crud.css'


interface CrudProps {
    onEdit: () => void
    onDelete: () => void
}

export default function Crud({ onEdit, onDelete }: CrudProps) {
    return (
        <div className="Crud">
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    )
}