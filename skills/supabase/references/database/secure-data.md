# データセキュリティ

Row Level Security (RLS) によるデータ保護。

## 概要

Row Level Security (RLS) は PostgreSQL のネイティブ機能で、行レベルでのアクセス制御を実現する。Supabase では RLS を使い、認証されたユーザーが自分のデータのみにアクセスできるよう制御する。

## コード例

```sql
-- RLS を有効化
alter table public.todos enable row level security;

-- SELECT ポリシー: 自分のデータのみ読み取り可能
create policy "Users can view own todos"
on public.todos for select
to authenticated
using (auth.uid() = user_id);

-- INSERT ポリシー: 自分のデータのみ挿入可能
create policy "Users can insert own todos"
on public.todos for insert
to authenticated
with check (auth.uid() = user_id);

-- UPDATE ポリシー: 自分のデータのみ更新可能
create policy "Users can update own todos"
on public.todos for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- DELETE ポリシー: 自分のデータのみ削除可能
create policy "Users can delete own todos"
on public.todos for delete
to authenticated
using (auth.uid() = user_id);

-- 全ユーザーに読み取りを許可（パブリックデータ）
create policy "Public profiles are viewable"
on public.profiles for select
to anon, authenticated
using (true);

-- サービスロールはすべてのデータにアクセス可能（RLS をバイパス）
-- service_role キーを使用する場合は RLS が自動的にバイパスされる
```

## 主要な認証関数

| 関数 | 説明 |
|------|------|
| `auth.uid()` | 現在のユーザーの UUID |
| `auth.jwt()` | JWT ペイロード全体 |
| `auth.role()` | 現在のロール（`anon`, `authenticated`） |
| `auth.email()` | ユーザーのメールアドレス |

## ポリシーのパターン

```sql
-- 組織ベースのアクセス制御
create policy "Org members can access"
on public.documents for select
to authenticated
using (
  org_id in (
    select org_id from public.org_members
    where user_id = auth.uid()
  )
);

-- JWT カスタムクレームベース
create policy "Admin access"
on public.admin_data for all
to authenticated
using ((auth.jwt() ->> 'role') = 'admin');

-- 時間制限付きアクセス
create policy "Recent items only"
on public.items for select
to authenticated
using (created_at > now() - interval '30 days');
```

## 注意点

- **RLS を有効化しないテーブルは全ユーザーに公開される**
- `using` はどの行が見えるか（SELECT, UPDATE, DELETE）、`with check` はどの行が書けるか（INSERT, UPDATE）
- `service_role` キーは RLS をバイパスするため、サーバーサイドでのみ使用する
- ポリシー内のサブクエリにはインデックスを作成してパフォーマンスを確保する
- 複数のポリシーは OR 条件で結合される（いずれかが true なら許可）
- `to` でロール（`anon`, `authenticated`）を指定して対象を制限する
- Column Level Security は `GRANT` / `REVOKE` で実現

## 関連

- [../security/rls.md](../security/rls.md) — RLS 詳細ガイド
- [./tables.md](./tables.md) — テーブル操作
- [../auth/overview.md](../auth/overview.md) — 認証概要
- [./testing.md](./testing.md) — RLS ポリシーのテスト
