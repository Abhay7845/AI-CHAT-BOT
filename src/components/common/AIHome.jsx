import React from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';

const AIHome = () => {
    return (
        <div>
            <div className="row mx-0">
                <div className="col-md-6 TypeAnimationStyle">
                    <TypeAnimation
                        sequence={[
                            'WELCOME USERS !', 2000,
                            'WELCOME TO THE TITAN AI CHAT BOT !', 2000,
                            'THIS IS PRETREND AI CHAT BOT !', 2000,
                            'IT WILL HELP YOU RELATED TO YOUR QUERY !', 2000,
                        ]}
                        wrapper="span"
                        speed={30}
                        style={{ fontSize: "23px", fontWeight: "bold" }}
                        repeat={Infinity}
                    />
                </div>
                <div className="col-md-6 loginOrSignUpStyle">
                    <Link to="/auth/log-in" className="loginSignBtn mx-1">Log in</Link>
                    <Link to="/auth/sign-up" className="loginSignBtn mx-1">Sign up</Link>
                </div>
            </div>
        </div>
    )
}
export default AIHome;