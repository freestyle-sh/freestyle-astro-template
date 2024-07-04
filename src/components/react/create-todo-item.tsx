import { useCloudMutation, useCloudQuery } from "freestyle-sh/react";
import { useCloud } from "freestyle-sh";
import { TodoListCS } from "../../cloudstate/todo-list";
import { useState } from "react";

export function CreateTodoItem() {
  const [text, setText] = useState<string>("");
  const todoList = useCloud<typeof TodoListCS>("todo-list");
  const { data: items, mutate: setItems } = useCloudQuery(todoList.getItems);
  const { mutate: addItem } = useCloudMutation(todoList.addItem);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        // optimistically update the list
        setItems([
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
  );
}
