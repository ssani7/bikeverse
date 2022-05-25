import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import SocialLogin from './SocialLogin';

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [password, setPassword] = useState('');

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,] = useCreateUserWithEmailAndPassword(auth);

    const handleSignUp = async (data) => {
        const email = data.email;
        const confirmPass = data.confirmPass;

        console.log(email, password);

        if (confirmPass === password) {
            await createUserWithEmailAndPassword(email, password)
        }


    }
    return (
        <div className='max-w-full md:max-w-2xl mx-auto'>
            <div className="card mx-6 md:mx-16 bg-base-100 shadow-xl mt-28">
                <div className="card-body text-center">
                    <h2 className="text-center my-3 text-2xl font-bold">Sign Up</h2>

                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <div className="form-control w-full mx-auto">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Type here"
                                className="input input-bordered w-full py-7"
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
                        <div className="form-control w-full mx-auto">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Type here" className="input input-bordered w-full py-7"
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
                                {errors?.password && <span className="label-text-alt text-red-600 mx-auto">{errors.password.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="password" placeholder="Type here" className="input input-bordered w-full py-7"
                                {...register("confirmPass", {
                                    required: 'Password confirmation is required',
                                    validate: {
                                        match: c => c === password || 'Passwords do not match'
                                    }
                                })} />
                            <label className="label">
                                {errors?.confirmPass && <span className="label-text-alt text-red-600 mx-auto">{errors.confirmPass.message}</span>}
                            </label>
                        </div>
                        {
                            loading
                                ? <>
                                    <button className='w-full max-w-xs mb-5 btn btn-outline normal-case'><div className='animate-spin border-4 rounded-full h-5 w-5 mr-3 border-t-gray-50'></div>
                                        Signing Up
                                    </button>
                                </>
                                :
                                <input className="btn btn-outline btn-primary w-full normal-case" type="submit" value='Sign Up' />
                        }

                    </form>

                    <p className="text-center mb-2"><small>Already Have an account? <Link to='/login' className='cursor-pointer text-secondary font-semibold'>Sign In</Link></small></p>

                    {error && <p className="text-red-600 text-center mb-2"><small>{error.message}</small></p>}

                    <div class="divider">or</div>
                    <SocialLogin></SocialLogin>

                </div>
            </div>
        </div>
    );
};

export default Register;