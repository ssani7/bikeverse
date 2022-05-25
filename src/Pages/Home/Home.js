import React, { useEffect, useRef, useState } from 'react';
import Footer from '../Shared/Footer';
import Banner from '../Shared/Banner';
import Category from '../Category/Category';
import Summary from './Summary';
import Reviews from '../Reviews/Reviews';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import Product from '../Products/Product';

const Home = () => {
    const navigate = useNavigate();
    const { data: featured, isLoading } = useQuery('featured', () => fetch(`https://bikeverse-assignment-12.herokuapp.com/featured`).then(res => res.json()));

    return (
        <div>
            <Banner></Banner>
            <Summary></Summary>
            <Category></Category>
            <div className='flex flex-col justify-center items-center'>
                <h2 className='text-3xl text-center mb-24 font-semibold'>Popular Products</h2>
                {
                    isLoading ? <Loading></Loading>
                        : <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center mx-6 md:mx-16'>
                            {
                                featured.slice(0, 12).map(product => <Product product={product}></Product>)
                            }
                        </div>
                }
                <button onClick={() => navigate('/shop')} className='btn btn-outline w-fit mt-12'>Show All Products</button>
            </div>
            <Reviews></Reviews>
            <div className='w-full text-center -mt-24 mb-16'>
                <button onClick={() => navigate('/reviews/all')} className='btn btn-outline w-fit justify-center'>Show All Reviews</button>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;