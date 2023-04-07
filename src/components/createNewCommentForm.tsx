import { useState } from "react";

export default function CreateNewCommentForm(props: any) {
    const handleCommentSubmit = props.handleCommentSubmit;

    const [nickname, setNickname] = useState("");
    const [text, setText] = useState("");
    const [email, setEmail] = useState("");

    const [info, setInfo] = useState("");
    const [error, setError] = useState("");

    const [isLoading, setIsLoading] = useState(false);


    return <>
        <div className="form p-3 bg-gray100 rounded my-2">

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
                <div className="col-10">
                    <div className="my-3">
                        <input
                            type="text"
                            className="form-control"
                            id="commentText"
                            placeholder="Your comment..."
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                </div>
                <div className="col">

                    <div className="my-3 row justify-content-center">
                        <button className={`btn btn-primary ${isLoading ? 'disabled' : ''}`} onClick={() => handleCommentSubmit(email, nickname, text)}>
                            {isLoading && <span>Submitting...</span>}
                            {!isLoading && <span>Submit</span>}

                        </button>
                    </div>

                </div>
            </div>

        </div>
    </>
}