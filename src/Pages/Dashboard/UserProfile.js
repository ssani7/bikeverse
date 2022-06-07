import { faFacebookF, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faAt, faBriefcase, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import ProfileModal from './ProfileModal';

const UserProfile = () => {
    const [user, loading] = useAuthState(auth);
    const [userData, setUserData] = useState({})
    const [refetch, setRefetch] = useState(false);

    useEffect(() => {
        axios.get(`https://bikeverse-assignment-12.herokuapp.com/user/${user?.email}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                const { data } = res;
                setUserData(data)
            })
    }, [user, loading, refetch]);

    const { photo, name, email, address, job, facebook, linkedIn, twitter } = userData;
    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className='h-full md:w-full lg:w-2/3 flex justify-center items-center'>
            <div className='bg-gray-700 mx-6 md:w-2/3 text-center md:text-left rounded-2xl flex flex-col-reverse items-center md:flex-row relative'>
                <div className='w-full p-10 text-base-content'>

                    <h1 className="text-5xl font-bold">{name ? name : 'No Name Found'}</h1>

                    <p className="pt-4"><FontAwesomeIcon className='mr-1' icon={faAt} /> {email}</p>

                    <p className="pt-4"><FontAwesomeIcon className='mr-2' icon={faLocationDot} /> {address ? address : "No Address Found"}</p>

                    <p className="pt-4"><FontAwesomeIcon className='mr-2' icon={faBriefcase} /> {job ? job : "No Address Found"}</p>

                    <div className='my-10'>
                        {
                            (linkedIn || facebook || twitter) ? <h2>Social Profile Links</h2> : <h2>Add Your Social Media Here</h2>
                        }

                        <a target='_blank' href={facebook} rel="noreferrer"><FontAwesomeIcon className='h-8 m-3 hover:text-primary hover:scale-125 transition-all' icon={faFacebookF} /></a>
                        <a target='_blank' href={linkedIn} rel="noreferrer"><FontAwesomeIcon className='h-8 m-3 hover:text-primary hover:scale-125 transition-all' icon={faLinkedin} /></a>
                        <a target='_blank' href={twitter} rel="noreferrer"><FontAwesomeIcon className='h-8 m-3 hover:text-primary hover:scale-125 transition-all' icon={faTwitter} /></a>
                    </div>

                    <label htmlFor="profile-modal" className="btn btn-primary modal-button">Update Profile</label>
                </div>
                <img src={photo} className="z-20 h-60 object-cover w-2/3 right-0 shadow-2xl rounded-full mt-3 md:m-0 md:w-1/3 md:-right-10 md:rounded-lg md:h-fit md:scale-110  md:absolute lg:w-fit lg:h-1/2" alt='' />
            </div>
            {
                <ProfileModal
                    userData={userData}
                    refetch={refetch}
                    setRefetch={setRefetch}></ProfileModal>
            }

        </div>

    );
};

export default UserProfile;