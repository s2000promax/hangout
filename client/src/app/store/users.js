import { createSlice, createAction } from '@reduxjs/toolkit';
import userService from '../services/user.service';
import authService from '../services/auth.service';
import localStorageService from '../services/localStorage.service';
import { randomInt } from '../utils/utils';
import history from '../utils/history';
import { generateAuthError } from '../utils/generateAuthError';

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false
    };

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersRecived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestedSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestedFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    userUpdated: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
    }
  },
  authRequested: (state) => {
    state.error = null;
  }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersRecived,
  usersRequestFiled,
  authRequestedSuccess,
  authRequestedFailed,
  userCreated,
  userLoggedOut,
  userUpdated
} = actions;

const authRequested = createAction('users/authRequested');
const userCreateRequested = createAction('users/createRequested');
const createUserFiled = createAction('users/createUserFiled');
const updateUserRequested = createAction('user/updateUserRequested');
const updateUserFailed = createAction('users/updateUserFailed');

const createUser = (payload) => async (dispatch) => {
  dispatch(userCreateRequested());
  try {
    const { content } = await userService.create(payload);
    dispatch(userCreated(content));
    history.push('/users');
  } catch (error) {
    dispatch(createUserFiled(error.message));
  }
};

export const singUp = ({ email, password, ...rest }) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register({ email, password });
    localStorageService.setTokens(data);
    dispatch(authRequestedSuccess({
      userId: data.localId
    }));
    dispatch(createUser({
      _id: data.localId,
      email,
      image: `https://avatars.dicebear.com/api/avataaars/${(
        Math.random() + 1
      )
        .toString(36)
        .substring(7)}.svg`,
      rate: randomInt(1, 5),
      completedMeetings: randomInt(0, 200),
      ...rest
    }));
  } catch (error) {
    dispatch(authRequestedFailed(error.message));
  }
};

export const updateUser = (payload) => async (dispatch) => {
  dispatch(updateUserRequested());
  try {
    const { content } = await userService.update(payload);
    dispatch(userUpdated(content));
    history.push(`/users/${content._id}`);
  } catch (error) {
    dispatch(updateUserFailed(error.message));
  }
};

export const login = ({ payload, redirect }) => async (dispatch) => {
  const { email, password } = payload;
  dispatch(authRequested());
  try {
    const data = await authService.login({ email, password });
    dispatch(authRequestedSuccess({ userId: data.localId }));
    localStorageService.setTokens(data);
    history.push(redirect);
  } catch (error) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
      const errorMessage = generateAuthError(message);
      dispatch(authRequestedFailed(errorMessage));
    } else {
      dispatch(authRequestedFailed(error.message));
    }
  }
};

export const logout = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  history.push('/');
};

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersRecived(content));
  } catch (error) {
    dispatch(usersRequestFiled(error.message));
  }
};

export const getCurrentUserData = () => (state) => {
  return state.users.entities
    ? state.users.entities.find(user => user._id === state.users.auth.userId)
    : null;
};

export const getUsersList = () => (state) => state.users.entities;

export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find(user => user._id === userId);
  }
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getAuthError = () => (state) => state.users.errors;

export default usersReducer;