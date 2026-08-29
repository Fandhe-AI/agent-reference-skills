---
name: fastify
description: >
  Fastify (Node.js 高速 HTTP サーバーフレームワーク, v5) の API リファレンス。
  `fastify.register`, encapsulation, `fastify-plugin`, `decorateRequest` / `decorateReply`,
  `onRequest` / `preHandler` / `onSend` フック, JSON Schema + Ajv, Type Providers (TypeBox / Zod),
  `fastify.inject`, `FST_ERR_*`, find-my-way ルーティング, fastify-cli, v4→v5 移行。
user-invocable: false
---

# Fastify API リファレンス

Fastify — Node.js ネイティブの高速 HTTP サーバーフレームワーク（対象バージョン v5.12.1）。
encapsulation されたプラグインツリー・decorators・ライフサイクルフック・JSON Schema ベースの
validation/serialization を中核とする API 設計・実装時に参照する。

`hono`（Web Standards / マルチランタイム JS）・`go-echo`（Go）・`fandhe-backend`（Rust）は別フレームワークであり、
同名の Router / plugin / middleware / hooks 概念を混同しない。`pino` は Fastify のロガー本体（Fastify 側は
`logger` / `loggerInstance` 接続 API のみ）、`zod` はスキーマライブラリ本体（Fastify では Type Provider 経由で接続）
であり、それぞれの API 自体は各スキルを参照する。

v4→v5 の破壊的変更は `references/guides/migration-v5.md` に一覧があり、影響を受ける個別ページには
`## Notes` に per-page で明記している（`server/instance-lifecycle.md`, `server/instance-routing.md`,
`server/instance-decorators.md`, `server/instance-content-type.md`, `request-reply/request.md`,
`request-reply/reply-redirect.md`, `request-reply/reply-hijack-trailers.md`, `errors-logging/logging.md`,
`validation-serialization/schema-basics.md`, `validation-serialization/type-providers.md`,
`plugins/plugins.md`, `routing/constraints-versioning.md` 等）。

## ディレクトリ構成

```text
skills/fastify/
  SKILL.md
  references/
    getting-started/
      README.md
      installation.md
      first-server.md
      first-plugin.md
      loading-order.md
      validate-data.md
      serializing-data.md
      request-payload.md
      cli-usage.md
      lts.md
      warnings.md
    server/
      README.md
      factory-options.md
      router-options.md
      instance-lifecycle.md
      instance-routing.md
      instance-plugins.md
      instance-decorators.md
      instance-schemas.md
      instance-handlers.md
      instance-content-type.md
      instance-inject.md
      instance-misc.md
      content-type-parser.md
    routing/
      README.md
      route-options.md
      shorthand-declaration.md
      url-parameters.md
      async-await-handlers.md
      route-prefixing.md
      constraints-versioning.md
      route-config-log-level.md
      http2.md
    request-reply/
      README.md
      request.md
      reply-methods.md
      reply-send.md
      reply-serialization.md
      reply-redirect.md
      reply-errors.md
      reply-hijack-trailers.md
    hooks-lifecycle/
      README.md
      lifecycle.md
      request-hooks.md
      application-hooks.md
      hook-scope.md
      route-level-hooks.md
      diagnostics-channel-hooks.md
    plugins/
      README.md
      plugins.md
      encapsulation.md
      fastify-plugin.md
      decorators.md
      middleware.md
      write-plugin.md
      plugins-guide.md
    validation-serialization/
      README.md
      schema-basics.md
      ajv-configuration.md
      schema-refs-shared.md
      response-serialization.md
      validator-serializer-compiler.md
      schema-error-handling.md
      type-providers.md
      write-type-provider.md
      fluent-schema.md
    typescript/
      README.md
      getting-started.md
      route-generics.md
      plugin-typing.md
      api-type-system.md
      code-completion-tips.md
    errors-logging/
      README.md
      error-handling.md
      fastify-error-codes.md
      logging.md
    guides/
      README.md
      testing.md
      serverless.md
      recommendations.md
      database.md
      benchmarking.md
      delay-accepting-requests.md
      detecting-client-abort.md
      prototype-poisoning.md
      migration-v5.md
      migration-v4.md
      migration-v3.md
  samples/
    README.md
    basic-server.md
    plugin-encapsulation.md
    decorators.md
    hooks-auth.md
    validation-json-schema.md
    type-provider-typebox.md
    typescript-server.md
    error-handling.md
    logging-pino.md
    testing-inject.md
    serverless-lambda.md
    graceful-shutdown.md
    database-integration.md
  scripts/
    README.md
    install.md
    generate.md
    dev.md
    debug.md
    test.md
    benchmark.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| プロジェクト初期セットアップ、最小サーバー起動、CLI 利用、警告コード | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| ファクトリオプション、find-my-way ルーターオプション、インスタンスライフサイクル、`fastify.inject` | server | [references/server/README.md](references/server/README.md) |
| ルート宣言、URL パラメータ、async/await ハンドラー、バージョニング制約、HTTP/2 | routing | [references/routing/README.md](references/routing/README.md) |
| `Request` プロパティ、`Reply` メソッド、`reply.send`、リダイレクト、hijack/trailers | request-reply | [references/request-reply/README.md](references/request-reply/README.md) |
| `onRequest` 等のリクエストフック、アプリケーションフック、フックスコープ、diagnostics_channel | hooks-lifecycle | [references/hooks-lifecycle/README.md](references/hooks-lifecycle/README.md) |
| `fastify.register`、encapsulation、`fastify-plugin`、decorators、Express 互換 middleware | plugins | [references/plugins/README.md](references/plugins/README.md) |
| JSON Schema + Ajv、response シリアライズ、Type Providers (TypeBox/Zod)、fluent-schema | validation-serialization | [references/validation-serialization/README.md](references/validation-serialization/README.md) |
| TypeScript 型付け、ルートジェネリクス、プラグインの型、型補完 | typescript | [references/typescript/README.md](references/typescript/README.md) |
| エラーハンドリング、`FST_ERR_*` コード一覧、Pino ロガー接続 | errors-logging | [references/errors-logging/README.md](references/errors-logging/README.md) |
| テスト、サーバーレスデプロイ、DB 連携、ベンチマーク、v3/v4/v5 移行ガイド | guides | [references/guides/README.md](references/guides/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
