import { cloudstate } from "freestyle-sh";

@cloudstate
export class TheTodoList {
  static id = "todo-list" as const;

  items: TodoItem[] = [];

  addItem(text: string) {
    const item = new TodoItem(text);
    this.items.push(item);
    return item;
  }

  getItems() {
    return this.items.map((item) => item.getItem());
  }
}

@cloudstate
export class TodoItem {
  id = crypto.randomUUID();
  completed = false;

  constructor(public text: string) {
    this.text = text;
  }

  getItem() {
    return {
      id: this.id,
      text: this.text,
      completed: this.completed,
    };
  }

  toggleCompletion() {
    this.completed = !this.completed;
    return {
      completed: this.completed,
    };
  }
}
