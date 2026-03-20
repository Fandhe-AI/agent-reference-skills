# プラグイン

## 概要

Biome リンターは GritQL プラグインをサポート。特定のコードパターンをマッチさせてカスタム診断メッセージを登録できる。

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

`biome lint` や `biome check` 実行時にプラグインが有効化。

## 対象言語の指定

デフォルトは JavaScript。他の言語を指定可能:

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

対応言語: JavaScript, CSS

## register_diagnostic() API

| 引数 | 必須 | 説明 |
|------|------|------|
| span | ○ | 診断を添付する構文ノード |
| message | ○ | 表示メッセージ |
| severity | ✕ | 重大度（hint, info, warn, error）。デフォルト: error |
