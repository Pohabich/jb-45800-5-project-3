import { Navigate, Route, Routes } from "react-router-dom"
import useRole from "../../../hooks/use-role"
import { Roles } from "@tab761/role-enums"
import NotFound from "../../not-found/NotFound"
import Reports from "../../admin-asigned/reports/Reports"
import Vacations from "../../admin-asigned/vacations/Vacations"
import Mcp from "../../user-asigned/mcp/Mcp"
import Recommendations from "../../user-asigned/recommendations/Recommendations"
import Home from "../../user-asigned/home/Home"


export default function Main() {
    const role = useRole()!

    return (
        <Routes>
            {/* Asigned to Users */}
            {role === Roles.USER && (<>
                <Route path="/" element={<Navigate to="/vacations" />} />
                <Route path="/vacations" element={<Home />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/my-questions" element={<Mcp />} />
            </>)}

            {/* Assigned to admins */}
            {role === Roles.ADMIN && (<>
                <Route path="/" element={<Navigate to="/vacations" />} />
                <Route path="/vacations" element={<Vacations />} />
                <Route path="/reports" element={<Reports />} />
            </>
            )}

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}