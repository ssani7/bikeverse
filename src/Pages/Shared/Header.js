import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import auth from '../../firebase.init';

const Header = () => {
    const [user] = useAuthState(auth);
    const [dropdown, setDropdown] = useState(false);

    const handleSignOut = () => {
        const confirm = window.confirm('Proceed to sign out?');
        if (confirm) {
            signOut(auth);
            localStorage.removeItem('accessToken')
        }
    }

    const headerItems = <>
        <li tabIndex="0">
        </li>
        <li><CustomLink to='/home'>Home</CustomLink></li>
        <li><CustomLink to='/shop'>Shop</CustomLink></li>
        <li><CustomLink to='/dashboard'>Dashboard</CustomLink></li>
        <li><CustomLink to='/portfolio'>About Developer</CustomLink></li>
        <li><CustomLink to='/blogs'>Blogs</CustomLink></li>
        <li><CustomLink to='/reviews/all'>Reviews</CustomLink></li>
        {
            user
                ? <li><span className='ml-1' onClick={handleSignOut}>Sign Out</span></li>
                : <li><CustomLink to='/login'>Login</CustomLink></li>
        }
    </>

    function CustomLink({ children, to, ...props }) {
        let resolved = useResolvedPath(to);
        let match = useMatch({ path: resolved.pathname, end: true });

        return (
            <div>
                <Link
                    style={{ textDecoration: match ? "underline" : "none" }}
                    to={to}

                    {...props}
                >
                    {children}
                </Link>
            </div>
        );
    }


    return (
        <div>
            <div className="navbar lg:justify-between lg:px-16 bg-transparent absolute top-0 w-full z-50">
                <div className="navbar-start flex justify-between items-center md:w-max">
                    <div className="dropdown">
                        <label tabIndex="0" className="lg:hidden mr-auto">
                            <label className="btn btn-circle btn-ghost swap swap-rotate">

                                {/* <!-- this hidden checkbox controls the state --> */}
                                <input onChange={() => setDropdown(!dropdown)} id='check' type="checkbox" />

                                {/* <!-- hamburger icon --> */}
                                <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>

                                {/* <!-- close icon --> */}
                                <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
                            </label>
                        </label>
                        <ul tabIndex="0" className={`menu menu-compact lg:hidden ${dropdown ? '' : 'hidden'} mt-3 p-2 shadow bg-base-100 rounded-box absolute items-center text-center`}>
                            {headerItems}
                        </ul>
                    </div>
                    <span className="normal-case text-3xl font-bold transition-all active:scale-95"><Link to='/home'> Bicycleverse</Link></span>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu-horizontal p-0  custom-menu">
                        {headerItems}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;


/* 


*/