---
source: https://ai-sdk.dev/docs/ai-sdk-core/devtools
---

# devtools

AI SDK DevTools のインストールとビューア起動コマンド。

> **警告**: DevTools は experimental でローカル開発専用。本番環境では使わない（公式の警告）。キャプチャしたデータは `.devtools/generations.json` に保存される。

## DevTools パッケージのインストール

```sh
npm i @ai-sdk/devtools
```

公式は `pnpm add @ai-sdk/devtools`。AI SDK v7 (`ai@latest`) が必要。

## ビューアの起動

```sh
npx @ai-sdk/devtools@latest
```

別ターミナルで起動し、`http://localhost:4983` を開く。

## monorepo での起動

```sh
cd apps/api
npx @ai-sdk/devtools@latest
```

AI SDK のコードが動くワークスペース（例: `apps/api`）から起動する。`@latest` を付けるのは、`npx` が bin のリンクされていない推移的依存ではなく実行可能なコピーをインストールするため（公式の説明）。

## Notes

- 統合の登録コード（`registerTelemetry(DevToolsTelemetry())`）は `references/operations/devtools.md` を参照。
