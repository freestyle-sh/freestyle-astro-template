<script lang="ts">
  import { useCloud } from "freestyle-sh";
  import { TheTodoList } from "../../cloudstate/todo-list";
  import TodoItem from "./TodoItem.svelte";

  export let items: ReturnType<TheTodoList["getItems"]> = [];

  const todoList = useCloud<typeof TheTodoList>("todo-list");
  let text = "";
</script>

<input type="text" bind:value={text} placeholder="Enter a new todo" />
<button
  on:click={() => {
    todoList.addItem(text).then((item) => {
      text = "";
      items = [...items, item];
    });
  }}
>
  Add Todo
</button>

<br />

<div>
  {#each items as item}
    <TodoItem {item} />
  {/each}
</div>
