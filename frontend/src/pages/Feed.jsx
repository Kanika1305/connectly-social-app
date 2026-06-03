import "../styles/Feed.css";
import { useState, useEffect } from "react";
import API from "../services/api";

function Feed() {
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts/feed");
      setPosts(res.data);
    } catch (error) {
      console.log("Fetch posts error:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!text.trim()) {
      alert("Please write something before posting");
      return;
    }

    try {
     await API.post("/posts/create", {
  userId: user._id,
  username: user.username,
  text,
  image: "",
});

      
      setText("");
      fetchPosts();
    } catch (error) {
      alert("Post Creation Failed");
      console.log(error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await API.put(`/posts/like/${postId}`, {
        username: user.username,
      });

      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async (postId) => {
    if (!comment.trim()) {
      alert("Please write a comment");
      return;
    }

    try {
      await API.put(`/posts/comment/${postId}`, {
        username: user.username,
        comment,
      });

      setComment("");
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.href = "/login";
};

  return (
    <div className="feed-container">

  <div className="feed-header">

  <div className="header-left">
    <h1>Connectly</h1>

    <p className="tagline">
      Connect • Share • Engage
    </p>
  </div>

  <button
    className="logout-btn"
    onClick={handleLogout}
  >
    Logout
  </button>

</div>



      <div className="create-post">
        <textarea
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <button className="post-btn" onClick={handleCreatePost}>Create Post</button>
      </div>

      <div className="posts-section">
        {posts.length === 0 ? (
          <p>No posts yet...</p>
        ) : (
          posts.map((post) => (
            <div className="post-card" key={post._id}>
              <h3>{post.username}</h3>
              <p>{post.text}</p>

              <div className="actions">
                <span onClick={() => handleLike(post._id)}>
                  ❤️ {post.likes.length} Likes
                </span>

                <span>💬 {post.comments.length} Comments</span>
              </div>

              <input
                type="text"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <button className="comment-btn" onClick={() => handleComment(post._id)}>
                Add Comment
              </button>
              <div className="comments-list">
  {post.comments.map((c, index) => (
    <p key={index}>
      <strong>{c.username}:</strong> {c.comment}
    </p>
  ))}
</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Feed;