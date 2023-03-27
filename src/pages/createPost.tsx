import { useState, useEffect } from "react";

import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import Header from "../components/header";

export default function CreatePost() {
  const [postData, setPostData] = useState<string | undefined>("");
  const [creatingNewPost, setCreatingNewPost] = useState(false);
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");

  const BASE_URL = 'http://localhost:8080'

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
  }, []);

  const handleSubmit = async () => {
    setCreatingNewPost(true);

    if (!postData) {
      setError(`Cannot create empty post! `);
      setCreatingNewPost(false);
      return;
    }

    if (postData.length < 3) {
      setError(`Post is too short to post! (${postData.length} characters)`)
      setCreatingNewPost(false);
      return;
    }
    
    const res: any = await fetch(`${BASE_URL}/api/createPost`, {
      method: 'POST',
      body: JSON.stringify({ raw: postData }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (res.status === 201) {
      setInfo("Created post successfully!");
      setPostData("");
    } else {
      setError("Something went wrong, check console!");
      console.log(res);
    }
    setCreatingNewPost(false);
  };

  return (
    <>
      <Header />
      <div>
        <div className="container">
          <div className="row">
            <h3>New Post</h3>
          </div>
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

          <div className="row">
            <MDEditor
              value={postData}
              height={450}
              onChange={setPostData}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
            />
          </div>
        </div>
        <div className="row p-2">
          <div className="col text-center">
            <button className="btn btn-primary" onClick={() => handleSubmit()}>
              {creatingNewPost && <span>Creating...</span>}
              {!creatingNewPost && <span>Submit</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
