import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.email = '';
      state.password = '';
    },
    setUsername(state, action) {
        state.username = action.payload;
      },
      setEmailSign(state, action) {
        state.email = action.payload;
      },
      setPasswordSign(state, action) {
        state.password = action.payload;
      },
      setConfirmPassword(state, action) {
        state.confirmPassword = action.payload;
      },
      setError(state, action) {
        state.error = action.payload;
      },
  },
});

export const { setEmail, setPassword, login, logout, setUsername, setEmailSign, setPasswordSign, setConfirmPassword, setError } = authSlice.actions;
export default authSlice.reducer;
