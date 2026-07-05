# Info

`next info` でシステム情報を確認し、バグ報告に添付するためのコマンド集。

## システム情報を表示する（バグ報告用）

```sh
next info
```

OS の platform/arch/version、Node.js / npm / Yarn / pnpm のバージョン、`next` / `react` / `react-dom` などの package バージョンを出力する。GitHub Issue 作成時に添付する。

## 詳細なシステム情報を表示する

```sh
next info --verbose
```

デバッグ用に追加情報を収集する。

Source: https://nextjs.org/docs/app/api-reference/cli/next
