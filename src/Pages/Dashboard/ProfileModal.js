import { async } from '@firebase/util';
import React, { useState } from 'react';
import { useUpdateEmail, useUpdatePassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const ProfileModal = () => {
    const [updateEmail, emEpdating, emError] = useUpdateEmail(auth);
    const [updatePassword, updating, error] = useUpdatePassword(auth);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setemail] = useState('');
    const [address, setaddress] = useState('');
    const [profession, setprofession] = useState('');
    const [facebool, setfacebool] = useState('');
    const [linkedIn, setlinkedIn] = useState('');
    const [twitter, settwitter] = useState('');
    const [dp, setDp] = useState(null);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (email) {
            await updateEmail(email);
        }
        else if (name) {
            await updatePassword(password);
        }

        console.log(dp);
    }
    return (
        <div>
            <input type="checkbox" id="profile-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <label htmlFor="profile-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Update Your Profile</h3>
                    <form onSubmit={handleUpdate} className='flex flex-col items-center'>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Update Name" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email Address</span>
                            </label>
                            <input onChange={(e) => setemail(e.target.value)} type="text" placeholder="Update Email Address" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input onChange={(e) => setaddress(e.target.value)} type="text" placeholder="Update your address" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Profession</span>
                            </label>
                            <input onChange={(e) => setprofession(e.target.value)} type="text" placeholder="Update Your Profession" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Facebook Profile Link</span>
                            </label>
                            <input onChange={(e) => setfacebool(e.target.value)} type="text" placeholder="Update Facebook Profile Link" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">LinkedIn</span>
                            </label>
                            <input onChange={(e) => setlinkedIn(e.target.value)} type="text" placeholder="Update LinkedIn Profile Link" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Twitter</span>
                            </label>
                            <input onChange={(e) => settwitter(e.target.value)} type="text" placeholder="Update Twitter Profile Link" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Update Twitter Profile Link" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Display Picture</span>
                            </label>
                            <input onChange={(e) => setDp(e.target.value)} type="file" placeholder="Update Twitter Profile Link" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <label htmlFor="my-modal-3" className="btn modal-button mt-4">Update</label>

                        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box relative">
                                <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                <h3 className="text-lg font-bold">Congratulations random Interner user!</h3>
                                <p className="py-4">Confirm To Update Your {name && 'Name, '}{email && 'Email Address, '}{address && 'Address, '}{profession && 'Profession, '}{facebool && 'Facebook Profile Link, '}{linkedIn && 'LinkedIn  profile Link, '}{twitter && 'Twitter Profile link'}{password && 'Account Password'}?</p>
                                <input type="submit" value='Confirm' className='btn btn-primary' />
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div >
    );
};

export default ProfileModal;