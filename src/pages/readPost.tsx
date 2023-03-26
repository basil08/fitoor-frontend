import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import Header from "../components/header";

export default function ReadPost() {
  const { postId } = useParams();
  // const [postData, setPostData] = useState();
  const [error, setError] = useState();

  const BASE_URL = "http://localhost:8080";

  // const getPostData = async () => {
  //   const res: any = await fetch(`${BASE_URL}/api/getPost?id=${postId}`, {
  //     method: "GET",
  //   });

  //   if (res.status === 200) {
  //     setPostData(res.data);
  //   } else {
  //     setError(res.error);
  //   }
  // };

  // useEffect(() => { getPostData()}, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
  }, []);

  const postData = {
    id: 1,
    title: "Title 1",
    body: "This is blog body",
    timestamp: "2023-03-26T12:59:26.133Z",
    rawText: "# hello, fitoor\n\nThis is a paragraph, I guess?",
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6">
            {!postData && (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            {postData && (
              <div className="row">
                <div className="col p-3 mt-2 rounded border">
                  <div className="row">
                    <div className="col text-muted text-small">
                      <p>{new Date(postData.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <MDEditor.Markdown
                    source={postData.rawText}
                    style={{ whiteSpace: "pre-wrap" }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
