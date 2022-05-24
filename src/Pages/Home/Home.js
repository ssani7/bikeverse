import React, { useEffect, useRef, useState } from 'react';
import Footer from '../Shared/Footer';
import Banner from '../Shared/Banner';
import Products from '../Products/Products';
import Category from '../Category/Category';
import Summary from './Summary';
import Reviews from './Reviews';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Summary></Summary>
            <Category></Category>
            <Products></Products>
            <Reviews></Reviews>
            <Footer></Footer>
        </div>
    );
};

export default Home;