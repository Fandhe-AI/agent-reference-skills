---
source: https://react.dev/learn/react-compiler/introduction
---

# Introduction

React Compiler is a new build-time tool that automatically optimizes your React app. It works with plain JavaScript, and understands the Rules of React, so you don't need to rewrite any code to use it.

## Signature / Usage

Without the compiler, you manually memoize components and values:

```js
import { useMemo, useCallback, memo } from 'react';

const ExpensiveComponent = memo(function ExpensiveComponent({ data, onClick }) {
  const processedData = useMemo(() => {
    return expensiveProcessing(data);
  }, [data]);

  const handleClick = useCallback((item) => {
    onClick(item.id);
  }, [onClick]);

  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} onClick={() => handleClick(item)} />
      ))}
    </div>
  );
});
```

With React Compiler, you write the same code without manual memoization:

```js
function ExpensiveComponent({ data, onClick }) {
  const processedData = expensiveProcessing(data);

  const handleClick = (item) => {
    onClick(item.id);
  };

  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} onClick={() => handleClick(item)} />
      ))}
    </div>
  );
}
```

## Notes

- The manual version has a subtle bug that breaks memoization: even though `handleClick` is wrapped in `useCallback`, the arrow function `() => handleClick(item)` creates a new function every time the component renders, so `Item` always receives a new `onClick` prop. React Compiler is able to optimize this correctly with or without the arrow function, ensuring that `Item` only re-renders when `props.onClick` changes.
- Memoization is primarily focused on improving update performance (re-rendering existing components): (1) skipping cascading re-rendering of components, (2) skipping expensive calculations from outside of React.
- React Compiler only memoizes React components and hooks, not every function, and its memoization is not shared across multiple components or hooks. If an expensive function is used in many components, consider implementing its own memoization outside of React; profile first.
- React Compiler is now stable and has been tested extensively in production, including at Meta. While the compiler is still an optional addition to React today, in the future some features may require the compiler in order to fully work. Rolling out to production depends on the health of your codebase and how well you've followed the Rules of React.
- Build tools: React Compiler can be installed across several build tools such as Babel, Vite, Metro, and Rsbuild. It is primarily a light Babel plugin wrapper around the core compiler, which was designed to be decoupled from Babel itself. The initial stable version remains primarily a Babel plugin; the React team is working with the swc and oxc teams on first class support.
- Next.js users can enable the swc-invoked React Compiler by using v15.3.1 and up.
- `useMemo` and `useCallback` can continue to be used with React Compiler as an escape hatch to control which values are memoized (for example a memoized value used as an effect dependency). For new code, rely on the compiler and use `useMemo`/`useCallback` where needed for precise control. For existing code, either leave existing memoization in place (removing it can change compilation output) or carefully test before removing it.
- Additional discussion: the React Compiler Working Group (github.com/reactwg/react-compiler).

## Related

- [Installation](./installation.md)
- [target](./target.md)
- [Configuration](./configuration.md)
- [Incremental Adoption](./incremental-adoption.md)
- [Debugging and Troubleshooting](./debugging.md)
- [Compiling Libraries](./compiling-libraries.md)
