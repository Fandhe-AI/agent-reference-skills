---
name: supabase
description: >
  Supabase (オープンソース Firebase 代替・BaaS) リファレンス。
  PostgreSQL データベース、Auth (Email / OAuth / Magic Link / Phone / SSO)、Storage、
  Edge Functions (Deno)、Realtime (subscriptions / presence / broadcast)、Vector embeddings、
  supabase-js、supabase CLI、RLS (Row Level Security)、migrations。
user-invocable: false
model: sonnet
---

# Supabase リファレンス

Supabase 公式ドキュメントの全 API を網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/supabase/
  SKILL.md
  references/
    getting-started/
      README.md
      ai-prompts.md
      api-keys.md
      architecture.md
      quickstarts.md
    database/
      README.md
      arrays.md
      backups.md
      connections.md
      extensions.md
      full-text-search.md
      functions.md
      import-data.md
      joins-and-nesting.md
      json.md
      orms.md
      partitions.md
      query-optimization.md
      replication.md
      roles-and-permissions.md
      secure-data.md
      tables.md
      testing.md
      triggers.md
      vault.md
      webhooks.md
    auth/
      README.md
      anonymous-auth.md
      auth-hooks.md
      captcha.md
      email-passwordless.md
      error-codes.md
      identities.md
      jwts.md
      mfa.md
      oauth-server.md
      overview.md
      passwords.md
      phone-login.md
      rate-limits.md
      redirect-urls.md
      server-side.md
      sessions.md
      social-login.md
      sso-saml.md
      third-party-auth.md
      users.md
    storage/
      README.md
      access-control.md
      analytics-buckets.md
      cdn.md
      debugging.md
      overview.md
      s3-protocol.md
      serving.md
      uploads.md
      vector-buckets.md
    functions/
      README.md
      auth.md
      background-tasks.md
      database-access.md
      debugging.md
      dependencies.md
      deploy.md
      examples.md
      limits.md
      overview.md
      quickstart.md
      routing.md
      scheduling.md
      secrets.md
      testing.md
      websockets.md
      wasm.md
    realtime/
      README.md
      authorization.md
      broadcast.md
      limits.md
      overview.md
      postgres-changes.md
      presence.md
      protocol.md
    ai/
      README.md
      embeddings.md
      hybrid-search.md
      integrations.md
      overview.md
      python-clients.md
      rag.md
      semantic-search.md
      vector-columns.md
      vector-indexes.md
    data-api/
      README.md
      api-keys.md
      custom-schemas.md
      generating-types.md
      graphql.md
      hardening.md
      overview.md
      rest.md
    cron-and-queues/
      README.md
      cron.md
      queues.md
    client-js/
      README.md
      auth.md
      auth-admin.md
      auth-mfa.md
      auth-oauth-server.md
      database-crud.md
      database-filters.md
      database-modifiers.md
      functions.md
      initialization.md
      realtime.md
      storage.md
      storage-analytics.md
      storage-vectors.md
    client-other/
      README.md
      csharp.md
      dart.md
      kotlin.md
      python.md
      swift.md
    management-api/
      README.md
      auth-config.md
      branches.md
      database.md
      domains.md
      functions.md
      network.md
      organizations.md
      overview.md
      projects.md
      secrets.md
      storage.md
    cli/
      README.md
      db-commands.md
      functions-commands.md
      gen-commands.md
      inspect-commands.md
      local-dev.md
      migration-commands.md
      overview.md
      project-commands.md
    platform/
      README.md
      access-control.md
      backups.md
      billing.md
      branching.md
      compute-and-disk.md
      custom-domains.md
      migrating-to-supabase.md
      network.md
      performance.md
      read-replicas.md
      regions.md
    deployment/
      README.md
      database-migrations.md
      going-into-prod.md
      managing-environments.md
      maturity-model.md
    local-dev/
      README.md
      declarative-schemas.md
      email-templates.md
      overview.md
      seeding.md
      testing.md
    self-hosting/
      README.md
      api.md
      auth.md
      docker.md
      functions.md
      storage.md
    security/
      README.md
      compliance.md
      overview.md
      rls.md
      ssl-and-network.md
    telemetry/
      README.md
      log-drains.md
      logs.md
      metrics.md
      reports.md
  samples/
    README.md
    client-setup.md
    database-crud.md
    edge-function.md
    email-auth.md
    file-upload.md
    nextjs-ssr-auth.md
    oauth-login.md
    realtime-subscription.md
    row-level-security.md
    vector-search-rag.md
  scripts/
    README.md
    database.md
    functions.md
    generate.md
    inspect.md
    install.md
    local-dev.md
    project.md
    test.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| プロジェクトセットアップ、クイックスタート、API キー、アーキテクチャ概要 | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| テーブル操作、RLS、Extensions、クエリ最適化、トリガー、ロール権限、バックアップ、Vault | database | [references/database/README.md](references/database/README.md) |
| ログイン、サインアップ、OAuth、MFA、セッション、JWT、SSO、匿名認証 | auth | [references/auth/README.md](references/auth/README.md) |
| ファイルアップロード、画像変換、CDN、バケット、S3 互換、Storage Vectors | storage | [references/storage/README.md](references/storage/README.md) |
| Edge Functions、Deno、デプロイ、バックグラウンドタスク、WebSocket、WASM | functions | [references/functions/README.md](references/functions/README.md) |
| Broadcast、Presence、Postgres Changes、リアルタイム認可 | realtime | [references/realtime/README.md](references/realtime/README.md) |
| pgvector、埋め込み、セマンティック検索、ハイブリッド検索、RAG | ai | [references/ai/README.md](references/ai/README.md) |
| PostgREST、REST API、GraphQL、型生成、カスタムスキーマ | data-api | [references/data-api/README.md](references/data-api/README.md) |
| pg_cron、pgmq、スケジュール実行、メッセージキュー | cron-and-queues | [references/cron-and-queues/README.md](references/cron-and-queues/README.md) |
| supabase-js、createClient、select、insert、update、delete、realtime チャンネル | client-js | [references/client-js/README.md](references/client-js/README.md) |
| Python、Dart、Swift、Kotlin、C# クライアント | client-other | [references/client-other/README.md](references/client-other/README.md) |
| プロジェクト管理 API、組織、シークレット、Database Branching | management-api | [references/management-api/README.md](references/management-api/README.md) |
| supabase CLI コマンド、db diff、migration、型生成コマンド | cli | [references/cli/README.md](references/cli/README.md) |
| コンピュート、バックアップ、リージョン、課金、リードレプリカ、Database Branching | platform | [references/platform/README.md](references/platform/README.md) |
| 本番チェックリスト、マイグレーション戦略、環境管理、成熟度モデル | deployment | [references/deployment/README.md](references/deployment/README.md) |
| ローカル開発、シード、テスト、宣言的スキーマ、メールテンプレート | local-dev | [references/local-dev/README.md](references/local-dev/README.md) |
| Docker、セルフホスティング、S3 設定、Kong API ゲートウェイ | self-hosting | [references/self-hosting/README.md](references/self-hosting/README.md) |
| RLS 詳細、SSL、SOC2、コンプライアンス、ネットワークセキュリティ | security | [references/security/README.md](references/security/README.md) |
| ログ確認、メトリクス、Grafana、ログドレイン、レポート | telemetry | [references/telemetry/README.md](references/telemetry/README.md) |
| 典型的な使い方を知りたい、実装例、Next.js SSR、RAG パイプライン | samples | [samples/README.md](samples/README.md) |
| CLI インストール、ローカル環境起動・停止、型生成、テスト実行コマンド | scripts | [scripts/README.md](scripts/README.md) |
