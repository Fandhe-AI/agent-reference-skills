# WIF: Microsoft Azure

Use Azure as a Workload Identity Provider via Azure managed identity tokens (IMDS) or AKS projected service account tokens.

## Signature / Usage

Request a managed identity token from IMDS:

```bash
APPLICATION_ID_URI="api://<application-client-id>"

TOKEN=$(curl -sS -G -H "Metadata: true" \
  "http://169.254.169.254/metadata/identity/oauth2/token" \
  --data-urlencode "api-version=2018-02-01" \
  --data-urlencode "resource=${APPLICATION_ID_URI}" \
  | jq -r .access_token)
export TOKEN
```

Enable OIDC issuer on AKS and retrieve it:

```bash
az aks update --resource-group <rg> --name <cluster> --enable-oidc-issuer
az aks show --query oidcIssuerProfile.issuerUrl
```

## Options / Props

| Scenario | Issuer (`iss`) | Audience / Subject |
|----------|----------------|----------------------|
| Azure managed identity | `https://login.microsoftonline.com/<tenant-id>/v2.0` | Audience: Application ID URI (`api://<application-client-id>`); key claims: `appid`, `tid`, `oid` |
| AKS (projected token) | AKS OIDC endpoint, e.g. `https://eastus.oic.prod-aks.azure.com/<ids>/` | Audience: `https://api.openai.com/v1` (configurable); subject: `system:serviceaccount:<namespace>:<service-account-name>` |

## Notes

- For managed identity, create a Microsoft Entra application registration with an Application ID URI, attach the managed identity to the resource, then request a token from IMDS with the `resource` parameter.
- For AKS, create the Kubernetes ServiceAccount, enable the OIDC issuer, and configure a projected token volume with the target audience and expiration.
- Match on `appid` + `tid` for managed identity mappings, or `sub` for AKS mappings.
- Disable "Use uploaded JWKS" for both flows — OpenAI validates via the issuer's discovery metadata.
- Prefer managed identities over static credentials; restrict accepted audiences to only what's required.

## Related

- [Workload Identity Federation](./workload-identity-federation.md)
- [WIF: Kubernetes](./wif-kubernetes.md)
