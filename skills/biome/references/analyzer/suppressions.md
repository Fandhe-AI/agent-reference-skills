# 抑制（Suppressions）

Source: https://biomejs.dev/analyzer/suppressions

## 概要

Biome Analyzer の抑制エンジンは linter と assist で共有。抑制コメントで特定行・範囲・ファイル全体のルールを無効化できる。

## 抑制コメントの構文

```
// biome-ignore <category>[/<group>[/<rule>]]: <reason>
```

### カテゴリ
- `lint` — リンタールール
- `assist` — アシストアクション
- `syntax` — 構文チェック
- `format` — フォーマッター

## 3つの抑制パターン

### 1. インライン抑制（次行限定）

```javascript
// biome-ignore lint/suspicious/noDebugger: デバッグ用
debugger;  // 抑制される
debugger;  // 抑制されない
```

### 2. ファイルレベル抑制（`biome-ignore-all`）

ファイル最上部に配置。ファイル全体に適用。

```javascript
// biome-ignore-all lint/suspicious/noDebugger: テストファイル
debugger;  // 抑制される
debugger;  // 抑制される
```

最上部以外に配置すると「未使用」と判定され `suppression/unused` 診断が発生。

### 3. 範囲抑制（`biome-ignore-start` / `biome-ignore-end`）

```javascript
// biome-ignore-start lint/suspicious/noDoubleEquals: レガシーコード
a == b;  // 抑制される
c == d;  // 抑制される
// biome-ignore-end lint/suspicious/noDoubleEquals: レガシーコード
f == g;  // 抑制されない
```

複数ネスト可能。各 `start` には対応する `end` が必須。

## 詳細度の制御

一般的（`lint:`）から具体的（`lint/group/rule`）まで指定可能。

## ルール値指定

括弧内で値指定可能: `biome-ignore lint/style/useNamingConvention(foo): reason`
