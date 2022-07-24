import { createSlice } from '@reduxjs/toolkit';
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
    commentsRequestFiled: (state, action) => {
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
    commentsCreatedFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentDeleted: (state, action) => {
      state.entities.filter((comment) => comment._id !== action.payload._id);
    },
    commentsDeleteFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
  commentsRequested, commentsReceived, commentsRequestFiled,
  commentCreated,
  commentDeleted, commentsDeleteFiled
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(userId);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestFiled(error.message));
  }
};

export const createNewComment = (data) => async (dispatch) => {
  // dispatch(commentsRequested());
  try {
    const { content } = await commentService.createComment(data);
    dispatch(commentCreated(content));
  } catch (error) {
    // dispatch(commentsCreatedFiled(error.message));
  }
};
export const deleteCurrentComment = (id) => async (dispatch) => {
  // dispatch(commentsRequested());
  try {
    const { content } = await commentService.removeComment(id);
    dispatch(commentDeleted(content));
  } catch (error) {
    dispatch(commentsDeleteFiled(error.message));
  }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;

export default commentsReducer;
