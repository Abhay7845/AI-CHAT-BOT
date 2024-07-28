import React, { useState } from "react";
import "../style/Login.css"
import { Avatar } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HOST_URL } from "../common/HostApi";
import { toast } from 'react-toastify';

const UserLogin = () => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const GoStudentLogin = () => {
        const loginPayload = {
            email: userEmail,
            password: userPassword,
        }
        if (userEmail && userPassword) {
            setLoading(true);
            axios.post(`${HOST_URL}/login`, loginPayload).then(res => res)
                .then(response => {
                    if (response.data.status === true) {
                        localStorage.setItem("authToken", JSON.stringify(response.data.user));
                        navigate("/ai/query/result");
                    } else if (response.data.status === false) {
                        toast.warn("User not registered with us", { theme: "colored" });
                    }
                    setLoading(false);
                }).catch(error => {
                    toast.error("Internal Server Error", { theme: "colored" });
                    setLoading(false);
                });
        } else {
            toast.error("Please Enter Email & Password", { theme: "colored" });
        }
    };

    return (
        <div className="loginPageStyle">
            <div style={{ height: "350px", width: "550px", padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <h5>Sign In</h5>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="Email" onChange={e => setUserEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <div className="d-flex justify-content-between">
                        <label className="form-label">Password</label>
                        <div style={{ cursor: "pointer" }}>{passwordShown ? <Visibility onClick={() => setPasswordShown(!passwordShown)} /> : <VisibilityOff onClick={() => setPasswordShown(!passwordShown)} />}</div>
                    </div>
                    <input type={passwordShown ? 'text' : 'password'} className="form-control" placeholder="Paasword" onChange={(e) => setUserPassword(e.target.value)} />
                </div>
                <div className="mb-2 d-flex justify-content-between">
                    <Link to="/auth/sign-up" >Don't have an account? Sign Up</Link>
                    <button className="btn btn-primary" type="button" onClick={GoStudentLogin}>
                        {loading === true ? <span><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" /><span>Wait Loging...</span></span> : <span>SIGN IN</span>}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default UserLogin;