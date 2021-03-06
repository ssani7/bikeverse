import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import Loading from '../Shared/Loading';
import useToken from '../../hooks/useToken';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,] = useCreateUserWithEmailAndPassword(auth);

    const [updateProfile, updating] = useUpdateProfile(auth);

    const [token] = useToken(user);

    if (token) {
        navigate(from, { replace: true })
    }

    if (updating) {
        return <Loading></Loading>
    }

    const handleSignUp = async (data) => {
        const email = data.email;
        const name = data.name;
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });

        if (!user?.photoURL) {
            await updateProfile({ photoURL: 'https://i.ibb.co/pzpVdPV/no-user-image-icon-3.jpg' })
        }

    }
    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row pt-20 md:pt-28 lg:pt-0">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-accent">Sign Up now!</h1>
                        <p className="py-6">Become a part of Bikeverse. Buy the best parts for your adventure with quality support</p>
                    </div>

                    {/* sign up form */}
                    <div className='w-full md:max-w-2xl mx-auto lg:py-20'>
                        <div className="card mx-6 md:mx-16 bg-gray-800 shadow-xl ">
                            <div className="card-body text-center">
                                <h2 className="text-center my-3 text-2xl font-bold">Sign Up</h2>

                                <form onSubmit={handleSubmit(handleSignUp)}>
                                    <div className="form-control w-full mx-auto">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="input input-bordered w-full py-7 bg-transparent"
                                            {...register("name", {
                                                required: 'Your name is required'
                                            })} />
                                        <label className="label">
                                            {errors?.name && <span className="label-text-alt text-error mx-auto">{errors.name.message}</span>}
                                        </label>
                                    </div>
                                    <div className="form-control w-full mx-auto">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Your Email"
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
                                                required: 'Password is required',
                                                minLength: {
                                                    value: 6,
                                                    message: 'Password must contain 6 characters minimun'
                                                },
                                                validate: {
                                                    containChar: p => /([a-zA-Z])/.test(p) || 'Password must contain an alphabet',
                                                    containInt: p => /\d/.test(p) || 'Password must contain a number',
                                                    containSpecial: p => /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(p) || 'Password must contain special character',
                                                },
                                                onBlur: e => setPassword(e.target.value)
                                            })} />
                                        <label className="label">
                                            {errors?.password && <span className="label-text-alt text-error mx-auto">{errors.password.message}</span>}
                                        </label>
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Confirm Password</span>
                                        </label>
                                        <input type="password" placeholder="Confirm Your Password" className="input input-bordered w-full py-7 bg-transparent"
                                            {...register("confirmPass", {
                                                required: 'Password confirmation is required',
                                                validate: {
                                                    match: c => c === password || 'Passwords do not match'
                                                }
                                            })} />
                                        <label className="label">
                                            {errors?.confirmPass && <span className="label-text-alt text-error mx-auto">{errors.confirmPass.message}</span>}
                                        </label>
                                    </div>
                                    {
                                        loading
                                            ? <>
                                                <button className="btn btn-outline btn-secondary w-full normal-case loading">Creating Account</button>
                                            </>
                                            :
                                            <input className="btn btn-outline btn-secondary w-full normal-case" type="submit" value='Sign Up' />
                                    }

                                </form>

                                <p className="text-center mb-2"><small>Already Have an account? <Link to='/login' className='cursor-pointer text-accent font-semibold'>Sign In</Link></small></p>

                                {error && <p className="text-error text-center mb-2"><small>{error.message}</small></p>}

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

export default Register;