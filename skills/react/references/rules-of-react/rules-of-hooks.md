---
source: https://react.dev/reference/rules/rules-of-hooks
---

# Rules of Hooks

Hooks are defined using JavaScript functions, but they represent a special type of reusable UI logic with restrictions on where they can be called.

## Signature / Usage

```js
function Counter() {
  // ✅ Good: top-level in a function component
  const [count, setCount] = useState(0);
  // ...
}

function useWindowWidth() {
  // ✅ Good: top-level in a custom Hook
  const [width, setWidth] = useState(window.innerWidth);
  // ...
}
```

Violations:

```js
function Bad({ cond }) {
  if (cond) {
    // 🔴 Bad: inside a condition (to fix, move it outside!)
    const theme = useContext(ThemeContext);
  }
  // ...
}

function Bad({ cond }) {
  if (cond) {
    return;
  }
  // 🔴 Bad: after a conditional return (to fix, move it before the return!)
  const theme = useContext(ThemeContext);
  // ...
}

function Bad() {
  try {
    // 🔴 Bad: inside try/catch/finally block (to fix, move it outside!)
    const [x, setX] = useState(0);
  } catch {
    const [x, setX] = useState(1);
  }
}
```

Only call Hooks from React functions:

```js
function FriendList() {
  const [onlineStatus, setOnlineStatus] = useOnlineStatus(); // ✅
}

function setOnlineStatus() { // ❌ Not a component or custom Hook!
  const [onlineStatus, setOnlineStatus] = useOnlineStatus();
}
```

## Notes

- Functions whose names start with `use` are called Hooks in React.
- Don't call Hooks inside loops, conditions, nested functions, or `try`/`catch`/`finally` blocks. Instead, always use Hooks at the top level of your React function, before any early returns. You can only call Hooks while React is rendering a function component: at the top level in the body of a function component, or at the top level in the body of a custom Hook.
- Not supported: Hooks inside conditions or loops; after a conditional `return`; in event handlers; in class components; inside functions passed to `useMemo`, `useReducer`, or `useEffect`; inside `try`/`catch`/`finally` blocks.
- You can use the `eslint-plugin-react-hooks` plugin to catch these mistakes.
- Custom Hooks may call other Hooks (that's their whole purpose). This works because custom Hooks are also supposed to only be called while a function component is rendering.
- Only call Hooks from React function components or custom Hooks, not from regular JavaScript functions. This ensures that all stateful logic in a component is clearly visible from its source code.

## Related

- [Rules of React](./overview.md)
- [Components and Hooks must be pure](./components-and-hooks-must-be-pure.md)
- [React calls Components and Hooks](./react-calls-components-and-hooks.md)
