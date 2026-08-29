---
source: https://raw.githubusercontent.com/fastify/fastify/v5.12.1/docs/Guides/Testing.md
---

# test

Fastify アプリケーションのテスト実行コマンド集（v5.12.1 時点の Guides/Testing.md 由来）。

## プロジェクトの初期セットアップ

```sh
npm init -y
npm i fastify && npm i pino-pretty -D
```

## テストファイルを直接実行

```sh
node app.test.js
```

Node.js 組み込みの Test Runner（`node:test`）を利用する例。

## package.json の test スクリプト経由で実行

```sh
npm test
```

`package.json` の `scripts.test` に `"node --test --watch"` のような設定を行っておく。

## 特定のプラグインテストファイルを実行

```sh
node test/myFirstPlugin.test.js
```

## テストをデバッガー付きで実行

```sh
node --test --test-only --inspect-brk test/<test-file.test.js>
```

`<test-file.test.js>` は実際のテストファイル名に置き換える。
