import { useState } from "react";
import Header from "../components/header";

export default function Signup() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignupSubmit = () => {
        console.log("todo");


    }


    return (
        <>
            <Header />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-5">

                        <div className="fw-bold fs-4">Signup</div>

                        <div className="my-3">
                            <label htmlFor="emailField" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="user@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="emailField" className="form-label">
                                Email
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="emailField"
                                placeholder="admin@goonj.org"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="passwordField" className="form-label">
                                Password
                            </label>
                            <input type="password" className="form-control" id="passwordField" onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="my-3 row justify-content-center">
                            <button className="btn btn-primary" onClick={() => handleSignupSubmit()}>Submit</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}