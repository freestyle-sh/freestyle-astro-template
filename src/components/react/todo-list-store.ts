import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit/react";
import { useSelector } from "react-redux";
import type { TheTodoList } from "../../cloudstate/todo-list";

const todoListSlice = createSlice({
  name: "todoList",
  initialState: {
    items: [] as ReturnType<TheTodoList["getItems"]>,
  },
  reducers: {
    addItem: (
      state,
      action: PayloadAction<ReturnType<TheTodoList["getItems"]>[number]>
    ) => {
      state.items.push(action.payload);
    },
    toggleCompletion: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.completed = !item.completed;
      }
    },
  },
});

export const { addItem, toggleCompletion } = todoListSlice.actions;

export const createTodoListStore = (
  items: ReturnType<TheTodoList["getItems"]>
) =>
  configureStore({
    reducer: {
      todoList: todoListSlice.reducer,
    },
    preloadedState: {
      todoList: {
        items: items,
      },
    },
  });

export type TodoListState = ReturnType<
  ReturnType<typeof createTodoListStore>["getState"]
>;

export type TodoListDispatch = ReturnType<
  typeof createTodoListStore
>["dispatch"];

export const useTodoListSelector = useSelector.withTypes<TodoListState>();

export const useItems = () =>
  useTodoListSelector((state) => state.todoList.items);
