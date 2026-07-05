import './Login.css'
import type LoginModel from '../../../models/Login'
import authService from '../../../services/auth'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import AuthContext from '../auth/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { showErrorToast } from '../../common/show-error-toast'


export default function Login() {
    const { saveJwt } = useContext(AuthContext)!
    const { register, handleSubmit, formState } = useForm<LoginModel>()
    const navigate = useNavigate()

    async function login(login: LoginModel) {
        try {
            const { jwt } = await authService.login(login)
            saveJwt(jwt)
            navigate("/")
        } catch (error: any) {
            showErrorToast(error.status === 422 ? 'Email or/and password are incorrect' : error.message)
        }
    }

    return (
        <div className='Login'>
            <form onSubmit={handleSubmit(login)}>
                <p className='title'>Login</p>
                <input type="email" placeholder='email' {...register('email', {
                    required: {
                        value: true,
                        message: 'Email is required'
                    }
                })} />
                <div className='error'>{formState.errors.email?.message}</div>
                <input type="password" placeholder='password' {...register('password', {
                    required: {
                        value: true,
                        message: 'Password is required'
                    }
                })} />
                <div className='error'>{formState.errors.password?.message}</div>
                <button>Login</button>
                <p>Don't have an account? <Link to="/signup">Register now</Link></p>
            </form>
        </div>
    )
}