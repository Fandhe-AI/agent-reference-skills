# Formatter

Source: https://biomejs.dev/formatter/

## 概要

Biome はオピニオン型フォーマッターで、複数の言語をサポート。Prettier と同じ哲学に基づき、設定オプションを意図的に制限している。

## 対応言語

JavaScript, TypeScript, JSX, TSX, JSON, JSONC, CSS, GraphQL, HTML

## CLI での使い方

```bash
# フォーマットチェック（変更なし）
biome format ./src

# フォーマット適用
biome format --write ./src
```

## デフォルト設定（言語共通）

| オプション | デフォルト | 説明 |
|-----------|-----------|------|
| indentStyle | tab | インデント方式（tab / space） |
| indentWidth | 2 | インデント幅 |
| lineWidth | 80 | 1行の最大文字数 |
| lineEnding | lf | 改行コード（lf / crlf / cr） |

## JavaScript 固有オプション

| オプション | デフォルト |
|-----------|-----------|
| quoteStyle | double |
| jsxQuoteStyle | double |
| trailingCommas | all |
| semicolons | always |
| arrowParentheses | always |
| bracketSpacing | true |
| bracketSameLine | false |

## 抑制方法

### ファイルレベル
```javascript
// biome-ignore-all format: reason
```

### 部分的
```javascript
// biome-ignore format: reason
const x = 1;
```

## .editorconfig 統合

v1.9 以降で `.editorconfig` の読み込みをサポート。`formatter.useEditorconfig: true` で有効化。
