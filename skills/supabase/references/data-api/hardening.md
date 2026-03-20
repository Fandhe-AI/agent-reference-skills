# API 堅牢化

Data API のセキュリティ強化。RBAC、カスタムクレーム、レート制限、公開スキーマの制限。

## 概要

Supabase の Data API はデフォルトで `public` スキーマの全テーブルを公開する。本番環境ではセキュリティを強化するために、以下の対策を講じる必要がある。

### セキュリティ対策の一覧

1. **RLS（Row Level Security）**: テーブル単位の行レベルアクセス制御（必須）
2. **RBAC（Role-Based Access Control）**: カスタムロールによるきめ細かいアクセス制御
3. **カスタムクレーム**: JWT にカスタムデータ（ロール、権限）を追加
4. **Exposed Schemas の制限**: 公開するスキーマを最小限に
5. **pg_graphql の無効化**: GraphQL エンドポイントが不要なら無効化
6. **レート制限**: API リクエストの頻度制限
7. **API キーのローテーション**: 定期的なキー更新

## コード例

```sql
-- ============================================
-- 1. RLS の確実な有効化
-- ============================================

-- 全テーブルの RLS 状態を確認
select schemaname, tablename, rowsecurity
from pg_tables
where schemaname = 'public';

-- RLS を有効化
alter table public.posts enable row level security;

-- RLS を有効にしないと anon key で全データにアクセス可能
-- 最低限のポリシー例
create policy "Users can read own data"
  on public.posts for select
  using (auth.uid() = user_id);

create policy "Users can insert own data"
  on public.posts for insert
  with check (auth.uid() = user_id);

create policy "Users can update own data"
  on public.posts for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own data"
  on public.posts for delete
  using (auth.uid() = user_id);

-- ============================================
-- 2. RBAC（カスタムロール）
-- ============================================

-- app_metadata にロール情報を格納
-- Admin API（service_role key）でユーザーのロールを設定
-- supabaseAdmin.auth.admin.updateUserById(userId, {
--   app_metadata: { role: 'admin' }
-- })

-- カスタムクレームに基づく RLS ポリシー
create policy "Admin can read all posts"
  on public.posts for select
  to authenticated
  using (
    auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
  );

-- ロールチェック用のヘルパー関数
create or replace function public.is_admin()
returns boolean
language sql stable security definer
as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;

-- ヘルパー関数を使ったポリシー
create policy "Admin full access"
  on public.posts for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================
-- 3. カスタムクレーム
-- ============================================

-- カスタムクレーム管理用テーブル
create table public.user_roles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user' check (role in ('user', 'editor', 'admin')),
  permissions jsonb default '[]'
);

alter table public.user_roles enable row level security;

-- ログイン時にカスタムクレームを JWT に追加するフック
-- （Supabase Auth Hooks を使用）
create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql stable
as $$
declare
  claims jsonb;
  user_role text;
begin
  select role into user_role
  from public.user_roles
  where id = (event->>'user_id')::uuid;

  claims := event->'claims';
  claims := jsonb_set(claims, '{user_role}', to_jsonb(coalesce(user_role, 'user')));

  event := jsonb_set(event, '{claims}', claims);
  return event;
end;
$$;

-- フック関数に必要な権限
grant usage on schema public to supabase_auth_admin;
grant select on public.user_roles to supabase_auth_admin;
revoke execute on function public.custom_access_token_hook from public;
grant execute on function public.custom_access_token_hook to supabase_auth_admin;
```

```sql
-- ============================================
-- 4. Exposed Schemas の制限
-- ============================================

-- API に公開しないテーブルは別スキーマに配置
create schema if not exists private;

create table private.internal_logs (
  id bigserial primary key,
  message text,
  created_at timestamptz default now()
);

-- private スキーマは Exposed Schemas に追加しない
-- → API からアクセス不可

-- ============================================
-- 5. pg_graphql の無効化
-- ============================================

-- GraphQL を使わない場合は Extension を無効化
-- ダッシュボード: Settings > API > GraphQL を無効化

-- または SQL で
-- drop extension if exists pg_graphql;
-- 注意: ダッシュボードの GraphQL Explorer も使えなくなる

-- ============================================
-- 6. テーブル権限の制限
-- ============================================

-- anon ロールからの書き込みを禁止
revoke insert, update, delete on public.posts from anon;

-- 特定のカラムのみ更新可能に
revoke update on public.profiles from authenticated;
grant update (display_name, avatar_url, bio) on public.profiles to authenticated;

-- 関数の実行権限を制限
revoke execute on function public.dangerous_function from anon;
revoke execute on function public.dangerous_function from authenticated;
```

```typescript
// === レート制限の実装（Edge Functions） ===
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// シンプルなレート制限（Redis や KV ストアを使用する方が望ましい）
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(
  key: string,
  limit: number = 100,
  windowMs: number = 60_000
): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count++;
  return true;
}

serve(async (req) => {
  const clientIP = req.headers.get('x-forwarded-for') || 'unknown';

  if (!checkRateLimit(clientIP, 100, 60_000)) {
    return new Response('Rate limit exceeded', { status: 429 });
  }

  // 通常の処理
  return new Response('OK');
});
```

```sql
-- ============================================
-- 7. セキュリティチェックリスト用クエリ
-- ============================================

-- RLS が無効なテーブルを検出
select schemaname, tablename
from pg_tables
where schemaname = 'public'
  and rowsecurity = false;

-- ポリシーのないテーブルを検出
select t.schemaname, t.tablename
from pg_tables t
left join pg_policies p on t.tablename = p.tablename and t.schemaname = p.schemaname
where t.schemaname = 'public'
  and t.rowsecurity = true
  and p.policyname is null;

-- anon ロールに付与されている権限を確認
select table_schema, table_name, privilege_type
from information_schema.role_table_grants
where grantee = 'anon'
  and table_schema = 'public';
```

## 注意点

- **RLS なしのテーブルは anon key で全データにアクセス可能**。本番環境では全テーブルで RLS を有効化すること
- `service_role key` は RLS をバイパスするため、サーバーサイドでのみ使用。クライアントに絶対に公開しない
- カスタムクレーム（Auth Hooks）は Supabase ダッシュボードの「Authentication > Hooks」で設定する
- `security definer` 関数は定義者の権限で実行されるため、入力値の検証を怠るとセキュリティホールになる
- レート制限は Supabase のプラン（Free / Pro / Enterprise）によってプラットフォームレベルでも適用される
- `revoke` でテーブル権限を剥奪しても、RLS ポリシーが `using (true)` なら SELECT は可能。権限と RLS は別レイヤー
- pg_graphql を無効化すると `/graphql/v1` エンドポイントが使えなくなる。REST API には影響しない

## 関連

- [Data API 概要](./overview.md)
- [API キー](./api-keys.md)
- [REST API](./rest.md)
- [カスタムスキーマ](./custom-schemas.md)
