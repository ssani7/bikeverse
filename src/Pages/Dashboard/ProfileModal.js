import { async } from '@firebase/util';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useUpdateEmail, useUpdatePassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const ProfileModal = ({ setRefetch, refetch, userData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
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

    useEffect(() => {
        if (emEpdating || updating || pUpdating) {
            setLoading(true);
        }
        else if (!(emEpdating || updating || pUpdating)) {
            setLoading(false)
        }
    }, [emEpdating, updating, pUpdating])

    let showError;
    if (error || emError || pError) {
        showError = error || emError || pError;
        console.log(showError)
    }

    if (loading) {
        return <Loading></Loading>
    }

    const updateUserDb = async (updatedData) => {
        await axios.put(`https://bikeverse-assignment-12.herokuapp.com/user/${userData?._id}`, updatedData, {
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
                updateEmail(email);
                updateUserDb({ email: email });
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
                        loading && <button className="btn loading absolute w-full h-full opacity-75 left-0 top-0">Updating Profile</button>
                    }
                    <label htmlFor="profile-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Update Your Profile</h3>
                    <div className="form-control w-fit mx-auto">

                        <label className="input-group input-group-md mt-3">
                            <span>Name</span>
                            <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Update Name" className="input input-bordered input-md w-96" />
                            <button disabled={name === ''} onClick={() => handleUpdate("name")} className="btn btn-square w-fit px-3">Update
                            </button>
                        </label>
                        <label className="input-group input-group-md mt-3">
                            <span>Email</span>
                            <input required onChange={(e) => setemail(e.target.value)} type="email" placeholder="Update Email" className="input input-bordered input-md w-96" />
                            <button disabled={email === ""} onClick={() => handleUpdate("email")} className="btn btn-square w-fit px-3">Update
                            </button>
                        </label>
                        <label className="input-group input-group-md mt-3">
                            <span>Password</span>
                            <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Update Password" className="input input-bordered input-md w-96" />
                            <button disabled={password === ''} onClick={() => handleUpdate('password')} className="btn btn-square w-fit px-3">Update
                            </button>
                        </label>
                        <label className="input-group input-group-md mt-3">
                            <span>Profession</span>
                            <input onChange={(e) => setprofession(e.target.value)} type="text" placeholder="Update Profession" className="input input-bordered input-md w-96" />
                            <button disabled={profession === ''} onClick={() => handleUpdate('profession')} className="btn btn-square w-fit px-3">Update
                            </button>
                        </label>
                        <label className="input-group input-group-md mt-3">
                            <span>Address</span>
                            <input onChange={(e) => setaddress(e.target.value)} type="text" placeholder="Address" className="input input-bordered input-md w-96" />
                            <button disabled={address === ''} onClick={() => handleUpdate('address')} className="btn btn-square w-fit px-3">Update
                            </button>
                        </label>

                        <label className="input-group input-group-md mt-3">
                            <span>Display Picture</span>
                            <input {...register('dp')} type="file" placeholder="Update Display Picture" className="input input-bordered input-md w-96" />
                            <button onClick={handleSubmit(onSubmit)} className="btn btn-square w-fit px-3">Update
                            </button>
                        </label>
                        <label className="input-group input-group-md mt-3">
                            <span>Facebook Profile Link</span>
                            <input onChange={(e) => setFacebook(e.target.value)} type="text" placeholder="Update Facebook Profile Link" className="input input-bordered input-md w-96" />
                            <button disabled={facebook === ''} onClick={() => handleUpdate('facebook')} className="btn btn-square w-fit px-3">Update
                            </button>
                        </label>
                        <label className="input-group input-group-md mt-3">
                            <span>LinledIn Profile Link</span>
                            <input onChange={(e) => setlinkedIn(e.target.value)} type="text" placeholder="Update LinledIn Profile Link" className="input input-bordered input-md w-96" />
                            <button disabled={linkedIn === ''} onClick={() => handleUpdate('linkedIn')} className="btn btn-square w-fit px-3">Update
                            </button>
                        </label>
                        <label className="input-group input-group-md mt-3">
                            <span>Twitter Profile Link</span>
                            <input onChange={(e) => settwitter(e.target.value)} type="text" placeholder="Update Twitter Profile Link" className="input input-bordered input-md w-96" />
                            <button disabled={twitter === ''} onClick={() => handleUpdate('twitter')} className="btn btn-square w-fit px-3">Update
                            </button>
                        </label>
                        <p className='text-center text-error text-sm'>{showError?.message}</p>
                    </div>

                </div>
            </div>
        </div >
    );
};

export default ProfileModal;