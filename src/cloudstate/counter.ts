import { cloudstate, useCloudState } from "freestyle-sh";

// @cloudstate decorator makes this class's data persistent.
// data can only be augmented and retrieved through the class's methods.
@cloudstate
class Counter {
  count = 0;
  increment() {
    this.count++;
  }
  getCount() {
    return this.count;
  }
}

// create a singleton instance of Counter
export const counter = useCloudState(Counter);
