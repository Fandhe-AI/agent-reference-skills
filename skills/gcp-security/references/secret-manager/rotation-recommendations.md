---
source: https://docs.cloud.google.com/secret-manager/docs/rotation-recommendations
---

# About rotation schedules

Recommendations for rotating secrets in Secret Manager: how to bind a secret version to your application and how to build a rotation workflow. To rotate, add a new secret version to an existing secret; the most recently added version is available through the `latest` alias.

## Signature / Usage

Cleanup order: disable the old version, verify, then destroy:

```bash
gcloud secrets versions disable 123 --secret=my-secret --etag=123
```

```bash
gcloud secrets versions destroy 123 --secret=my-secret --etag=123
```

### Bind a secret version to your application

- `latest` is convenient for development but a bad value can be rolled out immediately and cause a service-wide outage in production. Prefer slower rollouts; a strong workflow detects breakage (for example HTTP error rates) and rolls back to the older version through a prior configuration deployment.
- Approach 1, resolve during an existing release process (recommended): resolve `latest` into the full version resource name at rotation time, store it durably (for example commit to Git), pull it into deployment configuration, and call Secret Manager with that version at startup. Benefits: same version across restarts, reuse of change management for rollout and rollback, gradual rollout. If a bad version is at `latest` and the previous works, create a new version with the same value and roll it out ("roll forward"); this requires `secretmanager.versions.access` on the secret.
- Approach 2, resolve on application startup: no CI/CD change, but a bad secret makes the application fail to start as instances restart or scale up, which can cascade into an outage.
- Approach 3, resolve continuously (poll `latest`): risks immediate, service-wide outage with no gradual adoption.

### Rotation job (Cloud Run as the example compute)

1. Configure a rotation schedule on the secret with Pub/Sub topics to receive notifications.
2. A Cloud Run service receives the notification: obtain or create a new secret in the external system without invalidating existing secrets, then create a new secret version in Secret Manager (this updates `latest`).
3. Roll out the new version to workloads (depends on binding approach).
4. Clean up: confirm full rollout; disable the old version and verify (wait long enough for a human to intervene); remove or unregister the old secret in the external system; destroy the old version in Secret Manager.

## Options / Props

| Item | Recommendation |
|---|---|
| Retries | Make the rotation reentrant; configure Pub/Sub retries; set Cloud Run max concurrency and max instances to limit concurrent rotations. |
| State tracking | Labels on the secret (for example `ROTATING_TO_NEW_VERSION_NUMBER=3`, removed when done); etags to detect concurrent modification. |
| Permissions | `secretmanager.versions.add` to add a version; possibly `secretmanager.versions.access` to read the previous version. |
| Roles (one or more as needed) | `roles/secretmanager.secretVersionAdder`, `roles/secretmanager.secretVersionManager`, `roles/secretmanager.secretAdmin`, `roles/secretmanager.secretAccessor` |

## Notes

- Do NOT use the default Cloud Run service account (it has the Editor role, which includes adding but not accessing secret versions); use a separate service account with only the Secret Manager roles needed (least privilege).
- Etags of secrets and secret versions are independent; adding a version does not change the parent secret's etag.
- Destroying a secret version is irreversible; disable it first and try on a disposable secret.
- Source inconsistency: the source lists `roles/secretmanager.secretAdmin`, while the Create a secret page (https://docs.cloud.google.com/secret-manager/docs/creating-and-accessing-secrets) names the Secret Manager Admin role `roles/secretmanager.admin`.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/secrets/versions/disable (gcloud 593.0.0 help).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/secrets/versions/destroy (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/secret-manager/docs/rotation-recommendations (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [secret-rotation.md](./secret-rotation.md)
- [best-practices.md](./best-practices.md)
