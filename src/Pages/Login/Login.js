import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

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
        <div className='w-100 h-screen flex justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl -mt-60">
                <div className="card-body">
                    <h2 className="text-center my-6">Sign Up</h2>

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

                        <input className="btn btn-outline btn-primary w-full max-w-xs" type="submit" value='Login' />
                    </form>

                    <p className="text-center mb-2"><small>New to Cameraverse? <Link to='/register' className='cursor-pointer text-secondary font-semibold'>Create an account</Link></small></p>

                    {<p className="text-red-600 text-center mb-2"><small>{error?.message}</small></p>}




                </div>
            </div>
        </div>

    );
};

export default Login;