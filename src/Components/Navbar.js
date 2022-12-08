import React from "react";

const Navbar = () => {
    return (
        //navigation bat for the user to log in, sign up and go to his profile
        <nav className="navbar">
            <h1>BetterYelp</h1>
            <div className="links">
                <a href="/">Home</a>
                <a href="/SearchTwitter">SearchTwitter</a>
                <a href="/History">History</a>
                <a href="github" style={{
                    color: "white",
                    backgroundColor: "#f1356d",
                    borderRadius: "8px"
                }}>Log in</a>
                <a href="signup" style={{
                    color: "white",
                    backgroundColor: "#f1356d",
                    borderRadius: "8px"
                }}>Sign up</a>
            </div>
        </nav>
     );
}

export default Navbar;
