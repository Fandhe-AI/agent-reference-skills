# @link / @linkcode / @linkplain

Inline tags that create a link to another reflection (symbol), a URL, or similar target. Follows the TSDoc spec. Three variants exist, differing in how the link text is rendered.

## Signature / Usage

### @link

```
{@link Target}
{@link Target | Custom text}
{@link Target Custom text}
```

### @linkcode

```
{@linkcode Target}
{@linkcode Target | Custom text}
```

### @linkplain

```
{@linkplain Target}
{@linkplain Target | Custom text}
```

Syntax patterns:

1. **Basic form**: `{@link Foo.Bar}` — the last segment of the target (`Bar`) becomes the link text
2. **Pipe form**: `{@link Foo.Bar | Custom text}` — the text after the pipe becomes the link text
3. **Space-separated form** (TypeDoc extension): `{@link Foo.Bar Custom text}` — custom text without a pipe

### Examples

```typescript
/**
 * See {@link SomeClass} for details.
 */
export function helper(): void {}
```

```typescript
/**
 * See {@link Config | the config object} for configuration.
 * Or equivalently {@link Config the config object}.
 */
export function initialize(): void {}
```

```typescript
/**
 * This function internally calls {@linkcode processData}.
 * The link text is rendered in code font.
 */
export function run(): void {}
```

```typescript
/**
 * See {@linkplain Config config documentation} for details.
 * The link text is rendered as plain text.
 */
export function setup(): void {}
```

```typescript
/**
 * {@link SomeClass.someMethod} is used to run the process.
 * {@link SomeModule.SomeClass.someMethod | method details}
 */
export function execute(): void {}
```

```typescript
/**
 * Use {@link round:PRECISION} for precision-based rounding.
 */
export const value = round(3.14159, 2);
```

```typescript
/**
 * {@link MyModule:namespace} as a namespace, and
 * {@link MyModule:enum} as an enum, are different targets.
 *
 * Note: meaning qualifiers only work when useTsLinkResolution is disabled.
 */
```

## Notes

- **@link** — default link rendering; may render in code font depending on TypeDoc configuration.
- **@linkcode** — renders the link text in code font (`<code>`).
- **@linkplain** — renders the link text as plain text (normal font).
- TypeDoc resolves links in two stages:
  1. **TypeScript resolution (primary)** — enabled by default via `--useTsLinkResolution`; uses TypeScript's symbol resolution, matching VS Code's link-resolution behavior.
  2. **Declaration reference resolution (fallback)** — used when `--useTsLinkResolution` is disabled, or when TypeScript resolution fails.
- TypeScript resolution does not support meaning qualifiers (e.g. `:namespace`, `:enum`). When a name refers to both a namespace and an enum, TypeScript resolution targets the enum only; disable `--useTsLinkResolution` or use an explicit declaration-reference qualifier to disambiguate.
- The space-separated custom-text form (`{@link Target text}`) is a TypeDoc-specific extension.
- JSDoc's `@linkplain` and `@linkcode` are also recognized and use the same resolution logic.
- TypeDoc implements a newer declaration-reference specification rather than TSDoc's original syntax.

## Related

- [@label](./label.md) — assigns a label to an overloaded signature so it can be referenced
- [@inheritDoc](./inheritDoc.md) — copies documentation from another reflection
- [Declaration References](../guides/declaration-references.md) — declaration reference syntax
