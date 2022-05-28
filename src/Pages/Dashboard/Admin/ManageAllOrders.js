import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';

const ManageAllOrders = () => {
    const { isLoading, data: orders, refetch } = useQuery('orders', () => fetch(`http://localhost:5000/orders`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 403 || res.status === 401) {
            signOut(auth);
        }
        return res.json()
    }));

    const cancelOrder = async (order) => {

        await axios.delete(`http://localhost:5000/order/${order._id}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403 || res.status === 401) {
                    signOut(auth);
                }
                toast.success(`Cancelled order ${order.partName} orderId ${order._id}`);
                refetch();
            });
    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="overflow-x-auto h-full w-full">
            <table className="table table-compact lg:table-normal w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Ordered Part</th>
                        <th>Quantity</th>
                        <th>User Name</th>
                        <th>Order Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order, i) => <tr key={i} className='hover'>
                            <th>{i + 1}</th>
                            <td>{order.partName}</td>
                            <td>{order.orderQuantity}</td>
                            <td>{order.customerName}</td>
                            <td>{order.status}</td>
                            <td>
                                <div className="tooltip tooltip-info" data-tip="cancel order">
                                    {
                                        order.status === 'paid' || <button className='bg-red-600 rounded-full p-2 w-9  h-fit'
                                            onClick={() => cancelOrder(order)}><FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    }
                                </div>
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default ManageAllOrders;