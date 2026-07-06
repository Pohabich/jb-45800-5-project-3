import { Link, NavLink } from "react-router-dom"
import useUsername from "../../../hooks/use-username"
import "./Header.css"
import AuthContext from "../../auth/auth/AuthContext"
import { useContext } from "react"
import useRole from "../../../hooks/use-role"
import { Roles } from "@tab761/role-enums"


export default function Header() {
    const name = useUsername()
    const role = useRole()!
    const { logout } = useContext(AuthContext)!

    function logMeOut() {
        logout()
    }

    return (
        <div className="Header">
            <div>
            </div>
            <div>
                {role === Roles.USER && (
                    <>
                        <NavLink to="/vacations">Vacations</NavLink>
                        <NavLink to="/recommendations">Recommendations</NavLink>
                        <NavLink to="/my-questions">Questions</NavLink>
                    </>
                )}

                {role === Roles.ADMIN && (
                    <>
                        <NavLink to="/vacations">Vacations</NavLink>
                        <NavLink to="/reports">Reports</NavLink>
                    </>
                )}
            </div>
            <div className="greeting">
                Welcome, <i>{name}</i> | <Link to="/login" onClick={logMeOut} className="logout-link">Logout</Link>
            </div>
        </div>
    )
}