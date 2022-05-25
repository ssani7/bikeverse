import React, { useEffect, useState } from 'react';
import Product from './Product';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`https://bikeverse-assignment-12.herokuapp.com/parts`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center mx-6 md:mx-16'>
                {
                    products.slice(0, 12).map(product => <Product product={product}></Product>)
                }
            </div>
        </div>
    );
};

export default Products;