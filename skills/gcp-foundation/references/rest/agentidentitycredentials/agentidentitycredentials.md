---
source: https://agentidentitycredentials.googleapis.com/$discovery/rest?version=v1
---

# Agent Identity Credentials API REST API (agentidentitycredentials)

## Signature / Usage

Base URL: `https://agentidentitycredentials.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `agentidentitycredentials.projects.locations.authProviders.credentials.exchange`

- Versions: v1alpha
- `POST https://agentidentitycredentials.googleapis.com/v1alpha/{+authProvider}/credentials:exchange`
- Swaps an input credential for a target credential as per the rules and provider defined in the given auth provider.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudAgentidentitycredentialsV1alpha_ExchangeCredentialsRequest`; Response: `GoogleCloudAgentidentitycredentialsV1alpha_ExchangeCredentialsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `authProvider` | path | string | yes | Required. The resource name of the auth provider. Format: `projects/{project}/locations/{location}/authProviders/{auth_provider}` |

### `agentidentitycredentials.projects.locations.authProviders.credentials.finalize`

- Versions: v1, v1beta, v1alpha
- `POST https://agentidentitycredentials.googleapis.com/v1/{+authProvider}/credentials:finalize`
- Finalizes the credentials after a successful consent flow.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudAgentidentitycredentialsV1_FinalizeCredentialsRequest`; Response: `GoogleCloudAgentidentitycredentialsV1_FinalizeCredentialsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `authProvider` | path | string | yes | Required. The resource name of the auth provider. Format: `projects/{project}/locations/{location}/authProviders/{auth_provider}` |

### `agentidentitycredentials.projects.locations.authProviders.credentials.retrieve`

- Versions: v1, v1beta, v1alpha
- `POST https://agentidentitycredentials.googleapis.com/v1/{+authProvider}/credentials:retrieve`
- Retrieves authorization credentials for an auth provider, or indicates what action needs to be taken to obtain credentials. If the `token` field in the response is populated, credential retrieval was successful. If one of the fields in the `result` oneof is populated, further action is required to obtain credentials, such as redirecting the user for consent. View comments on `RetrieveCredentialsResponse` for more information.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudAgentidentitycredentialsV1_RetrieveCredentialsRequest`; Response: `GoogleCloudAgentidentitycredentialsV1_RetrieveCredentialsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `authProvider` | path | string | yes | Required. The resource name of the auth provider. Format: `projects/{project}/locations/{location}/authProviders/{auth_provider}` |

### Example request skeleton

Generated from the Discovery entry of `agentidentitycredentials.projects.locations.authProviders.credentials.exchange` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://agentidentitycredentials.googleapis.com/v1alpha/{+authProvider}/credentials:exchange"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta, v1alpha of `agentidentitycredentials` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/agentidentitycredentials/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://agentidentitycredentials.googleapis.com/$discovery/rest?version=v1, https://agentidentitycredentials.googleapis.com/$discovery/rest?version=v1beta, https://agentidentitycredentials.googleapis.com/$discovery/rest?version=v1alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
