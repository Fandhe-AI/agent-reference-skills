---
source: https://github.com/microsoft/TypeScript/blob/main/README.md
---

# Install

TypeScript 本体のインストールコマンド集。7.0 ではネイティブ版 `tsc` が標準。

> 出典: TypeScript README、typescript-go `typescript/v7.0.2` の README.md、公式ブログ https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/

## 最新安定版のインストール

```sh
npm install -D typescript
```

7.0 では新しい `tsc` 実行ファイルが入る（`npx tsc` で実行）。

## nightly ビルドのインストール

```sh
npm install -D typescript@next
```

7.0 ブログによると、nightly は今後 `typescript` パッケージの `next` タグで再開される。

## TypeScript 6.0 API との併用 (npm alias)

```sh
npm install -D typescript@npm:@typescript/typescript6
```

> 注記: この alias では `tsc6` 実行ファイルのみが残る。typescript-eslint など 6.0 API を peer dependency で要求するツール向け。7.0 の `tsc` も使う場合は `package.json` で別名 alias を追加する（`samples/` の side-by-side 参照）。

## 旧 nightly パッケージ (@typescript/native-preview)

```sh
npm install @typescript/native-preview
npx tsgo # Use this as you would tsc.
```

> 注記: typescript-go README は「TypeScript 7.0 RC 以降のコマンド名は `tsc`」と記載。`tsgo` は旧 nightly の名称で、7.0 では `typescript` パッケージの `tsc` を使う。
