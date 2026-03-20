---
name: supabase
description: >
  Supabase API リファレンス。
  database, postgres, auth, storage, edge-functions, realtime,
  supabase-js, supabase-cli, RLS, vectors, migrations
user-invocable: false
---

# Supabase リファレンス

Supabase 公式ドキュメントの全 API を網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構造

```
.claude/skills/supabase/
├── SKILL.md                                  ← このファイル（エントリーポイント）
└── references/
    ├── getting-started/README.md             ← 入門・クイックスタート（3ページ）
    ├── database/README.md                    ← Database / Postgres（17ページ）
    ├── auth/README.md                        ← 認証・認可（21ページ）
    ├── storage/README.md                     ← Storage（9ページ）
    ├── functions/README.md                   ← Edge Functions（16ページ）
    ├── realtime/README.md                    ← Realtime（7ページ）
    ├── ai/README.md                          ← AI & Vectors（9ページ）
    ├── data-api/README.md                    ← Data API / REST / GraphQL（7ページ）
    ├── cron-and-queues/README.md             ← Cron & Queues（2ページ）
    ├── client-js/README.md                   ← JavaScript クライアント（14ページ）
    ├── client-other/README.md                ← 他言語クライアント（6ページ）
    ├── management-api/README.md              ← Management API（11ページ）
    ├── cli/README.md                         ← CLI リファレンス（8ページ）
    ├── platform/README.md                    ← プラットフォーム管理（11ページ）
    ├── deployment/README.md                  ← デプロイ・本番運用（4ページ）
    ├── local-dev/README.md                   ← ローカル開発（5ページ）
    ├── self-hosting/README.md                ← セルフホスティング（5ページ）
    ├── security/README.md                    ← セキュリティ（4ページ）
    └── telemetry/README.md                   ← テレメトリ・監視（4ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| プロジェクトセットアップ、クイックスタート | getting-started | [references/getting-started/README.md](./references/getting-started/README.md) |
| テーブル操作、RLS、Extensions、クエリ最適化 | database | [references/database/README.md](./references/database/README.md) |
| ログイン、サインアップ、OAuth、MFA、セッション | auth | [references/auth/README.md](./references/auth/README.md) |
| ファイルアップロード、画像変換、CDN、バケット | storage | [references/storage/README.md](./references/storage/README.md) |
| Edge Functions、Deno、デプロイ、バックグラウンドタスク | functions | [references/functions/README.md](./references/functions/README.md) |
| Broadcast、Presence、Postgres Changes | realtime | [references/realtime/README.md](./references/realtime/README.md) |
| pgvector、埋め込み、セマンティック検索、RAG | ai | [references/ai/README.md](./references/ai/README.md) |
| PostgREST、REST API、GraphQL、型生成 | data-api | [references/data-api/README.md](./references/data-api/README.md) |
| pg_cron、pgmq、スケジュール実行、キュー | cron-and-queues | [references/cron-and-queues/README.md](./references/cron-and-queues/README.md) |
| supabase-js、createClient、select、insert 等 | client-js | [references/client-js/README.md](./references/client-js/README.md) |
| Python、Dart、Swift、Kotlin、C# クライアント | client-other | [references/client-other/README.md](./references/client-other/README.md) |
| プロジェクト管理 API、組織、シークレット | management-api | [references/management-api/README.md](./references/management-api/README.md) |
| supabase CLI コマンド、db diff、migration | cli | [references/cli/README.md](./references/cli/README.md) |
| コンピュート、バックアップ、リージョン、課金 | platform | [references/platform/README.md](./references/platform/README.md) |
| 本番チェックリスト、マイグレーション戦略 | deployment | [references/deployment/README.md](./references/deployment/README.md) |
| ローカル開発、シード、テスト | local-dev | [references/local-dev/README.md](./references/local-dev/README.md) |
| Docker、セルフホスティング、S3 設定 | self-hosting | [references/self-hosting/README.md](./references/self-hosting/README.md) |
| RLS、SSL、HIPAA、SOC2 | security | [references/security/README.md](./references/security/README.md) |
| ログ、メトリクス、Grafana、ログドレイン | telemetry | [references/telemetry/README.md](./references/telemetry/README.md) |
