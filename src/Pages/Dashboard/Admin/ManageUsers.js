import React, { useEffect, useState } from 'react';
import UserRow from './UserRow';

const ManageUsers = () => {
    const [users, setUsers] = useState([])
    const [refetch, setRefetch] = useState(false);

    useEffect(() => {
        fetch(`https://bikeverse-assignment-12.herokuapp.com/users`, {
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
                        <th></th>
                        <th>Name</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* <!-- row 1 --> */}
                    {
                        users.map((user, index) => <UserRow
                            key={index}
                            index={index + 1}
                            user={user}
                            refetch={refetch}
                            setRefetch={setRefetch}
                        ></UserRow>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;