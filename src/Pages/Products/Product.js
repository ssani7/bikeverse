import React from 'react';
import { useNavigate } from 'react-router-dom';

const Product = ({ product }) => {
    const navigate = useNavigate();
    const { _id, name, minimumSell, image, info, price, material, origin, stock } = product;
    return (
        <div className="card group static lg:card-side bg-base-100 shadow-xl transition-all hover:scale-110 hover:bg-secondary">
            <img src={image} className='lg:w-1/2 h-fit my-auto lg:ml-5 rounded' alt="Album" />
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <h1><b>Material:</b> {material}</h1>
                <h1><b>Origin:</b> {origin}</h1>
                <h1><b>Minimum Sellable:</b> {minimumSell}</h1>
                <h1><b>Price:</b> ${price}</h1>
                <h1 className='w-f'><b>Description:</b> {info.substr(0, 80)}</h1>
                <h1><b>Available:</b> {stock}</h1>
                <div className="card-actions justify-end mt-4">
                    <button
                        onClick={() => navigate(`/part/${_id}`)}
                        className="btn btn-primary border-0 group-hover:bg-neutral group-hover:text-white hover:scale-110">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default Product;
