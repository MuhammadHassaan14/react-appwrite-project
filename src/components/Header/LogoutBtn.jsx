import React from "react";
import authService from "../../appwrite/auth";
import {useDispatch} from "react-redux";
import {logout} from "../../appwrite/authSlice";

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
            authService.logout().then(() => {
                dispatch(logout());
            })
        }
    return (
        <button onClick={logoutHandler} className="inline-block px-4 py-2 bg-blue-100 duration-200 text-white rounded-full">
            Logout
        </button>
    );
}
export default LogoutBtn;