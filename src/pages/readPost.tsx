import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import Header from "../components/header";
import { fetchPost } from "../utils/api";

export default function ReadPost() {
  const { postId } = useParams();
  const [postData, setPostData] = useState<any>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getPostData = async () => {
    setIsLoading(true);
    if (postId) {
      const data = await fetchPost(postId);
      if (!data.error) {
        console.log(data);
        setPostData(data);
        setIsLoading(false);
      } else {
        setError(data.message);
        setIsLoading(false);
      }
    } else {
      setError("No post Id provided!");
    }
  };

  useEffect(() => { getPostData()}, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
  }, []);


  return (
    <>
      <Header />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6">
            {isLoading && (
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
                    source={postData.raw}
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
