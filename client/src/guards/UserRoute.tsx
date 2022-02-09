import { RootStateOrAny, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

export function UserRoute() {
    const { user } = useSelector((state: RootStateOrAny) => state.user);

    if (Object.keys(user).length !== 0) {
        return <>
            <NavBar />
            <Outlet />
        </>
    } else {
        return <Navigate to={'/sign-in'} />
    }
}