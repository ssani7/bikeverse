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
        }
    }

    const headerItems = <>
        <li tabindex="0">
        </li>
        <li><CustomLink to='/home'>Home</CustomLink></li>
        <li><CustomLink to='/shop'>Shop</CustomLink></li>
        <li><CustomLink to='/shop'>Contact Us</CustomLink></li>
        <li><CustomLink to='/shop'>About</CustomLink></li>
        <li><CustomLink to='/reviews/all'>Reviews</CustomLink></li>
        {
            user
                ? <li><span onClick={handleSignOut}>Sign Out</span></li>
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
            <div className="navbar lg:justify-between lg:px-16 bg-transparent absolute top-0 w-full z-50 text-black">
                <div className="navbar-start w-full flex justify-between items-center md:w-max">
                    <div className="dropdown">
                        <label tabindex="0" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabindex="0" className="menu menu-compact dropdown-content mt-3 p-2 w-52 bg-transparent">
                            {headerItems}
                        </ul>
                    </div>
                    <span className="normal-case text-3xl font-bold">Bicycleverse</span>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {headerItems}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;