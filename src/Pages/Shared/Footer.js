import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <div>
            <footer className="footer grid-cols-3 p-10 bg-base-200 text-base-content justify-center md:justify-evenly ">
                <div className=''>
                    <span className="footer-title">Services</span>
                    <a className="link link-hover">Web Applications</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Database</a>
                    <a className="link link-hover">Development</a>
                </div>
                <div className=''>
                    <span className="footer-title">Skills</span>
                    <a className="link link-hover">React JS</a>
                    <a className="link link-hover">Node.js</a>
                    <a className="link link-hover">MongoDb</a>
                    <a className="link link-hover">Firebase</a>
                </div>
                <div className=''>
                    <span className="footer-title">Design</span>
                    <a className="link link-hover">CSS</a>
                    <a className="link link-hover">Tailwind</a>
                    <a className="link link-hover">Bootstrap</a>
                </div>
            </footer>
            <footer className="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300 justify-center lg:justify-evenly">
                <div className="grid-flow-col text-center justify-self-center">
                    <p>Cameraverse <br />Providing reliable tech since 1992</p>
                </div>
                <div className="text-center grid-flow-col">
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Cameraverse</p>
                </div>
                <div className="md:place-self-center md:justify-self-end justify-self-center">
                    <div className="grid grid-flow-col gap-4 justify-self-center">
                        <a target='_blank' href="https://web.facebook.com/im5ani/" rel="noreferrer"><FontAwesomeIcon icon={faFacebookF} className='h-6' /></a>
                        <a target='_blank' href="https://twitter.com/sanaullahsani07" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} className='h-6' /></a>
                    </div>
                    <p>sanaullah.sani756@gmail.com</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;