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


    const [error, setError] = useState("");
    const [info, setInfo] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const handleLoginSubmit = async () => {
        setIsLoading(true);
        const res = await loginUser(email, password);
        if (!res.error) {
            setInfo(res.message);
            navigate('/');
        } else {
            setError(res.message);
        }
        setIsLoading(false);
    }

    return (
        <>
            <Header />

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-5">
                        <div className="fw-bold fs-4">Login</div>

                        {error &&
                            <div className="row">
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Error:</strong> {error}
                                    <button type="button" className="btn-close" onClick={() => setError("")} data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        }
                        {info &&
                            <div className="row">
                                <div className="alert alert-info alert-dismissible fade show" role="alert">
                                    <strong>Info:</strong> {info}
                                    <button type="button" className="btn-close" onClick={() => setInfo("")} data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        }
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
                            <button className={`btn btn-primary ${isLoading ? 'disabled' : ''}`} onClick={() => handleLoginSubmit()}>
                            {isLoading && <span>Logging in...</span>}
                                    {!isLoading && <span>Login</span>}

                            </button>
                        </div>

                        <div className="my-3 row justify-content-center">
                            If you don't have an account, you can
                            register
                            now!
                        </div>
                        <div className="my-3 row justify-content-center">
                            <div className="col text-end">
                                <button className={`btn btn-secondary`} onClick={() => navigate('/signup')}>
                                 Sign up
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
