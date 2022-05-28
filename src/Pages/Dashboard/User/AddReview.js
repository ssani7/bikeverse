import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';

const AddReview = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [user, loading] = useAuthState(auth);
    const [image, setImage] = useState('')

    if (loading) {
        return <Loading></Loading>
    }

    const addReview = async (data) => {
        const name = user.displayName;
        const ratings = parseInt(data.ratings);
        const formData = new FormData();
        formData.append('image', data.image[0]);
        const review = data.review;
        const title = data.title;
        const imageApiKey = '906bfdafb7a4a5b92021d570714ff50f';
        const UserReview = { name, ratings, review, title, image }


        await axios.post(`https://api.imgbb.com/1/upload?key=${imageApiKey}`, formData)
            .then(res => {
                const { data } = res;
                setImage(data.data.url);
            });

        await axios.post(`https://bikeverse-assignment-12.herokuapp.com/reviews`, UserReview, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    toast.error('Failed, Try logging in again')
                }
                const { data } = res;
                if (data.insertedId) {
                    toast.success("Thanks For Your Review. Keep Rocking");
                    reset();
                }
            })
    }

    return (
        <div className="card flex-shrink-0 w-full max-w-3xl shadow-2xl bg-base-100">
            <div className="card-body">
                <form onSubmit={handleSubmit(addReview)} >
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title Name</span>
                        </label>
                        <input type="text" placeholder="Title" className="input input-bordered" {...register("title", { required: true })} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input type="text" placeholder="Product Name" className="input input-bordered" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Rate your review out of 5</span>
                        </label>
                        <select className="select select-bordered" {...register("ratings", { required: true })}>
                            <option>1</option>
                            <option>1</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Details</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-24" placeholder="Write a review" {...register("review", { required: true })}></textarea>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <input type="file" placeholder="Product Photo" className="input input-bordered" {...register("image")} />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Submit Review</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddReview;