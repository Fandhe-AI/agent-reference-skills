---
source: https://docs.cloud.google.com/iam/docs/best-practices-for-managing-service-account-keys
---

# Service Account Key Best Practices

Managing, using, and securing user-managed service account keys (RSA key pairs whose private key authenticates as the service account). Prefer more secure alternatives wherever possible.

## Signature / Usage

### Auto-disable leaked keys

Set the Service Account Key Exposure Response constraint to `DISABLE_KEY`. A key disabled this way carries these metadata fields:

```json
"disable_reason": "SERVICE_ACCOUNT_KEY_DISABLE_REASON_EXPOSED"
"extended_status": "SERVICE_ACCOUNT_KEY_EXTENDED_STATUS_KEY_EXPOSED"
"extended_status_message": "LINK_TO_EXPOSURE"
```

### Public X.509 endpoint (no authentication)

```text
https://www.googleapis.com/service_accounts/v1/metadata/x509/ACCOUNT_EMAIL
```

### Domain-wide delegation without keys

1. Authenticate the service account with an attached service account, Workload Identity Federation for GKE, or Workload Identity Federation.
2. Construct a JWT; use the `sub` claim for the email of the user to act for.
3. Sign it with the `signJwt` API.
4. Pass the signed JWT to the OAuth2 Token resource for an access token.

### Hand-over without passing a private key

1. On the target machine, create a self-signed certificate with an RSA 2048-bit key pair (`openssl`, `certutil`, `New-SelfSignedCertificate`).
2. Pass only the certificate to the user permitted to upload keys (integrity matters, confidentiality does not).
3. That user uploads the certificate to associate it with the service account.

### Write a key directly to its destination

```text
gcloud iam service-accounts keys create
```

## Options / Props

| Threat | Practices |
|--------|-----------|
| Credential leakage | Provide alternatives and a decision process; apply Disable service account key creation / upload at the organization root and override only for selected projects (changing constraints needs `orgpolicy.policy.set`, absent from Owner/Editor); do not leave keys in downloads folders or recycle bins; do not pass keys between users; do not commit keys to repositories (enable key detection, GitHub secret scanning, Security Command Center anomaly detection, or truffleHog in pre-commit/CI); do not embed in binaries; find unused keys with service account insights (90 days) and the Key Authentication Events metric; rotate keys routinely; use expiry for temporary access only; set exposure response to `DISABLE_KEY`. |
| Privilege escalation | Avoid keys on file systems (restrict access, audit, encrypt disk if unavoidable); store private keys in an HSM or TPM and upload the certificate; otherwise use a software key store; do not store keys in Secret Manager or other cloud secret stores (an app that can reach them already has an identity); do not use Editor where key creation/upload is allowed; avoid keys for domain-wide delegation. |
| Information disclosure | Uploaded X.509 certificates are publicly downloadable; add no optional attributes and use a generic `Subject`. |
| Non-repudiation | One service account per application (`principalEmail`); one key per machine (`serviceAccountKeyName` in audit logs). |
| Malicious credential configurations | Validate keys from external sources; for service account keys the `type` field must be `service_account`. |

## Notes

- Keys are more valuable to attackers than passwords: no 2-step verification or login challenge applies.
- If a key was committed to a repository, delete the key in IAM immediately; removing it from the repository is not enough.
- Expiry times apply only to newly created keys (project, folder, or organization setting) or to the X.509 `Valid To` date of an uploaded key. Do not use expiry for production workloads, long-lived CI pipelines, or when a rotation system already invalidates keys.
- A leaked-key disable can be reverted with re-enable to resolve an outage; disable it again promptly. Google does not guarantee detection of leaked keys.
- If you generate the key pair yourself in an HSM and upload the public key, scheduled rotation may be unnecessary; rotate on suspected compromise.
- TPM-managed keys are unique to a machine; each machine's key can share one service account.
- Creating or downloading a key makes the credential a long-lived secret; this page's own text recommends avoiding user-managed keys.
- Source: https://docs.cloud.google.com/iam/docs/best-practices-for-managing-service-account-keys (retrieved 2026-11-14; CC BY 4.0)

## Related

- [service-account-best-practices.md](./service-account-best-practices.md)
- Other skills: gcp-security (Secret Manager), gcp-client-libraries (ADC code)
