---
source: https://www.typescriptlang.org/docs/handbook/jsx.html
---

# JSX

TypeScript supports embedding, type checking, and compiling JSX (an embeddable XML-like syntax) directly to JavaScript.

## Signature / Usage

Name files with a `.tsx` extension and enable the `jsx` option. Modes: `preserve`, `react` (classic runtime), `react-jsx` (automatic runtime), `react-jsxdev` (automatic development runtime), `react-native`.

```tsx
import MyComponent from "./myComponent";

<MyComponent />; // ok
<SomeOtherComponent />; // error
```

## Options / Props

| Mode | Input | Output | Output File Extension |
| --- | --- | --- | --- |
| `preserve` | `<div />` | `<div />` | `.jsx` |
| `react` | `<div />` | `React.createElement("div")` | `.js` |
| `react-native` | `<div />` | `<div />` | `.js` |
| `react-jsx` | `<div />` | `_jsx("div", {}, void 0);` | `.js` |
| `react-jsxdev` | `<div />` | `_jsxDEV("div", {}, void 0, false, {...}, this);` | `.js` |

Related compiler flags (also usable as inline per-file pragmas): `jsx`, `jsxFactory` (defaults to `React.createElement`), `jsxFragmentFactory`, `jsxImportSource`.

## Notes

- Angle-bracket type assertions (`<Foo>bar`) are disallowed in `.tsx` files; use `as`, which works in both `.ts` and `.tsx`:

```ts
const foo = bar as Foo;
```

- Intrinsic elements (lowercase first letter) are looked up on `JSX.IntrinsicElements`; if the interface is not specified, intrinsic elements are not type checked. Value-based elements (uppercase first letter) are looked up as identifiers in scope.

```tsx
declare namespace JSX {
  interface IntrinsicElements {
    foo: any;
  }
}

<foo />; // ok
<bar />; // error
```

- The `JSX` namespace location depends on `jsx`: for `preserve` / `react` / `react-native` it is on the top-most identifier of the JSX factory (`React.JSX` for `React.createElement`, `h.JSX` for Preact's `h`); for `react-jsx` it is exported from `${jsxImportSource}/jsx-runtime`, for `react-jsxdev` from `${jsxImportSource}/jsx-dev-runtime` (map via the `exports` field in `package.json`). If missing, both fall back to the global `JSX` namespace. The production runtime needs `jsx`, `jsxs`, `Fragment` exports; the development runtime needs `jsxDEV` and `Fragment`.

```json
{
  "exports": {
    "./jsx-runtime": "./jsx-runtime.js",
    "./jsx-dev-runtime": "./jsx-dev-runtime.js",
  }
}
```

- Function components: first argument is a `props` object; return type must be assignable to `JSX.Element` by default (`JSX.Element | null`); as of TypeScript 5.1, if `JSX.ElementType` is defined it decides which component types are valid instead. TypeScript first tries to resolve an expression as a function component (overload resolution), then as a class component. The `SFC` / `StatelessComponent` types were deprecated.
- Class components: the element instance type must be assignable to `JSX.ElementClass` (default `{}`; can be augmented).

```tsx
declare namespace JSX {
  interface ElementClass {
    render: any;
  }
}
```

- Attribute type checking: for intrinsic elements the attributes type is the property type on `JSX.IntrinsicElements`; for value-based elements it is the type of the property named by `JSX.ElementAttributesProperty` on the instance type (as of TypeScript 2.8, if not provided, the type of the first constructor / call parameter is used). Attributes that are not valid JS identifiers (e.g. `data-*`) are not an error if missing. `JSX.IntrinsicAttributes` and `JSX.IntrinsicClassAttributes<T>` add framework attributes such as `key` / `ref`.

```tsx
declare namespace JSX {
  interface ElementAttributesProperty {
    props; // specify the property name to use
  }
}
```

- Children type checking (since TypeScript 2.3): the name of `children` is determined by `JSX.ElementChildrenAttribute`.

```ts
declare namespace JSX {
  interface ElementChildrenAttribute {
    children: {}; // specify children name to use
  }
}
```

- The JSX result type is `any` by default; customize via `JSX.Element` (a black box: no element / attribute / children type information is retrievable). As of TypeScript 5.1, `JSX.ElementType` overrides what is a valid JSX component type (it does not define valid props).

```ts
namespace JSX {
    export type ElementType =
        // All the valid lowercase tags
        | keyof IntrinsicElements
        // Function components
        | (props: any) => Element
        // Class components
        | new (props: any) => ElementClass;
    export interface IntrinsicAttributes extends /*...*/ {}
    export type Element = /*...*/;
    export type ElementClass = /*...*/;
}
```

- React integration: use the React typings from DefinitelyTyped, which define the `JSX` namespace for React.

## Related

- [Declaration Merging](./declaration-merging.md)
- [Namespaces](./namespaces.md)
