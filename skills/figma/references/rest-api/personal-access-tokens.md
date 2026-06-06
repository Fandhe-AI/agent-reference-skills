# Personal Access Tokens

Per-user API tokens that authenticate requests as the token owner. Suitable for individual scripts and personal tooling.

## Signature / Usage

```http
GET https://api.figma.com/v1/files/:key
X-Figma-Token: <your-personal-access-token>
```

## Options / Props

| Setting | Description |
|---------|-------------|
| Expiration | Configurable at creation time |
| Scopes | Selected at creation; determine which endpoints are accessible |
| Generation location | Figma account Settings → Security → Personal access tokens |

## Notes

- The token is shown only once at creation — save it immediately
- Pass the token via the `X-Figma-Token` HTTP header
- Tokens are rate-limited per user and per token
- Revocation takes effect instantly; monitor token activity and revoke suspicious tokens
- Maximum expiration is shorter than plan access tokens (which support up to 1 year)

## Related

- [Authentication](./authentication.md)
- [Plan Access Tokens](./plan-access-tokens.md)
- [Scopes](./scopes.md)
