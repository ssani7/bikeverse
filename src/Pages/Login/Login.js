import React from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";

const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,] = useCreateUserWithEmailAndPassword(auth);

    const handleSignUp = async (data) => {
        const email = data.email;
        const password = data.password;

        console.log(email, password)

        await createUserWithEmailAndPassword(email, password)
    }

    return (
        <div className='w-100 h-screen flex justify-center items-center'>
            <div class="card w-96 bg-base-100 shadow-xl -mt-60">
                <div class="card-body">
                    <h2 class="text-center my-6">Sign Up</h2>

                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                {...register("email", { required: true })} />
                            <label class="label">
                                <span class="label-text-alt mx-auto">Alt label</span>
                            </label>
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Password</span>
                            </label>
                            <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs"
                                {...register("password", { required: true })} />
                            <label class="label">
                                <span class="label-text-alt mx-auto">Alt label</span>
                            </label>
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Confirm Password</span>
                            </label>
                            <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs"
                                {...register("confirmPass", { required: true })} />
                            <label class="label">
                                <span class="label-text-alt mx-auto">Alt label</span>
                            </label>
                        </div>

                        <input class="btn btn-outline btn-primary w-full max-w-xs" type="submit" value='Sign Up' />
                    </form>



                </div>
            </div>
        </div>

    );
};

export default Login;