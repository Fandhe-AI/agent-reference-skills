# Revoking API Keys

Immediately revoke an API key when it becomes inactive, lost, or compromised.

## Signature / Usage

**Revoke a Team Key (Admin required)**

1. App Store Connect → Users and Access → Keys tab
2. Click Edit next to Active keys
3. Select keys to revoke → click Revoke Key → Confirm

**Revoke an Individual Key (Admin revoking another user's key)**

1. App Store Connect → Users and Access → Keys tab → Individual Keys
2. Click Edit → select keys → Revoke Key → Confirm

**Revoke your own Individual Key**

1. App Store Connect → user profile → Individual API Key section
2. Click Revoke → Confirm

**Requests signed with a revoked key are rejected**

```sh
curl -H "Authorization: Bearer $TOKEN" \
  https://api.appstoreconnect.apple.com/v1/apps
```

```json
{
  "errors": [
    {
      "status": "401",
      "code": "NOT_AUTHORIZED",
      "title": "Authentication credentials are missing or invalid.",
      "detail": "The provided JWT was signed with a key that has been revoked."
    }
  ]
}
```

## Notes

- Revocation is permanent — a revoked key cannot be reinstated
- Revoked keys are listed under the Revoked heading for 30 days in App Store Connect
- Any JWT signed with a revoked key is immediately rejected

## Related

- [Creating API Keys](./creating-api-keys.md)
- [Generating Tokens for API Requests](./generating-tokens.md)
