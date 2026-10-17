---
source: https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html
---

# TypeScript Tooling in 5 minutes

Compile a small `greeter.ts` with `tsc` and add annotations, an interface, and a class.

```shell
npm install -g typescript
tsc greeter.ts
```

```ts
class Student {
  fullName: string;
  constructor(
    public firstName: string,
    public middleInitial: string,
    public lastName: string
  ) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.textContent = greeter(user);
```

```html
<!DOCTYPE html>
<html>
  <head>
    <title>TypeScript Greeter</title>
  </head>
  <body>
    <script src="greeter.js"></script>
  </body>
</html>
```

## Notes

- Passing an array to `greeter(person: string)` gives `error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.`; `greeter.js` is still emitted despite errors.
- A class satisfies `Person` by shape; no `implements` clause is needed.
- `public` on constructor parameters creates and assigns properties of those names.
- The source installs globally with `npm install -g typescript`; for project-local installs see the scripts category.
