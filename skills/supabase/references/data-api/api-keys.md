# API キー

Supabase プロジェクトの認証に使用する anon key と service_role key。JWT ベースのアクセス制御。

## 概要

Supabase の各プロジェクトには 2 種類の API キーが発行される。どちらも JWT（JSON Web Token）形式で、PostgREST がリクエストのロールを判定するために使用する。

### anon key（公開キー）

- **クライアントサイドで使用可能**（ブラウザ・モバイルアプリ）
- PostgreSQL の `anon` ロールにマッピングされる
- RLS（Row Level Security）ポリシーが適用される
- ユーザーが認証済みの場合、JWT にユーザー情報が含まれ、RLS ポリシーで `auth.uid()` が利用可能
- 単体では匿名アクセスと同等

### service_role key（サービスキー）

- **サーバーサイドでのみ使用**（絶対にクライアントに公開しない）
- PostgreSQL の `service_role` ロールにマッピングされる
- **RLS をバイパスする**（全データにアクセス可能）
- 管理用のバックエンド処理、マイグレーション、バッチ処理に使用
- Edge Functions、サーバーサイド API から使用

### JWT の構造

```json
{
  "iss": "supabase",
  "ref": "<PROJECT_REF>",
  "role": "anon",          // or "service_role"
  "iat": 1234567890,
  "exp": 1234567890
}
```

ユーザーが認証すると、`role` が `authenticated` になり、`sub` にユーザー ID が含まれる。

## コード例

```typescript
// === anon key の使用（クライアントサイド） ===
import { createClient } from '@supabase/supabase-js';

// anon key はブラウザに公開しても安全（RLS で保護）
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ユーザー認証後のリクエストには自動的に Bearer トークンが付与される
const { data: { user } } = await supabase.auth.getUser();

// RLS ポリシーが適用され、ユーザー自身のデータのみ取得
const { data } = await supabase
  .from('profiles')
  .select('*');
```

```typescript
// === service_role key の使用（サーバーサイドのみ） ===
import { createClient } from '@supabase/supabase-js';

// service_role key は絶対にクライアントに公開しない
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// RLS をバイパスして全データにアクセス
const { data } = await supabaseAdmin
  .from('profiles')
  .select('*');

// ユーザー管理（Admin API）
const { data: { user }, error } = await supabaseAdmin.auth.admin.getUserById(
  'user-uuid-here'
);
```

```typescript
// === Edge Functions での使用 ===
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  // ユーザーのトークンで RLS を適用する場合
  const authHeader = req.headers.get('Authorization')!;
  const supabaseUser = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } }
  );

  // service_role で管理操作を行う場合
  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  return new Response('OK');
});
```

```bash
# === cURL での API キー使用 ===

# anon key での匿名アクセス
curl 'https://<REF>.supabase.co/rest/v1/posts?select=*' \
  -H "apikey: <ANON_KEY>" \
  -H "Authorization: Bearer <ANON_KEY>"

# ユーザートークンでのアクセス（RLS 適用）
curl 'https://<REF>.supabase.co/rest/v1/profiles?select=*' \
  -H "apikey: <ANON_KEY>" \
  -H "Authorization: Bearer <USER_JWT_TOKEN>"

# service_role key での管理アクセス（RLS バイパス）
curl 'https://<REF>.supabase.co/rest/v1/profiles?select=*' \
  -H "apikey: <SERVICE_ROLE_KEY>" \
  -H "Authorization: Bearer <SERVICE_ROLE_KEY>"
```

## 注意点

- **service_role key は絶対にクライアントサイドに公開しない**。環境変数でサーバーサイドに保持する
- anon key は `NEXT_PUBLIC_` プレフィックスを付けてクライアントに公開可能（RLS が保護するため）
- API キーはダッシュボードの「Settings > API > Project API keys」から確認できる
- API キーを再生成すると既存のキーは無効になる。全クライアントの更新が必要
- JWT の有効期限はデフォルトで約 100 年。カスタム JWT を使う場合は有効期限を適切に設定
- `apikey` ヘッダーと `Authorization` ヘッダーの両方が必要。`apikey` でプロジェクトを特定し、`Authorization` でロールを決定
- supabase-js は `apikey` ヘッダーを自動的に付与するため、開発者が明示的に設定する必要はない

## 関連

- [Data API 概要](./overview.md)
- [REST API](./rest.md)
- [API 堅牢化](./hardening.md)
