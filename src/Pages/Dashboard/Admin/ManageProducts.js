import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../../Shared/Loading';

const ManageProducts = () => {
    const { data: parts, isLoading, refetch } = useQuery('parts', () => fetch('http://localhost:5000/parts').then(res => res.json()));

    const deletePart = (part) => {
        axios.delete(`http://localhost:5000/part/${part._id}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    toast.error("Failed to update. Try signing in again")
                }
                const { data } = res;
                if (data.deletedCount >= 1) {
                    toast.success(`Deleted Part ${part.name}`);
                    refetch();
                }
            })
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
                        <th>Part</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Minimum sell</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        parts.map((part, i) => <tr key={i} className='hover'>
                            <th>{i + 1}</th>
                            <td>{part.name}</td>
                            <td>{part.stock}</td>
                            <td>{part.price}</td>
                            <td>{part.minimumSell}</td>
                            <td>
                                <div className="tooltip tooltip-info" data-tip="cancel part">
                                    <button onClick={() => deletePart(part)} className='bg-red-600 rounded-full p-2 w-9  h-fit'><FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default ManageProducts;