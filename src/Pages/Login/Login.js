import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import SocialLogin from './SocialLogin';

const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const handleSignUp = async (data) => {
        const email = data.email;
        const password = data.password;
        await signInWithEmailAndPassword(email, password);
    }

    return (
        <div className='w-100 flex justify-center items-center'>
            <div className="card mx-6 w-96 bg-base-100 shadow-xl mt-28">
                <div className="card-body">
                    <h2 className="text-center my-3 text-2xl font-bold">Sign In</h2>

                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                {...register("email", {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: "Provide a valid email"
                                    }
                                })} />
                            <label className="label">
                                {errors?.email && <span className="label-text-alt text-red-600 mx-auto">{errors.email.message}</span>}

                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: 'Password is required'
                                })} />
                            <label className="label">
                                {errors?.password && <span className="label-text-alt text-red-600 mx-auto">{errors.password.message}</span>}
                            </label>
                        </div>
                        {
                            loading
                                ? <>
                                    <button className='w-full max-w-xs mb-5 btn btn-outline normal-case'><div className='animate-spin border-4 rounded-full h-5 w-5 mr-3 border-t-gray-50'></div>
                                        Logging In
                                    </button>
                                </>
                                :
                                <input className="btn btn-outline btn-primary w-full normal-case" type="submit" value='Log In' />
                        }
                    </form>

                    <p className="text-center mb-2"><small>New to Cameraverse? <Link to='/register' className='cursor-pointer text-secondary font-semibold'>Create an account</Link></small></p>
                    {error && <p className="text-red-600 text-center mb-2"><small>{error.message}</small></p>}
                    <div class="divider">or</div>
                    <SocialLogin></SocialLogin>


                </div>
            </div>
        </div>

    );
};

export default Login;