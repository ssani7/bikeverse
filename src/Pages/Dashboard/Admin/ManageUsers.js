import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import UserRow from './UserRow';

const ManageUsers = () => {
    const [users, setUsers] = useState([])
    const [refetch, setRefetch] = useState(false);

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
    }, [refetch])
    return (
        <div className="overflow-x-auto h-full w-full">
            <table className="table w-full">
                {/* <!-- head --> */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* <!-- row 1 --> */}
                    {
                        users.map((user, i) => <UserRow
                            key={i}
                            user={user}
                            setRefetch={setRefetch}
                        ></UserRow>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;