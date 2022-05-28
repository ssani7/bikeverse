import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";
import useToken from "../../hooks/useToken";
import Loading from "../Shared/Loading";

function RequireAdmin({ children }) {
    const [user, loading] = useAuthState(auth)
    const [admin, adminLoading] = useAdmin(user);
    const [token] = useToken({ user })
    let location = useLocation();

    if (loading || adminLoading) {
        return <Loading></Loading>
    }

    if (!admin) {
        return <Navigate to="/home" state={{ from: location }} replace />;
    }

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAdmin;