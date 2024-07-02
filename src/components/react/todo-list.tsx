import TodoItemView from "./todo-item";
import { useCloud } from "freestyle-sh";
import { useState } from "react";
import { TheTodoList } from "../../cloudstate/todo-list";
import { useMutation, useQuery } from "@tanstack/react-query";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function TodoListApp(props: {
  items: ReturnType<TheTodoList["getItems"]>;
}) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList items={props.items} />
    </QueryClientProvider>
  );
}

function TodoList(props: { items: ReturnType<TheTodoList["getItems"]> }) {
  const [text, setText] = useState<string>("");

  const todoList = useCloud<typeof TheTodoList>("todo-list");

  const { data: items, refetch } = useQuery({
    queryKey: ["todo-list", "getItems"],
    queryFn: () => todoList.getItems(),
    initialData: props.items,
  });

  const { isPending: addingItem, mutate: addItem } = useMutation({
    mutationFn: (text: string) => todoList.addItem(text),
    onSuccess: () => refetch(),
  });

  return (
    <div>
      <input
        value={text}
        type="text"
        onInput={(e) => {
          setText(e.currentTarget.value);
        }}
      />

      <button
        onClick={() => {
          addItem(text);
        }}
      >
        Add Item
      </button>

      {items?.map((item) => (
        <div key={item.id}>
          <TodoItemView
            id={item.id}
            text={item.text}
            completed={item.completed}
          />
        </div>
      ))}

      {addingItem && (
        <div
          style={{
            opacity: 0.5,
          }}
        >
          <TodoItemView id={"pending"} text={text} completed={false} />
        </div>
      )}
    </div>
  );
}
