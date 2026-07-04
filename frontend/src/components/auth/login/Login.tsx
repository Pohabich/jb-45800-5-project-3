import './Login.css'
import type LoginModel from '../../../models/Login'
import authService from '../../../services/auth'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import AuthContext from '../auth/AuthContext'
import { Link } from 'react-router-dom'


export default function Login() {

    const { saveJwt } = useContext(AuthContext)!
    const { register, handleSubmit } = useForm<LoginModel>()

    async function login(login: LoginModel) {
        try {
            const { jwt } = await authService.login(login)
            saveJwt(jwt)
        } catch (error: any) {
            alert(error.message)
        }
    }

    return (
        <div className='Login'>
            <form onSubmit={handleSubmit(login)}>
                <p className='title'>Login</p>
                <input type="email" placeholder='email' {...register('email')} />
                <input type="password" placeholder='password' {...register('password')} />
                <button>Login</button>
                <p>Don't have an account? <Link to="/signup">Register now</Link></p>
            </form>
        </div>
    )
}