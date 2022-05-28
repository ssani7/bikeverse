import { useEffect, useState } from "react";

const useToken = (user) => {
    const [token, setToken] = useState('');

    useEffect(() => {
        if (user) {
            const { displayName, email, photoURL } = user?.user;
            const currentUser = { name: displayName, email: email, photo: photoURL }

            if (email) {
                fetch(`https://bikeverse-assignment-12.herokuapp.com/loginUser/${email}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        const accesToken = data.token;
                        localStorage.setItem('accessToken', accesToken)
                        setToken(accesToken)
                    })
            }
        }

    }, [user])

    return [token]
}

export default useToken;