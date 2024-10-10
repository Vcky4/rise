import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StorageState {
  [key: string]: any;
}

const initialState: StorageState = {};

const storageSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    setItem: (state, action: PayloadAction<{ key: string; value: any }>) => {
      state[action.payload.key] = action.payload.value;
    },
    removeItem: (state, action: PayloadAction<{ key: string }>) => {
      delete state[action.payload.key];
    },
  },
});

export const { setItem, removeItem } = storageSlice.actions;

export default storageSlice.reducer;
