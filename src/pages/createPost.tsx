import { useState, useEffect } from "react";

import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

export default function CreatePost() {
  const [postData, setPostData] = useState<string | undefined>("");

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
  }, []);

  const handleSubmit = () => {};

  return (
    <>
      <div className="App">
        <div className="container">
          <h3>New Post</h3>
          <MDEditor
            value={postData}
            height={500}
            onChange={setPostData}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
          />
        </div>
        <MDEditor.Markdown
          source={postData}
          style={{ whiteSpace: "pre-wrap" }}
        />
        <button className="btn btn-primary" onClick={() => handleSubmit()}>
          Submit
        </button>
      </div>
    </>
  );
}
