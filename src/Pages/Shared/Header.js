import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import auth from '../../firebase.init';

const Header = () => {
    const [user] = useAuthState(auth);

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
                        <label tabIndex="0" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex="0" className="dropdown-content mt-3 p-2 bg-base-200 rounded-lg custom-menu px-6 mx-auto">
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