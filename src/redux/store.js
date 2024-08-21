
import { configureStore } from '@reduxjs/toolkit';
import seedGeneratorReducer from './wallet/seedGeneratorSlice';

const store = configureStore({
  reducer: {
    seedGenerator: seedGeneratorReducer,
  },
});

export default store;
