import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Post from "./Post";
import "./posts.css";

const Posts = () => {
  const user = useSelector((state) => state.session.user);
  const posts = useSelector((state) =>
    Object.values(state.posts).filter((post) => post.userId !== user.id)
  );

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (posts && user) setIsLoaded(true);
  }, [posts, user]);

  return (
    <>
      {isLoaded &&
        posts.map((post) => <Post key={post.id} post={post} user={user} />)}
    </>
  );
};

export default Posts;
