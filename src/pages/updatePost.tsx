import { useNavigate, useParams } from "react-router-dom"
import { fetchPost, updatePost } from "../utils/api";
import { useState, useEffect } from 'react';
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import Header from "../components/header";

export default function UpdatePost() {
  const { postId } = useParams();
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState<string | undefined>('');
  const [error, setError] = useState('');
  const [updatingPost, setUpdatingPost] = useState(false);
  const [info, setInfo] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [disableComments, setDisableComments] = useState(false);

  const navigate = useNavigate();

  const getPost = async () => {
    if (postId) {
      setLoading(true);
      const res = await fetchPost(postId);
      if (!res.error) {
        setPostData(res.raw);
        setDisableComments(!res.commentsEnabled);
        setIsPrivate(res.isPrivate);
      } else {
        setError(res.error);
      }
      setLoading(false);
    }
  }

  const handleUpdate = async () => {
    setUpdatingPost(true);
    if (postId && postData) {
      const res = await updatePost(postId, postData, isPrivate, disableComments);
      if (!res.error) {
        setInfo("Updated post successfully!");
      } else {
        setError(res.error);
      }
      setUpdatingPost(false);
    }
  }

  const handleDisableComments = (val: any) => {
    setDisableComments(val);
  }

  const handlePrivatePost = (val: any) => {
    setIsPrivate(val);
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-9">
            <div className="container">

              <div className="row">
                <div className="col text-center">
                  <p className="fs-2 fw-bold">
                    Update Post
                  </p>
                </div>
              </div>

              <div className="row p-2">
                <div className="col-3">
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="privateToggle" onChange={(e) => handlePrivatePost(e.target.checked)} checked={isPrivate} />
                    <label className="form-check-label" htmlFor="privateToggle">Make private?</label>
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="commentsToggle" onChange={(e) => handleDisableComments(e.target.checked)} checked={disableComments} />
                    <label className="form-check-label" htmlFor="commentsToggle">Disable comments?</label>
                  </div>
                </div>
              </div>
              <div className="row py-3">
                {error &&
                  <div className="row">
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      <strong>Error:</strong> {error}
                      <button type="button" className="btn-close" onClick={() => setError('')} data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                  </div>
                }
                {info &&
                  <div className="row">
                    <div className="alert alert-info alert-dismissible fade show" role="alert">
                      <strong>Info:</strong> {info}
                      <button type="button" className="btn-close" onClick={() => setInfo('')} data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                  </div>
                }


                {!loading &&
                  <MDEditor
                    value={postData}
                    height={450}
                    onChange={setPostData}
                    previewOptions={{
                      rehypePlugins: [[rehypeSanitize]],
                    }}
                  />
                }
                {loading &&
                  <div className="text-center">
                    <div className="spinner-border" role="status"><span className="visually-hidden">Loading</span></div>
                  </div>
                }
              </div>



              <div className="col-3 text-end">
                <button className="btn mx-2 btn-primary" onClick={() => handleUpdate()}>
                  {updatingPost && <span>Updating...</span>}
                  {!updatingPost && <span>Update</span>}
                </button>
                <button className={`btn mx-2 ${updatingPost ? 'disabled' : ''}`} onClick={() => navigate("/post")}>
                  {!updatingPost && <span>Cancel</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}