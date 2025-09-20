import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  full_name: null,
  device_token: null,
  ProfileImage: null,
  FavouriteSports: [],
  SportsSkills: [],
  SignupFlowCompleted: false,
  Address: null,
  AllNearbyPosts: [],
  Gender: '',
  Birthday: '',
  Language: '',
  City: '',
  Primary_sports: '',
  Skill_Level: '',
  Availability: '',
  Joined_CountMe: '',
  Contact_Number: '',
  Bio: '',
};

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setUpdateUserDetails: (state, action) => {
      (state.email = action.payload.email),
        (state.full_name = action.payload.full_name),
        (state.Gender = action.payload.Gender),
        (state.Birthday = action.payload.Birthday),
        (state.Language = action.payload.Language),
        (state.City = action.payload.City),
        (state.Primary_sports = action.payload.Primary_sports),
        (state.Skill_Level = action.payload.Skill_Level),
        (state.Availability = action.payload.Availability),
        (state.Joined_CountMe = action.payload.Joined_CountMe),
        (state.Contact_Number = action.payload.Contact_Number),
        (state.Bio = action.payload.Bio);
    },
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
    setAddress: (state, actions) => {
      state.Address = actions.payload;
    },
    setNearbyPosts: (state, action) => {
      state.AllNearbyPosts = action.payload;
    },
    SignOut: state => {
      (state.email = null),
        (state.full_name = null),
        (state.device_token = null),
        (state.ProfileImage = null),
        (state.FavouriteSports = []),
        (state.SportsSkills = []),
        (state.SignupFlowCompleted = false),
        (state.Address = null),
        (state.AllNearbyPosts = []),
        (state.Gender = ''),
        (state.Birthday = ''),
        (state.Language = ''),
        (state.City = ''),
        (state.Primary_sports = ''),
        (state.Skill_Level = ''),
        (state.Availability = ''),
        (state.Joined_CountMe = ''),
        (state.Contact_Number = ''),
        (state.Bio = '');
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserDetails,
  setUpdateUserDetails,
  setProfilePicture,
  setFavouriteSports,
  setSportsSkills,
  setAddress,
  setSignupFlowCompleted,
  setNearbyPosts,
  SignOut,
} = AuthSlice.actions;

export default AuthSlice.reducer;
