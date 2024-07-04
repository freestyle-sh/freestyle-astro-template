import { useCloudMutation } from "freestyle-sh/react";
import { TodoItemCS as CloudTodoItem } from "../../cloudstate/todo-list";
import { useCloud } from "freestyle-sh";
import { useEffect, useState } from "react";

export default function TodoItem(props: {
  id: string;
  text: string;
  completed: boolean;
}) {
  const item = useCloud<typeof CloudTodoItem>(props.id);
  const [completed, setComplete] = useState(props.completed);

  const { mutate: toggleCompletion } = useCloudMutation(item.toggleCompletion);

  useEffect(() => {
    setComplete(props.completed);
  }, [props.completed]);

  return (
    <label>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => {
          setComplete(!completed);
          toggleCompletion();
        }}
      />
      {props.text}
    </label>
  );
}
