import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Header from "../components/header";
import PostCard from "../components/postcard";
import { deletePost, fetchPosts } from "../utils/api";

export default function PostList() {

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const [totalPostCount, setTotalPostCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);

  const getPosts = async () => {
    setIsLoading(true);

    const data = await fetchPosts(skip, limit);
    if (!data.error) {
      setPosts(data.posts);
      setTotalPostCount(data.count);
      setPageCount(Math.ceil(data.count / limit));
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setError(data);
    }
  }

  useEffect(() => {
    getPosts();
  }, [skip, totalPostCount]);

  const handleDelete = async (postId: string) => {
    const data = await deletePost(postId);

    if (!data.error) {
      if (data.deletedCount <= 0) {
        setError("Could not find the post specified!");
      } else {
        setInfo('Successfully deleted post!');
        setTotalPostCount(totalPostCount - 1);
      }
    } else {
      setError("Could not delete post. Check logs");
    }
  }

  const handlePageClick = (e: any) => {
    const newOffset = (e.selected * limit) % totalPostCount;
    setSkip(newOffset);
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-8">

            <h3>Posts</h3>

            {isLoading &&
              <div className="text-center">
                <div className="spinner-border" role="status"><span className="visually-hidden">Loading</span></div>
              </div>
            }

            {posts.length <= 0 && <div>No posts available.{' '}
              <a href="/">Create some!</a>
            </div>}

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
              {posts && posts.map((post, index) => <PostCard key={index} post={post} handleDelete={handleDelete} />)}
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
  )
}