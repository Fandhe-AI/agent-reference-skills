# Roles and Permissions

PostgreSQL ロールと権限管理。Supabase 組み込みロールの一覧と GRANT / REVOKE の使い方。

## 概要

PostgreSQL のロールは「ユーザー」または「グループ」として機能する。Supabase は用途別に 10 種類の組み込みロールを提供する。アプリレベルのアクセス制御は Row Level Security（RLS）で行い、Postgres ロールはシステムレベルのアクセス制御に使用する。

## Supabase 組み込みロール

| ロール | 説明 |
|--------|------|
| `postgres` | デフォルトの管理者ロール |
| `anon` | 未認証 API アクセス（RLS が適用される） |
| `authenticator` | JWT を検証し、適切なロールに切り替えるエントリーポイント |
| `authenticated` | 認証済み API アクセス（RLS が適用される） |
| `service_role` | RLS をバイパスする高権限ロール |
| `supabase_auth_admin` | Auth スキーマの管理 |
| `supabase_storage_admin` | Storage スキーマの管理 |
| `supabase_etl_admin` | CDC・レプリケーション管理 |
| `dashboard_user` | Supabase ダッシュボード UI 操作 |
| `supabase_admin` | Supabase 内部管理タスク |

## コード例

```sql
-- ============================================================
-- ロールの作成
-- ============================================================

-- ログインなしのロール（グループとして使用）
create role "developer_role";

-- ログイン可能なユーザーロール（パスワード付き）
create role "app_user" with login password 'extremely_secure_password';

-- ============================================================
-- 権限の付与 (GRANT)
-- ============================================================

-- テーブルへの権限付与
grant select, insert, update on public.todos to "developer_role";

-- スキーマの使用権限
grant usage on schema public to "developer_role";

-- すべてのテーブルへの権限（一括）
grant select on all tables in schema public to "developer_role";

-- シーケンスへの権限（bigint generated always as identity の場合も必要）
grant usage, select on all sequences in schema public to "developer_role";

-- ============================================================
-- 権限の剥奪 (REVOKE)
-- ============================================================

revoke delete on public.todos from "developer_role";

-- ============================================================
-- ロール継承
-- ============================================================

-- 親ロールの権限を子ロールに継承
create role "child_role" inherit "developer_role";

-- 継承を無効化（superuser 的なロールに使用）
alter role "child_role" noinherit;

-- ============================================================
-- Auth Hooks 用の権限付与（典型パターン）
-- ============================================================

-- Custom Access Token Hook の場合
grant usage on schema public to supabase_auth_admin;
grant execute on function public.custom_access_token_hook to supabase_auth_admin;
revoke execute on function public.custom_access_token_hook from authenticated, anon, public;

-- ============================================================
-- 既存ロールの確認
-- ============================================================

-- ロール一覧
select rolname, rolcanlogin, rolinherit from pg_roles order by rolname;

-- テーブルの権限確認
select grantee, privilege_type
from information_schema.role_table_grants
where table_name = 'todos';
```

## 注意点

- パスワードに特殊記号が含まれる場合、接続文字列内では URL エンコード（%XX 形式）が必要
- `service_role` は RLS をバイパスするため、クライアントサイドには絶対に露出させない
- `authenticated` ロールと `anon` ロールに不必要な権限を付与しないこと
- `supabase_auth_admin` などの内部ロールのテーブルを直接変更しない
- カスタムロールを作成した場合、マイグレーションファイルに含めて管理する

## 関連

- [./secure-data.md](./secure-data.md) — Row Level Security (RLS)
- [./tables.md](./tables.md) — テーブル操作
- [../auth/auth-hooks.md](../auth/auth-hooks.md) — Auth Hooks 権限設定
