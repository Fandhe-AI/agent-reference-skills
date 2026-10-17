# プラグイン

## 概要

Biome リンターは GritQL プラグインをサポート。特定のコードパターンをマッチさせてカスタム診断メッセージを登録し、修正可能な書き換えを提案できる。

## プラグインの作成

`.grit` ファイル拡張子で GritQL スニペットを記述:

```gritql
`$fn($args)` where {
    $fn <: `Object.assign`,
    register_diagnostic(
        span = $fn,
        message = "Prefer object spread instead of `Object.assign()`"
    )
}
```

## 設定方法

```json
{
    "plugins": ["./path-to-plugin.grit"]
}
```

`biome lint` や `biome check` 実行時にプラグインが有効化。プラグインの診断は `lint/plugin` 抑制コメントで抑制できる（`analyzer/suppressions.md` 参照）。

## 書き換え（fixable code action）

`=>` 演算子で書き換えを提案できる（2.5.0 で JS / CSS / JSON に対し fixable code action 化）:

```gritql
`console.log($msg)` as $call where {
    register_diagnostic(
        span = $call,
        message = "Use console.info instead of console.log.",
        severity = "warn",
        fix_kind = "safe"
    ),
    $call => `console.info($msg)`
}
```

- `--write` なしでは提案として表示されるのみ
- `--write` で `fix_kind = "safe"` の書き換えを適用
- `--write --unsafe` で unsafe な書き換えも適用
- `fix_kind` 省略時は unsafe 扱い

## 特定ファイルへの制限（Restricting Plugins to Specific Files）

デフォルトではプラグインは Biome が処理する全ファイルで実行される。`plugins` の要素はオブジェクト `{ path, includes }` にでき、`includes` はグロブと否定（`!`）を受け付ける（2.5.0 で追加）:

```json
{
    "plugins": [
        {
            "path": "./react-plugin.grit",
            "includes": ["src/components/**"]
        },
        {
            "path": "./ts-only-plugin.grit",
            "includes": ["src/**/*.ts", "!src/**/*.test.ts"]
        }
    ]
}
```

`includes` 設定時は、1 つ以上の肯定パターンに一致し、否定パターンで除外されないファイルでのみ実行。

## 対象言語の指定

デフォルトは JavaScript（またはそのスーパー言語）。他の言語は明示指定:

```gritql
language css;

`$selector { $props }` where {
    $props <: contains `color: $color` as $rule,
    not $selector <: r"\.color-.*",
    register_diagnostic(
        span = $rule,
        message = "Don't set explicit colors. Use `.color-*` classes instead."
    )
}
```

対応言語: JavaScript, CSS, JSON

## register_diagnostic() API

| 引数 | 必須 | 説明 |
|------|------|------|
| span | ○ | 診断を添付する構文ノード |
| message | ○ | 表示メッセージ |
| severity | ✕ | 重大度（hint, info, warn, error）。デフォルト: error |
| fix_kind | ✕ | 書き換え修正の安全性（safe / unsafe）。`=>` 併用時のみ有効。デフォルト: unsafe |
