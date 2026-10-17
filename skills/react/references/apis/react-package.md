---
source: https://react.dev/reference/react
---

# React Reference Overview

Detailed reference documentation for working with React, broken down into functional subsections. For an introduction to React, see the Learn section.

## Signature / Usage

```js
import { use, cache, startTransition } from 'react';
```

## Sections

### React

Programmatic React features:

| Section | Description |
| --- | --- |
| Hooks | Use different React features from your components. |
| Components | Built-in components that you can use in your JSX. |
| APIs | APIs that are useful for defining components. |
| Directives | Provide instructions to bundlers compatible with React Server Components. |

### React DOM

React DOM contains features that are only supported for web applications (which run in the browser DOM environment):

| Section | Description |
| --- | --- |
| Hooks | Hooks for web applications which run in the browser DOM environment. |
| Components | React supports all of the browser built-in HTML and SVG components. |
| APIs | The `react-dom` package contains methods supported only in web applications. |
| Client APIs | The `react-dom/client` APIs let you render React components on the client (in the browser). |
| Server APIs | The `react-dom/server` APIs let you render React components to HTML on the server. |
| Static APIs | The `react-dom/static` APIs let you generate static HTML for React components. |

### React Compiler

A build-time optimization tool that automatically memoizes your React components and values:

| Section | Description |
| --- | --- |
| Configuration | Configuration options for React Compiler. |
| Directives | Function-level directives to control compilation. |
| Compiling Libraries | Guide for shipping pre-compiled library code. |

### ESLint Plugin React Hooks

The ESLint plugin for React Hooks helps enforce the Rules of React. Each lint is documented with examples.

### Rules of React

React has idioms, or rules, for how to express patterns in a way that is easy to understand and yields high-quality applications:

| Rule | Description |
| --- | --- |
| Components and Hooks must be pure | Purity makes your code easier to understand, debug, and allows React to automatically optimize your components and hooks correctly. |
| React calls Components and Hooks | React is responsible for rendering components and hooks when necessary to optimize the user experience. |
| Rules of Hooks | Hooks are defined using JavaScript functions, but they represent a special type of reusable UI logic with restrictions on where they can be called. |

### Legacy APIs

Exported from the `react` package, but not recommended for use in newly written code.

## Related

- [Built-in React APIs](./overview.md)
- Hooks
- [Components](../components/overview.md)
- Legacy APIs
