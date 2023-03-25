import { useParams } from "react-router-dom";

export default function ReadPost() {
  const { postId } = useParams();

  return (
    <>
      <div className="container">You are reading: {postId} post Id</div>
    </>
  );
}
