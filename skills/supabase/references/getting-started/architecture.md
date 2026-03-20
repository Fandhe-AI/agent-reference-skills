# Supabase アーキテクチャ

Supabase のアーキテクチャ概要と各サービスの役割。

## 概要

Supabase は PostgreSQL を中心としたオープンソースの BaaS（Backend as a Service）。Firebase の代替として設計され、以下のサービスで構成される。

## サービス構成

| サービス | 技術 | 役割 |
|---------|------|------|
| Database | PostgreSQL | リレーショナルデータベース |
| Auth | GoTrue | 認証・認可（JWT ベース） |
| REST API | PostgREST | PostgreSQL → REST API 自動生成 |
| GraphQL | pg_graphql | PostgreSQL → GraphQL API |
| Realtime | Realtime Server (Elixir) | WebSocket によるリアルタイム配信 |
| Storage | Storage API (S3互換) | ファイルストレージ |
| Edge Functions | Deno Runtime | サーバーレス関数 |
| API Gateway | Kong | API ゲートウェイ・ルーティング |
| Studio | React App | ダッシュボード UI |
| CLI | Go | ローカル開発・管理 |

## アーキテクチャの特徴

- **PostgreSQL 中心**: すべてのサービスが PostgreSQL を基盤とする
- **オープンソース**: すべてのコンポーネントが OSS（Apache 2.0 / MIT）
- **既存ツール活用**: 独自技術よりも実績のある OSS を組み合わせる設計思想
- **移植性**: PostgreSQL 標準に準拠し、ベンダーロックインを最小化
- **拡張性**: PostgreSQL Extensions で機能を追加

## データフロー

```
Client → Kong (API Gateway) → PostgREST / GoTrue / Storage / Realtime → PostgreSQL
```

- クライアントは `supabase-js` 等の SDK で各サービスにアクセス
- Kong が API キーの検証とルーティングを担当
- PostgREST が SQL クエリに変換して PostgreSQL に問い合わせ
- RLS（Row Level Security）が PostgreSQL レベルでアクセス制御

## 注意点

- Supabase は PostgreSQL のスーパーセットではなく、標準の PostgreSQL + Extensions
- セルフホスティングも可能（Docker Compose）
- 各サービスは独立してスケール可能

## 関連

- [../database/tables.md](../database/tables.md) — テーブル操作
- [../auth/overview.md](../auth/overview.md) — 認証概要
- [../data-api/overview.md](../data-api/overview.md) — Data API 概要
