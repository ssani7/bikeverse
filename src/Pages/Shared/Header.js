import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
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
        <li><Link to='/shop'>Shop</Link></li>
        <li><Link to='/shop'>Shop</Link></li>
        <li><Link to='/shop'>Contact Us</Link></li>
        <li><Link to='/shop'>About</Link></li>
        {
            user
                ? <li><span onClick={handleSignOut}>Sign Out</span></li>
                : <li><Link to='/login'>Login</Link></li>
        }
    </>


    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabindex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabindex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {headerItems}
                    </ul>
                </div>
                <Link className="btn btn-ghost normal-case text-3xl font-bold" to='/home'>Cameraverse</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {headerItems}
                </ul>
            </div>
        </div>
    );
};

export default Header;