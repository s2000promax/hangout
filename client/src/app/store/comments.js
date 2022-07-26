import { createAction, createSlice } from '@reduxjs/toolkit';
import commentService from '../services/comment.service';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
      state.isLoading = false;
    },
    commentDeleted: (state, action) => {
      state.entities.filter((comment) => comment._id !== action.payload);
    }
  }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
  commentsRequested, commentsReceived, commentsRequestFailed,
  commentCreated,
  commentDeleted
} = actions;

const addCommentRequested = createAction('comments/addCommentRequested');
const deleteCommentRequested = createAction('comments/deleteCommentRequested');

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(userId);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const createNewComment = (data) => async (dispatch) => {
  dispatch(addCommentRequested(data));
  try {
    const { content } = await commentService.createComment(data);
    dispatch(commentCreated(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};
export const deleteCurrentComment = (commentId) => async (dispatch) => {
  dispatch(deleteCommentRequested());
  try {
    const { content } = await commentService.removeComment(commentId);
    if (content === null) {
      dispatch(commentDeleted(commentId));
    }
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;

export default commentsReducer;
