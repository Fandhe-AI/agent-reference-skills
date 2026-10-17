---
source: https://vite.dev/guide/static-deploy
---

# Deploy CLI

Static Deploy ガイドに記載された、各ホストの CLI コマンド集。前提: 出力先は既定の `dist`、`package.json` に `"build": "vite build"` と `"preview": "vite preview"` がある。

> **警告**: 以下は実際にデプロイ（外部サービスへの公開）を行うコマンドを含む。アカウント・プロジェクトを確認し、検証は使い捨てのプロジェクトで行う。`--prod` 付きの Netlify デプロイは本番に反映される。

## ビルドとローカル確認

```sh
npm run build
npm run preview
```

`vite preview` は `dist` を `http://localhost:4173` で配信する。ポートは `--port` で変更できる。

## Netlify CLI

```sh
npm install -g netlify-cli
netlify init
netlify deploy
```

プレビュー URL が発行される。本番へ反映する場合は次を実行する。

```sh
netlify deploy --prod
```

## Vercel CLI

```sh
npm i -g vercel
vercel
```

Vite が自動検出され、適切な設定でデプロイされる。

## Cloudflare Workers

```sh
npm install --save-dev @cloudflare/vite-plugin
```

`vite.config.js` に `cloudflare()` プラグインを追加し、`wrangler.jsonc` に `name` を設定した上でビルドする。

```sh
npm run build
npx wrangler deploy
```

設定ファイルの全文は `references/build-deploy/deploy-cloudflare-firebase.md` を参照。

## Google Firebase

```sh
npm i -g firebase-tools
```

プロジェクト root に `firebase.json`（hosting.public を `dist`、rewrites で `**` を `/index.html`）と `.firebaserc`（`projects.default` に Firebase ID）を作成する。

```sh
npm run build
firebase deploy
```

## Surge

```sh
npm i -g surge
npm run build
surge dist
```

カスタムドメインを使う場合は次のとおり。

```sh
surge dist yourdomain.com
```

## CLI コマンドの記載がないホスト

GitHub Pages・GitLab Pages・Netlify / Vercel / Cloudflare Pages の Git 連携・Azure Static Web Apps・Render・Flightcontrol・xmit・Zephyr Cloud・EdgeOne Pages は、公式ガイド上では設定ファイルやダッシュボード操作、または外部ガイドへのリンクのみで、CLI コマンドの記載がないため本ファイルには収録しない。Render のビルド設定は Build Command `npm install && npm run build`、Publish Directory `dist`。
