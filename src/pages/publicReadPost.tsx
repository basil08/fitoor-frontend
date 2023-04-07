import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import Header from "../components/header";
import { fetchPublicPost } from "../utils/api";

import { parseEmoji } from "../utils/api";
import Comments from "../components/comments";

export default function PublicReadPost() {

  const { username, postId } = useParams();
  const [postData, setPostData] = useState<any>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getPostData = async () => {
    setIsLoading(true);
    if (postId && username) {
      const data = await fetchPublicPost(username, postId);
      if (!data.error) {
        console.log(data);
        setPostData(data);
        setIsLoading(false);
      } else {
        setError(data.message);
        setIsLoading(false);
      }
    } else {
      setError("No username or postId provided!");
    }
  };



  useEffect(() => { getPostData() }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-8">
            {isLoading && (
              <div className="text-center p-4">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
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
                    source={parseEmoji(postData.raw)}
                    style={{ whiteSpace: "pre-wrap" }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>


        {postData && postData.commentsEnabled ?
          <div className="row justify-content-center">
            <div className="col-6">
              {/* <CreateNewCommentForm handleCommentSubmit={handleCommentSubmit} /> */}
              <Comments postId={postId} />
            </div>
          </div>
          :
          <div className="row justify-content-center">
            <div className="col my-3 text-center">
              Comments are disabled for this post!
            </div></div>
        }
      </div>
    </>
  );
}
