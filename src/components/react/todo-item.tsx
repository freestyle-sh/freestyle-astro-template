import { useMutation } from "@tanstack/react-query";
import { TodoItem as CloudTodoItem } from "../../cloudstate/todo-list";
import { useCloud } from "freestyle-sh";
import { useState } from "react";

export default function TodoItem(props: {
  id: string;
  text: string;
  completed: boolean;
}) {
  const item = useCloud<typeof CloudTodoItem>(props.id);
  const [completed, setComplete] = useState(props.completed);

  const { mutate: toggleCompletion, isPending } = useMutation({
    mutationFn: () => item.toggleCompletion(),
  });

  return (
    <div key={props.id} className="todo-item">
      <div className="todo-item-checkbox-container">
        <div className="round">
          <input
            type="checkbox"
            checked={completed}
            disabled={isPending}
            id={`checkbox-${props.id}`}
            onChange={() => {
              setComplete(!completed);
              toggleCompletion();
            }}
          />
          <label htmlFor={`checkbox-${props.id}`}></label>
        </div>
      </div>
      {/* <input 
      className="todo-item-checkbox"
        disabled={isPending}
        type="checkbox"
        checked={completed}
        
      /> */}
      {props.text}
    </div>
  );
}
