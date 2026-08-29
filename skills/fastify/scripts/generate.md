---
source: https://github.com/fastify/fastify-cli/blob/main/README.md
---

# generate

`fastify-cli` 8.0.0 時点（main ブランチ README.md、2026-08-29 取得）によるプロジェクト・プラグインのスキャフォールディングコマンド。

## 新規アプリケーションの生成

```sh
fastify generate <yourapp>
```

生成後は `cd <yourapp> && npm install` を実行する。生成されるアプリは `plugins` / `routes` / `test` フォルダと `app.js`（エントリポイント）を持つ標準 Fastify プラグイン構成。

## ESM テンプレートで生成

```sh
fastify generate <yourapp> --esm
```

## TypeScript テンプレートで生成

```sh
fastify generate <yourapp> --lang=ts
```

`--lang=typescript` も同義で使用可能。

> **警告**: カレントディレクトリ（`.`）に既存の `package.json` がある状態で `fastify generate .` を実行すると失敗する。`--integrate` を付けると `main` / `scripts` / `dependencies` / `devDependencies` を上書き・追加し、ファイル名が衝突した場合は既存ファイル（既存の `app.js` を含む）を上書きする。

```sh
fastify generate . --integrate
```

## JavaScript テンプレートに Standard linter を含める

```sh
fastify generate <yourapp> --standardlint
```

## プラグインのスキャフォールディング生成

```sh
fastify generate-plugin <yourplugin>
```

## プラグインの README 自動生成

```sh
fastify readme <path-to-your-plugin-file>
```

## Swagger/OpenAPI スキーマの生成

```sh
fastify generate-swagger app.js
```

`@fastify/swagger` を利用しているプロジェクトが対象。

## アプリケーションをスタンドアロン実行ファイル化

> **警告**: 既存プロジェクトに `server.(js|ts)` ファイルを追加する不可逆な変換操作。実行前にコミット・バックアップを取ること。

```sh
fastify eject
```
