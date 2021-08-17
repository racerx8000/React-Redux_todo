import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from "uuid";

let preloadedState;

const getStoredTodos = localStorage.getItem("todoList");

getStoredTodos ? preloadedState = JSON.parse(getStoredTodos) :
  preloadedState = {
    todo: [
      { id: uuidv4(), title: 'New task', completed: false, color: '#f00e1a' }
    ],
    inProcess: [],
    done: []
  };

const todosSlice = createSlice({
  name: 'todos',
  initialState: preloadedState,
  reducers: {
    taskAdded(state, action) {
      const { textInput, columnName } = action.payload;
      const newTodo = state[columnName].concat({
        id: uuidv4(),
        title: textInput,
        completed: false,
        color: ""
      })
      return { ...state, [columnName]: newTodo };
    },
    taskDeleted(state, action) {
      const { id, columnName } = action.payload;
      const restOfTasks = state[columnName].filter(task => task.id !== id);
      return { ...state, [columnName]: restOfTasks };
    },
    taskEdited(state, action) {
      const { id, columnName, editedTitle } = action.payload;
      const editedTask = state[columnName].map(task => {
        if (task.id === id) return { ...task, title: editedTitle };
        return task;
      })
      return { ...state, [columnName]: editedTask };
    },
    taskToggled(state, action) {
      const { id, columnName } = action.payload;
      const toggledState = state[columnName].map(task => {
        if (task.id === id) return { ...task, completed: !task.completed };
        return task
      })
      return { ...state, [columnName]: toggledState }
    },
    taskSetNewColor(state, action) {
      const { taskId, columnName, color } = action.payload;
      const setColor = state[columnName].map(task => {
        if (task.id === taskId) return { ...task, color: color };
        return task;
      })
      return { ...state, [columnName]: setColor };
    }
  }
})

export const { taskAdded,
  taskDeleted, 
  taskEdited,
  taskToggled,
  taskSetNewColor
} = todosSlice.actions;

export default todosSlice.reducer;
