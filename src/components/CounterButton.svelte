<script lang="ts">
  import { useCloudState } from "freestyle-sh";
  import { Counter } from "../cloudstate/counter";

  export let count: number;

  const counter = useCloudState(Counter);
</script>

<button
  on:click={async () => {
    count = await counter.increment();
  }}
>
  this button has been clicked {count} times
</button>

<style>
  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0053b3;
  }
</style>
