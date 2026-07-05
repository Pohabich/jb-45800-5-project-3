import '../login/Login.css'
import authService from '../../../services/auth'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import AuthContext from '../auth/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import type UserModel from '../../../models/User'
import { v4 } from 'uuid'
import { showErrorToast } from '../../common/show-error-toast'
import { Roles } from '@tab761/role-enums'


export default function Signup() {
    const { saveJwt } = useContext(AuthContext)!
    const { register, handleSubmit, formState } = useForm<UserModel>()
    const navigate = useNavigate()

    async function signup(signup: UserModel) {
        try {
            signup.id = v4()
            signup.role = Roles.USER

            const { jwt } = await authService.signup(signup)
            saveJwt(jwt)

            navigate("/")
        } catch (error: any) {
            showErrorToast(error.status === 409 ? 'The email is already in use' : error.message)
        }
    }

    return (
        <div className='Login'>
            <form onSubmit={handleSubmit(signup)}>
                <p className='title'>Register</p>
                <input type="text" placeholder='first name' {...register('firstName', {
                    required: {
                        value: true,
                        message: 'First name is required'
                    }
                })} />
                <div className='error'>{formState.errors.firstName?.message}</div>
                <input type="text" placeholder='last name' {...register('lastName', {
                    required: {
                        value: true,
                        message: 'Last name is required'
                    }
                })} />
                <div className='error'>{formState.errors.lastName?.message}</div>
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
                    },
                    minLength: {
                        value: 4,
                        message: 'Password must be at least 4 characters'
                    }
                })} />
                <div className='error'>{formState.errors.password?.message}</div>
                <button>Register</button>
                <p>Don't have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    )
}