import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import UserRow from './UserRow';

const ManageUsers = () => {
    const [users, setUsers] = useState([])
    const [setfetch, refetch] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:5000/users`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => setUsers(data))
    }, [setfetch])
    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                {/* <!-- head --> */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* <!-- row 1 --> */}
                    {
                        users.map((user, i) => <UserRow key={i} user={user}></UserRow>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;