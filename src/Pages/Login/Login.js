import React, { useEffect } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import useToken from '../../hooks/useToken';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [sendPasswordResetEmail, sending, resError] = useSendPasswordResetEmail(
        auth
    );

    const [token] = useToken(user);

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true })
        }
    }, [token, navigate, from]);

    if (sending) {
        return <Loading></Loading>
    }

    const handleSignUp = async (data) => {
        const email = data.email;
        const password = data.password;
        await signInWithEmailAndPassword(email, password);
    }

    const handdleReset = async (data) => {
        const email = data.email;
        console.log(email)
        await sendPasswordResetEmail(email);
        toast.success(`Password Reset Email sent to ${email}`);
    }

    return (
        <>
            <div class="hero min-h-screen bg-base-200">
                <div class="hero-content flex-col lg:flex-row-reverse pt-20 md:pt-28 lg:pt-0">
                    <div class="text-center lg:text-left">
                        <h1 class="text-5xl font-bold text-accent">Login now!</h1>
                        <p class="py-3 md:py-6">Welcome back to the universe of bicycles. Where Your adventure becomes more enjoyable</p>
                    </div>
                    <div className='w-full md:max-w-2xl mx-auto lg:pt-32 h-screen'>
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
                                                <button class="btn w-full normal-case loading">Loggin In</button>
                                            </>
                                            :
                                            <input className="btn btn-outline btn-secondary w-full normal-case" type="submit" value='Log In' />
                                    }
                                    <small className='text-center mt-2' >Forgot Password?<span onClick={handleSubmit(handdleReset)} type="submit" class="text-accent ml-1 cursor-pointer font-semibold">Click to reset Password</span></small>
                                </form>

                                <p className="text-center mb-2"><small>New to Cameraverse? <Link to='/register' className='cursor-pointer text-accent font-semibold'>Create an account</Link></small></p>

                                {(error || resError) && <p className="text-error text-center mb-2"><small>{error?.message} {resError?.message}</small></p>}

                                <div className="divider">or</div>
                                <SocialLogin></SocialLogin>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>

    );
};

export default Login;