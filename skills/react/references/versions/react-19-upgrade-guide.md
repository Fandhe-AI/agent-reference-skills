---
source: https://react.dev/blog/2024/04/25/react-19-upgrade-guide
---

# React 19 Upgrade Guide

The improvements added to React 19 require some breaking changes, but the upgrade is designed to be smooth and most apps are not expected to be impacted. Blog post by Ricky Hanlon, April 25, 2024.

## Signature / Usage

Install (React 18.3 first is recommended: `react@18.3` is identical to 18.2 but adds warnings for deprecated APIs and other changes needed for React 19):

```bash
npm install --save-exact react@^19.0.0 react-dom@^19.0.0
```

Yarn:

```bash
yarn add --exact react@^19.0.0 react-dom@^19.0.0
```

TypeScript types:

```bash
npm install --save-exact @types/react@^19.0.0 @types/react-dom@^19.0.0
```

Run all React 19 codemods (from `react-codemod`, via codemod.com):

```bash
npx codemod@latest react/19/migration-recipe
```

The recipe runs `replace-reactdom-render`, `replace-string-ref`, `replace-act-import`, `replace-use-form-state`, `prop-types-typescript`. It does not include the TypeScript changes:

```bash
npx types-react-codemod@latest preset-19 ./path-to-app
```

Custom error handling on the root (errors in render are no longer re-thrown):

```js
const root = createRoot(container, {
  onUncaughtError: (error, errorInfo) => {
    // ... log error report
  },
  onCaughtError: (error, errorInfo) => {
    // ... log error report
  }
});
```

## Options / Props

### Removed APIs (Migration 18 to 19)

| Removed | Replacement | Codemod |
| --- | --- | --- |
| `propTypes` checks (silently ignored) | TypeScript or another type-checking solution | `npx codemod@latest react/prop-types-typescript` |
| `defaultProps` on function components (class components keep it) | ES6 default parameters | none listed |
| Legacy Context (`contextTypes`, `getChildContext`) | `contextType` with `createContext` | none listed |
| String refs | Ref callbacks | `npx codemod@latest react/19/replace-string-ref` |
| Module pattern factories | Regular functions | none listed |
| `React.createFactory` | JSX | none listed |
| `react-test-renderer/shallow` | Install `react-shallow-renderer` directly | none listed |
| `react-dom/test-utils` (`act` moved; all other functions removed) | `import {act} from 'react'` | `npx codemod@latest react/19/replace-act-import` |
| `ReactDOM.render` | `ReactDOM.createRoot` (`react-dom/client`) | `npx codemod@latest react/19/replace-reactdom-render` |
| `ReactDOM.hydrate` | `ReactDOM.hydrateRoot` (`react-dom/client`) | `npx codemod@latest react/19/replace-reactdom-render` |
| `unmountComponentAtNode` | `root.unmount()` | `npx codemod@latest react/19/replace-reactdom-render` |
| `ReactDOM.findDOMNode` | DOM refs | none listed |
| Deprecated TypeScript types | see TypeScript changes below | `types-react-codemod` |

### New deprecations

| Deprecated | Replacement / status |
| --- | --- |
| `element.ref` | `element.props.ref` (warns: "Accessing element.ref is no longer supported. ref is now a regular prop. It will be removed from the JSX Element type in a future release.") |
| `react-test-renderer` | Logs a deprecation warning and switched to concurrent rendering; migrate to `@testing-library/react` or `@testing-library/react-native` |

### Other breaking changes (changelog)

- react-dom: Error for javascript URLs in `src` and `href` (#26507)
- react-dom: Remove `errorInfo.digest` from `onRecoverableError` (#28222)
- react-dom: Remove `unstable_flushControlled` (#26397), `unstable_createEventHandle` (#28271), `unstable_renderSubtreeIntoContainer` (#28271), `unstable_runWithPriority` (#28271)
- react-is: Remove deprecated methods (#28224)

### TypeScript changes

| Change | Detail |
| --- | --- |
| Ref callback implicit returns rejected | `ref={current => (instance = current)}` becomes `ref={current => {instance = current}}` (preset codemod `no-implicit-ref-callback-return`) |
| `useRef` requires an argument | `useRef()` errors; `useRef(undefined)` passes; all refs are mutable; `MutableRef` deprecated in favor of `RefObject<T>` (`refobject-defaults`) |
| `ReactElement["props"]` defaults to `unknown` instead of `any` | Pass a type argument to `ReactElement` (`react-element-default-any-props`) |
| Global `JSX` namespace removed in favor of `React.JSX` | Wrap JSX namespace augmentation in `declare module "react"` (module specifier depends on `tsconfig` `jsx`: `react-jsx` -> `react/jsx-runtime`, `react-jsxdev` -> `react/jsx-dev-runtime`, `react`/`preserve` -> `react`) (`scoped-jsx`) |
| `useReducer` typings | Do not pass `React.Reducer<State, Action>` as a type argument; use `useReducer(reducer)` or `useReducer<State, [Action]>(reducer)` |

## Notes

- New JSX transform is now required: if not enabled, React warns "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform".
- Errors in render are not re-thrown: uncaught errors (not caught by an Error Boundary) are reported to `window.reportError`; caught errors are reported to `console.error`.
- Strict Mode: when double rendering in development, `useMemo` and `useCallback` reuse the memoized results from the first render during the second render. Strict Mode double-invokes ref callbacks on initial mount.
- Suspense: when a component suspends, React immediately commits the fallback of the nearest Suspense boundary without waiting for the sibling tree, then schedules another render for the suspended siblings to "pre-warm" lazy requests.
- UMD builds removed: load React 19 with a script tag via an ESM-based CDN such as esm.sh.
- Libraries depending on React internals may block upgrades: the `SECRET_INTERNALS` suffix was renamed to `_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE`. These updates are not listed as breaking changes per the Versioning Policy.
- `react-dom/test-utils`: all functions other than `act` error when called in React 19.
- Shallow rendering depends on React internals and can block future upgrades; migrating tests to `@testing-library/react` is recommended.
- Other notable changes: batch sync, default and continuous lanes (#25700); do not prerender siblings of a suspended component (#26380); detect infinite update loops caused by render phase updates (#26625); transitions in popstate are now synchronous (#26025); remove layout effect warning during SSR (#26395); warn and do not set empty string for src/href except anchor tags (#28124).

## Related

- [React v19](./react-19.md)
- [Versioning Policy](./versioning-policy.md)
- [React Versions](./versions.md)
- [createRoot](../dom-apis/createRoot.md)
- [hydrateRoot](../dom-apis/hydrateRoot.md)
- [act](../apis/act.md)
- [useRef](../hooks/useRef.md)
- [createRef](../legacy/createRef.md)
