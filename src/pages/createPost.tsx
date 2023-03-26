import { useState, useEffect } from "react";

import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import Header from "../components/header";

export default function CreatePost() {
  const [postData, setPostData] = useState<string | undefined>("");

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
  }, []);

  const handleSubmit = () => {};

  return (
    <>
      <Header />
      <div>
        <div className="container">
          <div className="row">
            <h3>New Post</h3>
          </div>
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
        {/* <MDEditor.Markdown
          source={postData}
          style={{ whiteSpace: "pre-wrap" }}
        /> */}
        <div className="row p-2">
          <div className="col text-center">
            <button className="btn btn-primary" onClick={() => handleSubmit()}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
