import { useState } from "react";

import { parseEmoji } from "../utils/api";

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
          <a href={`${username}/post/${post._id}`}>
            <h5 className="card-title">{post.title}</h5>
          </a>
          :
          <a href={`/post/${post._id}`}>
            <h5 className="card-title">{post.title}</h5>
          </a>

          }

          <h6 className="card-subtitle mb-2 text-muted">
            {new Date(post.timestamp).toLocaleDateString()}
          </h6>
          <p className="card-text text-black">
            {post.body.length > 50
              ? parseEmoji(post.body.slice(0, 50) + "...")
              : parseEmoji(post.body)}
          </p>

          {handleDelete &&
            <>
              <div className="text-end">
                {/* <button className="btn-sm">Delete</button> */}
                {/* <a className="text-underline text-danger" onClick={(e) => showDeletionModal(true)}>Delete</a> */}
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
    </>
  );
}
