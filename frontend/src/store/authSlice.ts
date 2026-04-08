import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Redux bankasında neleri saklayacağımızı tanımlıyoruz (Hataları bu çözer)
interface AuthState {
  isLoggedIn: boolean;
  user: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // action: PayloadAction<string> diyerek 'any' hatasını sildik
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;