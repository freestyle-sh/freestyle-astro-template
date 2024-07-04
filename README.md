[![Open Freestyle.sh](https://www.freestyle.sh/github-hero.png)](https://www.freestyle.sh/)
# freestyle-astro-template

> Freestyle is currently only supported using node 19+ on macos or linux. Windows support is coming soon.

<!-- stackblitz uses node 18 and we currently require node 19 because we use crypto.randomUUID -->
<!-- [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/freestyle-sh/freestyle-astro-template) -->

[freestyle.sh](https://www.freestyle.sh) is a cloud platform in early development that replaces traditional databases with persistent javascript objects. Write code as if your data is in memory and never think about it's underlying storage mechanisms again. We'll statically and dynamically optimize your code to make efficient queries inside our cloudstate environment.
```js
// The @cloudstate decorator makes this class's data persistent.
// Data can only be augmented and retrieved through the class's
// methods. There's nothing you have to do for your data to be
// saved, it's automatically saved for you.
@cloudstate
class Counter {

  // Giving a class a static id makes it a singleton which you
  // can reference in other places in your code.
  static id = "counter";

  // This data is automatically persisted for you.
  count = 0;
  increment() {
    this.count++;
  }
  getCount() {
    return this.count;
  }
}

// Gets a reference to the singleton instance of Counter.
// Your methods are executed and optimized inside your
// cloudstate database, not in your web server.
const counter = useCloud<typeof Counter>("counter");

// Call a method on counter from anywhere in your backend or
// frontend code to execute the method on the database.
await counter.increment();

```
Astro is the web framework for building content-driven websites like blogs, marketing, and e-commerce. To learn more, visit [their documentation](https://docs.astro.build/en/concepts/why-astro/)

## Developing Locally
> Please note that cloudstate is not persistent during local development. It will be cleared when you restart the dev server. If you significantly change your data models during development, restart the dev server to clear the data.

install dependencies
```
npm i
```

run the development server
```
npx freestyle dev
```

## Ready to Deploy
build your project
```
npx freestyle build
```

log into freestyle using github
```
npx freestyle login
```

deploy to freestyle.sh (beta)
```
npx freestyle deploy
```
