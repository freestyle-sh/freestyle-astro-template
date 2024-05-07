<script lang="ts">
  import { useCloud } from "freestyle-sh";
  import { TodoItem } from "../cloudstate/todo-list";

  export let id: string;
  export let text: string;
  export let completed: boolean;

  const todoItem = useCloud<typeof TodoItem>(id);
</script>

<div>
  <input
    type="checkbox"
    bind:checked={completed}
    on:change={() => {
      todoItem.toggleCompletion();
    }}
  />
  <span>{text}</span>
</div>
