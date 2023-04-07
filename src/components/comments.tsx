import { useState, useEffect, useRef } from "react"
import { fetchComments } from "../utils/api";
import CommentCard from "./commentCard";
import CreateNewCommentForm from "./createNewCommentForm";
import { createNewComment } from "../utils/api";

export default function Comments(props: any) {
    const postId = props.postId || null;

    const [comments, setComments] = useState([]);

    const [showCommentForm, toggleCommentForm] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');


    const recaptchaRef = useRef<any>(null);

    const getComments = async () => {
        setIsLoading(true);

        const data = await fetchComments(postId);
        console.log(data);

        if (!data.error) {
            setComments(data.message);
        } else {
            setError(data.message);
        }
        setIsLoading(false);
    }


    const handleCommentSubmit = async (email: string, nickname: string, text: string) => {
        setIsLoading(true);

        if (recaptchaRef.current) {
            const captchaToken = await recaptchaRef.current.executeAsync();
            recaptchaRef.current.reset();
            if (postId) {
                const res = await createNewComment(postId, email, text, nickname, captchaToken);
                if (!res.error) {
                    setInfo("Comment created successfully!");
                } else {
                    setError("Oops, something went wrong :(");
                }
            }
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getComments();
    }, []);

    return <>

        <div className="container">
            <div className="row justify-content-center">
                <div className="col-8">
                    {isLoading &&
                        <div className="text-center">
                            <div className="spinner-border" role="status"><span className="visually-hidden">Loading</span></div>
                        </div>
                    }
                    {info !== '' &&
                        <div className="alert alert-info alert-dismissible fade show" role="alert">{info}
                            <button type="button" onClick={() => setInfo('')} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    }
                    {error !== '' &&
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">{error}
                            <button type="button" onClick={() => setError('')} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    }
                    <hr />

                    <div className="row justify-content-center">
                        <div className="col">
                            <p className="fs-5">
                                {comments.length} comments
                            </p>
                        </div>
                        <div className="col">
                            <button className="btn btn-secondary" onClick={() => toggleCommentForm(!showCommentForm)}>
                                write a comment
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-12">
                    {showCommentForm &&
                        <CreateNewCommentForm handleCommentSubmit={handleCommentSubmit} recaptchaRef={recaptchaRef} />
                    }
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-8">
                    {comments && comments.map((comment, index) =>
                        <div className="my-2">
                            <CommentCard key={index} comment={comment}
                            />
                        </div>
                    )}
                </div>

            </div>
        </div>
    </>
}