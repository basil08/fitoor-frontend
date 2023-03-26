export default function PostCard(props: any) {
  const post = props.post;
  const handleDelete = props.handleDelete;

  return (
    <>
      <a href={`/post/${post.id}`} className="text-decoration-none">
        <div className="card p-1 m-2 rounded">
          <div className="card-body">
            <h5 className="card-title text-black">{post.title}</h5>
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
              <a className="text-underline text-danger" onClick={(e) => handleDelete(post.id)}>Delete</a>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}
