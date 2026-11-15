---
source: https://docs.cloud.google.com/run/docs/authenticating/developers
---

# Authenticate developers

Let developers test private Cloud Run services (not jobs) before release: grant them Cloud Run Invoker, then use the Cloud Run proxy in the Google Cloud CLI or `curl` with an ID token.

## Signature / Usage

### Grant the Invoker role to a developer or group

```bash
gcloud run services add-iam-policy-binding SERVICE \
  --member='USER:EMAIL' \
  --role='roles/run.invoker'
```

`USER` is the value `user` or `group`; `EMAIL` is the account email. Example:

```bash
gcloud run services add-iam-policy-binding myservice \
--member='user:test-user@gmail.com' \
--role='roles/run.invoker'
```

### Test with the Cloud Run proxy (recommended)

Proxies the private service to `http://localhost:8080` (or the port set with `--port`) using the active account's token or another token you specify. Recommended for testing a website or API in a browser. Run it from Linux, macOS, WSL (preferred), or cygwin.

```bash
gcloud run services proxy SERVICE --project PROJECT-ID
```

### Test with curl

```bash
curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" SERVICE_URL
```

## Options / Props

| Item | Rule from the source |
|---|---|
| Role for developers | `roles/run.invoker` (or Cloud Run Admin) on the service |
| Permission needed by the token's identity | `run.routes.invoke` |
| gcloud-generated ID tokens | Usable in any project where the account has `run.routes.invoke`; lack an audience claim, so they are susceptible to replay attacks |
| Production | Use ID tokens issued for a service account with the appropriate audience; for non-user accounts use Workforce Identity Federation (as named in the source) so you don't download a service account key |

## Notes

- For development use gcloud CLI-generated ID tokens; in production use ID tokens issued for a service account with the intended audience, which restricts token use to the intended service.
- Keep IAM policies on services limited to the minimum number of users and service accounts, with the minimum set of permissions.
- "User account" means a Google Account or a user account managed by your identity provider and federated with Workforce Identity Federation.
- On Windows, `curl` and the proxy commands may need WSL (preferred) or cygwin.
- The source also shows Console and Terraform forms (not reproduced).
- Source: https://docs.cloud.google.com/run/docs/authenticating/developers (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [managing-access.md](./managing-access.md)
- [service-to-service.md](./service-to-service.md)
- gcloud proxy reference: https://docs.cloud.google.com/sdk/gcloud/reference/run/services/proxy
