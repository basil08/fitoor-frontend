import { useState, useEffect } from "react";

import loginGuard from "../utils/loginguard";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import Header from "../components/header";
import { createNewPost } from "../utils/api";



const emoji = require("emoji-dictionary");


export default function CreatePost() {
  const [postData, setPostData] = useState<string | undefined>("");
  const [creatingNewPost, setCreatingNewPost] = useState(false);
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");

  const BASE_URL = 'http://localhost:8080'

  useEffect(loginGuard(useNavigate()), []);

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

    const res = await createNewPost(postData);
    if (!res.error) {
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
          <div className="row p-2 justify-content-center">
            <div className="col text-center">
              <h3 className="fw-bold">New Post</h3>
            </div>
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

          <div className="container">

            <div className="row p-2">
              <div className="col-9 text-end">
                <button className="btn btn-primary" onClick={() => handleSubmit()}>
                  {creatingNewPost && <span>Creating...</span>}
                  {!creatingNewPost && <span>Submit</span>}
                </button>
              </div>
            </div>

            <div className="row">

              <div className="col-9">
                <MDEditor
                  value={postData}
                  height={450}
                  onChange={setPostData}
                  previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                  }}
                />
              </div>

              <div className="col-3">
                <div className="card">
                  <div className="card-title text-center fw-bold">Emoji list</div>
                  <ul className="list-unstyled px-2 ">
                    {emoji.names.map((name: string, index: number) => {
                      return <li key={index}>
                        <div className="row justify-content-end">
                          <div className="col">{name}</div>
                          <div className="col text-end">{emoji.unicode[index]}</div>
                        </div>

                      </li>
                    })}
                  </ul>
                </div>
              </div>
            </div>

          </div>


        </div>

      </div>
    </>
  );
}
