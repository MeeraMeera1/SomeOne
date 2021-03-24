const SET_POSTS = "post/SET_POSTS";
const SET_POST = "post/SET_POST";
const REMOVE_POST = "post/REMOVE_POST";

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
  };
};

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

export const createPost = (newPost) => async (dispatch) => {
  const { post, imgUrl} = newPost;
  const formData = new FormData();
  formData.append("post", post);
  formData.append("imgUrl", imgUrl);
  if (imgUrl) formData.append("image", imgUrl);
  const response = await fetch("/api/posts/create-post", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw response;
  const postdata = await response.json();
  if (!postdata.errors) {
    dispatch(setPost(postdata));
  }
  return post;
};

export const updatePost = (fixpost) => async (dispatch) => {
  const { post, image, postId } = fixpost;
  const formData = new FormData();
  formData.append("post", post);
  formData.append("imgUrl", image);
  if (image) formData.append("image", image);
  const response = await fetch(`/api/posts/${postId}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) throw response;
  const updatepost = await response.json();
  if (!post.errors) {
    dispatch(setPost(updatepost));
  }
  return post;
};

export const deletePost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw response;
  const post = await response.json();
  if (!post.errors) {
    dispatch(remove(post));
  }
  return post;
};

const initialState = {
  posts: {},
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, posts: { ...action.posts } };
    case SET_POST:
      return {
        ...state,
        posts: { [action.post.id]: action.post, ...state.posts },
      };
    case REMOVE_POST:
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default postReducer;
