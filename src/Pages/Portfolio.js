import { faFacebookF, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faAt, faBriefcase, faBuildingColumns, faLocationDot, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Footer from './Shared/Footer';

const Portfolio = () => {
    return (
        <>
            <div className='h-full mt-36 md:w-full lg:w-full flex justify-center items-center'>
                <div className='bg-gray-700 mx-6 md:w-2/3 text-center md:text-left rounded-2xl flex flex-col-reverse items-center md:flex-row relative'>
                    <div className='w-full p-10 text-base-content'>

                        <h1 className="text-5xl font-bold">Sanaullah Sani</h1>

                        <p className="pt-4"><FontAwesomeIcon className='mr-1' icon={faAt} />sanaullah.sani756@gmail.com</p>

                        <p className="pt-4"><FontAwesomeIcon className='mr-2' icon={faLocationDot} />Dhaka, Bangladesh</p>

                        <p className="pt-4"><FontAwesomeIcon className='mr-2' icon={faBriefcase} />Student</p>

                        <p className="pt-4"><FontAwesomeIcon className='mr-2' icon={faUserGraduate} />Bsc in Computer Science & Enginnering</p>

                        <p className="pt-4"><FontAwesomeIcon className='mr-2' icon={faBuildingColumns} />Daffodil International University</p>

                        <div className='my-10'>
                            <a target='_blank' href='fas' rel="noreferrer"><FontAwesomeIcon className='h-8 m-3 hover:text-primary hover:scale-125 transition-all' icon={faFacebookF} /></a>
                            <a target='_blank' href={faLinkedin} rel="noreferrer"><FontAwesomeIcon className='h-8 m-3 hover:text-primary hover:scale-125 transition-all' icon={faLinkedin} /></a>
                            <a target='_blank' href="sdaf" rel="noreferrer"><FontAwesomeIcon className='h-8 m-3 hover:text-primary hover:scale-125 transition-all' icon={faTwitter} /></a>
                        </div>
                    </div>
                    <img src='https://i.ibb.co/YTvHMWc/IMG-20220529-001946.jpg' className="z-20 h-60 object-cover w-2/3 right-0 shadow-2xl rounded-full mt-3 md:m-0 md:w-1/3 md:-right-10 md:rounded-lg md:h-fit md:scale-110 md:absolute lg:w-fit lg:h-full" alt='' />
                </div>
            </div>
            {/* skills  */}
            <h2 className='text-3xl font-bold mt-28 text-center'>Skills</h2>

            <div className="card max-w-5xl bg-purple-900 text-white py-7 mx-auto mt-28  border-b-4 border-b-rose-600">
                <div className="card-body">
                    <h2 className="card-title">HTMT, CSS, Javascript</h2>
                    <p>Work with HTML, CSS, Javascript fluently and feel comfortable and much more dyamic with these amazing tech</p>
                </div>
            </div>
            <div className="card max-w-5xl bg-gray-800 text-white py-7 mx-auto mt-10   border-b-4 border-b-rose-600">
                <div className="card-body">
                    <h2 className="card-title">Bootstrap, Tailwind</h2>
                    <p>Have good efficiency with css frameworks. Prefer tailwind with component library like daisyui, flowbite. Can also work with Bootstrap fluently</p>
                </div>
            </div>
            <div className="card max-w-5xl bg-purple-900 text-white py-7 mx-auto mt-10   border-b-4 border-b-rose-600">
                <div className="card-body">
                    <h2 className="card-title">React, Node.js, MongoDB</h2>
                    <p>Most comfortable working with react and have good knowlendge and skills in React. Use MongoDB with Javascript for backend and node.js runtime </p>
                </div>
            </div>

            {/* projects */}
            <h2 className='text-3xl font-bold mt-24 text-center'>Some Projects</h2>
            <div className='my-20 grid grid-cols-1 md:grid-cols-2 gap-5 justify-items-center items-center w-fit mx-auto'>
                <a href="https://zealous-nobel-72493e.netlify.app/" target='_blank' rel="noreferrer">
                    <div className="card w-80 h-44 shadow-xl image-full ">
                        <figure><img src="https://i.ibb.co/QJqKjY6/wedding.png" alt="Shoes" /></figure>
                        <div className="card-body bg-opacity-20 bg-gray-800 lg:hover:bg-opacity-30">
                            <h2 className="card-title justify-center my-auto">Wedding Planners Website</h2>
                        </div>
                    </div>
                </a>
                <a href="https://assignment9bysani.netlify.app/home" target='_blank' rel="noreferrer">
                    <div className="card w-80 h-44 bg-gray-500 shadow-xl image-full bg-opacity-20 lg:hover:bg-opacity-80">
                        <figure><img src="https://i.ibb.co/Lv6tJpN/review.png" alt="Shoes" /></figure>
                        <div className="card-body bg-opacity-20 bg-gray-800 lg:hover:bg-opacity-30">
                            <h2 className="card-title justify-center my-auto">Tech Review Website</h2>
                        </div>
                    </div>
                </a>
                <a href="https://dcotors-portal-new.web.app/" target='_blank' rel="noreferrer">
                    <div className="card w-80 h-44 bg-gray-500 shadow-xl image-full bg-opacity-20 lg:hover:bg-opacity-80">
                        <figure><img src="https://i.ibb.co/6BRpbXP/doctorsp.png" alt="Shoes" /></figure>
                        <div className="card-body bg-opacity-20 bg-gray-800 lg:hover:bg-opacity-30">
                            <h2 className="card-title justify-center my-auto text-center">Doctors Appointment Website</h2>
                        </div>
                    </div>
                </a>
                <a href="https://assignment11-gpu-incentory.web.app/" target='_blank' rel="noreferrer">
                    <div className="card w-80 h-44 bg-gray-500 shadow-xl image-full bg-opacity-20 lg:hover:bg-opacity-80">
                        <figure><img src="https://i.ibb.co/XFKHBDp/gpu.png" alt="Shoes" /></figure>
                        <div className="card-body bg-opacity-20 bg-gray-800 lg:hover:bg-opacity-30">
                            <h2 className="card-title justify-center my-auto">Tech Inventory</h2>
                        </div>
                    </div>
                </a>

            </div>
        </>
    );
};

export default Portfolio;