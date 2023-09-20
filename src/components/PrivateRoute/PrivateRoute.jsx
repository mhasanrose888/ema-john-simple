import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../App";

const PrivateRoute = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);


    return (
        loggedInUser.email ? <Outlet/> : <Navigate to="/login"/>
    );
};

export default PrivateRoute;