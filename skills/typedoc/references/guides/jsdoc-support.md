# TypeDoc JSDoc Support

JSDoc compatibility details, supported tags, behavioral differences, and the jsDocCompatibility configuration options.

## 詳細説明

TypeDoc aims to recognize most JSDoc comments in a manner similar to how they are handled by TypeScript and Visual Studio Code. When JSDoc and TSDoc specifications conflict, TypeDoc attempts to detect which implementation is intended. JSDoc compatibility is configurable via the `--jsDocCompatibility` option.

### Notable Differences Between JSDoc and TypeDoc

1. **`@link` tags** -- TypeDoc's `@link` implementation does not support JSDoc namepaths. Instead, it uses TSDoc declaration references or TypeScript's link resolution (controlled by `--useTsLinkResolution`).

2. **`@param` blocks** -- TypeDoc does not require type annotations in `@param` tags. In TypeScript projects, types are inferred from the code. TypeDoc supports ignoring type annotations for TypeScript's types-in-comments capability.

3. **`@see` tags** -- TypeDoc does not parse `@see` tag contents as links (unlike JSDoc which treats the content as a reference). The content is rendered as-is.

4. **Tag support** -- TypeDoc does not support all JSDoc tags. Some JSDoc-specific tags have no equivalent in TypeDoc's model.

### jsDocCompatibility Option

The `jsDocCompatibility` option controls how TypeDoc handles conflicts between JSDoc and TSDoc standards in comment parsing. It can be set globally to `true` or `false`, or configured per sub-option.

#### Sub-Options

| Sub-Option | Default | Description |
|---|---|---|
| `exampleTag` | `true` | Controls parsing of `@example` tag content as code. JSDoc specifies that `@example` content should be parsed as code, conflicting with TSDoc. When enabled, TypeDoc infers from tag content whether it contains a code block. |
| `defaultTag` | `true` | Controls parsing of `@default` / `@defaultValue` tag content as code, following the same JSDoc vs. TSDoc conflict resolution as `exampleTag`. |
| `inheritDocTag` | `true` | When `false`, TypeDoc produces a warning when rewriting `@inheritdoc` (lowercase d) to the TSDoc-standard `@inheritDoc` (capitalized D). |
| `ignoreUnescapedBraces` | `true` | Controls warning emission for unescaped braces (`{` and `}`) in comments. TSDoc requires escaping braces to avoid ambiguity with inline tag syntax. When enabled, unescaped braces do not trigger warnings. |

### JSDoc Tags Recognized by TypeDoc

TypeDoc recognizes the following JSDoc-origin tags:

#### Supported JSDoc Block Tags

| Tag | TypeDoc Behavior |
|---|---|
| `@param` | Documents function parameters. Type annotations are optional (TypeScript provides types). |
| `@returns` / `@return` | Documents return values. |
| `@throws` | Documents thrown exceptions. |
| `@example` | Provides usage examples. Content parsing depends on `jsDocCompatibility.exampleTag`. |
| `@default` / `@defaultValue` | Specifies default values. Content parsing depends on `jsDocCompatibility.defaultTag`. |
| `@deprecated` | Marks code as deprecated. |
| `@see` | References related documentation (content not parsed as links). |
| `@author` | Identifies the author. |
| `@since` | Indicates version/date when added. |
| `@type` | Specifies a type. |
| `@typedef` | Defines a type (JSDoc type definitions). |
| `@callback` | Defines a callback type. |
| `@property` / `@prop` | Documents object properties. |
| `@extends` / `@augments` | Extends a type. |
| `@satisfies` | Satisfies a type constraint. |
| `@template` | Documents generic type parameters. |
| `@yields` | Documents generator yield values. |

#### Supported JSDoc Modifier Tags

| Tag | TypeDoc Behavior |
|---|---|
| `@abstract` | Marks as abstract. |
| `@class` | Forces class classification. |
| `@enum` | Marks as enumeration. |
| `@function` | Forces function classification. |
| `@hideconstructor` | Hides the constructor from docs. |
| `@interface` | Forces interface classification. |
| `@namespace` | Forces namespace classification. |
| `@override` | Marks as override. |
| `@private` | Marks as private visibility. |
| `@protected` | Marks as protected visibility. |
| `@public` | Marks as public visibility. |
| `@readonly` | Marks as read-only. |

## コード例

### CLI Configuration

```bash
# Disable all JSDoc compatibility
typedoc --jsDocCompatibility false

# Disable only the defaultTag behavior
typedoc --jsDocCompatibility.defaultTag false
```

### JSON Configuration

```json
{
  "jsDocCompatibility": {
    "exampleTag": true,
    "defaultTag": true,
    "inheritDocTag": true,
    "ignoreUnescapedBraces": true
  }
}
```

### Disable All JSDoc Compatibility

```json
{
  "jsDocCompatibility": false
}
```

### Example Tag Behavior

When `jsDocCompatibility.exampleTag` is `true` (default), TypeDoc infers whether the `@example` content is a code block:

```typescript
/**
 * @example
 * This is treated as a code block automatically (JSDoc behavior):
 * const x = 1;
 *
 * @example
 * This is also treated as code because it has no fenced block:
 * myFunction("hello");
 */
function myFunction(input: string): void {}
```

When `jsDocCompatibility.exampleTag` is `false` (strict TSDoc), you must use fenced code blocks:

```typescript
/**
 * @example
 * ```ts
 * const x = 1;
 * ```
 */
function myFunction(input: string): void {}
```

### Default Tag Behavior

When `jsDocCompatibility.defaultTag` is `true` (default):

```typescript
/**
 * @default 42
 */
declare const myValue: number;
```

The content `42` is automatically rendered as code. With `false`, a fenced code block is required.

### inheritDoc Tag Casing

When `jsDocCompatibility.inheritDocTag` is `true` (default), `@inheritdoc` (lowercase) is silently rewritten to `@inheritDoc`:

```typescript
/**
 * @inheritdoc
 */
class Child extends Parent {}
```

When `false`, a warning is produced for the lowercase variant.

### Unescaped Braces

When `jsDocCompatibility.ignoreUnescapedBraces` is `true` (default), this does not produce a warning:

```typescript
/**
 * Returns an object like { name: string }.
 */
function getUser(): { name: string } {}
```

When `false`, braces must be escaped:

```typescript
/**
 * Returns an object like \{ name: string \}.
 */
function getUser(): { name: string } {}
```

## 注意点

- By default, all `jsDocCompatibility` sub-options are `true`, providing maximum JSDoc compatibility.
- Setting `jsDocCompatibility` to `false` disables ALL sub-options at once, switching to strict TSDoc behavior.
- TypeDoc's `@link` does NOT support JSDoc namepaths like `module:foo/bar~Baz`. Use declaration references instead.
- TypeDoc does NOT parse `@see` tag contents as links. If you need linked references, use `@see {@link SomeClass}` syntax.
- The `@inheritdoc` (lowercase d) to `@inheritDoc` (uppercase D) rewriting is controlled by `inheritDocTag`. In strict TSDoc, only `@inheritDoc` is valid.
- When `ignoreUnescapedBraces` is disabled, all braces in comments must be escaped with backslashes to avoid being interpreted as inline tag delimiters.
- TypeDoc processes JSDoc type expressions in comments but generally prefers TypeScript's own type information from the source code.

## 関連

- [Doc Comments](./doc-comments.md)
- [Declaration References](./declaration-references.md)
- [External Documents](./external-documents.md)
- [Installation & CLI](../getting-started/installation.md)
