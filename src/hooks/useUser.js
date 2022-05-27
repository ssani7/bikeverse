import axios from "axios";
import { useEffect, useState } from "react"

const useUser = (user) => {
    const [userData, setUserData] = useState({});
    const [refetch, setRefetch] = useState(false)

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
    }, [user, refetch]);

    return [userData, refetch, setRefetch]

}

export default useUser;