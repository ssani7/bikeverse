import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import OrderModal from './OrderModal';

const ProductDetails = () => {
    const { id } = useParams();
    const [part, setPart] = useState([]);
    const [quantity, setQuantity] = useState(0)
    const [currentStock, setCurrentStock] = useState(0);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/part/${id}`)
            .then(res => res.json())
            .then(data => {
                setPart(data)
                setQuantity(data.minimumSell)
                setCurrentStock(data.stock)
            })
    }, [id]);

    const { _id, name, category, image, price, material, stock, minimumSell, info, origin } = part;





    return (
        <div class="hero min-h-screen">
            <div class="hero-content flex-col lg:flex-row">
                <img src={image} class="lg:max-w-lg m-6 lg:mr-6 rounded-lg" alt='' />
                <div>
                    <h1 class="text-5xl font-bold">{name}</h1>
                    <h1 className='mt-6 text-lg'><b>Price:</b> ${price}</h1>
                    <h1 className='mt-3 text-lg'><b>Material Used:</b> {material}</h1>
                    <h1 className='mt-3 text-lg'><b>Manufactured In:</b> {origin}</h1>
                    <h1 className='mt-3 text-lg'><b>Minimum Buyable:</b> {minimumSell}</h1>
                    <h1 className='mt-3 text-lg'><b>Current Stock:</b> {currentStock}</h1>
                    <h1 className='mt-3 text-lg'><b>Category:</b> {category}</h1>
                    <h1 className='mt-3 text-lg mb-6'><b>Description:</b> {info}</h1>

                    <label for="my-modal-3" onClick={() => setOpenModal(true)} class="btn btn-primary mt-6"><FontAwesomeIcon className='mr-2' icon={faCartPlus} />
                        Place Order</label>



                    {
                        openModal && <OrderModal
                            part={part}
                            currentStock={currentStock}
                            setCurrentStock={setCurrentStock}
                            quantity={quantity}
                            setQuantity={setQuantity}
                            setOpenModal={setOpenModal}
                        ></OrderModal>
                    }



                </div>
            </div>
        </div >
    );
};

export default ProductDetails;