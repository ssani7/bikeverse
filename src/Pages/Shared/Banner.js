import React, { useEffect, useRef, useState } from 'react';

import banner1 from '../../images/banner1.jpg'
import banner2 from '../../images/banner2.jpg'
import banner3 from '../../images/banner3.jpg'

const Banner = () => {
    const [index, setIndex] = useState(0);
    const slideRef = useRef();

    const bannerImage = [banner1, banner2, banner3];

    let count = 0;
    const handleNext = () => {
        count = (count + 1) % bannerImage.length;
        setIndex(count);
    }

    const startSlider = () => {
        setInterval(() => {
            handleNext();
        }, 10000);
    };

    useEffect(() => {
        startSlider();
    }, []);

    return (
        <div>
            <div className="carousel w-full relative h-screen" >
                <div ref={slideRef} id="slide1" className="carousel-item w-full">
                    <div className='z-10 mx-auto my-auto'>
                        <h2 className='text-3xl md:text-6xl text-white great-vibes'>Welcome to the Universe of Bicycles</h2>
                    </div>
                    <img src={bannerImage[index]} className="absolute w-full h-screen object-cover opacity-80" alt='' />
                </div>
            </div>
        </div>
    );
};

export default Banner;