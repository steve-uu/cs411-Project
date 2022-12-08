import React, {useState} from "react";
import UserPool from "./UserPool";
import axios from "axios";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onSubmit = (event) => {
        event.preventDefault();
        UserPool.signUp(email, password, [], null, (err, data) => {
            if (err) {
                console.error(err);
            }
            console.log(data);
            console.log(data.message)
            if (data !== null) {
                axios("http://127.0.0.1:5000/registuser?username=" + email + "&password=" + password)
                    .then((response) => {
                        console.log(response.data)
                    });
            }

        });
    };

    return (
        <div className="sign-up">
            <form onSubmit={onSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                ></input>
                <label htmlFor="password">Password</label>
                <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                ></input>

                <button type="submit">Signup</button>
            </form>
        </div>
    );
};


export default SignUp;
