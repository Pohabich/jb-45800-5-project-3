import { useContext, type PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../auth/AuthContext'



export default function RequireAuth(props: PropsWithChildren) {
    const { jwt } = useContext(AuthContext)!
    const { children } = props

    if (!jwt) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}