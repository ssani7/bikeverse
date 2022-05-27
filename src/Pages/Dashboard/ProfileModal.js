import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState, useUpdateEmail, useUpdatePassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const ProfileModal = ({ setRefetch, refetch, user }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [currentUser, userLoading] = useAuthState(auth)
    const [updateEmail, emEpdating, emError] = useUpdateEmail(auth);
    const [updatePassword, updating, error] = useUpdatePassword(auth);
    const [updateProfile, pUpdating, pError] = useUpdateProfile(auth);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setemail] = useState('');
    const [address, setaddress] = useState('');
    const [profession, setprofession] = useState('');
    const [facebook, setFacebook] = useState('');
    const [linkedIn, setlinkedIn] = useState('');
    const [twitter, settwitter] = useState('');

    const [loading, setLoading] = useState(false);

    console.log(emError)

    useEffect(() => {
        if (userLoading || emEpdating || updating || pUpdating) {
            setLoading(true);
        }
        else if (!(userLoading || emEpdating || updating || pUpdating)) {
            setLoading(false)
        }
    }, [userLoading, emEpdating, updating, pUpdating])


    const updateUserDb = (updatedData) => {
        axios.put(`https://bikeverse-assignment-12.herokuapp.com/user/${currentUser?.email}`, updatedData, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                const { data } = res;
                if (data) {
                    setLoading(false)
                    toast.success('Updated Profile');
                    setRefetch(!refetch)
                }
            })
            .catch(err => {
                if (err.response.status === 401 || err.response.status === 403) {
                    toast.error(`You do not have access. Try logging in again`)
                    signOut(auth)
                    return
                }
            })
    }
    const imageApiKey = '906bfdafb7a4a5b92021d570714ff50f';

    const onSubmit = async (data) => {
        setLoading(true);
        const image = data.dp[0];
        const formData = new FormData();
        formData.append('image', image);

        await axios.post(`https://api.imgbb.com/1/upload?key=${imageApiKey}`, formData)
            .then(res => {
                const { data } = res;
                const photo = data.data.url;
                updateUserDb({ photo: photo });
                updateProfile({ photoURL: photo })
            });

    }

    const handleUpdate = async (field) => {

        switch (field) {
            case "name":
                await updateProfile({ displayName: name });
                updateUserDb({ name: name })
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
            case "facebook":
                updateUserDb({ facebook })
                break
            case "linkedIn":
                updateUserDb({ linkedIn })
                break
            case "twitter":
                updateUserDb({ twitter })
                break
            default:
                console.log(field);
                break
        }
    }

    return (
        <div>
            <input type="checkbox" id="profile-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl ">
                    {
                        loading && <button class="btn loading absolute w-full h-full opacity-75 left-0 top-0">Updating Profile</button>
                    }
                    <label htmlFor="profile-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Update Your Profile</h3>
                    <div class="form-control w-fit mx-auto">

                        <label class="input-group input-group-md mt-3">
                            <span>Name</span>
                            <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Update Name" class="input input-bordered input-md w-96" />
                            <button disabled={name === ''} onClick={() => handleUpdate("name")} class="btn btn-square w-fit px-3">Update
                            </button>
                        </label>
                        <label class="input-group input-group-md mt-3">
                            <span>Email</span>
                            <input required onChange={(e) => setemail(e.target.value)} type="email" placeholder="Update Email" class="input input-bordered input-md w-96" />
                            <button disabled={email === ""} onClick={() => handleUpdate("email")} class="btn btn-square w-fit px-3">Update
                            </button>
                        </label>
                        <label class="input-group input-group-md mt-3">
                            <span>Password</span>
                            <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Update Password" class="input input-bordered input-md w-96" />
                            <button disabled={password === ''} onClick={() => handleUpdate('password')} class="btn btn-square w-fit px-3">Update
                            </button>
                        </label>
                        <label class="input-group input-group-md mt-3">
                            <span>Profession</span>
                            <input onChange={(e) => setprofession(e.target.value)} type="text" placeholder="Update Profession" class="input input-bordered input-md w-96" />
                            <button disabled={profession === ''} onClick={() => handleUpdate('profession')} class="btn btn-square w-fit px-3">Update
                            </button>
                        </label>
                        <label class="input-group input-group-md mt-3">
                            <span>Address</span>
                            <input onChange={(e) => setaddress(e.target.value)} type="text" placeholder="Address" class="input input-bordered input-md w-96" />
                            <button disabled={address === ''} onClick={() => handleUpdate('address')} class="btn btn-square w-fit px-3">Update
                            </button>
                        </label>

                        <label class="input-group input-group-md mt-3">
                            <span>Display Picture</span>
                            <input {...register('dp')} type="file" placeholder="Update Display Picture" class="input input-bordered input-md w-96" />
                            <button onClick={handleSubmit(onSubmit)} class="btn btn-square w-fit px-3">Update
                            </button>
                        </label>
                        <label class="input-group input-group-md mt-3">
                            <span>Facebook Profile Link</span>
                            <input onChange={(e) => setFacebook(e.target.value)} type="text" placeholder="Update Facebook Profile Link" class="input input-bordered input-md w-96" />
                            <button disabled={facebook === ''} onClick={() => handleUpdate('facebook')} class="btn btn-square w-fit px-3">Update
                            </button>
                        </label>
                        <label class="input-group input-group-md mt-3">
                            <span>LinledIn Profile Link</span>
                            <input onChange={(e) => setlinkedIn(e.target.value)} type="text" placeholder="Update LinledIn Profile Link" class="input input-bordered input-md w-96" />
                            <button disabled={linkedIn === ''} onClick={() => handleUpdate('linkedIn')} class="btn btn-square w-fit px-3">Update
                            </button>
                        </label>
                        <label class="input-group input-group-md mt-3">
                            <span>Twitter Profile Link</span>
                            <input onChange={(e) => settwitter(e.target.value)} type="text" placeholder="Update Twitter Profile Link" class="input input-bordered input-md w-96" />
                            <button disabled={twitter === ''} onClick={() => handleUpdate('twitter')} class="btn btn-square w-fit px-3">Update
                            </button>
                        </label>

                    </div>

                </div>
            </div>
        </div >
    );
};

export default ProfileModal;