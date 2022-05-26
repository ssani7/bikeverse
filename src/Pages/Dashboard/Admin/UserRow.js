import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

const UserRow = ({ user, setRefetch }) => {
    const { photo, email, name, role } = user;

    const makeAdmin = email => {
        fetch(`http://localhost:5000/makeAdmin/${email}`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('Failed to Make an admin');
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success(`Sucessfully made ${email} an admin`);
                    setRefetch();
                }
            })
    }

    return (
        <>
            <tr className='hover'>
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
                    <button onClick={() => makeAdmin(email)} className="btn btn-primary btn-sm">Make Admin</button>
                </td>
                <td><button className="btn btn-error btn-sm">Remove User</button></td>
            </tr>
        </>
    );
};

export default UserRow;