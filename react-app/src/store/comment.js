const SET_COMMENT = "COMMENT/SET_COMMENT";
const CREATE_COMMENT = "COMMENT/CREATE_COMMENT";
const REMOVE_COMMENT = "COMMENT/REMOVE_COMMENT";

const setComment = (comment) => {
  return {
    type: SET_COMMENT,
    comment,
  };
};

const createComment = (comment) => {
  return {
    type: CREATE_COMMENT,
    comment,
  };
};
const removeComment = (id) => {
  return {
    type: REMOVE_COMMENT,
    id,
  };
};

export const getComments = () => async (dispatch) => {
  const response = await fetch("/api/comments");
  if (response.ok) {
    const comments = await response.json();
    dispatch(setComment(comments));
    return comments;
  }
};

export const newComment = (comment, postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  const post = await response.json();
  if (!post.errors) {
    dispatch(createComment(post));
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
    dispatch(createComment(post));
  }
  return post;
};

export const deleteComment = (commentId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
  const post = await res.json();
  if (!post.errors) {
    dispatch(removeComment(post));
  }
  return post;
};

const initialState = {};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENT:
      const comments = action.comments.reduce((acc, ele) => {
        acc[ele.id] = ele;
        return acc;
      }, {});
      return { ...state, ...comments };
    case CREATE_COMMENT:
      return { ...state, [action.comments.id]: action.comments };
    case REMOVE_COMMENT:
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default commentsReducer;