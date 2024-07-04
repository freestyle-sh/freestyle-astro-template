import TodoItemView from "./todo-item";
import { useCloud } from "freestyle-sh";
import { useCloudMutation, useCloudQuery } from "freestyle-sh/react";
import { useEffect, useState } from "react";
import { TodoListCS } from "../../cloudstate/todo-list";
import { $someLoading, setLoading } from "../../stores/loading";
import { useStore } from "@nanostores/react";

export function TodoList() {
  const [text, setText] = useState<string>("");
  const todoList = useCloud<typeof TodoListCS>("todo-list");

  // useCloudQuery will automatically refetch when it's been invalidated
  const { data: items, loading, mutate } = useCloudQuery(todoList.getItems);

  const { loading: addingItem, mutate: addItem } = useCloudMutation(
    todoList.addItem
  );

  const someLoading = useStore($someLoading);
  useEffect(() => {
    setLoading(todoList.getItems, loading);
    setLoading(todoList.addItem, addingItem);
  }, [loading, addingItem]);

  return (
    <article>
      <header>
        <h1>
          <a href="https://www.freestyle.sh" target="_blank">
            freestyle.sh
          </a>
          {someLoading && <div aria-busy="true" />}
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            
            // optimistically update the list
            mutate([
              {
                id: crypto.randomUUID(),
                text,
                completed: false,
              },
              ...(items ?? []),
            ]);

            // add item to cloudstate
            addItem(text);

            // reset the form
            setText("");
          }}
        >
          <fieldset role="group">
            <input
              placeholder="Create a new todo"
              value={text}
              type="text"
              onInput={(e) => setText(e.currentTarget.value)}
            />
            <input type="submit" value="Add Item" />
          </fieldset>
        </form>
      </header>

      <section>
        {items?.map((item) => (
          <div key={item.id}>
            <TodoItemView
              id={item.id}
              text={item.text}
              completed={item.completed}
            />
          </div>
        ))}
      </section>
    </article>
  );
}
