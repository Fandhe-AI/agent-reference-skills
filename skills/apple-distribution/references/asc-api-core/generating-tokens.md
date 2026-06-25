# Generating Tokens for API Requests

Create JSON Web Tokens (JWTs) signed with your private key to authorize requests to the App Store Connect API.

## Signature / Usage

```bash
# Include the signed JWT as a Bearer token in every request
curl -H 'Authorization: Bearer <signed_token>' \
  "https://api.appstoreconnect.apple.com/v1/apps"
```

## Steps

1. Create the JWT header
2. Create the JWT payload
3. Sign the JWT with your private key (ES256)
4. Include the signed JWT in the `Authorization: Bearer` header

## Options / Props

### JWT Header

| Field | Value | Description |
|-------|-------|-------------|
| `alg` | `ES256` | Encryption algorithm — always ES256 |
| `kid` | e.g. `2X9R4HXF34` | Your private key ID from App Store Connect |
| `typ` | `JWT` | Token type |

### JWT Payload — Team Keys

| Field | Value | Description |
|-------|-------|-------------|
| `iss` | UUID string | Issuer ID from App Store Connect → Users and Access → Integrations |
| `iat` | Unix epoch int | Token creation time |
| `exp` | Unix epoch int | Expiration time; max 20 min for most endpoints |
| `aud` | `appstoreconnect-v1` | Audience; always this value |
| `scope` | `["GET /v1/apps"]` | (Optional) Restrict which operations the token allows |

### JWT Payload — Individual Keys

| Field | Value | Description |
|-------|-------|-------------|
| `sub` | `user` | Subject; always `"user"` for individual keys |
| `iat` | Unix epoch int | Token creation time |
| `exp` | Unix epoch int | Expiration time |
| `aud` | `appstoreconnect-v1` | Audience |
| `scope` | array | (Optional) Operation restrictions |

## Notes

- Token lifetime is `exp − iat`; rejected if greater than 20 minutes for most resources
- **Long-lived tokens** (up to 6 months) are accepted when: the token defines a `scope`, the scope contains only GET operations, and all scoped resources explicitly support long-lived tokens (e.g., Build Runs, Workflows, Repositories)
- Reuse a signed token across multiple requests until it expires — no need to regenerate per request
- Individual keys do not use `iss`; they use `sub: "user"` instead
- Use any JWT library from [JWT.io](https://jwt.io/) to sign with the downloaded `.p8` private key

## Related

- [Creating API Keys](./creating-api-keys.md)
- [Revoking API Keys](./revoking-api-keys.md)
- [Identifying Rate Limits](./rate-limits.md)
