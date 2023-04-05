import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";

import { getUserProfile, loginUser } from "../utils/api";
import logoutGuard from "../utils/logoutguard";

export default function Login() {
    useEffect(logoutGuard(useNavigate()), []);

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSubmit = async () => {
        const res = await loginUser(email, password);

        if (!res.error) {
            navigate('/');
        } else {
            window.alert(res.message);
        }
    }

    return (
        <>
            <Header />

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-5">
                        <div className="fw-bold fs-4">Login</div>

                        <div className="my-3">
                            <label htmlFor="emailField" className="form-label">
                                Email
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="emailField"
                                placeholder="user@example.com"
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
                            <button className="btn btn-primary" onClick={() => handleLoginSubmit()}>Submit</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
