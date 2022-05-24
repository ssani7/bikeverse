import React from 'react';

const Product = ({ product }) => {
    const { name, minimumSell, image, info, price, material, origin } = product;
    return (
        <div class="card card-side bg-base-100 shadow-xl">
            <figure><img src={image} className='max-h-80 ml-4 rounded-lg' alt="Movie" /></figure>
            <div class="card-body">
                <h2 class="card-title">{name}</h2>
                <p><b>Material:</b> {material}</p>
                <p><b>Origin:</b> {origin}</p>
                <p><b>Minimum Sellable:</b> {minimumSell}</p>
                <p><b>Price:</b> ${price}</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Watch</button>
                </div>
            </div>
        </div>
    );
};

export default Product;