import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dragFrom: "",
  dropTo: "",
  draggedTask: {}
};

const dragDropSlice = createSlice({
  name: "dragDrop",
  initialState,
  reducers: {
    taskDragged(state, action) {
      const { columnName, task } = action.payload;
      return { 
        ...state,
        draggedTask: task,
        dragFrom: columnName
      }
    },
    taskDropped(state) {
      state.draggedTask = {};
    }
  }
})

export const { taskDragged, taskDropped } = dragDropSlice.actions;

export default dragDropSlice.reducer;
