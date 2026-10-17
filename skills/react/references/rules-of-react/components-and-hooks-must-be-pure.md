---
source: https://react.dev/reference/rules/components-and-hooks-must-be-pure
---

# Components and Hooks must be pure

Pure functions only perform a calculation and nothing more. It makes your code easier to understand, debug, and allows React to automatically optimize your components and Hooks correctly.

## Signature / Usage

```js
import { useState, useEffect } from 'react';

function useTime() {
  // 1. Keep track of the current date's state. `useState` receives an initializer function as its
  //    initial state. It only runs once when the hook is called, so only the current date at the
  //    time the hook is called is set first.
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    // 2. Update the current date every second using `setInterval`.
    const id = setInterval(() => {
      setTime(new Date()); // ✅ Good: non-idempotent code no longer runs in render
    }, 1000);
    // 3. Return a cleanup function so we don't leak the `setInterval` timer.
    return () => clearInterval(id);
  }, []);

  return time;
}

export default function Clock() {
  const time = useTime();
  return <span>{time.toLocaleString()}</span>;
}
```

Rules covered on this page:

- Components and Hooks must be idempotent
- Side effects must run outside of render
- Props and state are immutable
- Return values and arguments to Hooks are immutable
- Values are immutable after being passed to JSX

Bad / good pairs:

```js
function Post({ item }) {
  item.url = new Url(item.url, base); // 🔴 Bad: never mutate props directly
  return <Link url={item.url}>{item.title}</Link>;
}
```

```js
function Post({ item }) {
  const url = new Url(item.url, base); // ✅ Good: make a copy instead
  return <Link url={url}>{item.title}</Link>;
}
```

```js
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1); // ✅ Good: use the setter function returned by useState
  }

  return (
    <button onClick={handleClick}>
      You pressed me {count} times
    </button>
  );
}
```

```js
function useIconStyle(icon) {
  const theme = useContext(ThemeContext);
  const newIcon = { ...icon }; // ✅ Good: make a copy instead
  if (icon.enabled) {
    newIcon.className = computeStyle(icon, theme);
  }
  return newIcon;
}
```

```js
function Page({ colour }) {
  const headerStyles = { colour, size: "large" };
  const header = <Header styles={headerStyles} />;
  const footerStyles = { colour, size: "small" }; // ✅ Good: we created a new value
  const footer = <Footer styles={footerStyles} />;
  return (
    <>
      {header}
      <Content />
      {footer}
    </>
  );
}
```

Local mutation is fine, mutation of values created outside render is not:

```js
function FriendList({ friends }) {
  const items = []; // ✅ Good: locally created
  for (let i = 0; i < friends.length; i++) {
    const friend = friends[i];
    items.push(
      <Friend key={friend.id} friend={friend} />
    ); // ✅ Good: local mutation is okay
  }
  return <section>{items}</section>;
}
```

```js
const items = []; // 🔴 Bad: created outside of the component
function FriendList({ friends }) {
  for (let i = 0; i < friends.length; i++) {
    const friend = friends[i];
    items.push(
      <Friend key={friend.id} friend={friend} />
    ); // 🔴 Bad: mutates a value created outside of render
  }
  return <section>{items}</section>;
}
```

## Notes

- A pure component or hook is: **Idempotent** (you always get the same result every time you run it with the same inputs – props, state, context for component inputs; and arguments for hook inputs); **has no side effects in render** (code with side effects should run separately from rendering, e.g. as an event handler or as an Effect, which runs after render); **does not mutate non-local values** (Components and Hooks should never modify values that aren't created locally in render).
- When render is kept pure, React can pause rendering components that aren't as important to update, and only come back to them later when it's needed. Rendering logic can be run multiple times; an untracked side effect – like modifying the value of a global variable during render – is triggered again on each run.
- How React runs your code: _rendering_ calculates what the next version of your UI should look like. React compares it to the previous calculation and commits just the minimum changes to the DOM. Finally, Effects are flushed.
- Heuristic for render code: if it's written at the top level of the component function, there's a good chance it runs during render. Event handlers and Effects don't run in render.
- `new Date()` and `Math.random()` are not idempotent; avoid them during render. Synchronize the latest date with an Effect, or use an event handler if it only needs to be updated in response to a user interaction.
- Side effects are a broader term than Effects. Effects specifically refer to code that's wrapped in `useEffect`; a side effect is any observable effect other than returning a value to the caller. Side effects are typically written inside of event handlers or Effects. But never during render. In most cases, use event handlers; only as a last resort use `useEffect`.
- Lazy initialization is also fine despite not being fully "pure" (e.g. `SuperCalculator.initializeIfNotReady()` if it doesn't affect other components).
- Side effects that are directly visible to the user (e.g. `document.title = product.title` during render) are not allowed in render logic; merely calling a component function shouldn't by itself produce a change on the screen. As long as calling a component multiple times is safe and doesn't affect the rendering of other components, React doesn't care if it's 100% pure in the strict functional programming sense.
- Props are immutable because mutating them produces inconsistent output that may or may not work depending on the circumstances. Changing values on a state variable doesn't cause the component to update; use the setter function.
- Hooks should be treated like "black boxes" (local reasoning). If you mutate a Hook's arguments, the custom hook's memoization becomes incorrect; return values of Hooks may have been memoized, so don't modify them either.
- When you use JSX in an expression, React may eagerly evaluate the JSX before the component finishes rendering, so mutating values after they've been passed to JSX can lead to outdated UIs.

## Related

- [Rules of React](./overview.md)
- [React calls Components and Hooks](./react-calls-components-and-hooks.md)
- [Rules of Hooks](./rules-of-hooks.md)
