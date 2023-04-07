import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import { createNewUser } from "../utils/api";

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState("");
    const [info, setInfo] = useState("");

    const [isLoading, setIsLoading] = useState(false);


    const navigate = useNavigate();

    const handleSignupSubmit = async () => {

        if (!username) {
            setError("Username is required!");
            return;
        }
        
        if (!email) {
            setError("Email is required!");
            return;
        }
        
        if (!password) {
            setError("Password is required!")
            return;
        }
        setIsLoading(true);
        const res = await createNewUser(username, email, password);
        
        if (!res.error) {
            setInfo(res.message);
            navigate('/login');
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

                        <div className="fw-bold fs-4">Signup</div>

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
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="upcoming-panda"
                                onChange={(e) => setUsername(e.target.value)}
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
                            <button className={`btn btn-primary ${isLoading ? 'disabled' : ''}`} onClick={() => handleSignupSubmit()}>
                                {isLoading && <span>Signing up...</span>}
                                {!isLoading && <span>Signup</span>}

                            </button>
                        </div>


                        <div className="my-3 row justify-content-center">
                            Already have an account? Then, login!
                        </div>
                        <div className="my-3 row justify-content-center">
                            <div className="col text-end">
                                <button className="btn btn-secondary" onClick={() => navigate('/login')}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}