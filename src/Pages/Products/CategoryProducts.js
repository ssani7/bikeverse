import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from './Product';

const CategoryProducts = () => {
    const [parts, setParts] = useState([]);
    const { category } = useParams()
    useEffect(() => {
        fetch(`https://bikeverse-assignment-12.herokuapp.com/partsCollection?category=${category}`)
            .then(res => res.json())
            .then(data => setParts(data))
    }, [category]);
    return (
        <div className='my-32'>
            <h1 className='text-3xl font-bold text-center capitalize mb-12'>All {category} Products</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center mx-6 md:mx-16'>
                {
                    parts.map(product => <Product product={product}></Product>)
                }
            </div>
        </div>
    );
};

export default CategoryProducts;