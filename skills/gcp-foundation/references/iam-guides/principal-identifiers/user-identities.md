---
source: https://docs.cloud.google.com/iam/docs/user-identities
---

# Identities for Users

Users need an identity Google Cloud recognizes: a Cloud Identity or Google Workspace managed account, or a federated identity (federation through Cloud Identity / Google Workspace, or Workforce Identity Federation). This page covers workforce users only, not customer identities (see Identity Platform for CIAM).

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/iam/docs/principal-identifiers (how each identity kind appears in an allow policy):

```text
user:alex@example.com
principal://iam.googleapis.com/locations/global/workforcePools/altostrat-contractors/subject/raha@altostrat.com
```

## Options / Props

| Option | How it works |
|---|---|
| Cloud Identity / Google Workspace managed accounts | You control lifecycle and configuration. Both share one technical platform. Only managed Super Admin accounts can invite unmanaged consumer-account users to transfer to managed accounts. |
| Federation using Cloud Identity / Google Workspace | Users are redirected to an external IdP instead of entering a password. Requires an external identity plus a corresponding Google Account (typically same email), kept in sync with Google Cloud Directory Sync (GCDS) or an external authoritative source (e.g. Microsoft Entra ID, Active Directory). |
| Workforce Identity Federation | External IdP authenticates and authorizes employees, partners, contractors via IAM; no synchronization of identities to Google Cloud (syncless, attribute-based single sign-on). |

## Notes

- Federated Google-account users appear as `user:` identifiers; Workforce Identity Federation users appear as `principal://.../workforcePools/...` identifiers.
- Source: https://docs.cloud.google.com/iam/docs/user-identities
- Retrieved 2026-11-14. Text CC BY 4.0, code samples Apache 2.0.

## Related

- [principals-overview.md](./principals-overview.md)
- [principal-identifier-formats.md](./principal-identifier-formats.md)
