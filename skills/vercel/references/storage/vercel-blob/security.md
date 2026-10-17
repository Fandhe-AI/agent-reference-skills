# Blob Security

How a Vercel Blob store is secured: private vs public storage, enforced headers, encryption, and firewall / WAF integration.

## Signature / Usage

Enable the firewall for a store:

```text
1. Dashboard > your Blob store > Settings tab
2. Firewall section > "Protect your store" > "Enable firewall"
```

This connects the store to `vercel-blob-default-project`, a Vercel-managed project holding the firewall rules for your team's Blob stores. The project is team-wide, so other stores that enable firewall protection reuse it and share its rules. After enabling, Vercel redirects to the project's firewall page where you create rules. Later updates: store Settings tab > "Configure firewall".

## Private storage

Private Blob stores require authentication for all read and write operations. On Vercel the SDK uses OIDC by default (preferred over long-lived `BLOB_READ_WRITE_TOKEN` because tokens rotate automatically). Use `BLOB_READ_WRITE_TOKEN` when code runs outside Vercel or for client uploads. Private files cannot be accessed via public URLs; deliver them through Vercel Functions with your own authentication logic.

## Public storage

URLs are publicly accessible but unique and hard to guess when you add a random suffix at upload time (store id + pathname + random blob id). Only share URLs with authorized users.

Headers enforced on each blob:

- `content-security-policy`: `default-src "none"`
- `x-frame-options`: `DENY`
- `x-content-type-options`: `nosniff`
- `content-disposition`: `inline; filename="filename.extension"` or `attachment; filename="filename.extension"`

## Encryption

All files are secured with AES-256 encryption at rest, transparently (encrypted before being saved, decrypted on retrieval).

## Firewall and WAF

Vercel Blob is protected by the platform-wide firewall (DDoS mitigation, blocking abnormal request levels). You can also apply your own Vercel WAF rules: custom rules, IP blocking, and rate limiting.

## Notes

- The **Challenge** action serves a JavaScript challenge only a browser can solve, so requests from the Blob SDKs (JS and Python) and other server-side code fail with a 429 response. Only use Challenge in rules that never match your application's SDK traffic.
- The OWASP core ruleset is not supported for Blob stores.
- Source: https://vercel.com/docs/vercel-blob/security

## Related

- [Private Storage](./private-storage.md)
- [Public Storage](./public-storage.md)
- [Signed URLs](./signed-urls.md)
