import { useContext, useMemo } from "react"
import AuthContext from "../components/auth/auth/AuthContext"
import { jwtDecode } from "jwt-decode"
import type User from "../models/User"


export default function useRole(): string {
    const { jwt } = useContext(AuthContext)!

    const role = useMemo(() => {
        if (!jwt) return ''
        const { role } = jwtDecode<User>(jwt)
        return role
    }, [jwt])

    return role
}