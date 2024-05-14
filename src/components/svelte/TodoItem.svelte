<script lang="ts">
  import { useCloud } from "freestyle-sh";
  import { TodoItem } from "../../cloudstate/todo-list";

  export let item: { id: string; text: string; completed: boolean };

  const todoItem = useCloud<typeof TodoItem>(item.id);
</script>

<div>
  <input
    type="checkbox"
    bind:checked={item.completed}
    on:change={() => {
      todoItem.toggleCompletion().then((result) => {
        item.completed = result.completed;
      });
    }}
  />
  <span>{item.text}</span>
</div>
