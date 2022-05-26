import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const UserProfile = () => {
    const [user, loading] = useAuthState(auth);
    const { photoURL, displayName, email } = user

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <div className="avatar">
                    <div className="max-w-md rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={photoURL} alt='' />
                    </div>
                </div>
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{displayName}</h2>
                <p><b>Email:</b> {email}</p>
                <div className="card-actions">
                    <button className="btn btn-primary">Update Profile</button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;