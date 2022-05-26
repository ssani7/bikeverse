import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const OrderModal = ({ part, currentStock, setCurrentStock, quantity, setQuantity, setOpenModal }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [user, loading] = useAuthState(auth);

    const { _id, name, category, image, price, material, stock, minimumSell, info, origin } = part;


    const handleAdd = (data) => {
        const partName = data.name;
        const customerName = user?.displayName;
        const partId = _id;
        const email = user?.email;
        const address = data.address;
        const phone = data.phone;
        const orderQuantity = parseInt(data.quantity);
        const newStock = currentStock - orderQuantity;
        setCurrentStock(newStock);
        const order = { partId, partName, customerName, email, address, phone, orderQuantity };

        const config = {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }

        axios.post(`https://bikeverse-assignment-12.herokuapp.com/orders`, order, config)
            .then(res => {
                const { data } = res;
                if (data.insertedId) {
                    axios.put(`https://bikeverse-assignment-12.herokuapp.com/part/${partId}`, { newStock })
                        .then(res => {
                            const { data } = res;
                            if (data.modifiedCount > 0) {
                                toast.success('Order Successful');
                                setOpenModal(false)
                            }
                            console.log(data)
                        })
                }
            })
            .catch(err => {
                if (err.response.status === 401 || err.response.status === 403) {
                    toast.error(`You do not have access. Try logging in again`)
                    return
                }
            })
    }

    if (loading) {

        return <Loading></Loading>
    }
    return (
        <div>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleSubmit(handleAdd)} className='lg:mx-10'>
                        <h1 className='text-lg font-bold mb-3'>{name}</h1>
                        <label className='label'>
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" value={user?.name || "Name Not Found"} disabled className="input input-bordered w-full " />

                        <label className='label'>
                            <span className="label-text">Email Address</span>
                        </label>
                        <input type="email" value={user?.email || "Name Not Found"} disabled className="input input-bordered w-full" />

                        <label className='label'>
                            <span className="label-text">Shipping Address</span>
                        </label>

                        <input type="text" placeholder="Your Shipping Address" className="input input-bordered w-full"
                            {...register('address', {
                                required: "Address is Required"
                            })} />
                        {errors?.address && <p className="label-text text-red-500 mt-2 text-center">{errors.address.message}</p>}

                        <label className='label'>
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input type="number" placeholder="Your Phone Number" className="input input-bordered w-full" {...register('phone', {
                            required: "Phone number is Required"
                        })} />
                        {errors?.phone && <p className="label-text text-red-500 mt-2 text-center">{errors.phone.message}</p>}

                        <label className='label'>
                            <span className="label-text">Place Order Quantity</span>
                        </label>
                        <input type="number" placeholder="Order Quantity"
                            value={quantity}
                            {...register('quantity', {
                                required: "Order Quantity is Required",
                                onChange: (e) => {
                                    const quantity = parseInt(e.target.value)
                                    setQuantity(quantity);
                                }
                            })}
                            className="input input-bordered w-full" />

                        <button disabled={minimumSell > quantity || quantity > stock} className="btn btn-primary mt-6 w-full">Confirm</button>

                        {minimumSell > quantity && <p className="label-text text-red-500 mt-2 text-center">Order must be greater than Minimum sellable</p>}
                        {quantity > stock && <p className="label-text text-red-500 mt-2 text-center">Our Stock is limited</p>}
                        {errors?.quantity && <p className="label-text text-red-500 mt-2 text-center">{errors.quantity.message}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;