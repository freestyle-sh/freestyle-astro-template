import { cloudstate, invalidate, useCloud } from "freestyle-sh";

@cloudstate
export class TodoListCS {
  static id = "todo-list" as const;

  items = new Map<string, TodoItemCS>();

  addItem(text: string) {
    const item = new TodoItemCS(text);
    this.items.set(item.id, item);

    // forces the client to refetch the list
    invalidate(useCloud<typeof TodoListCS>("todo-list").getItems);

    return item.info();
  }

  getItems() {
    return Array.from(this.items.values())
      .map((item) => item.info())
      .toReversed();
  }
}

@cloudstate
export class TodoItemCS {
  id = crypto.randomUUID();
  completed = false;

  constructor(public text: string) {
    this.text = text;
  }

  info() {
    return {
      id: this.id,
      text: this.text,
      completed: this.completed,
    };
  }

  toggleCompletion() {
    this.completed = !this.completed;

    // forces the client to refetch the list
    invalidate(useCloud<typeof TodoListCS>("todo-list").getItems);

    return {
      completed: this.completed,
    };
  }
}
