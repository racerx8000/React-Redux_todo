import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dragFrom: [],
  dropTo: [],
  draggedTask: {}
};

const dragDropSlice = createSlice({
  name: "dragDrop",
  initialState,
  reducers: {
    taskDragged(state, action) {

    },
    taskDropped(state, action) {

    }
  }
})

export const { taskDragged, taskDropped } = dragDropSlice.actions;
export default dragDropSlice.reducer;
