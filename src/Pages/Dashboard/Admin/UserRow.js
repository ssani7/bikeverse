import React from 'react';

const UserRow = ({ user }) => {
    const { photo, email, name, role } = user;
    return (
        <>
            <tr>
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
                                <div class="badge badge-accent mx-2">{role}</div>
                            </div>
                            <div className="text-sm opacity-50">{email}</div>
                        </div>
                    </div>
                </td>
                <td>
                    Zemlak, Daniel and Leannon
                    <br />
                </td>
                <td>Purple</td>
            </tr>
        </>
    );
};

export default UserRow;