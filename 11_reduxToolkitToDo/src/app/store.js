import {configureStore} from '@reduxjs/toolkit';
import todoreducer from '../features/todo/todoSlice'; // Import the todo reducer

export const store = configureStore({
    reducer: todoreducer, // Set the todo reducer as the main reducer for the store
})