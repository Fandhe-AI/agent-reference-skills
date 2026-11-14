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

## 2.6.x での変更（CHANGELOG 由来）

出典（タグ pin、タグ実在は WebFetch で確認済み）: 2.6.2 = https://github.com/biomejs/biome/blob/%40biomejs/biome%402.6.2/packages/%40biomejs/biome/CHANGELOG.md 、2.6.7 = https://github.com/biomejs/biome/blob/%40biomejs/biome%402.6.7/packages/%40biomejs/biome/CHANGELOG.md 。取得ツールが CHANGELOG 本文を返さなかったため、各項目の記述と PR 番号の個別照合は未実施（個別 PR の出典 URL 未確認）

- 2.6.2: オブジェクト形式のプラグインエントリに `resolutionKind` オプションが追加された（#10711）。プラグインは構文ノードを `start_line` / `start_column` / `end_line` / `end_column` の範囲で絞り込める（#11713）。名前付き Grit ルール・ルールプリセット・設定をパッケージ経由で配布できる（#11408）。プラグイン `includes` のグロブは、設定ファイルのあるディレクトリからの相対パスで照合される（#12264）。`biome inspect plugins` で解決済みルールをプラグイン別に一覧できる（#11634）
- 2.6.7: JavaScript プラグインに `grit()` クエリが追加された（#12952）。構文 kind を `ast()` で列挙する代わりに Grit クエリを使え、Grit クエリのプラグインも semantic model を要求できる
- 2.6.7（破壊的）: JavaScript プラグイン API の `semantic()` クエリ関数が削除された（#13066）。semantic model が必要なルールは `ast()` に `{ semantic: true }` を渡す（`grit()` も同じオプションを受け付ける）。`semantic()` を使う既存プラグインは書き換えが必要

## register_diagnostic() API

| 引数 | 必須 | 説明 |
|------|------|------|
| span | ○ | 診断を添付する構文ノード |
| message | ○ | 表示メッセージ |
| severity | ✕ | 重大度（hint, info, warn, error）。デフォルト: error |
| fix_kind | ✕ | 書き換え修正の安全性（safe / unsafe）。`=>` 併用時のみ有効。デフォルト: unsafe |
