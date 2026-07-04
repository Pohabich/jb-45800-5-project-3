import { Route, Routes } from "react-router-dom"
import Login from "../../auth/login/Login"
import Signup from "../../auth/signup/Signup"
import Layout from "../layout/Layout"
import useRole from "../../../hooks/use-role"
import { Roles } from "@tab761/role-enums"


export default function Main() {
    const role = useRole()

    return (
        <Routes>
            {/* Public */}
            <Route path="/" element={<Layout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Asigned to Users */}
            {role === Roles.USER && (
                <Route path="/user" element={<Layout />} />
            )}

            {/* Assigned to admins */}
            {role === Roles.ADMIN && (
                <Route path="/admin" element={<Layout />} />
            )}

        </Routes>
    )
}