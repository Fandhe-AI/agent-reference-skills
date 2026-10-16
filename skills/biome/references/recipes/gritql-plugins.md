# GritQL Plugin Recipes

## 概要

GritQL プラグインの実用例集。各例は `.grit` ファイルに保存し、`biome.json` の `plugins` に登録して使う。構文の導入は Linter Plugins と GritQL reference を参照。

## 登録

```json
{
  "plugins": ["./plugins/your-rule.grit"]
}
```

## JavaScript / TypeScript

### `==` を禁止（`null` 比較は除く）

`where` で条件を付与。`<:` は match operator、`not` は否定。カンマ区切りの条件はすべて真でマッチ。

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

### `forEach` を禁止

spread metavariable `$...` は 0 個以上の引数にマッチ（束縛しない）。`as $call` でノード全体を束縛。

```grit
`$collection.forEach($...)` as $call where {
    register_diagnostic(
        span = $call,
        message = "Prefer `for...of` over `.forEach()`. It supports `break`, `continue`, and `await`."
    )
}
```

### 禁止 import

`or` は子パターンのいずれかにマッチ。`$_` は束縛を作らない anonymous metavariable。

```grit
`import $_ from $source` where {
    $source <: or { `'lodash'`, `'underscore'`, `'moment'` },
    register_diagnostic(
        span = $source,
        message = "This package is not allowed. Use the approved alternative instead."
    )
}
```

`require()` も同時に拾う場合はトップレベル `or`:

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

### `new Date()` の引数付き呼び出しを禁止

`$...` のみなら 0 個以上、`$first, $...` なら 1 個以上の引数が必須。`new Date()` は許可され、`new Date("2024-01-15")` 等は検出される。

```grit
`new Date($first, $...)` as $expr where {
    register_diagnostic(
        span = $expr,
        message = "Avoid the `Date` constructor for parsing. Use the project's date utility instead."
    )
}
```

### `eval()` / `Function()` を禁止

トップレベル `or` の各アームで `as $match` と変数名を統一し、共通の `where` を共有。

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

### ネストした三項演算子を禁止

Biome の CST ノード（`PascalCase`、例 `JsConditionalExpression`）を直接マッチ。`contains` はサブツリー全体を探索。

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

### 関数パラメータ数の制限

`JsParameters()` と regex でカンマ 3 個以上（4 パラメータ以上）を検出。

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

### 空 catch ブロックを禁止

CST ノードはフィールド指定でネスト可能。

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

### `any` 型注釈を禁止

`TsAnyType` は TypeScript 固有ノード。

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

### `let` より `const`

`let` はキーワードでノードではないため、`JsVariableStatement()` を regex で絞る。

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

### `dangerouslySetInnerHTML` を禁止

スニペットパターンは JSX 内でも動作。

```grit
`dangerouslySetInnerHTML=$value` as $attr where {
    register_diagnostic(
        span = $attr,
        message = "Do not use `dangerouslySetInnerHTML`. Sanitize content and render it safely instead."
    )
}
```

### inline `style` prop を禁止

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

### `!important` を禁止

`.grit` 先頭の `engine biome(1.0)` と `language css` で CSS の構文木に切り替える。

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

### ハードコード色を禁止

regex は `r"..."` 構文でノードのテキストにマッチ。

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

`rgb()` / `hsl()` も対象にする場合は `or` で regex を併記:

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

### 特定プロパティを禁止

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

### キー命名規則（camelCase）

`language json` と `engine biome(1.0)` を使用。JSON ではメタ変数付きスニペットが使えないため CST ノード `JsonMemberName()` を使う。

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

### 複数ルールを 1 ファイルに集約

トップレベル `or` の各アームに独立した `where`・severity・message を持たせる。

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

## CST ノード名の調べ方

1. Biome Playground を開き、対象コードを貼り付ける。
2. 出力パネルの **Syntax** タブでノード名を確認。
3. パターンに `NodeName()`、または `NodeName(field = ...)` として使う。

### JavaScript / TypeScript の代表的ノード

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

### ヘッダー directive

```grit
engine biome(1.0)
language js(typescript, jsx)
```

`engine biome(1.0)` で Tree-sitter ではなく Biome の構文木を使用。`language` 未指定時は JavaScript とみなされる。

## Notes

- CST ノード名は Biome のパーサー固有で、バージョン間で変わる可能性がある。使用バージョンの Playground で確認すること。全ノードは Biome リポジトリ `xtask/codegen` の `.ungram` ファイルに定義。
- JSON のキーにマッチする regex は引用符を含むノード全文が対象（例 `"user_name"`）。`r".*_.*"` は両側の `.*` が引用符を吸収するため機能する。
- 各例の Playground リンクは出典ページ（https://biomejs.dev/recipes/gritql-plugins/）を参照。

## Related

- [renovate.md](./renovate.md)
