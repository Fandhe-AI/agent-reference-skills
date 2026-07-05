# CLI

`next` CLI で App Router アプリケーションを開発・ビルド・起動・lint・型生成するコマンド集。

> npm 経由でフラグを渡す場合は `npm run dev -- --port 4000` のように `--` を挟む必要がある（pnpm / yarn / bun は不要）。

## 開発サーバーを起動する（Turbopack, default）

```sh
next dev
```

Turbopack が `next dev` の default bundler。開発ビルドは `.next/dev` に出力されるため、`next build` と並行実行できる。

## 開発サーバーをポート指定で起動する

```sh
next dev -p 4000
```

## 開発サーバーを Webpack で起動する

```sh
next dev --webpack
```

## HTTPS で開発サーバーを起動する（自己署名証明書）

```sh
next dev --experimental-https
```

## カスタム証明書を指定して HTTPS 開発サーバーを起動する

```sh
next dev --experimental-https --experimental-https-key ./certificates/localhost-key.pem --experimental-https-cert ./certificates/localhost.pem
```

## 本番用ビルドを作成する

```sh
next build
```

App Router の各ルートについて static (`○`) / dynamic (`ƒ`) の情報が出力される。

## Turbopack でビルドする（default）

```sh
next build --turbopack
```

## verbose なビルドログを出力する

```sh
next build --debug
```

rewrites, redirects, headers などの追加情報も出力される。

## prerender エラーをデバッグする

```sh
next build --debug-prerender
```

> **警告**: `--debug-prerender` は開発時のデバッグ専用。このフラグでビルドした成果物は本番にデプロイしない（パフォーマンスに影響する）。

## 特定ルートのみビルドする（デバッグ用）

```sh
next build --debug-build-paths="app/**/page.tsx"
```

カンマ区切り・glob パターンに対応する。

## App Router ルートのみをビルドする

```sh
next build --experimental-app-only
```

## React Profiler 用にビルドする

```sh
next build --profile
```

## mangling を無効化してビルドする

```sh
next build --no-mangling
```

デバッグ目的でのみ使用する。name mangling を無効化するためパフォーマンスに影響する。

## 本番サーバーを起動する

```sh
next build && next start
```

`next start` の実行前に `next build` が必須。

## ポート・ホストを指定して本番サーバーを起動する

```sh
next start -p 4000 -H 0.0.0.0
```

## downstream proxy 向けに keep-alive timeout を設定する

```sh
next start --keepAliveTimeout 70000
```

AWS ELB/ALB など downstream proxy 配下で運用する場合、proxy 側の timeout より大きい値（ミリ秒）を指定する。

## ESLint をセットアップする（`next lint` は Next.js 16 で削除）

> **警告**: Next.js 16 で `next lint` および `next.config.js` の `eslint` オプションは削除された。既存プロジェクトの移行には `scripts/codemod.md` の `next-lint-to-eslint-cli` codemod を使う。

```sh
npm i -D eslint eslint-config-next
```

インストール後、`eslint.config.mjs` に `eslint-config-next/core-web-vitals` を読み込む設定を追加する。

## ESLint を実行する

```sh
npx eslint .
```

## ルート型定義を生成する（フルビルドなし）

```sh
next typegen
```

IDE の自動補完や CI での型チェック用に、フルビルドせず route 型定義だけを生成する。

## 型生成後に tsc で型チェックする

```sh
next typegen && tsc --noEmit
```

## Next.js を最新バージョンにアップグレードする

```sh
next upgrade
```

## 特定バージョン・チャンネルにアップグレードする

```sh
next upgrade --revision canary
```

```sh
next upgrade --revision 15.0.0
```

## CPU プロファイルを取得する

```sh
next build --experimental-cpu-prof
```

```sh
next dev --experimental-cpu-prof
```

```sh
next start --experimental-cpu-prof
```

プロファイルは `.next/cpu-profiles/` に保存され、Chrome DevTools（Performance タブ → Load profile）等で開ける。

Source: https://nextjs.org/docs/app/api-reference/cli/next, https://nextjs.org/docs/app/api-reference/config/eslint
