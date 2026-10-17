---
source: https://react.dev/reference/rules/react-calls-components-and-hooks
---

# React calls Components and Hooks

React is responsible for rendering components and Hooks when necessary to optimize the user experience. It is declarative: you tell React what to render in your component's logic, and React will figure out how best to display it to your user.

## Signature / Usage

```js
function BlogPost() {
  return <Layout><Article /></Layout>; // ✅ Good: Only use components in JSX
}
```

```js
function BlogPost() {
  return <Layout>{Article()}</Layout>; // 🔴 Bad: Never call them directly
}
```

Hooks: create a static version instead of mutating or injecting them.

```js
function ChatInput() {
  const useDataWithLogging = withLogging(useData); // 🔴 Bad: don't write higher order Hooks
  const data = useDataWithLogging();
}
```

```js
function ChatInput() {
  const data = useDataWithLogging(); // ✅ Good: Create a new version of the Hook
}

function useDataWithLogging() {
  // ... Create a new version of the Hook and inline the logic here
}
```

```js
function ChatInput() {
  return <Button useData={useDataWithLogging} /> // 🔴 Bad: don't pass Hooks as props
}
```

```js
function ChatInput() {
  return <Button />
}

function Button() {
  const data = useDataWithLogging(); // ✅ Good: Use the Hook directly
}

function useDataWithLogging() {
  // If there's any conditional logic to change the Hook's behavior, it should be inlined into
  // the Hook
}
```

## Notes

- Never call component functions directly: components should only be used in JSX. React must decide when your component function is called during rendering.
- If a component contains Hooks, it's easy to violate the Rules of Hooks when components are called directly in a loop or conditionally.
- Benefits of letting React orchestrate rendering: components become more than functions (local state through Hooks tied to the component's identity in the tree); component types participate in reconciliation (moving from `<Feed>` to `<Profile>`, React won't attempt to re-use them); React can enhance your user experience (let the browser do some work between component calls so a large re-render doesn't block the main thread); a better debugging story (rich developer tools); more efficient reconciliation (React decides which components need re-rendering and skips the rest).
- Never pass around Hooks as regular values: Hooks should only be called inside of components or Hooks. They should always be called as a function. This enables _local reasoning_. Breaking this rule will cause React to not automatically optimize your component.
- Don't dynamically mutate a Hook (no higher order Hooks); Hooks should be as "static" as possible.
- Don't dynamically use Hooks (no passing Hooks as props); always inline the call of the Hook into the component. Dynamic Hook use increases complexity, inhibits local reasoning, and makes it easier to break the Rules of Hooks. If you need to mock components for tests, it's better to mock the server to respond with canned data; end-to-end tests are also usually more effective.

## Related

- [Rules of React](./overview.md)
- [Components and Hooks must be pure](./components-and-hooks-must-be-pure.md)
- [Rules of Hooks](./rules-of-hooks.md)
