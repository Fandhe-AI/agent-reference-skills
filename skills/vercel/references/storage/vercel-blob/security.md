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

- `content-security-policy`: `default-src 'none'; media-src 'self'; style-src 'unsafe-inline'; img-src 'self'`
- `x-content-type-options`: `nosniff`
- `content-disposition`: `inline; filename="filename.extension"` or `attachment; filename="filename.extension"`

## Encryption

All files are secured with AES-256 encryption at rest, transparently (encrypted before being saved, decrypted on retrieval).

## Firewall and WAF

Vercel Blob is protected by the platform-wide firewall (DDoS mitigation, blocking abnormal request levels). You can also apply your own Vercel WAF rules: custom rules, IP blocking, and rate limiting.

## Notes

- The **Challenge** action serves a JavaScript challenge only a browser can solve, so requests from the Blob SDKs (JS and Python) and other server-side code fail with a 429 response. Only use Challenge in rules that never match your application's SDK traffic.
- Code that calls the SDK without a `token` option needs no change for the OIDC migration; an explicit `token: process.env.BLOB_READ_WRITE_TOKEN` always wins over OIDC and must be removed before revoking. With a custom environment variable prefix the new variables use that prefix (e.g. `MY_PREFIX_STORE_ID`); the SDK only reads `BLOB_STORE_ID` automatically, so pass `storeId: process.env.MY_PREFIX_STORE_ID` in each call
- `handleUpload` needs the read-write token to sign client tokens: switch to `handleUploadPresigned` (works with OIDC) before revoking the token
- The OWASP core ruleset is not supported for Blob stores.
- Source: https://vercel.com/docs/vercel-blob/security (fetched 2026-11-14)

### Migrate from a Read-Write Token to OIDC

A `BLOB_READ_WRITE_TOKEN` never expires; if it leaks (`.env.local`, CI logs, shared secrets) anyone holding it can read and write the store until it is rotated. OIDC tokens are short-lived and rotated by Vercel. On the store's **Projects** tab, connections still using the read-write token show an **Enable OIDC Recommended** badge.

Upgrade each connected project:

1. Update `@vercel/blob` to `2.4.0` or later (Python: see Authentication in python-sdk.md).
2. Store's **Projects** tab: select the **Enable OIDC Recommended** badge, or the row menu > **Upgrade to OIDC**.
3. Check the detected SDK version and select **Upgrade**. Vercel adds `BLOB_STORE_ID` and `BLOB_WEBHOOK_PUBLIC_KEY`; `BLOB_READ_WRITE_TOKEN` stays in place for now. If no supported SDK version is detected the dashboard warns; **Upgrade Anyway** is available once you have confirmed support.
4. Redeploy (existing deployments keep using the read-write token until redeployed).
5. For local development run `vercel env pull` to add `BLOB_STORE_ID` and `VERCEL_OIDC_TOKEN` to `.env.local`.

Revoke the token once every project uses OIDC: **Projects** tab > **Revoke Token** in the banner, then confirm. Revoking removes `BLOB_READ_WRITE_TOKEN` from every connected project and code still using it stops working immediately (undeployed deployments, local `.env.local`, CI jobs, other hosts). To undo: store **Settings** tab > **Restore Token** under **Restore Read-Write Token**.

## Related

- [Private Storage](./private-storage.md)
- [Public Storage](./public-storage.md)
- [Signed URLs](./signed-urls.md)
