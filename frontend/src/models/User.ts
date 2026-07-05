import type Login from "./Login";

export default interface User extends Login {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string
}