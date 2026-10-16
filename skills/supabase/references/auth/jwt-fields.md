# JWT Claims Reference

Complete reference for claims appearing in JWTs created by Supabase Auth.

## Signature / Usage

This reference is essential for server-side JWT validation and serialization, especially when implementing authentication in languages like Rust where field names like `ref` are reserved keywords.

Supabase JWTs follow the standard JWT structure with three parts: Header (algorithm and key information), Payload (the claims: user data and metadata), and Signature (cryptographic signature for verification). The payload contains various claims that provide user identity, authentication level, and authorization information.

### Required claims

These claims are always present in Supabase JWTs and cannot be removed:

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `iss` | `string` | Issuer - The entity that issued the JWT | `"https://project-ref.supabase.co/auth/v1"` |
| `aud` | `string \| string[]` | Audience - The intended recipient of the JWT | `"authenticated"` or `"anon"` |
| `exp` | `number` | Expiration Time - Unix timestamp when the token expires | `1640995200` |
| `iat` | `number` | Issued At - Unix timestamp when the token was issued | `1640991600` |
| `sub` | `string` | Subject - The user ID (UUID) | `"123e4567-e89b-12d3-a456-426614174000"` |
| `role` | `string` | Role - User's role in the system | `"authenticated"`, `"anon"`, `"service_role"` |
| `aal` | `string` | Authenticator Assurance Level - Authentication strength | `"aal1"`, `"aal2"` |
| `session_id` | `string` | Session ID - Unique session identifier | `"session-uuid"` |
| `email` | `string` | Email - User's email address | `"user@example.com"` |
| `phone` | `string` | Phone - User's phone number | `"+1234567890"` |
| `is_anonymous` | `boolean` | Anonymous Flag - Whether the user is anonymous | `false` |

### Optional claims

These claims may be present depending on the authentication context:

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `jti` | `string` | JWT ID - Unique identifier for the JWT | `"jwt-uuid"` |
| `nbf` | `number` | Not Before - Unix timestamp before which the token is invalid | `1640991600` |
| `app_metadata` | `object` | App Metadata - Application-specific user data | `{"provider": "email"}` |
| `user_metadata` | `object` | User Metadata - User-specific data | `{"name": "John Doe"}` |
| `amr` | `array` | Authentication Methods Reference - List of authentication methods used | `[{"method": "password", "timestamp": 1640991600}]` |

### Special claims

| Field | Type | Description | Example | Context |
| --- | --- | --- | --- | --- |
| `ref` | `string` | Project Reference - Supabase project identifier | `"abcdefghijklmnopqrst"` | Anon/Service role tokens only |

### Field value constraints

- `aal`: `"aal1"` = single-factor authentication (password, OAuth, etc.); `"aal2"` = multi-factor authentication (password + TOTP, etc.)
- `role`: `"anon"` = anonymous user (public access with RLS policies); `"authenticated"` = authenticated user (standard user access); `"service_role"` = service role (admin privileges, server-side only)
- `aud`: `"authenticated"` (for authenticated user tokens); `"anon"` (for anonymous user tokens)
- `amr.method`: `oauth`, `password`, `otp`, `totp`, `recovery`, `invite`, `sso/saml`, `magiclink`, `email/signup`, `email_change`, `token_refresh`, `anonymous`

### JWT examples

Authenticated user token:

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

Anonymous and service role tokens contain only `iss: "supabase"`, `ref`, `role` (`"anon"` / `"service_role"`), `iat`, and `exp`.

### Language-specific considerations

In Rust, the `ref` field is a reserved keyword. When deserializing JWTs, you'll need to handle this:

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

TypeScript/JavaScript:

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

- The official page also gives Python (dataclass) and Go (struct) definitions. In Go, `aud` is `interface{}` (string or []string) and optional claims are pointers with `omitempty`.
- Validation guidelines: check that required fields are present, verify field types, check that `exp` is in the future, ensure `iss` matches your Supabase project, validate `aud` matches the expected audience, and use field renaming for languages like Rust.
- Security considerations: always validate the JWT signature before trusting any claims; never expose service role tokens to client-side code; validate all claims; check token expiration on every request; use HTTPS for all JWT transmission; rotate JWT secrets regularly; implement proper error handling for invalid tokens.
- Source: https://supabase.com/docs/guides/auth/jwt-fields (fetched 2026-10)

## Related

- [JWT structure](./jwts.md)
- [Auth hooks](./auth-hooks.md)
- [Server-side rendering](./server-side.md)
