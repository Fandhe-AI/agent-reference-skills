# TypeDoc Declaration References

Syntax and resolution rules for @link references, including module source, component path, meaning disambiguation, and local/global resolution.

## 詳細説明

Declaration references are used within `{@link}`, `{@linkcode}`, and `{@linkplain}` tags to create cross-references to other documented symbols. TypeDoc's approach aligns closely with TypeScript's language service behavior, matching VSCode's resolution patterns.

### Core Syntax

The full syntax for a declaration reference is:

```
[moduleSource!]componentPath[:meaning]
```

All three parts are optional depending on context, but at least a component path is typically provided.

### Module Source

The section before `!` identifies which module a reference targets.

| Syntax | Behavior |
|---|---|
| `moduleA!` | Resolve starting from module `moduleA` |
| `"with!bang and \"quoted path\""!` | Quoted module name (supports escaping) |
| `!` (alone at start) | Force resolution from the project root (global scope) |
| (omitted) | Resolve locally relative to the current declaration scope |

Examples:

```typescript
/** {@link moduleA!MyClass} */       // Start from moduleA
/** {@link !MyClass} */              // Start from project root
/** {@link MyClass} */               // Resolve locally
/** {@link @my/lib!Bam} */           // Start from scoped package
```

### Component Path

The component path is composed of component names separated by delimiters: `.`, `#`, or `~`.

| Delimiter | Behavior |
|---|---|
| `.` | General-purpose: tries exports/static properties first, then members |
| `#` | Accesses instance members (class properties, interface members, enum values) |
| `~` | Namespace/module exports only (stricter than `.`) |

Examples:

```typescript
/** {@link module!Foo.Bar.Baz} */    // Navigate through exports
/** {@link Foo~Bar~Baz} */           // Strict namespace/module exports
/** {@link Baz#prop} */              // Instance property
/** {@link Baz.prop} */              // Static property (tried first) or instance member
```

**Delimiter resolution details:**

- `.` (dot) is the most common and flexible. It first checks exports and static properties, then falls back to instance members.
- `#` (hash) specifically targets instance members: class instance properties, interface members, and enum values.
- `~` (tilde) is the strictest, only accessing namespace or module exports.

### Meaning Disambiguation

An optional suffix after `:` specifies the declaration type or overload index to disambiguate between merged declarations or overloaded functions.

#### Keyword Meanings

| Keyword | Targets |
|---|---|
| `class` | Class declarations |
| `interface` | Interface declarations |
| `type` | Type alias declarations |
| `enum` | Enum declarations |
| `namespace` | Namespace declarations |
| `function` | Function declarations |
| `var` | Variable declarations |
| `constructor` | Class constructors |
| `member` | Class/interface members |
| `event` | Event declarations |
| `call` | Call signatures |
| `new` | Construct signatures |
| `index` | Index signatures |
| `complex` | Complex type expressions |
| `getter` | Getter accessors |
| `setter` | Setter accessors |

#### Meaning Syntax Formats

| Format | Description |
|---|---|
| `:keyword` | Disambiguate by declaration kind |
| `:keyword(N)` | Specific overload by zero-based index |
| `:(N)` or `:N` | Shorthand for overload index |
| `:LABEL` | Custom label from `{@label}` tag (alphanumeric + underscore) |

Examples:

```typescript
/** {@link foo:function} */          // The function named foo (not the variable/type)
/** {@link foo:function(1)} */       // The second overload of function foo
/** {@link foo:0} */                 // First overload (shorthand)
/** {@link foo:(0)} */               // First overload (explicit)
/** {@link @my/lib!Bam:type} */      // Type alias Bam from @my/lib
/** {@link MyClass:class} */         // The class (not interface if merged)
/** {@link MyClass.method:getter} */ // The getter for method
```

#### Custom Labels

You can assign custom labels using the `@label` tag and reference them:

```typescript
/**
 * @label FAST_SORT
 */
function sort(algo: "quick"): void;

/**
 * @label STABLE_SORT
 */
function sort(algo: "merge"): void;

/**
 * Uses {@link sort:FAST_SORT} for performance.
 */
function process() {}
```

### Resolution Algorithm

Declaration reference resolution proceeds in three stages:

#### Stage 1: Module Source Resolution

Identifies the starting scope for resolution:

- If a module source is specified (e.g., `moduleA!`), resolution starts from that module.
- If `!` is used alone, resolution starts from the project root.
- If no module source is specified, resolution starts from the current declaration's scope.

#### Stage 2: Component Path Resolution

Traverses the declaration hierarchy using the specified delimiters:

1. Start from the scope determined in Stage 1.
2. For each component in the path, navigate using the delimiter's rules.
3. `.` tries exports/static first, then members.
4. `#` targets only instance members.
5. `~` targets only namespace/module exports.

#### Stage 3: Meaning Resolution

Disambiguates between merged declarations or overloads:

1. If a keyword is specified, filter to matching declaration kinds.
2. If an overload index is specified, select that specific overload.
3. If a label is specified, match against `@label` tags.

### Scope and Resolution Behavior

- **Modules and namespaces** create new scopes for resolution.
- **Classes and interfaces** do NOT create new scopes (though TypeScript checks their members).
- Local references resolve relative to their declaration scope, walking up through parent scopes if not found.

### Failure and Scope Chain Walking

When resolution fails at the current scope, TypeDoc walks the scope chain:

1. Check the current reflection's children.
2. Check parent scopes progressively upward.
3. Check the project root.

### Forcing Global Resolution

When a local name shadows a global one, use `!` to force root-level resolution:

```typescript
namespace Outer {
  class Target {}

  /**
   * {@link Target}    // Resolves to Outer.Target (local)
   * {@link !Target}   // Resolves to the global Target
   */
  class Inner {}
}
```

## コード例

### Basic @link Usage

```typescript
/**
 * See {@link MyClass} for the main implementation.
 * The {@link MyClass.doSomething} method handles processing.
 */
export function helper() {}
```

### @linkcode and @linkplain

```typescript
/**
 * Use {@linkcode MyClass} to render as inline code.
 * Use {@linkplain MyClass} to render as plain text.
 * Use {@link MyClass} for the default rendering.
 */
```

### Link with Custom Display Text

```typescript
/**
 * See {@link MyClass | the main class} for details.
 * The {@link MyClass.doSomething | processing method} handles it.
 */
```

### Cross-Module References

```typescript
/**
 * This builds on {@link @my/core!CoreService}.
 * See {@link @my/utils!formatDate} for date formatting.
 */
export class MyService {}
```

### Disambiguating Merged Declarations

```typescript
interface Config {
  timeout: number;
}

namespace Config {
  export function create(): Config {
    return { timeout: 0 };
  }
}

/**
 * Use {@link Config:interface} for the type.
 * Use {@link Config:namespace} for the factory.
 * Use {@link Config.create:function} for the factory method.
 */
```

### Overload References

```typescript
/**
 * Parses a string.
 */
function parse(input: string): Result;
/**
 * Parses a buffer.
 */
function parse(input: Buffer): Result;

/**
 * Calls {@link parse:0} for string input.
 * Calls {@link parse:1} for buffer input.
 * Or equivalently: {@link parse:function(0)} and {@link parse:function(1)}.
 */
```

### Instance vs. Static Members

```typescript
class MyClass {
  /** Instance property */
  value: number = 0;

  /** Static factory */
  static create(): MyClass {
    return new MyClass();
  }
}

/**
 * {@link MyClass#value}   // Instance property (via #)
 * {@link MyClass.value}   // Tries static first, falls back to instance
 * {@link MyClass.create}  // Static method
 * {@link MyClass~create}  // Would fail - ~ only for namespace/module exports
 */
```

### Scope Chain Resolution

```typescript
namespace API {
  export class Client {}

  export namespace V2 {
    export class Client {}

    /**
     * {@link Client}       // Resolves to API.V2.Client (local scope)
     * {@link API.Client}   // Resolves to API.Client (explicit path)
     * {@link !API.Client}  // Resolves to API.Client (global root)
     */
    export class Service {}
  }
}
```

## 注意点

- The `.` delimiter is the most flexible and commonly used. Use `#` or `~` only when you need to specifically target instance members or namespace exports.
- When resolution fails, TypeDoc walks up the scope chain automatically. This means short names often work without full paths.
- Use `!` prefix to force resolution from the project root when local names shadow global ones.
- Module sources in declaration references correspond to the module names in your documentation, which may differ from file paths.
- Overload indices are zero-based.
- Custom labels (via `@label`) must be alphanumeric plus underscores only.
- TypeDoc's `@link` does NOT support JSDoc namepaths (e.g., `module:foo/bar~Baz`). Use the declaration reference syntax described above instead.
- The `--useTsLinkResolution` option controls whether `@link` tags use TypeScript's resolution algorithm or TypeDoc's declaration reference resolution.
- Classes and interfaces do not create scopes for resolution purposes, unlike modules and namespaces which do.

## 関連

- [Doc Comments](./doc-comments.md)
- [JSDoc Support](./jsdoc-support.md)
- [External Documents](./external-documents.md)
- [Installation & CLI](../getting-started/installation.md)
