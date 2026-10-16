# JWT Claims Reference

Supabase Auth が発行する JWT に現れる全クレームのリファレンス。

## Signature / Usage

サーバーサイドの JWT 検証・シリアライズ向け。`ref` が予約語になる Rust 等で特に必要。JWT は Header / Payload / Signature の 3 部構成で、Payload にユーザー ID・認証レベル・認可情報のクレームが入る。

### Required claims（常に存在し削除不可）

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `iss` | `string` | Issuer | `"https://project-ref.supabase.co/auth/v1"` |
| `aud` | `string \| string[]` | Audience | `"authenticated"` or `"anon"` |
| `exp` | `number` | Expiration Time (Unix) | `1640995200` |
| `iat` | `number` | Issued At (Unix) | `1640991600` |
| `sub` | `string` | Subject - user ID (UUID) | `"123e4567-e89b-12d3-a456-426614174000"` |
| `role` | `string` | Role | `"authenticated"`, `"anon"`, `"service_role"` |
| `aal` | `string` | Authenticator Assurance Level | `"aal1"`, `"aal2"` |
| `session_id` | `string` | Session ID | `"session-uuid"` |
| `email` | `string` | Email | `"user@example.com"` |
| `phone` | `string` | Phone | `"+1234567890"` |
| `is_anonymous` | `boolean` | Anonymous Flag | `false` |

### Optional claims

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `jti` | `string` | JWT ID | `"jwt-uuid"` |
| `nbf` | `number` | Not Before (Unix) | `1640991600` |
| `app_metadata` | `object` | Application-specific user data | `{"provider": "email"}` |
| `user_metadata` | `object` | User-specific data | `{"name": "John Doe"}` |
| `amr` | `array` | Authentication Methods Reference | `[{"method": "password", "timestamp": 1640991600}]` |

### Special claims

| Field | Type | Description | Context |
| --- | --- | --- | --- |
| `ref` | `string` | Project Reference（例 `"abcdefghijklmnopqrst"`） | Anon/Service role tokens only |

### 値の制約

- `aal`: `"aal1"` = single-factor（password, OAuth 等）/ `"aal2"` = multi-factor（password + TOTP 等）
- `role`: `"anon"`（RLS 付きの公開アクセス）/ `"authenticated"`（標準ユーザー）/ `"service_role"`（admin 権限、サーバー側専用）
- `aud`: `"authenticated"` / `"anon"`
- `amr.method`: `oauth`, `password`, `otp`, `totp`, `recovery`, `invite`, `sso/saml`, `magiclink`, `email/signup`, `email_change`, `token_refresh`, `anonymous`

### コード例

```json
{
  "aal": "aal1",
  "amr": [
    {
      "method": "password",
      "timestamp": 1640991600
    }
  ],
  "app_metadata": {
    "provider": "email",
    "providers": ["email"]
  },
  "aud": "authenticated",
  "email": "user@example.com",
  "exp": 1640995200,
  "iat": 1640991600,
  "iss": "https://abcdefghijklmnopqrst.supabase.co/auth/v1",
  "phone": "",
  "role": "authenticated",
  "session_id": "123e4567-e89b-12d3-a456-426614174000",
  "sub": "123e4567-e89b-12d3-a456-426614174000",
  "user_metadata": {
    "name": "John Doe"
  },
  "is_anonymous": false
}
```

Anon / service role トークンは `iss: "supabase"`、`ref`、`role`、`iat`、`exp` のみ。

```rust
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
struct JwtClaims {
    iss: String,
    #[serde(rename = "ref")] // Handle reserved keyword
    project_ref: Option<String>,
    role: String,
    iat: i64,
    exp: i64,
    // ... other claims
}
```

```typescript
interface JwtClaims {
  iss: string
  aud: string | string[]
  exp: number
  iat: number
  sub: string
  role: string
  aal: 'aal1' | 'aal2'
  session_id: string
  email: string
  phone: string
  is_anonymous: boolean
  jti?: string
  nbf?: number
  app_metadata?: Record<string, any>
  user_metadata?: Record<string, any>
  amr?: Array<{
    method: string
    timestamp: number
  }>
  ref?: string // Only in anon/service role tokens
}
```

## Notes

- 公式は Python（dataclass）/ Go（struct）の定義例も提示している（原本参照）。Go では `aud` を `interface{}`（string または []string）、任意クレームはポインタ + `omitempty`
- 検証手順（公式 Validation guidelines）: 必須クレームの存在、型、`exp` が未来、`iss` がプロジェクトと一致、`aud` が期待値、Rust 等では予約語のリネーム
- セキュリティ（公式）: クレームを信頼する前に署名を必ず検証 / service role トークンをクライアントへ露出しない / 毎リクエスト有効期限を確認 / JWT 送信は HTTPS / JWT secret を定期ローテーション / 不正トークンのエラー処理
- 出典: https://supabase.com/docs/guides/auth/jwt-fields（取得日 2026-10）

## Related

- [JWT 構造](./jwts.md)
- [Auth Hooks](./auth-hooks.md)
- [サーバーサイド認証（SSR）](./server-side.md)
