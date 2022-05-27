import { async } from '@firebase/util';
import axios from 'axios';
import { updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { useUpdateEmail, useUpdatePassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const ProfileModal = ({ setOpenModal, user }) => {
    const [updateEmail, emEpdating, emError] = useUpdateEmail(auth);
    const [updatePassword, updating, error] = useUpdatePassword(auth);
    const [updateProfile, pUpdating, pError] = useUpdateProfile(auth);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setemail] = useState('');
    const [address, setaddress] = useState('');
    const [profession, setprofession] = useState('');
    const [facebool, setfacebool] = useState('');
    const [linkedIn, setlinkedIn] = useState('');
    const [twitter, settwitter] = useState('');
    const [dp, setDp] = useState(null);

    const updateUserDb = (updatedData) => {
        axios.put(`https://bikeverse-assignment-12.herokuapp.com/user/${user?.email}`, updatedData, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                const { data } = res;
                console.log(data)
                if (data) {
                    toast.success('Updated Profile');
                }
            })
            .catch(err => {
                if (err.response.status === 401 || err.response.status === 403) {
                    toast.error(`You do not have access. Try logging in again`)
                    return
                }
            })
    }

    const handleUpdate = async (field) => {

        switch (field) {
            case "name":
                await updateProfile({ displayName: name });
                break
            case "photo":
                await updateProfile(dp);
                break
            case "email":
                await updateEmail(email)
                break
            case "password":
                await updatePassword(password)
                break
            case "address":
                updateUserDb({ address: address })
                break
            case "profession":
                updateUserDb({ job: profession })
                break
            case "name":
                await updateProfile({ displayName: name })
                break
            case "name":
                await updateProfile({ displayName: name })
                break
            case "name":
                await updateProfile({ displayName: name })
                break
            default:
                console.log(field)
        }
        setOpenModal(false)
    }
    return (
        <div>
            <input type="checkbox" id="profile-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl ">
                    <label htmlFor="profile-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Update Your Profile</h3>

                    <div class="form-control w-fit mx-auto">
                        <label class="input-group input-group-md mt-3">
                            <span>Name</span>
                            <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Update Name" class="input input-bordered input-md w-96" />
                            <button onClick={() => handleUpdate("name")} class="btn btn-square w-fit px-3">Update
                            </button>
                        </label>
                        <label class="input-group input-group-md mt-3">
                            <span>Email</span>
                            <input onChange={(e) => setemail(e.target.value)} type="text" placeholder="Update Email" class="input input-bordered input-md w-96" />
                            <button onClick={() => handleUpdate("email")} class="btn btn-square w-fit px-3">Update
                            </button>
                        </label>
                        <label class="input-group input-group-md mt-3">
                            <span>Password</span>
                            <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Update Password" class="input input-bordered input-md w-96" />
                            <button onClick={() => handleUpdate('password')} class="btn btn-square w-fit px-3">Update
                            </button>
                        </label>
                        <label class="input-group input-group-md mt-3">
                            <span>Profession</span>
                            <input onChange={(e) => setprofession(e.target.value)} type="text" placeholder="Update Profession" class="input input-bordered input-md w-96" />
                            <button onClick={() => handleUpdate('profession')} class="btn btn-square w-fit px-3">Update
                            </button>
                        </label>
                        <label class="input-group input-group-md mt-3">
                            <span>Address</span>
                            <input onChange={(e) => setaddress(e.target.value)} type="text" placeholder="Address" class="input input-bordered input-md w-96" />
                            <button onClick={() => handleUpdate('address')} class="btn btn-square w-fit px-3">Update
                            </button>
                        </label>
                        <label class="input-group input-group-md mt-3">
                            <span>Facebook Profile Link</span>
                            <input onChange={(e) => setaddress(e.target.value)} type="text" placeholder="Update Facebook Profile Link" class="input input-bordered input-md w-96" />
                            <button onClick={() => handleUpdate()} class="btn btn-square w-fit px-3">Update
                            </button>
                        </label>
                        <label class="input-group input-group-md mt-3">
                            <span>LinledIn Profile Link</span>
                            <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Update LinledIn Profile Link" class="input input-bordered input-md w-96" />
                            <button onClick={() => handleUpdate()} class="btn btn-square w-fit px-3">Update
                            </button>
                        </label>
                        <label class="input-group input-group-md mt-3">
                            <span>Twitter Profile Link</span>
                            <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Update Twitter Profile Link" class="input input-bordered input-md w-96" />
                            <button onClick={() => handleUpdate()} class="btn btn-square w-fit px-3">Update
                            </button>
                        </label>

                    </div>

                </div>
            </div>
        </div >
    );
};

export default ProfileModal;