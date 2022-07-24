import { createSlice } from '@reduxjs/toolkit';
import professionService from '../services/profession.service';

const professionSlice = createSlice({
  name: 'professions',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    professionRequested: (state) => {
      state.isLoading = true;
    },
    professionRecived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    professionRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: professionsReducer, actions } = professionSlice;
const { professionRequested, professionRecived, professionRequestFiled } = actions;

function isOutDated(date) {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  }
  return false;
}

export const loadProfessionsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().professions;
  console.log(lastFetch);
  if (isOutDated(lastFetch)) {
    dispatch(professionRequested());

    try {
      const { content } = await professionService.fetchAll();
      console.log(content);
      dispatch(professionRecived(content));
    } catch (error) {
      dispatch(professionRequestFiled(error.message));
    }
  }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) => state.professions.isLoading;
export const getProfessionById = (professionId) => (state) => {
  if (state.professions.entities) {
    return state.professions.entities.find(prof => prof._id === professionId);
  }
};

export default professionsReducer;
