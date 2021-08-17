import { configureStore } from '@reduxjs/toolkit';
import todosReducer from "./features/todos/todosReducer";
import dragDropReducer from "./features/dragDrop/dragDropReducer";

const store = configureStore({
  reducer: {
    todoList: todosReducer,
    dragDrop: dragDropReducer,
  },
})

export default store;
