import { useCloud } from "freestyle-sh";
import { TodoItem as CloudTodoItem } from "../../cloudstate/todo-list";
import { useDispatch } from "react-redux";
import { toggleCompletion } from "./todo-list-store";

export default function TodoItem(props: {
  id: string;
  text: string;
  completed: boolean;
}) {
  const item = useCloud<typeof CloudTodoItem>(props.id);
  const dispatch = useDispatch();

  return (
    <div key={props.id}>
      <input
        type="checkbox"
        checked={props.completed}
        onChange={() => {
          item.toggleCompletion();
          dispatch(toggleCompletion(props.id));
        }}
      />
      {props.text}
    </div>
  );
}
