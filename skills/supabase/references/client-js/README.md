# client-js

| Name | Description | Path |
|------|-------------|------|
| Auth | ユーザー認証に関するクライアントサイドメソッド群。 | [./auth.md](./auth.md) |
| Auth Admin | サーバーサイド専用の管理者向け認証メソッド群。`service_role` キーが必要。 | [./auth-admin.md](./auth-admin.md) |
| Auth MFA | 多要素認証 (MFA) のクライアントサイドメソッド群。TOTP・Phone ベースの MFA と… | [./auth-mfa.md](./auth-mfa.md) |
| Auth OAuth Server | OAuth サーバー管理メソッド群。Supabase を OAuth 2.0 プロバイダーとして使用する際… | [./auth-oauth-server.md](./auth-oauth-server.md) |
| Database CRUD | データベースの CRUD 操作メソッド群。PostgREST を通じてテーブル操作を行う。 | [./database-crud.md](./database-crud.md) |
| Database Filters | クエリにフィルタ条件を追加するメソッド群。`select()`, `update()`, `delete()` 等に… | [./database-filters.md](./database-filters.md) |
| Database Modifiers | クエリ結果の形式やソート、件数制限を制御するモディファイアメソッド群。 | [./database-modifiers.md](./database-modifiers.md) |
| Functions | Supabase Edge Functions の呼び出しメソッド群。Deno ベースのサーバーレス関数を実… | [./functions.md](./functions.md) |
| Initialization | Supabase クライアントの初期化と設定。 | [./initialization.md](./initialization.md) |
| Realtime | リアルタイム通信のメソッド群。Broadcast、Presence、Postgres Changes の 3 つの機… | [./realtime.md](./realtime.md) |
| Storage | ファイルストレージの操作メソッド群。バケットの管理とファイルのアップロード/ダウン… | [./storage.md](./storage.md) |
| Storage Analytics | ストレージ分析用のメソッド群。バケットとファイルの使用状況を分析する。 | [./storage-analytics.md](./storage-analytics.md) |
| Storage Vectors | ベクトルストレージのメソッド群。ベクトルデータのインデックス管理とクエリを行う。 | [./storage-vectors.md](./storage-vectors.md) |
