import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import Tippy from '@tippyjs/react';
import { Link, useNavigate } from "react-router-dom";

const SideBaar = () => {
    const navigate = useNavigate();
    const Logout = () => {
        localStorage.clear();
        navigate('/');
    }
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const email = authToken.email;
    const splitName = email.split("@");
    const userName = splitName.join('').match(/[a-zA-Z]+/g) || [];
    return (
        <div className="AdminSidebarStyle">
            <h6 className="side_brandName">WELCOME</h6>
            <hr style={{ color: "#fff", border: "1px solid #fff" }} />
            <ul className="mt-2">
                <Link to="/ai/query/result" className="NavigationStyle">AI CHAT BOT</Link>
            </ul>
            <ul className="mt-2">
                <Link to="/add/students/marks/details" className="NavigationStyle">ADD STUDENT MARKS</Link>
            </ul>
            <Tippy content={<span>Logout</span>}>
                <div className="userLogout" onClick={Logout}>
                    <BsPersonCircle size={23} />
                    <h6 className="mx-2 mt-2">{userName.length > 0 && userName[0].toUpperCase()}</h6>
                </div>
            </Tippy>
        </div>
    )
}
export default SideBaar;