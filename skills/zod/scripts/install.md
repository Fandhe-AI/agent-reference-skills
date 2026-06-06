# Install

zod のインストールと TypeScript 設定。

## npm でのインストール

```sh
npm install zod
```

## JSR 経由でのインストール（Deno / モダン環境）

```sh
npx jsr add @zod/zod
```

`@zod/zod` として [jsr.io](https://jsr.io/@zod/zod) に公開されている。

## Zod v4 の明示的なインストール

```sh
npm install zod@^4
```

## TypeScript 設定

`tsconfig.json` に `strict: true` を追加する（必須）。Zod は TypeScript v5.5 以降を対象としている。

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "strict": true
  }
}
```

## pnpm で v4 に更新

```sh
pnpm upgrade zod@latest
```

## ライブラリ作者向け peer dependency 設定

Zod を peer dependency として利用するライブラリの `package.json` 設定:

```jsonc
// package.json
{
  "peerDependencies": {
    "zod": "^3.25.0 || ^4.0.0"
  },
  "devDependencies": {
    "zod": "^3.25.0 || ^4.0.0"
  }
}
```

`"zod/v4/core"` サブパスは v3.25.0 以降で利用可能。
