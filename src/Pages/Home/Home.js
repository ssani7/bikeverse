import React, { useEffect, useRef, useState } from 'react';
import Footer from '../Shared/Footer';
import Banner from '../Shared/Banner';
import Products from '../Products/Products';
import Category from '../Category/Category';
import Summary from './Summary';
import Reviews from '../Reviews/Reviews';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Banner></Banner>
            <Summary></Summary>
            <Category></Category>
            <div className='flex flex-col justify-center items-center'>
                <h2 className='text-3xl text-center mb-24 font-semibold'>Popular Products</h2>
                <Products></Products>
                <button className='btn btn-outline w-fit mt-12'>Show All Products</button>
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