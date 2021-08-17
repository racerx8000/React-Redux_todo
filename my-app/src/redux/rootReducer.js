import { combineReducers } from "redux";
import todosReducer from "./features/todos/todosReducer";
import dragDropReducer from "./features/dragDrop/dragDropReducer";

const rootReducer = combineReducers({
  todos: todosReducer,
  dragDrop: dragDropReducer
});

export default rootReducer;
