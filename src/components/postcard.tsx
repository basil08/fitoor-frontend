import { useState } from "react";

export default function PostCard(props: any) {
  const post = props.post;
  const handleDelete = props.handleDelete;

  const [showModal, showDeletionModal] = useState(false);

  return (
    <>
      <div className="card p-1 m-2 rounded">
        <div className="card-body">
          <a href={`/post/${post.id}`}>
            <h5 className="card-title">{post.title}</h5>
          </a>

          <h6 className="card-subtitle mb-2 text-muted">
            {new Date(post.timestamp).toLocaleDateString()}
          </h6>
          <p className="card-text text-black">
            {post.body.length > 50
              ? post.body.slice(0, 50) + "..."
              : post.body}
          </p>

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
                  <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  ...
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Understood</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
