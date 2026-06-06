# Test

Hono アプリケーションのテスト実行。

## Bun でのテスト実行

```sh
bun test index.test.ts
```

Bun 組み込みのテストランナーを使用する。ファイル名を省略すると全テストを探索する。

## Deno でのテスト実行

```sh
deno test hello.ts
```

Deno 組み込みのテストランナー（`Deno.test`）を使用する。

## Deno: テスト用アサーションライブラリの追加

```sh
deno add jsr:@std/assert
```

## Vitest でのテスト実行

vitest は別途インストールが必要。インストール後にプロジェクトの `package.json` に定義されたスクリプトで実行する。

```sh
npm run test
```

```sh
pnpm test
```

```sh
bun run test
```

Cloudflare Workers のテストには `@cloudflare/vitest-pool-workers` の利用が公式推奨。
`app.request()` を使うことで HTTP サーバーを起動せずにレスポンスを検証できる。
