import { useState } from "react";

import { parseEmoji } from "../utils/api";
import MDEditor from "@uiw/react-md-editor";

var dayjs = require('dayjs');
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default function PostCard(props: any) {
  const post = props.post;
  const handleDelete = props.handleDelete;
  const username = props.username;

  const [showModal, showDeletionModal] = useState(false);

  return (
    <>
      <div className="card p-1 m-2 rounded">
        <div className="card-body">
          {username ?
            <a href={`${username}/post/${post._id}`} className="text-decoration-none">
              <h5 className="card-title">
                <MDEditor.Markdown
                  source={parseEmoji(post.title)}
                  style={{ whiteSpace: "pre-wrap" }}
                />
              </h5>
            </a>
            :
            <a href={`/post/${post._id}`} className="text-decoration-none">
              <h5 className="card-title">
                <MDEditor.Markdown
                  source={parseEmoji(post.title)}
                  style={{ whiteSpace: "pre-wrap" }}
                />
              </h5>
            </a>

          }

          <h6 className="card-subtitle mb-2 text-muted">
            {dayjs(post.timestamp).fromNow()}
          </h6>
          <p className="card-text text-black">
            {post.body.length > 50
              ?
              <MDEditor.Markdown source={
                parseEmoji(post.body.slice(0, 50) + "...")
              }
                style={{ whiteSpace: "pre-wrap" }}
              />
              :
              <MDEditor.Markdown source={
                parseEmoji(post.body)
              }
                style={{ whiteSpace: "pre-wrap" }}
              />
            }
          </p>
          <div className="container">
            <div className="row text-end">

              <div className="col-11">
                <a href={`/update/${post._id}`}>Update</a>
              </div>
              {handleDelete &&
                <>
                  <div className="col-12">
                    <button className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModalConfirmation">
                      Delete
                    </button>
                  </div>
                  <div className="modal fade" id="deleteModalConfirmation" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="staticBackdropLabel">Are you sure?</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          You are about to delete post {post.title}! Do you wish to continue?
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                          <button type="button" className="btn btn-primary" onClick={() => handleDelete(post._id)} data-bs-dismiss="modal">Yes</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
