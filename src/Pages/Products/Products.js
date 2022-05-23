import React, { useEffect, useState } from 'react';
import Product from './Product';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/parts`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <div>
            <div className='grid grid-cols-2 gap-4 mx-auto w-1/2'>
                {
                    products.slice(0, 4).map(product => <Product product={product}></Product>)
                }
            </div>
        </div>
    );
};

export default Products;