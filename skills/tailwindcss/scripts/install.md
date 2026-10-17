---
source: https://tailwindcss.com/docs/installation/using-vite
---

# Install

Tailwind CSS v4 の導入コマンド集。Vite プラグイン・PostCSS プラグイン・Tailwind CLI・Play CDN の 4 系統（出典: 公式 Installation 各タブ）。

## Vite プラグインでのインストール

出典: https://tailwindcss.com/docs/installation/using-vite

```sh
npm create vite@latest my-project
cd my-project
npm install tailwindcss @tailwindcss/vite
```

`vite.config.ts` の `plugins` に `@tailwindcss/vite` の `tailwindcss()` を追加し、CSS に次を書く。

```css
@import "tailwindcss";
```

```sh
npm run dev
```

Vite プロジェクトが既にある場合は 1 行目・2 行目は不要。

## PostCSS プラグインでのインストール

出典: https://tailwindcss.com/docs/installation/using-postcss

```sh
npm install tailwindcss @tailwindcss/postcss postcss
```

`postcss.config.mjs` の `plugins` に `"@tailwindcss/postcss": {}` を追加し、CSS に `@import "tailwindcss";` を書いてからビルドを実行する。

```sh
npm run dev
```

## Tailwind CLI でのインストールとビルド

出典: https://tailwindcss.com/docs/installation/tailwind-cli

```sh
npm install tailwindcss @tailwindcss/cli
```

`src/input.css` に `@import "tailwindcss";` を書き、CLI を起動する。

```sh
npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch
```

フラグの詳細は [cli.md](./cli.md)。Node.js 無しで使えるスタンドアロン実行ファイルが GitHub Releases にある旨が公式に記載（取得コマンドは公式未記載）。

## Play CDN の読み込み

出典: https://tailwindcss.com/docs/installation/play-cdn

> **警告**: Play CDN は開発用途専用で、本番利用は想定されていない（公式記載）。

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

`type="text/tailwindcss"` の `<style>` 内で `@theme` などのカスタム CSS を書ける。

```html
<style type="text/tailwindcss">
  @theme {
    --color-clifford: #da373d;
  }
</style>
```
