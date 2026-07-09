import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useService from '../../../../hooks/use-service'
import type Vacation from '../../../../models/Vacation'
import VacationsService from '../../../../services/auth-aware/user-only/Vacations'
import './UpdateVacation.css'


export default function UpdateVacation() {
    const vacationsService = useService(VacationsService)
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const [vacation, setVacation] = useState<Vacation | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
 
 
    return (
        <div className="UpdateVacation">
            <h1>Update Vacation</h1>
        </div>
    )
}