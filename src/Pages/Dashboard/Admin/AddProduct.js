import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [image, setImage] = useState('')

    const addProduct = async (data) => {
        const name = data.name;
        const minimumSell = data.minimum;
        const stock = data.stock;
        const category = data.category.toLowerCase();
        const formdata = new FormData();
        formdata.append('image', data.image[0]);
        const info = data.info;
        const price = data.price;
        const material = data.material;
        const origin = data.origin;
        const imageApiKey = '906bfdafb7a4a5b92021d570714ff50f';

        axios.post(`https://api.imgbb.com/1/upload?key=${imageApiKey}`, formdata)
            .then(res => {
                const { data } = res;
                setImage(data.data.url);
            });

        const part = { name, minimumSell, stock, category, info, price, material, origin, image };

        axios.post(`http://localhost:5000/parts`, part, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    toast.error("Failed to upload, try signing in agin")
                }
                toast.success(`Added Product ${name}`)
                const { data } = res;
                reset();
                console.log(data)
            })

    }

    return (
        <div class="card flex-shrink-0 w-full max-w-3xl shadow-2xl bg-base-100">
            <div class="card-body">
                <form onSubmit={handleSubmit(addProduct)} >
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Product Name</span>
                        </label>
                        <input type="text" placeholder="Product Name" class="input input-bordered" {...register("name", { required: true })} />
                    </div>
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Pick the best fantasy franchise</span>
                        </label>
                        <select class="select select-bordered" {...register("category", { required: true })}>
                            <option>Sports</option>
                            <option>Outdoors</option>
                            <option>Kids</option>
                            <option>Style</option>
                            <option>Women</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Minimum Sellable</span>
                        </label>
                        <input type="number" placeholder="Minimum Sellable" class="input input-bordered" {...register("minimum", { required: true })} />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Stock</span>
                        </label>
                        <input type="number" placeholder="Stock" class="input input-bordered" {...register("stock", { required: true })} />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Price</span>
                        </label>
                        <input type="number" placeholder="Price" class="input input-bordered" {...register("price", { required: true })} />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Material</span>
                        </label>
                        <input type="text" placeholder="Material" class="input input-bordered" {...register("material", { required: true })} />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Origin</span>
                        </label>
                        <input type="text" placeholder="Origin" class="input input-bordered" {...register("origin", { required: true })} />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Product Details</span>
                        </label>
                        <textarea class="textarea textarea-bordered h-24" placeholder="Product Details" {...register("info", { required: true })}></textarea>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Product Photo</span>
                        </label>
                        <input type="file" placeholder="Product Photo" class="input input-bordered" {...register("image")} />
                    </div>
                    <div class="form-control mt-6">
                        <button class="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;