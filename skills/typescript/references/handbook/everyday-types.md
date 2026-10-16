---
source: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
---

# Everyday Types

The most common types in JavaScript/TypeScript code: primitives, arrays, `any`, function annotations, object types, unions, aliases, interfaces, assertions, literal types, `null` / `undefined`, enums, `bigint`, `symbol`.

## Signature / Usage

```ts
// Parameter and return type annotations
function printId(id: number | string): void {
  console.log("Your ID is: " + id);
}

// Object type with an optional property
function printName(obj: { first: string; last?: string }) {
  console.log(obj.last?.toUpperCase());
}

// Type alias, interface, assertion, literal union
type Point = { x: number; y: number };
interface Animal {
  name: string;
}
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
function printText(s: string, alignment: "left" | "right" | "center") {}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `noImplicitAny` | compiler option | Flag implicit `any` as an error |
| `strictNullChecks` | compiler option | Off: `null` / `undefined` assignable to any type. On: must be tested before use |

## Notes

- Primitives: `string`, `number`, `boolean` (always lower-case; `String` / `Number` / `Boolean` are special built-in types). Arrays: `number[]` or `Array<number>`; `[number]` is a tuple, a different thing.
- `any` disables type checking for a value. `noImplicitAny` flags implicit `any`.
- Type annotations go after the thing being typed (`let myName: string = "Alice"`); usually inferred from the initializer. Return types are usually inferred; async functions use `Promise<number>`.
- Contextual typing: anonymous functions in a position where the call is known get parameter types automatically (`names.forEach((s) => s.toUpperCase())`).
- Object types list properties and types; separators `,` or `;`. Optional properties use `?`; reading one yields `T | undefined`.
- Union types allow an operation only if valid for every member; narrow with `typeof`, `Array.isArray`, etc. Members with a common property can be used without narrowing.
- Type aliases (`type ID = number | string`) are only names, not distinct types. Interfaces name object types; TypeScript is structurally typed.
- Type alias vs interface: almost all `interface` features exist in `type`; a type cannot be re-opened to add properties, an interface can (declaration merging). Heuristic from the source: use `interface` until you need features from `type`.
- Type assertions (`as T` or `<T>expr`, the latter not in `.tsx`) are erased and unchecked at runtime; only conversions to a more or less specific type are allowed, otherwise go via `any` / `unknown` (`expr as any as T`).
- Literal types (`"hello"`, `-1 | 0 | 1`, `true`); `boolean` is an alias for `true | false`. Object properties infer widened types (`method: string`); fix with `as "GET"` or `as const`.
- Non-null assertion: postfix `!` removes `null` / `undefined` without checking.
- Enums are a runtime addition to JavaScript, not a type-level feature. `bigint` (`100n`, ES2020+) and `symbol` (`Symbol("name")`) are the less common primitives.

- Interface vs type-alias differences listed in the source: since TypeScript 4.2 alias names may appear in error messages (interfaces always do); aliases cannot participate in declaration merging; interfaces cannot rename primitives; `extends` can be more performant for the compiler than intersections.
- Default changed (6.0): `strict` (and therefore `strictNullChecks`, `noImplicitAny`) is now `true` by default. Source: TypeScript 6.0 announcement, "Simple Default Changes".

## Related

- [Narrowing](./narrowing.md)
- [Object Types](./object-types.md)
- [More on Functions](./more-on-functions.md)
