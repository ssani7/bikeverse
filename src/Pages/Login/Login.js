import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [token] = useToken(user)

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true })
        }
    }, [token, navigate, from])

    const handleSignUp = async (data) => {
        const email = data.email;
        const password = data.password;
        await signInWithEmailAndPassword(email, password);
    }

    return (
        <div className='max-w-full md:max-w-2xl mx-auto pt-28'>
            <div className="card mx-6 md:mx-16 bg-gray-800 shadow-xl">
                <div className="card-body text-center">
                    <h2 className="text-center my-3 text-2xl font-bold">Log In</h2>
                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <div className="form-control w-full mx-auto">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Your Email Address"
                                className="input input-bordered w-full py-7 bg-transparent"
                                {...register("email", {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: "Provide a valid email"
                                    }
                                })} />
                            <label className="label">
                                {errors?.email && <span className="label-text-alt text-error mx-auto">{errors.email.message}</span>}

                            </label>
                        </div>
                        <div className="form-control w-full mx-auto">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Your Password" className="input input-bordered w-full py-7 bg-transparent"
                                {...register("password", {
                                    required: 'Password is required'
                                })} />
                            <label className="label">
                                {errors?.password && <span className="label-text-alt text-error mx-auto">{errors.password.message}</span>}
                            </label>
                        </div>
                        {
                            loading
                                ? <>
                                    <button className='w-full mb-5 btn btn-outline normal-case'><div className='animate-spin border-4 rounded-full h-5 w-5 mr-3 border-t-gray-50'></div>
                                        Logging In
                                    </button>
                                </>
                                :
                                <input className="btn btn-outline btn-secondary w-full normal-case" type="submit" value='Log In' />
                        }
                    </form>

                    <p className="text-center mb-2"><small>New to Cameraverse? <Link to='/register' className='cursor-pointer text-accent font-semibold'>Create an account</Link></small></p>
                    {error && <p className="text-error text-center mb-2"><small>{error.message}</small></p>}
                    <div className="divider">or</div>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>

    );
};

export default Login;