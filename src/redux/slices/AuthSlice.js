import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  full_name: null,
  device_token: null,
  ProfileImage: null,
  FavouriteSports: [],
  SportsSkills: [],
  SignupFlowCompleted: false,
};

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setUserDetails: (state, actions) => {
      state.email = actions.payload.email;
      state.full_name = actions.payload.full_name;
      state.device_token = actions.payload.device_token;
    },
    setProfilePicture: (state, actions) => {
      state.ProfileImage = actions.payload;
    },
    setFavouriteSports: (state, actions) => {
      state.FavouriteSports = actions.payload;
    },
    setSportsSkills: (state, actions) => {
      state.SportsSkills = actions.payload;
    },
    setSignupFlowCompleted: (state, actions) => {
      state.SignupFlowCompleted = actions.payload;
    },
    SignOut: (state,)=> {
      state.FavouriteSports = []
      state.SportsSkills = []
      state.SignupFlowCompleted = false
      state.ProfileImage = null
    }
  },
});

// Action creators are generated for each case reducer function
export const { setUserDetails,setProfilePicture, setFavouriteSports, setSportsSkills, setSignupFlowCompleted, SignOut } = AuthSlice.actions;

export default AuthSlice.reducer;
