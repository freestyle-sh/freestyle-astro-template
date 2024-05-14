import TodoItemView from "./todo-item";
import { useCloud } from "freestyle-sh";
import { useState } from "react";
import { TheTodoList } from "../../cloudstate/todo-list";
import { addItem, createTodoListStore, useItems } from "./todo-list-store";
import { Provider, useDispatch } from "react-redux";

export default function TodoListApp(props: {
  items: ReturnType<TheTodoList["getItems"]>;
}) {
  const store = createTodoListStore(props.items);
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}

function TodoList() {
  const list = useCloud<typeof TheTodoList>("todo-list");
  const dispatch = useDispatch();
  const items = useItems();
  const [text, setText] = useState("");

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <TodoItemView
            id={item.id}
            text={item.text}
            completed={item.completed}
          />
        </div>
      ))}
      <input
        value={text}
        type="text"
        onInput={(e) => {
          setText(e.currentTarget.value);
        }}
      />
      <button
        onClick={() => {
          list.addItem(text).then((item) => {
            dispatch(addItem(item));
            setText("");
          });
        }}
      >
        Add Item
      </button>
    </div>
  );
}
