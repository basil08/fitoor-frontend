import { useState, useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import CreatePost from "./pages/createPost";
import PostList from "./pages/postList";
import ReadPost from "./pages/readPost";
import UpdatePost from "./pages/updatePost";

import "./App.css";
import "./custom.scss";

// Implement all required features and enhancements to Editor
// required packages are installed: see package.json
// See this page: https://www.npmjs.com/package/@uiw/react-md-editor

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreatePost />} />
        <Route path="/update/:postId" element={<UpdatePost />} />
        <Route path="/post">
          <Route path="" element={<PostList />} />
          <Route path=":postId" element={<ReadPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
