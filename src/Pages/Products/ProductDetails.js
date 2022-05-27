import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../Shared/Footer';
import Loading from '../Shared/Loading';
import OrderModal from './OrderModal';

const ProductDetails = () => {
    const { id } = useParams();
    const [part, setPart] = useState([]);
    const [quantity, setQuantity] = useState(0)
    const [currentStock, setCurrentStock] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        fetch(`https://bikeverse-assignment-12.herokuapp.com/part/${id}`)
            .then(res => res.json())
            .then(data => {
                setPart(data)
                setQuantity(data.minimumSell)
                setCurrentStock(data.stock)
                setloading(false)
            })
    }, [id]);

    const { _id, name, category, image, price, material, stock, minimumSell, info, origin } = part;

    if (loading) {
        return <Loading></Loading>
    }



    return (
        <div>
            <div className="md:hero py-20">
                <div className="hero-content px-6 md:mx-16 flex-col lg:flex-row">
                    <img src={image} className="max-w-xs md:max-w-lg lg:mr-6 rounded-lg" alt='' />
                    <div>
                        <h1 className="text-3xl md:text-5xl font-bold">{name}</h1>
                        <h1 className='mt-6 text-lg'><b>Price:</b> ${price}</h1>
                        <h1 className='mt-3 text-lg'><b>Material Used:</b> {material}</h1>
                        <h1 className='mt-3 text-lg'><b>Manufactured In:</b> {origin}</h1>
                        <h1 className='mt-3 text-lg'><b>Minimum Buyable:</b> {minimumSell}</h1>
                        <h1 className='mt-3 text-lg'><b>Current Stock:</b> {currentStock}</h1>
                        <h1 className='mt-3 text-lg'><b>Category:</b> {category}</h1>
                        <h1 className='mt-3 mb-6'><b>Description:</b> {info}</h1>

                        <label htmlFor="my-modal-3" onClick={() => setOpenModal(true)} className="btn btn-primary mt-6"><FontAwesomeIcon className='mr-2' icon={faCartPlus} />
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
            <Footer></Footer>
        </div>
    );
};

export default ProductDetails;