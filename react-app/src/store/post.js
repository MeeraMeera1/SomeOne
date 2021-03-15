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

export const createPost = (newpost) => async (dispatch) => {
  const { post, image, tagId, displayNameId } = newpost;
  const formData = new FormData();
  formData.append("post", post);
  formData.append("imgUrl", image);
  formData.append("tag", tagId);
  formData.append("displayname", displayNameId);
  if (image) {
    for (const list of image) {
      for (let i = 0; i < list.length; i++) {
        formData.append("images", list[i]);
      }
    }
  }
  const response = await fetch("/api/posts/", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw response;
  const newpost = await response.json();
  if (!post.errors) {
    dispatch(setPost(newpost));
  }
  return post;
};

export const updatePost = (fixpost) => async (dispatch) => {
  const { post, image, tagId, displayNameId, postId } = fixpost;
  const formData = new FormData();
  formData.append("post", post);
  formData.append("imgUrl", image);
  formData.append("tag", tagId);
  formData.append("displayname", displayNameId);
  if (image) {
    for (const list of image) {
      for (let i = 0; i < list.length; i++) {
        formData.append("images", list[i]);
      }
    }
  }
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
