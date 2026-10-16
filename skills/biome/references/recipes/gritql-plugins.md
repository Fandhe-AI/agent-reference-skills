# GritQL Plugin Recipes

## Overview

Practical GritQL plugin examples. Save each example in a `.grit` file and register it in the `plugins` field of `biome.json`. For an introduction to the syntax, see Linter Plugins and the GritQL reference.

## Registration

```json
{
  "plugins": ["./plugins/your-rule.grit"]
}
```

## JavaScript / TypeScript

### Ban `==` (except comparisons against `null`)

`where` adds conditions. `<:` is the match operator and `not` negates. Comma-separated conditions must all be true for a match.

```grit
`$left == $right` where {
    $right <: not `null`,
    $left <: not `null`,
    register_diagnostic(
        span = $left,
        message = "Use `===` instead of `==`. Loose equality is only acceptable when comparing against `null`.",
        severity = "warn"
    )
}
```

### Ban `forEach`

The spread metavariable `$...` matches zero or more arguments (without binding them). `as $call` binds the whole node.

```grit
`$collection.forEach($...)` as $call where {
    register_diagnostic(
        span = $call,
        message = "Prefer `for...of` over `.forEach()`. It supports `break`, `continue`, and `await`."
    )
}
```

### Ban specific imports

`or` matches if any child pattern matches. `$_` is an anonymous metavariable that creates no binding.

```grit
`import $_ from $source` where {
    $source <: or { `'lodash'`, `'underscore'`, `'moment'` },
    register_diagnostic(
        span = $source,
        message = "This package is not allowed. Use the approved alternative instead."
    )
}
```

To also catch `require()`, use a top-level `or`:

```grit
or {
    `import $_ from $source`,
    `require($source)`
} where {
    $source <: or { `'lodash'`, `'underscore'`, `'moment'` },
    register_diagnostic(
        span = $source,
        message = "This package is not allowed. Use the approved alternative instead."
    )
}
```

### Ban `new Date()` calls with arguments

`$...` alone matches zero or more arguments; `$first, $...` requires at least one. `new Date()` is allowed, while `new Date("2024-01-15")` and similar are reported.

```grit
`new Date($first, $...)` as $expr where {
    register_diagnostic(
        span = $expr,
        message = "Avoid the `Date` constructor for parsing. Use the project's date utility instead."
    )
}
```

### Ban `eval()` / `Function()`

Use the same `as $match` variable name in each arm of the top-level `or` so the arms share one `where`.

```grit
or {
    `eval($code)` as $match,
    `new Function($...)` as $match
} where {
    register_diagnostic(
        span = $match,
        message = "Dynamic code evaluation is not allowed. Avoid `eval()` and `new Function()`."
    )
}
```

### Ban nested ternary expressions

Match Biome CST nodes (`PascalCase`, e.g. `JsConditionalExpression`) directly. `contains` searches the whole subtree.

```grit
engine biome(1.0)
language js(typescript, jsx)

JsConditionalExpression() as $outer where {
    $outer <: contains JsConditionalExpression() as $inner,
    register_diagnostic(
        span = $inner,
        message = "Nested ternary expressions are not allowed. Use `if`/`else` instead."
    )
}
```

### Limit the number of function parameters

Use `JsParameters()` with a regex to detect three or more commas (four or more parameters).

```grit
engine biome(1.0)
language js(typescript, jsx)

JsParameters() as $params where {
    $params <: r".*,.*,.*,.*",
    register_diagnostic(
        span = $params,
        message = "Functions should not have more than 3 parameters. Use an options object instead.",
        severity = "warn"
    )
}
```

### Ban empty catch blocks

CST nodes can be nested by specifying fields.

```grit
engine biome(1.0)
language js(typescript, jsx)

JsCatchClause(body = JsBlockStatement(statements = [])) as $catch where {
    register_diagnostic(
        span = $catch,
        message = "Empty catch blocks are not allowed. Handle the error or add a comment explaining why it is ignored."
    )
}
```

### Ban `any` type annotations

`TsAnyType` is a TypeScript-specific node.

```grit
engine biome(1.0)
language js(typescript)

TsAnyType() as $any where {
    register_diagnostic(
        span = $any,
        message = "Don't use `any`. Use `unknown`, a specific type, or a generic instead.",
        severity = "warn"
    )
}
```

### Prefer `const` over `let`

`let` is a keyword, not a node, so narrow `JsVariableStatement()` with a regex.

```grit
engine biome(1.0)
language js(typescript, jsx)

JsVariableStatement() as $stmt where {
    $stmt <: r"let.*",
    register_diagnostic(
        span = $stmt,
        message = "Prefer `const` unless the variable is reassigned.",
        severity = "hint"
    )
}
```

### Ban `dangerouslySetInnerHTML`

Snippet patterns also work inside JSX.

```grit
`dangerouslySetInnerHTML=$value` as $attr where {
    register_diagnostic(
        span = $attr,
        message = "Do not use `dangerouslySetInnerHTML`. Sanitize content and render it safely instead."
    )
}
```

### Ban the inline `style` prop

```grit
`style=$value` as $attr where {
    register_diagnostic(
        span = $attr,
        message = "Avoid inline `style` props. Use a CSS class or a styled component instead.",
        severity = "warn"
    )
}
```

## CSS

### Ban `!important`

`engine biome(1.0)` and `language css` at the top of the `.grit` file switch to the CSS syntax tree.

```grit
engine biome(1.0)
language css

CssDeclarationWithSemicolon() as $decl where {
    $decl <: contains CssDeclarationImportant(),
    register_diagnostic(
        span = $decl,
        message = "Avoid `!important`. Increase selector specificity or restructure your styles instead."
    )
}
```

### Ban hardcoded colors

Regexes use the `r"..."` syntax and match against the node's text.

```grit
language css;

`color: $value` as $decl where {
    $value <: r"#[0-9a-fA-F]+",
    register_diagnostic(
        span = $value,
        message = "Don't use hardcoded hex colors. Use a CSS custom property (e.g. `var(--color-primary)`) instead.",
        severity = "warn"
    )
}
```

To also cover `rgb()` / `hsl()`, list the regexes inside `or`:

```grit
language css;

`color: $value` as $decl where {
    $value <: or {
        r"#[0-9a-fA-F]+",
        r"rgba?\(.*\)",
        r"hsla?\(.*\)"
    },
    register_diagnostic(
        span = $value,
        message = "Don't use hardcoded colors. Use a CSS custom property instead.",
        severity = "warn"
    )
}
```

### Ban specific properties

```grit
language css;

or {
    `float: $value`,
    `clear: $value`
} as $decl where {
    register_diagnostic(
        span = $decl,
        message = "The `float` and `clear` properties are not allowed. Use Flexbox or Grid for layout."
    )
}
```

## JSON

### Key naming convention (camelCase)

Use `language json` and `engine biome(1.0)`. Snippets with metavariables are not available for JSON, so use the CST node `JsonMemberName()`.

```grit
engine biome(1.0)
language json

JsonMemberName() as $name where {
    $name <: or { r".*_.*", r".[A-Z].*" },
    register_diagnostic(
        span = $name,
        message = "JSON keys must use camelCase.",
        severity = "warn"
    )
}
```

## Advanced Patterns

### Combine multiple rules in one file

Give each arm of the top-level `or` its own `where`, severity, and message.

```grit
or {
    `debugger` as $match where {
        register_diagnostic(
            span = $match,
            message = "Remove `debugger` statements before committing."
        )
    },
    `alert($...)` as $match where {
        register_diagnostic(
            span = $match,
            message = "Remove `alert()` calls before committing."
        )
    },
    `console.$method($...)` as $match where {
        $method <: or { `log`, `debug`, `trace` },
        register_diagnostic(
            span = $match,
            message = "Remove debug logging before committing.",
            severity = "warn"
        )
    }
}
```

## Finding CST node names

1. Open the Biome Playground and paste the target code.
2. Check the node name on the **Syntax** tab of the output panel.
3. Use it in a pattern as `NodeName()` or `NodeName(field = ...)`.

### Common JavaScript / TypeScript nodes

| Node Name | Matches |
| --- | --- |
| `JsIfStatement` | `if (...) { ... }` |
| `JsConditionalExpression` | `a ? b : c` |
| `JsForStatement` | `for (...; ...; ...) { ... }` |
| `JsForOfStatement` | `for (... of ...) { ... }` |
| `JsCallExpression` | `fn()`, `obj.method()` |
| `JsNewExpression` | `new Foo()` |
| `JsArrowFunctionExpression` | `() => { ... }` |
| `JsFunctionDeclaration` | `function foo() { ... }` |
| `JsCatchClause` | `catch (e) { ... }` |
| `JsBlockStatement` | `{ ... }` (block of statements) |
| `JsFormalParameter` | A single function parameter |
| `JsParameters` | The parameter list `(a, b, c)` |
| `JsVariableDeclaration` | `const x = 1`, `let y = 2` |
| `TsAnyType` | `: any` type annotation |
| `TsTypeAlias` | `type Foo = ...` |
| `TsInterfaceDeclaration` | `interface Foo { ... }` |
| `JsxElement` | `<div>...</div>` |
| `JsxSelfClosingElement` | `<img />` |
| `JsxAttribute` | `className="test"`, `disabled` |

### CSS

| Node Name | Matches |
| --- | --- |
| `CssDeclarationWithSemicolon` | `property: value;` |
| `CssComplexSelector` | `div > .class` |

### Header directives

```grit
engine biome(1.0)
language js(typescript, jsx)
```

`engine biome(1.0)` uses Biome's syntax tree instead of Tree-sitter. When `language` is omitted, JavaScript is assumed.

## Notes

- CST node names are specific to Biome's parser and may change between versions. Check them in the Playground for the version you use. All nodes are defined in the `.ungram` files under `xtask/codegen` in the Biome repository.
- A regex matching a JSON key is applied to the whole node text including the quotes (e.g. `"user_name"`). `r".*_.*"` works because the `.*` on both sides absorbs the quotes.
- For the Playground link of each example, see the source page: https://biomejs.dev/recipes/gritql-plugins/

## Related

- [renovate.md](./renovate.md)
