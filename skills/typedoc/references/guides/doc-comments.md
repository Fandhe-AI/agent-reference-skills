# TypeDoc Doc Comments

Comment syntax, Markdown support, code blocks, TSDoc support overview, and all supported tags for documenting TypeScript code with TypeDoc.

## 詳細説明

### Comment Syntax

TypeDoc uses JSDoc/TSDoc-style `/** */` comment blocks. TypeDoc implements a minimal parser that extracts TSDoc/JSDoc tags and recognizes code blocks to ignore decorators.

```typescript
/**
 * This is a doc comment recognized by TypeDoc.
 */
export class MyClass {}
```

TypeDoc aims for TSDoc standard compliance without enforcing it. It can parse all (or nearly all) TSDoc-compliant comments, but does not require that your comments follow the standard. This provides better support for projects originally written using JSDoc and for more markdown constructs.

### Markdown Support

Comments support full Markdown formatting:

```typescript
/**
 * This comment _supports_ [Markdown](https://www.markdownguide.org/)
 */
export class DocumentMe {}
```

TypeDoc processes Markdown via its internal markdown-it parser. All standard Markdown features are supported: bold, italic, links, lists, tables, headings, etc.

### Code Blocks

Fenced code blocks (triple backticks) are fully supported with syntax highlighting powered by Shiki:

```typescript
/**
 * Code blocks are great for examples
 *
 * ```ts
 * // run typedoc --help for a list of supported languages
 * const instance = new MyClass();
 * ```
 */
export class MyClass {}
```

**Configuration for highlighting:**

| Option | Description |
|---|---|
| `--lightHighlightTheme` | Highlighting theme for light mode |
| `--darkHighlightTheme` | Highlighting theme for dark mode |
| `--highlightLanguages` | Additional languages to load for highlighting |

**Important**: Indentation-based code blocks will NOT prevent tags from being parsed within the code block. Always use fenced code blocks (triple backticks).

### Escaping Special Characters

Backslash escaping is supported for: `{`, `}`, `@`, `/`

```typescript
/**
 * This is not a \@tag. Nor is this an \{@inlineTag\}
 *
 * It is possible to escape the end of a comment:
 * ```ts
 * /**
 *  * docs for `example()`
 *  *\/
 * function example(): void
 * ```
 */
```

### Comment Discovery

TypeDoc discovers comments in these locations:

1. **Directly before declarations** -- The most common case.
2. **On parent nodes** -- Typically associated with declarations (e.g., variable statements).
3. **On union type branches** -- Comments before union type members in type aliases.
4. **On export specifiers** -- Comments on re-exports take precedence over module comments.

```typescript
/**
 * This works
 * @param x this works
 */
function example(x: string, /** This too */ y: number) {}

/** This also works */
class Example2 {}
```

```typescript
// Union type branch comments
type Choices =
  /** Comment for option 1 */
  | "option_1"
  /** Comment for option 2 */
  | { option_1: number };
```

```typescript
// Export specifier comments
/** A comment here will take precedence over a module comment in Lib */
export * as Lib from "lib";
```

### Ignored Comments

TypeDoc ignores comments containing `@license` or `@import` tags.

### TSDoc Compatibility

TypeDoc takes advantage of the fact that TSDoc syntax (with the exception of tags) is a subset of Markdown, so it delegates most comment parsing to its markdown parser. Key differences from strict TSDoc:

1. **`jsDocCompatibility` option** allows parsing comments more similarly to JSDoc/TypeScript.
2. **`@inheritDoc`** is recognized in both inline (`{@inheritDoc}`) and block tag forms.
3. **`@label`** is extended to support user-specified meanings in declaration references.
4. **`@link`** may parse using either TSDoc's declaration references or TypeScript's resolution.
5. **`@param`** supports ignoring type annotations for TypeScript's types-in-comments.
6. **`@privateRemarks`** may be configured for inclusion in documentation.
7. **`@public`** is NOT inherited by contained members.
8. **`@typeParam`** supports ignoring type annotations for TypeScript compatibility.

### Supported Tags

#### Block Tags

| Tag | Description |
|---|---|
| `@author` | Identifies the author of the code |
| `@category` | Organizes exports into categories |
| `@categoryDescription` | Provides descriptions for categories |
| `@showCategories` | Controls category visibility |
| `@hideCategories` | Hides specific categories |
| `@defaultValue` / `@default` | Specifies default parameter values |
| `@deprecated` | Marks code as no longer recommended |
| `@document` | Controls documentation generation (external docs) |
| `@example` | Provides usage examples |
| `@expandType` | Controls type expansion in output |
| `@group` | Organizes exports into groups |
| `@groupDescription` | Provides descriptions for groups |
| `@showGroups` | Controls group visibility |
| `@hideGroups` | Hides specific groups |
| `@disableGroups` | Disables group organization |
| `@import` | Imports external documentation |
| `@inlineType` | Controls type inlining |
| `@license` | Specifies licensing information (comment is ignored) |
| `@mergeModuleWith` | Merges module documentation |
| `@module` | Documents a module |
| `@param` / `@this` | Documents function parameters |
| `@preventExpand` | Prevents type expansion |
| `@preventInline` | Prevents type inlining |
| `@privateRemarks` | Internal-only documentation |
| `@property` / `@prop` | Documents object properties |
| `@remarks` | Provides additional details |
| `@returns` / `@return` | Documents return values |
| `@see` | References related documentation |
| `@since` | Indicates when the feature was added |
| `@sortStrategy` | Defines sorting behavior |
| `@summary` | Provides brief descriptions |
| `@template` | Documents generic type parameters |
| `@throws` | Documents thrown exceptions |
| `@typeParam` | Documents type parameters |
| `@type` | TypeScript type tag |
| `@yields` | Documents generator yields |
| `@jsx` | JSX pragma |
| `@typedef` | Type definition (JSDoc) |
| `@extends` / `@augments` | Extends a type |
| `@satisfies` | Satisfies a type |
| `@callback` | Callback type definition |

#### Modifier Tags

| Tag | Description |
|---|---|
| `@abstract` | Marks as abstract |
| `@alpha` | Stability: alpha stage |
| `@beta` | Stability: beta stage |
| `@class` | Forces class classification |
| `@enum` | Marks as enumeration |
| `@event` | Marks as event |
| `@eventProperty` | Marks as event property |
| `@expand` | Enables type expansion |
| `@experimental` | Marks as experimental |
| `@function` | Forces function classification |
| `@hidden` | Removes from documentation |
| `@hideconstructor` | Hides constructor |
| `@ignore` | Ignores in documentation |
| `@inline` | Enables type inlining |
| `@interface` | Forces interface classification |
| `@internal` | Marks as internal only |
| `@namespace` | Forces namespace classification |
| `@overload` | Marks as function overload |
| `@override` | Marks as override |
| `@packageDocumentation` | Documents the package |
| `@primaryExport` | Designates primary export |
| `@private` | Marks as private |
| `@protected` | Marks as protected |
| `@public` | Marks as public |
| `@readonly` | Marks as read-only |
| `@sealed` | Prevents subclassing |
| `@useDeclaredType` | Uses declared type |
| `@virtual` | Marks as virtual |

#### Inline Tags

| Tag | Description |
|---|---|
| `@include` / `@includeCode` | Includes external content |
| `@inheritDoc` | Inherits documentation from parent |
| `@label` | Assigns labels to sections |
| `@link` / `@linkcode` / `@linkplain` | Creates cross-references |

## コード例

### Comprehensive Comment Example

```typescript
/**
 * Represents a user in the system.
 *
 * @remarks
 * This class handles user authentication and profile management.
 * It implements the {@link IUser} interface.
 *
 * @example
 * ```ts
 * const user = new User("john", "john@example.com");
 * await user.authenticate();
 * console.log(user.isAuthenticated); // true
 * ```
 *
 * @see {@link AuthService} for authentication details
 * @since 1.0.0
 */
export class User implements IUser {
  /**
   * The user's display name.
   * @defaultValue `"Anonymous"`
   */
  name: string;

  /**
   * Creates a new User instance.
   *
   * @param username - The unique username
   * @param email - The user's email address
   * @throws {@link ValidationError} If the email is invalid
   */
  constructor(username: string, email: string) {
    // ...
  }

  /**
   * Authenticates the user against the backend.
   *
   * @returns A promise that resolves to `true` if authentication succeeds
   *
   * @alpha
   */
  async authenticate(): Promise<boolean> {
    // ...
  }
}
```

### Module Documentation

```typescript
/**
 * Core authentication module.
 *
 * @remarks
 * This module provides all authentication-related functionality.
 *
 * @packageDocumentation
 * @module
 */

export { User } from "./user";
export { AuthService } from "./auth-service";
```

### Grouping and Categorization

```typescript
/**
 * @group Lifecycle Methods
 */
init(): void {}

/**
 * @group Lifecycle Methods
 */
destroy(): void {}

/**
 * @category Configuration
 */
export interface Config {}
```

## 注意点

- TypeDoc ignores comments containing `@license` or `@import` tags entirely.
- Indentation-based code blocks do NOT prevent tag parsing. Always use fenced (triple backtick) code blocks.
- Backslash escaping is available for `{`, `}`, `@`, and `/` characters.
- The `@public` modifier tag is NOT inherited by contained members.
- TypeDoc does not require TSDoc compliance but can parse TSDoc-compliant comments.
- The `commentStyle` option controls how TypeDoc searches for comments.
- Export specifier comments take precedence over module comments for the same symbol.
- The `--useTsLinkResolution` option controls whether `@link` tags use TypeScript's resolution or TSDoc's declaration references.

## 関連

- [JSDoc Support](./jsdoc-support.md)
- [Declaration References](./declaration-references.md)
- [External Documents](./external-documents.md)
- [Installation & CLI](../getting-started/installation.md)
