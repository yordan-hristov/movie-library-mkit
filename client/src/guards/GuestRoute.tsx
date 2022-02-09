import { RootStateOrAny, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export function GuestRoute({ children }: any) {
    const { user } = useSelector((state: RootStateOrAny) => state.user);

    if (Object.keys(user).length === 0) {
        return <Outlet />
    } else {
        return <Navigate to={'/home'} />
    }
}