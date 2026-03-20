# Auth Hooks

サーバーサイドで認証フローをカスタマイズする 6 種類のフック。

## 概要

Auth Hooks は、認証フローの特定のポイントでカスタムロジックを実行するためのサーバーサイドフックである。PostgreSQL 関数または HTTP エンドポイントとして実装可能。

### 6 種類の Auth Hooks

| Hook | トリガータイミング | 主な用途 |
|------|-------------------|---------|
| **Custom Access Token** | JWT 発行時 | JWT にカスタムクレームを追加 |
| **Send Email** | メール送信時 | カスタム SMTP / メールテンプレート |
| **Send SMS** | SMS 送信時 | カスタム SMS プロバイダ |
| **MFA Verification** | MFA 検証時 | カスタム MFA 検証ロジック |
| **Password Verification** | パスワード検証時 | カスタムパスワードハッシュの移行 |
| **Before User Created** | ユーザー作成前 | ユーザー作成の許可/拒否 |

### 実装方法

1. **PostgreSQL 関数**: `auth` スキーマまたは `public` スキーマに関数を作成。同一データベース内で完結するため高速
2. **HTTP エンドポイント**: 外部サービスの API を呼び出す。Edge Function などで実装可能

## コード例

```typescript
// ============================================================
// 1. Custom Access Token Hook
// JWT にカスタムクレーム（ロール等）を追加
// ============================================================

// PostgreSQL 関数として実装:
// CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
// RETURNS jsonb
// LANGUAGE plpgsql
// STABLE
// AS $$
// DECLARE
//   claims jsonb;
//   user_role text;
// BEGIN
//   -- ユーザーのロールを取得
//   SELECT role INTO user_role
//   FROM public.user_roles
//   WHERE user_id = (event->>'user_id')::uuid;
//
//   -- claims を取得
//   claims := event->'claims';
//
//   -- カスタムクレームを追加
//   IF user_role IS NOT NULL THEN
//     claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
//   ELSE
//     claims := jsonb_set(claims, '{user_role}', '"user"');
//   END IF;
//
//   -- 更新した claims を返す
//   event := jsonb_set(event, '{claims}', claims);
//   RETURN event;
// END;
// $$;
//
// -- Hook に必要な権限を付与
// GRANT USAGE ON SCHEMA public TO supabase_auth_admin;
// GRANT EXECUTE ON FUNCTION public.custom_access_token_hook TO supabase_auth_admin;
// REVOKE EXECUTE ON FUNCTION public.custom_access_token_hook FROM authenticated, anon, public;
// GRANT ALL ON TABLE public.user_roles TO supabase_auth_admin;

// RLS でカスタムクレームを使用:
// CREATE POLICY "Admins only" ON public.admin_data
//   FOR ALL TO authenticated
//   USING ((auth.jwt() ->> 'user_role') = 'admin');

// ============================================================
// 2. Send Email Hook
// カスタムメール送信（例: Resend, SendGrid）
// ============================================================

// Edge Function として実装:
// Deno.serve(async (req) => {
//   const payload = await req.json()
//   const { user, email_data } = payload
//
//   // email_data.token: OTP トークン
//   // email_data.token_hash: トークンハッシュ
//   // email_data.redirect_to: リダイレクト先
//   // email_data.email_action_type: 'signup' | 'magiclink' | 'recovery' | ...
//
//   // カスタムメール送信
//   await fetch('https://api.resend.com/emails', {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       from: 'noreply@example.com',
//       to: user.email,
//       subject: 'Your verification code',
//       html: `<p>Your code: ${email_data.token}</p>`,
//     }),
//   })
//
//   return new Response(JSON.stringify({}), {
//     headers: { 'Content-Type': 'application/json' },
//   })
// })

// ============================================================
// 3. Send SMS Hook
// カスタム SMS 送信
// ============================================================

// PostgreSQL 関数（pg_net を使用）:
// CREATE OR REPLACE FUNCTION public.custom_sms_hook(event jsonb)
// RETURNS jsonb
// LANGUAGE plpgsql
// AS $$
// DECLARE
//   phone text := event->'user'->>'phone';
//   otp text := event->'sms'->>'otp';
// BEGIN
//   -- pg_net で外部 SMS API を呼び出し
//   PERFORM net.http_post(
//     url := 'https://api.sms-provider.com/send',
//     headers := '{"Authorization": "Bearer YOUR_API_KEY"}'::jsonb,
//     body := jsonb_build_object('to', phone, 'message', 'Your code: ' || otp)
//   );
//
//   RETURN event;
// END;
// $$;

// ============================================================
// 4. MFA Verification Hook
// カスタム MFA 検証ロジック
// ============================================================

// PostgreSQL 関数:
// CREATE OR REPLACE FUNCTION public.mfa_verification_hook(event jsonb)
// RETURNS jsonb
// LANGUAGE plpgsql
// AS $$
// DECLARE
//   attempts int;
// BEGIN
//   -- 失敗回数を確認
//   SELECT count(*) INTO attempts
//   FROM public.mfa_attempts
//   WHERE user_id = (event->>'user_id')::uuid
//     AND created_at > now() - interval '1 hour';
//
//   IF attempts >= 5 THEN
//     -- 5回以上失敗したらブロック
//     RETURN jsonb_build_object(
//       'decision', 'reject',
//       'message', 'Too many attempts. Please try again later.'
//     );
//   END IF;
//
//   RETURN jsonb_build_object('decision', 'continue');
// END;
// $$;

// ============================================================
// 5. Password Verification Hook
// カスタムパスワード検証（移行用途）
// ============================================================

// PostgreSQL 関数:
// CREATE OR REPLACE FUNCTION public.password_verification_hook(event jsonb)
// RETURNS jsonb
// LANGUAGE plpgsql
// AS $$
// DECLARE
//   stored_hash text;
// BEGIN
//   -- 旧システムのパスワードハッシュを確認
//   SELECT password_hash INTO stored_hash
//   FROM public.legacy_users
//   WHERE email = (event->>'email');
//
//   IF stored_hash IS NOT NULL AND
//      public.verify_legacy_hash(event->>'password', stored_hash) THEN
//     -- 旧ハッシュで認証成功 → bcrypt に移行
//     RETURN jsonb_build_object(
//       'decision', 'continue',
//       'should_update_password', true
//     );
//   END IF;
//
//   RETURN jsonb_build_object('decision', 'continue');
// END;
// $$;

// ============================================================
// 6. Before User Created Hook
// ユーザー作成前の検証
// ============================================================

// PostgreSQL 関数:
// CREATE OR REPLACE FUNCTION public.before_user_created_hook(event jsonb)
// RETURNS jsonb
// LANGUAGE plpgsql
// AS $$
// DECLARE
//   email text := event->'user'->>'email';
//   domain text;
// BEGIN
//   -- メールドメインを取得
//   domain := split_part(email, '@', 2);
//
//   -- 許可されたドメインのみサインアップを許可
//   IF domain NOT IN ('company.com', 'partner.com') THEN
//     RETURN jsonb_build_object(
//       'decision', 'reject',
//       'message', 'Only company.com and partner.com emails are allowed.'
//     );
//   END IF;
//
//   RETURN jsonb_build_object('decision', 'continue');
// END;
// $$;
```

## 注意点

- Auth Hook の PostgreSQL 関数は `supabase_auth_admin` ロールで実行されるため、適切な権限を付与すること
- `authenticated` や `anon` ロールからの実行権限は REVOKE すること（セキュリティ対策）
- Custom Access Token Hook で追加したクレームは JWT のペイロードサイズを増加させる。過度に大きなデータを入れないこと
- HTTP エンドポイント型の Hook はネットワーク遅延の影響を受けるため、パフォーマンスに注意
- Send Email / Send SMS Hook を設定すると、Supabase のデフォルトのメール / SMS 送信は無効化される
- Hook 関数がエラーを返すと、認証フロー全体が失敗する。適切なエラーハンドリングを実装すること
- ダッシュボードの Auth > Hooks で Hook を有効化し、実装を関連付ける

## 関連

- [Auth 概要](./overview.md)
- [JWT 構造](./jwts.md)
- [メール OTP / Magic Link](./email-passwordless.md)
- [多要素認証](./mfa.md)
