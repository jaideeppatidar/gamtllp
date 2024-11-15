
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: !!localStorage.getItem('authToken'), 
  user: JSON.parse(localStorage.getItem('User')) || { email: '', firstName: '' },
  token: localStorage.getItem('authToken'),
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
    console.log('Login successful: ', action.payload);
      state.isAuthenticated = true;
      state.user = action.payload.user; // Ensure user data is stored
      state.token = action.payload.token;
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('User', JSON.stringify(action.payload.user));

    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = { email: '', firstName: '' }; // Clear user data
      state.token = null;
      localStorage.removeItem('authToken'); // Remove token
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
