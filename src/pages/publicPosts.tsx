import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import Header from "../components/header"
import ReactPaginate from "react-paginate";
import PostCard from "../components/postcard";

import { fetchPublicPosts } from "../utils/api";

export default function PublicPosts() {
    const { username } = useParams();

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [totalPostCount, setTotalPostCount] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [error, setError] = useState('');

    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(5);

    const getPosts = async () => {
        setIsLoading(true);

        if (username) {
            const data = await fetchPublicPosts(username, skip, limit);
            if (!data.error) {
                setPosts(data.message.posts);
                setTotalPostCount(data.message.count);
                setPageCount(Math.ceil(data.message.count / limit));
                setIsLoading(false);
            } else {
                setIsLoading(false);
                setError(data.message);
            }
        } else {
            setError("No valid username found!");
        }
    }

    useEffect(() => {
        getPosts();
    }, [skip, totalPostCount]);

    const handlePageClick = (e: any) => {
        const newOffset = (e.selected * limit) % totalPostCount;
        setSkip(newOffset);
    };

    return <>
        <Header />
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-8 text-center">
                    <h3 className="p-3 fw-bold">Posts</h3>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-8 text-center">

                    {/* loading posts */}
                    {isLoading &&
                        <div className="text-center">
                            <div className="spinner-border" role="status"><span className="visually-hidden">Loading</span></div>
                        </div>
                    }
                    {/* zero posts */}
                    {posts.length <= 0 && <div>Looks like <span className="fw-bold">{username}</span>  does not have any public posts!
                    </div>}

                    <div>
                        {error !== '' &&
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">{error}
                                <button type="button" onClick={() => setError('')} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        }
                    </div>

                    <div>
                        {posts && posts.map((post, index) => <PostCard key={index} username={username} post={post} handleDelete={null} />)}
                    </div>

                    <div className="d-flex justify-content-center">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            containerClassName="d-flex flex-row justify-content-space-between list-unstyled mb-2 p-3"
                            pageClassName="px-1 py-1"
                            previousClassName=" px-1 py-1"
                            nextClassName=" px-1 py-1"
                            previousLinkClassName="text-decoration-none"
                            nextLinkClassName="text-decoration-none"
                            disabledLinkClassName="d-none"
                            previousLabel="< previous"
                            renderOnZeroPageCount={null}
                        />
                    </div>

                    <div className="d-flex justify-content-center">
                        ({skip}-{skip + limit < totalPostCount ? skip + limit : totalPostCount}) of {totalPostCount}
                    </div>

                </div>
            </div>
        </div>
    </>
}