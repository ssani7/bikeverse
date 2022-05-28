import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';
import Footer from '../Shared/Footer';
import Loading from '../Shared/Loading';

const Dashboard = () => {
    const [user, loading] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user);

    if (loading || adminLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='py-16'>
            <div className="drawer drawer-mobile">
                <input id="dashboard" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <Outlet />
                    <label htmlFor="dashboard" className="btn btn-primary z-40 drawer-button lg:hidden absolute bottom-16 left-8 rounded-full">&gt;</label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content text">
                        <li><Link to='/dashboard'>My Profile</Link></li>
                        {
                            admin || <>
                                <li><Link to='orders'>My Orders</Link></li>
                                <li><Link to='addReview'>Add Review</Link></li>
                            </>
                        }
                        {
                            admin && <>
                                <li><Link to='addParts'>Add Products</Link></li>
                                <li><Link to='manegeProduct'>Manage Products</Link></li>
                                <li><Link to='manageOrder'>Manage Orders</Link></li>
                                <li><Link to='manageUser'>Manage Users</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;