
import { configureStore } from '@reduxjs/toolkit';
import seedGeneratorReducer from './wallet/seedGeneratorSlice';
import navigateReducer from './wallet/navigateSlice';

const store = configureStore({
  reducer: {
    seedGenerator: seedGeneratorReducer,
    navigator: navigateReducer
  },
});

export default store;
