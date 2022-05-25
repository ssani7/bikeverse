import React, { useEffect } from 'react';
import { useSignInWithFacebook, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import google from '../../images/icons/Social/google.png'
import facebook from '../../images/icons/Social/facebook.png'

const SocialLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithFacebook, fUser, fLoading, fError] = useSignInWithFacebook(auth);

    // const [token] = useToken(user);

    useEffect(() => {
        if (user || fUser) {
            navigate(from, { replace: true })
        }
    }, [user, fUser, navigate, from])
    return (
        <div>
            <button onClick={() => signInWithGoogle()} className="btn btn-outline normal-case w-full mb-4">{loading
                ? <>
                    <span className="animate-spin border-4 rounded-full h-5 w-5 mr-3 border-gray-400 border-t-gray-50" viewBox="0 0 24 24">
                    </span>
                    Processing...
                </>
                : <> <img src={google} className='h-6 mr-3' alt="" /> Continue With google </>}</button>
            {error && <p className='text-red-500 mt-1 text-center'><small>{error.message}</small></p>}

            <button onClick={() => signInWithFacebook()} className="btn btn-outline normal-case w-full mb-4">{fLoading
                ? <>
                    <span className="animate-spin border-4 rounded-full h-5 w-5 mr-3 border-gray-400 border-t-gray-50" viewBox="0 0 24 24">
                    </span>
                    Processing...
                </>
                : <> <img src={facebook} className='h-6 mr-3' alt="" /> Continue With Facebook </>}</button>
            {fError && <p className='text-red-500 mt-1 text-center'><small>{fError.message}</small></p>}
        </div>
    );
};

export default SocialLogin;