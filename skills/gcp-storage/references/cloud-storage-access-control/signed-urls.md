---
source: https://docs.cloud.google.com/storage/docs/access-control/signed-urls
---

# Signed URLs

A signed URL carries a signature in its query string that gives time-limited access to a specific Cloud Storage resource. Anyone holding the URL can use it while it is active, with or without an account.

## Signature / Usage

Example V4 signed URL (service account authentication) granting read access to `cat.jpeg` in `example-bucket`:

```text
https://storage.googleapis.com/example-bucket/cat.jpeg?X-Goog-Algorithm=
GOOG4-RSA-SHA256&X-Goog-Credential=example%40example-project.iam.gserviceaccount.com
%2F20181026%2Fus-central1%2Fstorage%2Fgoog4_request&X-Goog-Date=20181026T18
1309Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=247a2aa45f16
9edf4d187d54e7cc46e4731b1e6273242c4f4c39a1d2507a0e58706e25e3a85a7dbb891d62afa849
6def8e260c1db863d9ace85ff0a184b894b117fe46d1225c82f2aa19efd52cf21d3e2022b3b868dc
c1aca2741951ed5bf3bb25a34f5e9316a2841e8ff4c530b22ceaa1c5ce09c7cbb5732631510c2058
0e61723f5594de3aea497f195456a2ff2bdd0d13bad47289d8611b6f9cfeef0c46c91a455b94e90a
66924f722292d21e24d31dcfb38ce0c0f353ffa5a9756fc2a9f2b40bc2113206a81e324fc4fd6823
a29163fa845c8ae7eca1fcf6e5bb48b3200983c56c5ca81fffb151cca7402beddfc4a76b13344703
2ea7abedc098d2eb14a7
```

To create one, see the helpers page ([signing-urls-with-helpers.md](./signing-urls-with-helpers.md)) or "V4 signing with your own program" (https://docs.cloud.google.com/storage/docs/access-control/signing-urls-manually).

### Resumable uploads

Signed URLs are generally unnecessary for resumable uploads: after the initiating request, `PUT` requests use a session URI that acts as an authentication token. Usually the server initiates the resumable upload and hands the session URI to the client. A signed URL for the initial `POST` is useful when server and client are geographically distant, since resumable uploads are pinned to the region of the initial request.

## Options / Props

| Query parameter | Meaning |
|---|---|
| `X-Goog-Algorithm` | Algorithm used to sign the URL |
| `X-Goog-Credential` | Credentials used to create the URL |
| `X-Goog-Date` | When the URL became usable, ISO 8601 basic format `YYYYMMDD'T'HHMMSS'Z'` |
| `X-Goog-Expires` | Validity in seconds from `X-Goog-Date`; the longest expiration value is 604800 seconds (7 days) |
| `X-Goog-SignedHeaders` | Headers that must be included in any request using the URL |
| `X-Goog-Signature` | Authentication string |

## Notes

- Signed URLs work only through XML API endpoints.
- When generating one you must specify an account with sufficient permission for the request the URL will make; usually a service account. With your own signing program a user account can be used if it has an associated HMAC key. Identify the service account by email (service account ID is also supported).
- The URL is valid until expiration or until the key used to sign it is rotated. Anyone who knows the URL can use it; it effectively makes the resource accessible to every holder until it expires, so share it only with intended recipients.
- Typical uses are uploads and downloads. For copy, compose, delete or metadata edits, prefer having the entity that would create the URL make the request directly.
- Canonical requests and credential scope are part of the signature; Cloud Storage tools create them automatically, your own program must define them.
- Public access prevention does not apply to signed URLs.
- Session URIs can be used by anyone holding them; send them over HTTPS.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`). Service accounts and IAM are in `gcp-foundation`.
- Source: https://docs.cloud.google.com/storage/docs/access-control/signed-urls (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [signing-urls-with-helpers.md](./signing-urls-with-helpers.md)
- [access-control.md](./access-control.md)
- [public-access-prevention.md](./public-access-prevention.md)
