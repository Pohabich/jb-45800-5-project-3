import '../login/Login.css'
import authService from '../../../services/auth'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import AuthContext from '../auth/AuthContext'
import { Link } from 'react-router-dom'
import type UserModel from '../../../models/User'
import { v4 } from 'uuid'


export default function Signup() {

    const { saveJwt } = useContext(AuthContext)!
    const { register, handleSubmit } = useForm<UserModel>()

    async function signup(signup: UserModel) {
        try {
            signup.id = v4()
            const { jwt } = await authService.signup(signup)
            saveJwt(jwt)
        } catch (error: any) {
            alert(error.message)
        }
    }

    return (
        <div className='Login'>
            <form onSubmit={handleSubmit(signup)}>
                <p className='title'>Register</p>
                <input type="text" placeholder='first name' {...register('firstName')} />
                <input type="text" placeholder='last name' {...register('lastName')} />
                <input type="email" placeholder='email' {...register('email')} />
                <input type="password" placeholder='password' {...register('password')} />
                <button>Register</button>
                <p>Don't have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    )
}