import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';

const UserOrders = () => {
    const [user, loading] = useAuthState(auth);
    const { data: orders, isLoading } = useQuery('userOrders', () => fetch(`http://localhost:5000/userOrders/${user?.email}`).then(res => res.json()))

    if (loading || isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="overflow-x-auto h-full w-full">
            {
                !(orders.length === 0) ? <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Order</th>
                            <th>Amount</th>
                            <th>Order Date</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, i) => <tr key={i} className="hover">
                                <th>{i + 1}</th>
                                <td>{order.partName}</td>
                                <td>Desktop Support Technician</td>
                                <td>{order.date}</td>
                                <td>Purple</td>
                            </tr>)
                        }
                    </tbody>
                </table>
                    : <h2 className='text-center text-3xl font-semibold mt-12'>You do not have any orders</h2>
            }


        </div>
    );
};

export default UserOrders;