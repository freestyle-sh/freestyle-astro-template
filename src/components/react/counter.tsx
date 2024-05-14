import { cloudstate, useCloud } from "freestyle-sh";
import { useState } from "react";

@cloudstate
export class CloudCounter {
  static id = "counter" as const;
  count = 0;

  increment() {
    return ++this.count;
  }

  getCount() {
    return this.count;
  }
}

export default function Counter(props: { count: number }) {
  const [count, setCount] = useState(props.count);
  const counter = useCloud<typeof CloudCounter>("counter");

  return (
    <button
      onClick={() => {
        counter.increment().then((newCount) => {
          setCount(newCount);
        });
      }}
    >
      This button has been clicked {count} times
    </button>
  );
}
