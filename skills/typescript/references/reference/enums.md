---
source: https://www.typescriptlang.org/docs/handbook/enums.html
---

# Enums

Enums define a set of named constants (numeric or string based). They are one of the few TypeScript features that is not a type-level extension of JavaScript.

## Signature / Usage

```ts
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
```

`Up` is `1`; following members auto-increment (`Down` 2, `Left` 3, `Right` 4). Without initializers, `Up` is `0`.

String enum (every member constant-initialized with a string literal or another string enum member; no auto-increment, no reverse mapping):

```ts
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
```

## Notes

- An enum member without an initializer must be first, or come after numeric constants / constant enum members; `A = getSomeValue(), B,` is an error.
- Heterogeneous enums (mixing string and numeric members) are technically allowed but not advised.
- Constant enum expression: a literal (string / numeric), a reference to a previously defined constant enum member, a parenthesized constant expression, unary `+` `-` `~`, or binary `+ - * / % << >> >>> & | ^` on constant expressions. Evaluating to `NaN` or `Infinity` is a compile error. All other members are computed.

```ts
enum FileAccess {
  // constant members
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // computed member
  G = "123".length,
}
```

- Union enums: when all members are literal enum members (no initializer, string literal, numeric literal, or unary minus on a numeric literal), enum members become types and the enum type becomes a union of its members.
- Changed (5.0): all enums are union enums; computed members also get their own unique type, so the literal-member restriction above describes pre-5.0 behavior (see TypeScript 5.0 version notes).

```ts
enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}
```

- Enums are real objects at runtime and can be passed to functions. `keyof` on an enum does not behave like on a typical object; use `keyof typeof`:

```ts
enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

type LogLevelStrings = keyof typeof LogLevel;
```

- Reverse mappings: numeric enum members also map value -> name (`Enum[a]` is `"A"`); the emitted object stores both forward and reverse mappings. String enum members get no reverse mapping.
- `const enum`: completely removed during compilation and inlined at use sites; can only use constant enum expressions (no computed members).

```ts
const enum Enum {
  A = 1,
  B = A * 2,
}
```

- Const enum pitfalls (ambient const enums, i.e. in `.d.ts` files): incompatible with `isolatedModules`; values can be inlined from one dependency version while another is imported at runtime; `importsNotUsedAsValues: "preserve"` does not elide imports and type-only imports do not allow const enum values. Avoid by not using const enums, or by not publishing ambient const enums using `preserveConstEnums` and stripping `const` from `.d.ts` files in a build step.
- Ambient enums (`declare enum`) describe existing enums. An ambient (non-const) member without an initializer is always considered computed.

```ts
declare enum Enum {
  A = 1,
  B,
  C = 2,
}
```

- Objects vs enums: an object with `as const` may suffice and keeps the codebase aligned with JavaScript.

```ts
const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;

type Direction = typeof ODirection[keyof typeof ODirection];
```

## Related

- [Type Compatibility](./type-compatibility.md)
- [Declaration Merging](./declaration-merging.md)
