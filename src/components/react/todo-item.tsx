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
    <div key={props.id}>
      <input
        disabled={isPending}
        type="checkbox"
        checked={completed}
        onChange={() => {
          setComplete(!completed);
          toggleCompletion();
        }}
      />
      {props.text}
    </div>
  );
}
