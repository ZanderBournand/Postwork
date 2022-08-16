import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searching: false, 
    searchWord: null,
}

export const searchSlice = createSlice({

    name: 'search',
    initialState,

    reducers: {
        changeSearch: (state, action) => {
            state.search = action.payload;
        }
    }

})

export const {changeSearch} = searchSlice.actions;

export const selectSearch = (state) => state.search.search;

export default searchSlice.reducer;