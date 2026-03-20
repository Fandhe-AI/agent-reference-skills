# GritQL

## 概要

GritQL はソースコード内の構造的検索を実行するクエリ言語。空白やクォートの違いは無視し、構文構造のマッチングに焦点を当てる。

## サポート言語

- JavaScript/TypeScript: `language js`（オプション: `typescript`, `jsx`）
- CSS: `language css`
- JSON: `language json`

## パターンの基本

バッククォートでコードスニペットを囲む:

```gritql
`console.log('Hello, world!')`
```

フォーマット詳細は無視。クォートやスペースの違いもマッチ。

## 変数

`$` で始まる識別子:

```gritql
`console.log($message)`
`console.$method($message)`
```

同じ変数名の複数使用で一貫性チェック:
```gritql
`$fn && $fn()`
```

## 条件文

`where` と `<:` マッチ演算子:

```gritql
`console.$method($message)` where {
    $method <: or { `log`, `info`, `warn`, `error` }
}
```

## 構文ノードマッチング

Biome 内部ノード（PascalCase）を直接マッチ:

```gritql
JsIfStatement() as $stmt where {
  register_diagnostic(...)
}
```

## JSON パターン

```gritql
language json
`"foo": $value`
```

## 統合状況

GritQL サポートは開発中。多くの機能は動作するが、バグや未実装機能が存在する可能性あり。
