import axios from 'axios';
import { signOut } from 'firebase/auth';
import React from 'react';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';

const UserRow = ({ user, refetch, setRefetch, index }) => {
    const { photo, email, name, role } = user;

    const config = {
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }

    const makeAdmin = email => {

        axios.put(`https://bikeverse-assignment-12.herokuapp.com/makeAdmin/${email}`, config)
            .then(res => {
                if (res.status === 403 || res.status === 401) {
                    toast.error('Failed to Make an admin');
                }
                const { data } = res;
                if (data.modifiedCount > 0) {
                    toast.success(`Sucessfully made ${email} an admin`);
                    setRefetch(!refetch);
                }
            })
    }

    const removeUser = email => {
        axios.delete(`https://bikeverse-assignment-12.herokuapp.com/removeUser/${email}`, config)
            .then(res => {
                if (res.status === 403) {
                    toast.error('Failed to Remove User');
                }
                toast.success(`Removed User ${name}`)
                setRefetch(!refetch)
            })
    }

    return (
        <>
            <tr className='hover'>
                <td>
                    {index}
                </td>
                <td>
                    <div className="flex items-center space-x-3">
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src={photo} alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>
                        <div>
                            <div className='flex'>
                                <div className="font-bold">{name}</div>
                                {(role === 'admin') && <div className="badge badge-info mx-2">{role}</div>}
                            </div>
                            <div className="text-sm opacity-50">{email}</div>
                        </div>
                    </div>
                </td>
                <td>
                    {
                        role === "admin" || <button onClick={() => makeAdmin(email)} className="btn btn-primary btn-sm">Make Admin</button>
                    }

                </td>
                <td><button onClick={() => removeUser(email)} className="btn btn-error btn-sm">Remove User</button></td>
            </tr>
        </>
    );
};

export default UserRow;