import { useEffect, useState } from "react"

const useAdmin = (user) => {
    const [admin, setAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);

    useEffect(() => {
        fetch(`https://bikeverse-assignment-12.herokuapp.com/admin/${user?.email}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                setAdmin(data)
                setAdminLoading(false)
            })
    }, [user])

    return [admin, adminLoading]
}

export default useAdmin;