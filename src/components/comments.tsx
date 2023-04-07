import { useState, useEffect } from "react"
import { fetchComments } from "../utils/api";
import CommentCard from "./commentCard";

export default function Comments(props: any) {
    const postId = props.postId || null;

    const [comments, setComments] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');


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
                    {/* {comments.length <= 0 && <div>No comments for this post!</div>} */}

                    <div>
                        {info !== '' &&
                            <div className="alert alert-info alert-dismissible fade show" role="alert">{info}
                                <button type="button" onClick={() => setInfo('')} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        }
                    </div>
                    <div>
                        {error !== '' &&
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">{error}
                                <button type="button" onClick={() => setError('')} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        }
                    </div>

                    <div>
                        {comments && comments.map((comment, index) =>
                            <div className="my-2">
                                <CommentCard key={index} comment={comment}
                                />
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    </>
}