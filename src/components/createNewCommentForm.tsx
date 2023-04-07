import { useState } from "react";
import { GOOGLE_RECAPTCHA_SITE_KEY } from "../utils/api";
import ReCAPTCHA from "react-google-recaptcha";

export default function CreateNewCommentForm(props: any) {
    const handleCommentSubmit = props.handleCommentSubmit;
    const recaptchaRef = props.recaptchaRef;

    const [nickname, setNickname] = useState("");
    const [text, setText] = useState("");
    const [email, setEmail] = useState("");

    const [info, setInfo] = useState("");
    const [error, setError] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    return <>
        <form className="form p-3 bg-gray100 rounded my-2">

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

            <div className="row">
                <div className="col">
                    <div className="my-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="panda@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>


                <div className="col">
                    <div className="my-3">
                        <label htmlFor="nickname" className="form-label">
                            Nickname
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="nickname"
                            placeholder="upcoming-panda"
                            onChange={(e) => setNickname(e.target.value)}
                        />
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col">
                    <div className="my-3">
                        <textarea
                            rows={8}
                            className="form-control"
                            id="commentText"
                            placeholder="Your comment..."
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <p className="small text-muted">You can use emojis too!</p>
            </div>

            <div className="row justify-content-end">
                <div className="my-3 row justify-content-center">
                    <div className="col text-end">
                        <button className={`btn btn-primary ${isLoading ? 'disabled' : ''}`} onClick={() => handleCommentSubmit(email, nickname, text)}>
                            {isLoading && <span>Submitting...</span>}
                            {!isLoading && <span>Submit</span>}
                        </button>
                    </div>
                </div>

            </div>

            <div className="row">
                <div className="col">
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={GOOGLE_RECAPTCHA_SITE_KEY}
                        size="invisible"
                    />
                </div>
            </div>


        </form >
    </>
}