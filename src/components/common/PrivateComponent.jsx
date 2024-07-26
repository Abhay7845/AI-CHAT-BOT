import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponet = () => {
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    return <div> {authToken.token ? <Outlet /> : <Navigate to='/' />}</div>
}
export default PrivateComponet;