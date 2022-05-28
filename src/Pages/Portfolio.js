import { faFacebookF, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faAt, faBriefcase, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Portfolio = () => {
    return (
        <div className='h-screen md:w-full lg:w-full flex justify-center items-center'>
            <div className='bg-gray-700 mx-6 md:w-2/3 text-center md:text-left rounded-2xl flex flex-col-reverse items-center md:flex-row relative'>
                <div className='w-full p-10 text-base-content'>

                    <h1 className="text-5xl font-bold">Sanaullah Sani</h1>

                    <p className="pt-4"><FontAwesomeIcon className='mr-1' icon={faAt} />sanaullah.sani756@gmail.com</p>

                    <p className="pt-4"><FontAwesomeIcon className='mr-2' icon={faLocationDot} />Dhaka, Bangladesh</p>

                    <p className="pt-4"><FontAwesomeIcon className='mr-2' icon={faBriefcase} />Student</p>

                    <div className='my-10'>
                        <a target='_blank' href='#' rel="noreferrer"><FontAwesomeIcon className='h-8 m-3 hover:text-primary hover:scale-125 transition-all' icon={faFacebookF} /></a>
                        <a target='_blank' href={faLinkedin} rel="noreferrer"><FontAwesomeIcon className='h-8 m-3 hover:text-primary hover:scale-125 transition-all' icon={faLinkedin} /></a>
                        <a target='_blank' href="#" rel="noreferrer"><FontAwesomeIcon className='h-8 m-3 hover:text-primary hover:scale-125 transition-all' icon={faTwitter} /></a>
                    </div>
                </div>
                <img src='https://i.ibb.co/YTvHMWc/IMG-20220529-001946.jpg' className="z-20 h-60 object-cover w-2/3 right-0 shadow-2xl rounded-full mt-3 md:m-0 md:w-1/3 md:-right-10 md:rounded-lg md:h-fit md:scale-110 md:absolute lg:w-fit lg:h-full" alt='' />
            </div>


        </div>
    );
};

export default Portfolio;