import Header from "../components/header";
import PostCard from "../components/postcard";

export default function PostList() {


  // const [posts, setPosts] = useState([]);

  const posts = [
    {
      id: 1,
      title: "Title 1",
      body: "This is blog body",
      timestamp: "2023-03-26T12:59:26.133Z",
      rawText: "# hello, fitoor\n\nThis is a paragraph, I guess?",
    },
    {
      id: 2,
      title: "Title 1",
      body: "This is blog body",
      timestamp: "2023-03-26T12:59:26.133Z",
      rawText: "# hello, fitoor\n\nThis is a paragraph, I guess?",

    },
    {
      id: 3,
      title: "Title 1",
      body: "This is blog body",
      timestamp: "2023-03-26T12:59:26.133Z",
      rawText: "# hello, fitoor\n\nThis is a paragraph, I guess?",

    },
    {
      id: 4,
      title: "Title 1",
      body: "This is blog body",
      timestamp: "2023-03-26T12:59:26.133Z",
      rawText: "# hello, fitoor\n\nThis is a paragraph, I guess?",

    },
    {
      id: 5,
      title: "Title 1",
      body: "This is blog body",
      timestamp: "2023-03-26T12:59:26.133Z",
      rawText: "# hello, fitoor\n\nThis is a paragraph, I guess?",

    },
    {
      id: 6,
      title: "Title 1",
      body: "This is blog body",
      timestamp: "2023-03-26T12:59:26.133Z",
      rawText: "# hello, fitoor\n\nThis is a paragraph, I guess?",

    },
    {
      id: 7,
      title: "Title 1",
      body: "This is blog body",
      timestamp: "2023-03-26T12:59:26.133Z",
      rawText: "# hello, fitoor\n\nThis is a paragraph, I guess?",
    },
  ];

  const handleDelete = async (postId: string) => {
    
  }

  return (
    <>
    <Header />
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-5">
          <h3>Posts</h3>

          {posts && posts.map((post, index) => <PostCard key={index} post={post} handleDelete={handleDelete} />)}
        </div>
      </div>
    </div>

    </>
  )
}