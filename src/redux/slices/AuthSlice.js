import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ProfileImage: null,
  FavouriteSports: [],
  SportsSkills: [],
  SignupFlowCompleted: false,
};

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setProfilePicture: (state, actions) => {
      state.ProfileImage = actions.payload;
    },
    setFavouriteSports: (state, actions) => {
      state.ProfileImage = actions.payload;
    },
    setSportsSkills: (state, actions) => {
      state.ProfileImage = actions.payload;
    },
    setSignupFlowCompleted: (state, actions) => {
      state.ProfileImage = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProfilePicture, setFavouriteSports, setSportsSkills, setSignupFlowCompleted } = AuthSlice.actions;

export default AuthSlice.reducer;
