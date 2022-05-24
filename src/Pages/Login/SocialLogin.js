import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const SocialLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    // const [token] = useToken(user);

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true })
        }
    }, [user, navigate, from])
    return (
        <div>
            <button onClick={() => signInWithGoogle()} className="btn btn-outline normal-case w-full">{loading
                ? <>
                    <span className="animate-spin border-4 rounded-full h-5 w-5 mr-3 border-gray-400 border-t-gray-50" viewBox="0 0 24 24">
                    </span>
                    Processing...
                </>
                : <> <FontAwesomeIcon icon={faGoogle} /> Continue With google </>}</button>
            {error && <p className='text-red-500 mt-1 text-center'><small>{error.message}</small></p>}
        </div>
    );
};

export default SocialLogin;