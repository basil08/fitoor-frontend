import { useParams } from "react-router-dom"
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

  const getPost = async () => {
    if (postId) {
      setLoading(true);
      const res = await fetchPost(postId);
      if (!res.error) {
        setPostData(res.raw);
      } else {
        setError(res.error);
      }
      setLoading(false);
    }
  }

  const handleUpdate = async () => {
    setLoading(true);
    if (postId && postData) {
      const res = await updatePost(postId, postData);
      if (!res.error) {
        setInfo("Updated post successfully!");
      } else {
        setError(res.error);
      }
      setLoading(false);
    }
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
              <div className="row py-3">
                {error &&
                  <div className="row">
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      <strong>Error:</strong> {error}
                      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                  </div>
                }
                {info &&
                  <div className="row">
                    <div className="alert alert-info alert-dismissible fade show" role="alert">
                      <strong>Info:</strong> {info}
                      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                  </div>
                }
                {postData &&
                  <MDEditor
                    value={postData}
                    height={450}
                    onChange={setPostData}
                    previewOptions={{
                      rehypePlugins: [[rehypeSanitize]],
                    }}
                  />
                }
                {!postData &&
                  <div className="text-center">
                    <div className="spinner-border" role="status"><span className="visually-hidden">Loading</span></div>
                  </div>
                }
              </div>

              <div className="col-3 text-end">
                <button className="btn btn-primary" onClick={() => handleUpdate()}>
                  {updatingPost && <span>Updating...</span>}
                  {!updatingPost && <span>Update</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}