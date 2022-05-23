import React, { useEffect, useRef, useState } from 'react';
import Footer from '../Shared/Footer';
import Banner from '../Shared/Banner';
import Products from '../Products/Products';
import Category from '../Category/Category';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <Footer></Footer>
        </div>
    );
};

export default Home;