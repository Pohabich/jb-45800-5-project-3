import { Route, Routes } from "react-router-dom"
import useRole from "../../../hooks/use-role"
import { Roles } from "@tab761/role-enums"
import NotFound from "../../not-found/NotFound"


export default function Main() {
    const role = useRole()!

    return (
        <Routes>
            {/* Asigned to Users */}
            {role === Roles.USER && (<>
                <Route path="/user" element={<div>User Content</div>} />
                <Route path="*" element={<NotFound />} />
            </>)}

            {/* Assigned to admins */}
            {role === Roles.ADMIN && (<>
                <Route path="/admin" element={<div>Admin Content</div>} />
                <Route path="*" element={<NotFound />} />
            </>
            )}


        </Routes>
    )
}