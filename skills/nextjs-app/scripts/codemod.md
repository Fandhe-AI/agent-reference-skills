# Codemod

`@next/codemod` CLI でメジャー / マイナーアップグレード時のコード自動変換を行うコマンド集。

> **警告**: codemod は既定で対象ファイルを直接書き換える。実行前に `--dry --print` で変更内容を確認するか、事前に git commit しておくことを推奨する。

## 汎用の codemod 実行方法

```sh
npx @next/codemod <transform> <path>
```

`<transform>` は変換名、`<path>` は対象ファイル・ディレクトリ。

## dry-run で変更内容だけ確認する

```sh
npx @next/codemod <transform> <path> --dry --print
```

コードは変更せず、変更後の差分だけを表示する。

## Next.js を自動アップグレードする（推奨）

```sh
npx @next/codemod upgrade
```

Next.js, React, React DOM を更新し、必要な codemod を対話的に適用する。

## パッチバージョンにアップグレードする

```sh
npx @next/codemod upgrade patch
```

## マイナーバージョンにアップグレードする（default）

```sh
npx @next/codemod upgrade minor
```

## メジャーバージョンにアップグレードする

```sh
npx @next/codemod upgrade major
```

> **警告**: メジャーアップグレードは破壊的変更を含む可能性がある。事前にコミット・バックアップを取ってから実行する。

## 特定バージョンにアップグレードする

```sh
npx @next/codemod upgrade 16
```

## canary リリースにアップグレードする

```sh
npx @next/codemod upgrade canary
```

## verbose 出力でアップグレードする

```sh
npx @next/codemod upgrade --verbose
```

## experimental_ppr の Route Segment Config を削除する（16.0, App Router）

```sh
npx @next/codemod@latest remove-experimental-ppr .
```

App Router の pages / layouts から `experimental_ppr` Route Segment Config を削除する。

## unstable_ プレフィックスを安定化 API から削除する（16.0）

```sh
npx @next/codemod@latest remove-unstable-prefix .
```

例: `unstable_cacheTag` を `cacheTag` に変換する。

## middleware を proxy 規約に移行する（16.0）

```sh
npx @next/codemod@latest middleware-to-proxy .
```

`middleware.<ext>` を `proxy.<ext>` にリネームし、named export `middleware` を `proxy` に、関連する `next.config` の experimental プロパティも変換する。

## next lint から ESLint CLI に移行する（16.0）

```sh
npx @next/codemod@canary next-lint-to-eslint-cli .
```

`eslint.config.mjs` を生成し、`package.json` の lint スクリプトを `eslint .` に更新、必要な ESLint 依存関係を追加する。

## Route Segment Config runtime の experimental-edge を edge に変換する（15.0, App Router 限定）

```sh
npx @next/codemod@latest app-dir-runtime-config-experimental-edge .
```

## 同期 Dynamic API を非同期に移行する（15.0）

```sh
npx @next/codemod@latest next-async-request-api .
```

`cookies()`, `headers()`, `draftMode()`（`next/headers`）および `params` / `searchParams` の同期アクセスを非同期に変換する。自動変換できない箇所には `@next/codemod` プレフィックスのコメントまたは `UnsafeUnwrapped` 型キャストが挿入されるため、手動レビューが必要。

## NextRequest の geo / ip を @vercel/functions に置き換える（15.0）

```sh
npx @next/codemod@latest next-request-geo-ip .
```

`@vercel/functions` をインストールし、`NextRequest` の `geo` / `ip` プロパティを `geolocation()` / `ipAddress()` に変換する。

## next/server から next/og への ImageResponse import を移行する（14.0）

```sh
npx @next/codemod@latest next-og-import .
```

## metadata の viewport 系プロパティを viewport export に移行する（14.0）

```sh
npx @next/codemod@latest metadata-to-viewport-export .
```

Source: https://nextjs.org/docs/app/guides/upgrading/codemods
