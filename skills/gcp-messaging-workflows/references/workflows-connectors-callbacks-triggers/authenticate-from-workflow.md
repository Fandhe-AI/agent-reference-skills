---
source: https://docs.cloud.google.com/workflows/docs/authenticate-from-workflow
---

# Make authenticated requests from a workflow

Authenticated HTTP requests need a workflow associated with a service account that has the right credentials. By default HTTP requests carry no identity or access token; add `auth` to the step. Workflows sends a token in the authorization header over HTTPS, based on the attached service account.

## Signature / Usage

### Google Cloud APIs (OAuth 2.0)

The workflow authenticates as its service account. Only HTTPS endpoints with a hostname ending in `.googleapis.com` are supported. In the source, `OAUTH_SCOPE` is a placeholder for the scope string or list.

```yaml
  - step_A:
      call: http.post
      args:
          url: https://compute.googleapis.com/compute/v1/projects/myproject1234/zones/us-central1-b/instances/myvm001/stop
          auth:
              type: OAuth2
              scopes: OAUTH_SCOPE
```

### Cloud Run functions or Cloud Run (OIDC)

Only HTTPS endpoints are supported.

```yaml
  - step_A:
      call: http.get
      args:
          url: https://us-central1-project.cloudfunctions.net/functionA
          query:
              firstNumber: 4
              secondNumber: 6
              operation: sum
          auth:
              type: OIDC
              audience: OIDC_AUDIENCE
```

## Options / Props

### Which authentication to use

| Target | Method |
|--------|--------|
| External (third-party) APIs | `Authorization` request header with the credentials the API requires (for example `Authorization: Bearer ID_TOKEN`). |
| Google Cloud APIs | A Workflows connector if available (automatic authentication with the workflow's service account); otherwise an HTTP request with `type: OAuth2` (OAuth 2.0 access token, for `googleapis.com` APIs). |
| Cloud Run functions or Cloud Run | `type: OIDC` (ID token). |
| Private on-premises, Compute Engine, GKE or other Google Cloud endpoints | Identity-Aware Proxy (IAP) with OIDC. |

### `auth` keys

| Key | Default | Description |
|-----|---------|-------------|
| `type` | none | `OAuth2` or `OIDC`. |
| `scopes` (OAuth2) | `https://www.googleapis.com/auth/cloud-platform` | Optional; string or list of strings; space and comma-separated strings also supported. |
| `audience` (OIDC) | same value as `url` | Optional OIDC audience of the token. |

## Notes

- The workflow's service account must hold the permissions of the API it calls; see https://docs.cloud.google.com/workflows/docs/authentication.
- Workflows can invoke Cloud Run functions or Cloud Run services whose ingress is restricted to internal traffic; they are unreachable from the internet but reachable from Workflows.
- IAP-secured endpoints: https://docs.cloud.google.com/workflows/docs/invoke-iap-secured-endpoints.
- The OAuth2 example stops a Compute Engine VM (`instances/.../stop`); run it only against a disposable instance.
- For Google Cloud targets, use `auth` (`OAuth2` / `OIDC`) rather than a token in `url` or `headers`. Keys and passwords for external APIs can be stored securely with the Secret Manager connector (https://docs.cloud.google.com/workflows/docs/use-secret-manager) instead of being written in the definition; keep them out of logged payloads.
- Source: https://docs.cloud.google.com/workflows/docs/overview (Secret Manager connector for external API credentials; retrieved 2026-11-18; CC BY 4.0)
- The source also shows JSON forms of both definitions (omitted).
- Source: https://docs.cloud.google.com/workflows/docs/authenticate-from-workflow (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [http-requests.md](./http-requests.md)
- [connectors.md](./connectors.md)
