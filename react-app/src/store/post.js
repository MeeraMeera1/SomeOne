const SET_POSTS = "post/SET_POSTS";
const SET_POST = "post/SET_POST";
const REMOVE_POST = "post/REMOVE_POST"

const setPost = (post) => {
  return {
    type: SET_POST,
    post,
  };
};

const setPosts = (posts) => {
  return {
    type: SET_POSTS,
    posts,
  };
};

const remove = (postId) => {
    return {
      type: REMOVE_POST,
      postId,
    }
}


export const getPosts = () => async (dispatch) => {
    const response = await fetch("/api/posts");
    if (response.ok) {
        const posts = await response.json();
        dispatch(setPosts(posts));
        return posts;
    }
};

export const getPostById = (id) => async (dispatch) => {
  const response = await fetch(`/api/posts/${id}`);
  const post = await response.json();
  if (!post.errors) {
    dispatch(setPost(post));
  }
  return post;
};

export const createPost = (post) => async (dispatch) => {
  const { title, body, images, userId, communityId } = post;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("body", body);
  formData.append("user_id", userId);
  formData.append("community_id", communityId);
  if (images) {
    for (const list of images) {
      for (let i = 0; i < list.length; i++) {
        formData.append("images", list[i]);
      }
    }
  }

  try {
    const res = await fetch("/api/posts/", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw res;
    const post = await res.json();
    if (!post.errors) {
      dispatch(setPost(post));
    }
    return post;
  } catch (e) {
    return e;
  }
};

export const updatePost = (post) => async (dispatch) => {
  const { title, body, images, postId, userId, communityId } = post;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("body", body);
  formData.append("user_id", userId);
  formData.append("community_id", communityId);
  if (images) {
    for (const list of images) {
      for (let i = 0; i < list.length; i++) {
        formData.append("images", list[i]);
      }
    }
  }

  try {
    const res = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      body: formData,
    });
    if (!res.ok) throw res;
    const post = await res.json();
    if (!post.errors) {
      dispatch(setPost(post));
    }
    return post;
  } catch (e) {
    return e;
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw res;
    const post = await res.json();
    if (!post.errors) {
      dispatch(setPost(post));
    }
    return post;
  } catch (e) {
    return e;
  }
};

export const createComment = (comment, postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  const post = await res.json();
  if (!post.errors) {
    dispatch(setPost(post));
  }
  return post;
};

export const updateComment = (comment) => async (dispatch) => {
  const res = await fetch(`/api/comments/${comment.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  const post = await res.json();
  if (!post.errors) {
    dispatch(setPost(post));
  }
  return post;
};

export const deleteComment = (commentId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
  const post = await res.json();
  if (!post.errors) {
    dispatch(setPost(post));
  }
  return post;
};

const initialState = {
  posts: {},
  max: null,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MORE_POSTS:
      return { ...state, posts: { ...state.posts, ...action.posts } };
    case SET_POSTS:
      return { ...state, posts: { ...action.posts } };
    case SET_POST:
      return {
        ...state,
        posts: { [action.post.id]: action.post, ...state.posts },
      };
    case SET_MAX:
      return { ...state, max: action.number };
    default:
      return state;
  }
};

export default postsReducer;
