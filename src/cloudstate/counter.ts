import { cloudstate } from "freestyle-sh";

// @cloudstate decorator makes this class's data persistent.
// data can only be augmented and retrieved through the class's methods.
@cloudstate
export class Counter {
  count = 0;
  increment() {
    return ++this.count;
  }
  getCount() {
    return this.count;
  }
}
