---
source: https://docs.cloud.google.com/docs/authentication/tokens
---

# Authentication tokens overview

Explains how tokens carry user and workload identity in Google Cloud, and which authorization servers issue them. Intended for people implementing authentication without the Cloud Client Libraries; when using client libraries, the console, or the gcloud CLI, token selection, acquisition, and refresh are handled automatically.

## Signature / Usage

### User authentication

Humans use a client (web app, desktop app, gcloud CLI, `curl`) that acts on their behalf. Identity is passed to the API as a token in each request. A user authentication token encodes the identity of the user, the identity of the client, and assurance that the client is allowed to act for the user. The client cannot issue tokens itself; it works with an authorization server to (1) authenticate the user, (2) authenticate the client, (3) authorize the client to act on the user's behalf, (4) issue a token.

A Google Account user is a `user` principal:

```
user:alex@example.com
```

A user authenticating through Workforce Identity Federation is a workforce identity pool principal:

```
principal://iam.googleapis.com/locations/global/workforcePools/POOL_ID/subject/raha@altostrat.com
```

### Workload authentication

Unattended clients acting on their own behalf are *workloads* (for example a scheduled job reading BigQuery or Cloud Storage). Authenticating the user and authorizing the client are combined into one step, so the token encodes only the client identity. Steps: authenticate the client, authorize the client, issue a token.

A service account principal:

```
serviceAccount:my-service-account@my-project.iam.gserviceaccount.com
```

A workload identity pool principal (Workload Identity Federation):

```
principal://iam.googleapis.com/projects/PROJECT_NAME/locations/global/workloadIdentityPools/POOL_ID/subject/SUBJECT_ATTRIBUTE_VALUE
```

### Authorization servers

Google Cloud shares facilities (Sign in with Google, OpenID Connect, OAuth 2.0 from Google Identity) with other Google services; Workload Identity Federation and Workforce Identity Federation are Google Cloud-specific. Hence two authorization servers:

| Authorization server | Authentication type | Authentication APIs | Principals |
|---|---|---|---|
| Google authorization server | User authentication, workload authentication | Google OAuth 2.0 API, SAML | User (managed user), user (consumer account), service account |
| Google Cloud IAM authorization server | User authentication, workload authentication | Security Token Service (STS) API, IAM Service Account Credentials API, metadata servers | Workforce identity pool principal, workload identity pool principal, service account |

## Notes

- The authorization servers are global and reachable from any region, but not every region deploys both: the Google authorization server is available in select regions; the Google Cloud IAM authorization server is available in all regions. To optimize reliability, use the Google Cloud IAM authorization server whenever possible.
- Source: https://docs.cloud.google.com/docs/authentication/tokens (retrieved 2026-11-14; text CC BY 4.0, code samples Apache 2.0)

## Related

- [token-types-access.md](./token-types-access.md)
- [token-types-granting-and-identity.md](./token-types-granting-and-identity.md)
- [id-tokens.md](./id-tokens.md)
