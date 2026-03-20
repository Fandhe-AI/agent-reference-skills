# JWT 構造

Supabase Auth が発行する JWT のクレーム構造と RLS での活用。

## 概要

Supabase Auth は JWT（JSON Web Token）を使ってユーザーのセッション情報を管理する。JWT はアクセストークンとして使用され、Supabase のサービス（Database, Storage, Edge Functions 等）へのリクエスト時に `Authorization: Bearer <token>` ヘッダーで送信される。

### JWT ペイロードの標準クレーム

| クレーム | 型 | 説明 |
|---------|-----|------|
| `sub` | string | ユーザー ID（auth.users.id） |
| `aud` | string | オーディエンス（`authenticated`） |
| `role` | string | PostgreSQL ロール（`anon` / `authenticated`） |
| `email` | string | ユーザーのメールアドレス |
| `phone` | string | ユーザーの電話番号 |
| `app_metadata` | object | アプリケーションメタデータ |
| `user_metadata` | object | ユーザーメタデータ |
| `aal` | string | AAL レベル（`aal1` / `aal2`） |
| `amr` | array | 認証メソッド参照 |
| `session_id` | string | セッション ID |
| `is_anonymous` | boolean | 匿名ユーザーフラグ |
| `iat` | number | 発行日時（UNIX タイムスタンプ） |
| `exp` | number | 有効期限（UNIX タイムスタンプ） |
| `iss` | string | 発行者 URL |

### JWT の有効期限

- デフォルト: 3600 秒（1 時間）
- ダッシュボードの Auth > Settings > JWT Expiry で変更可能
- 短すぎるとリフレッシュが頻繁になり、長すぎるとセキュリティリスクが増す

### 署名鍵

- JWT は HMAC-SHA256（HS256）で署名される
- 署名鍵はダッシュボードの Settings > API > JWT Secret で確認可能
- 署名鍵はプロジェクト作成時に自動生成される

## コード例

```typescript
// === JWT ペイロードの確認 ===

const { data: { session } } = await supabase.auth.getSession()

if (session) {
  // JWT をデコード（検証はしない）
  const payload = JSON.parse(
    atob(session.access_token.split('.')[1])
  )

  console.log('User ID (sub):', payload.sub)
  console.log('Role:', payload.role)
  console.log('Email:', payload.email)
  console.log('AAL:', payload.aal)
  console.log('Session ID:', payload.session_id)
  console.log('Is Anonymous:', payload.is_anonymous)
  console.log('Expires at:', new Date(payload.exp * 1000))
}

// === RLS での auth.jwt() 使用 ===

// SQL: JWT のクレームを RLS ポリシーで参照
//
// -- ユーザー ID（sub）でフィルタ
// CREATE POLICY "Users can access own data" ON public.profiles
//   FOR ALL TO authenticated
//   USING (id = auth.uid());
// -- auth.uid() は (auth.jwt() ->> 'sub')::uuid のショートカット
//
// -- カスタムクレームでフィルタ
// CREATE POLICY "Admins only" ON public.admin_data
//   FOR ALL TO authenticated
//   USING ((auth.jwt() ->> 'user_role') = 'admin');
//
// -- AAL レベルでフィルタ
// CREATE POLICY "MFA required" ON public.sensitive_data
//   FOR ALL TO authenticated
//   USING ((auth.jwt() ->> 'aal') = 'aal2');
//
// -- 匿名ユーザーを除外
// CREATE POLICY "No anonymous" ON public.user_content
//   FOR INSERT TO authenticated
//   WITH CHECK ((auth.jwt() ->> 'is_anonymous')::boolean IS FALSE);
//
// -- app_metadata のプロバイダを確認
// CREATE POLICY "Google users" ON public.google_data
//   FOR ALL TO authenticated
//   USING (auth.jwt() -> 'app_metadata' ->> 'provider' = 'google');

// === Custom Access Token Hook でカスタムクレーム追加 ===

// PostgreSQL 関数:
// CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
// RETURNS jsonb
// LANGUAGE plpgsql STABLE
// AS $$
// DECLARE
//   claims jsonb;
//   user_role text;
//   user_plan text;
// BEGIN
//   claims := event->'claims';
//
//   -- カスタムクレームを追加
//   SELECT role, plan INTO user_role, user_plan
//   FROM public.user_profiles
//   WHERE user_id = (event->>'user_id')::uuid;
//
//   claims := jsonb_set(claims, '{user_role}', to_jsonb(COALESCE(user_role, 'user')));
//   claims := jsonb_set(claims, '{user_plan}', to_jsonb(COALESCE(user_plan, 'free')));
//
//   event := jsonb_set(event, '{claims}', claims);
//   RETURN event;
// END;
// $$;

// TypeScript でカスタムクレームにアクセス
const { data: { session } } = await supabase.auth.getSession()
const jwt = JSON.parse(atob(session!.access_token.split('.')[1]))
console.log('User role:', jwt.user_role)
console.log('User plan:', jwt.user_plan)

// === auth.uid() と auth.role() ===

// SQL: RLS で使用する便利関数
// auth.uid()  → (auth.jwt() ->> 'sub')::uuid
// auth.role() → auth.jwt() ->> 'role'
// auth.email() → auth.jwt() ->> 'email'

// RLS ポリシーでの典型的な使用例
// CREATE POLICY "Own data" ON public.todos
//   FOR ALL TO authenticated
//   USING (user_id = auth.uid())
//   WITH CHECK (user_id = auth.uid());

// === サーバーサイドでの JWT 検証 ===

import jwt from 'jsonwebtoken'

// JWT を手動で検証（Edge Function や外部サーバー）
function verifySupabaseJWT(token: string) {
  const secret = process.env.SUPABASE_JWT_SECRET!
  try {
    const decoded = jwt.verify(token, secret, {
      algorithms: ['HS256'],
    })
    return decoded
  } catch (error) {
    throw new Error('Invalid token')
  }
}
```

## 注意点

- JWT はデコード可能であるため、機密情報をカスタムクレームに含めないこと
- Custom Access Token Hook でクレームを追加する場合、JWT ペイロードのサイズが増加する。HTTP ヘッダーの制限（通常 8KB）に注意
- `auth.jwt()` は PostgreSQL 関数であり、RLS ポリシー内でのみ使用可能
- JWT の署名鍵（JWT Secret）は厳密に管理し、クライアントに露出させないこと
- `exp` クレームの有効期限を過ぎた JWT はすべてのサービスで拒否される
- カスタムクレームは Custom Access Token Hook でのみ追加可能。`updateUser()` では追加できない
- `amr`（Authentication Methods Reference）には認証に使用された方法（`password`, `otp`, `oauth` 等）が配列で格納される

## 関連

- [Auth 概要](./overview.md)
- [セッション管理](./sessions.md)
- [Auth Hooks](./auth-hooks.md)
- [多要素認証](./mfa.md)
