---
source: https://react.dev/reference/rules
---

# Rules of React

Just as different programming languages have their own ways of expressing concepts, React has its own idioms — or rules — for how to express patterns in a way that is easy to understand and yields high-quality applications.

## Signature / Usage

```js
function Counter() {
  // ✅ Good: top-level in a function component
  const [count, setCount] = useState(0);
  // ...
}
```

The Rules of React are split into three groups:

- [Components and Hooks must be pure](./components-and-hooks-must-be-pure.md) – Purity in Components and Hooks is a key rule of React that makes your app predictable, easy to debug, and allows React to automatically optimize your code.
  - Components must be idempotent – React components are assumed to always return the same output with respect to their inputs – props, state, and context.
  - Side effects must run outside of render – Side effects should not run in render, as React can render components multiple times to create the best possible user experience.
  - Props and state are immutable – A component's props and state are immutable snapshots with respect to a single render. Never mutate them directly.
  - Return values and arguments to Hooks are immutable – Once values are passed to a Hook, you should not modify them. Like props in JSX, values become immutable when passed to a Hook.
  - Values are immutable after being passed to JSX – Don't mutate values after they've been used in JSX. Move the mutation before the JSX is created.
- [React calls Components and Hooks](./react-calls-components-and-hooks.md) – React is responsible for rendering components and hooks when necessary to optimize the user experience.
  - Never call component functions directly – Components should only be used in JSX. Don't call them as regular functions.
  - Never pass around hooks as regular values – Hooks should only be called inside of components. Never pass it around as a regular value.
- [Rules of Hooks](./rules-of-hooks.md) – Hooks are defined using JavaScript functions, but they represent a special type of reusable UI logic with restrictions on where they can be called.
  - Only call Hooks at the top level – Don't call Hooks inside loops, conditions, or nested functions. Instead, always use Hooks at the top level of your React function, before any early returns.
  - Only call Hooks from React functions – Don't call Hooks from regular JavaScript functions.

## Notes

- These rules are known as the **Rules of React**. They are rules – and not just guidelines – in the sense that if they are broken, your app likely has bugs. Your code also becomes unidiomatic and harder to understand and reason about.
- We strongly recommend using Strict Mode alongside React's ESLint plugin (`eslint-plugin-react-hooks`) to help your codebase follow the Rules of React.

## Related

- [Components and Hooks must be pure](./components-and-hooks-must-be-pure.md)
- [React calls Components and Hooks](./react-calls-components-and-hooks.md)
- [Rules of Hooks](./rules-of-hooks.md)
