import { cloudstate, invalidate, useCloud } from "freestyle-sh";

@cloudstate
export class TodoListCS {
  static id = "todo-list" as const;

  items: TodoItemCS[] = [];

  async addItem(text: string) {
    const item = new TodoItemCS(text);
    this.items.unshift(item);
    invalidate(useCloud<typeof TodoListCS>("todo-list").getItems);
    return item.info();
  }

  async getItems() {
    return this.items.map((item) => item.info());
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
    invalidate(useCloud<typeof TodoListCS>("todo-list").getItems);
    return {
      completed: this.completed,
    };
  }
}
