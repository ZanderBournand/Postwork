import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    postsType: 'hot'
}

export const postsTypeSlice = createSlice({

    name: 'postsType',
    initialState,

    reducers: {
        changePostsType: (state, action) => {
            state.postsType = action.payload;
        }
    }

})

export const {changePostsType} = postsTypeSlice.actions;

export const selectPostsType = (state) => state.postsType.postsType;

export default postsTypeSlice.reducer;