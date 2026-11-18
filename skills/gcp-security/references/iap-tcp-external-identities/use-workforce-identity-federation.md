---
source: https://docs.cloud.google.com/iap/docs/use-workforce-identity-federation
---

# Configure IAP with Workforce Identity Federation

Configure IAP to authenticate and authorize a workforce (employees, partners, contractors) through an external IdP using Workforce Identity Federation and IAM. It works on all existing resources and load balancers IAP supports. You can redirect users to the IdP (for example Okta), set a sign-in session from 15 minutes to 12 hours, allow only specific users or sets, and add context such as time of day.

## Signature / Usage

### Overview of tasks

1. Set up a workforce pool and provider (Microsoft Entra ID, Okta, or another OIDC or SAML 2.0 provider). To map an email from the IdP add the attribute mapping `google.email=assertion.email` on the provider.
2. Create an OAuth client ID and secret for the Workforce Identity Federation infrastructure (different from the custom OAuth client used with Google identities), under a project in the same organization as the pool (it need not be the IAP resource's project). Create the client with a placeholder redirect URI, `describe` it to get `clientID`, then `update` `allowed-redirect-uris` to `https://iap.googleapis.com/v1/oauth/clientIds/$CLIENT_ID:handleRedirect`, and `describe` the credential to get `clientSecret`.
3. Enable IAP on the resource (console toggle on the **Applications** tab, or the service-specific gcloud procedures for Cloud Run, App Engine, Compute Engine), then update the IAP settings.

### Update IAP settings with gcloud

`CLIENT_ID` and `CLIENT_SECRET` are the OAuth values created above.

```bash
CLIENT_ID=clientId
CLIENT_SECRET=clientSecret
WORKFORCE_POOL_NAME=locations/global/workforcePools/test-pool
cat <<EOF > iap_settings.yaml
access_settings:
  identity_sources: ["WORKFORCE_IDENTITY_FEDERATION"]
  workforce_identity_settings:
    workforce_pools: ["$WORKFORCE_POOL_NAME"]
    oauth2:
      client_id: "$CLIENT_ID"
      client_secret: "$CLIENT_SECRET"
EOF
```

```bash
gcloud iap settings set iap_settings.yaml --project=PROJECT --resource-type=RESOURCE_TYPE --service=SERVICE
```

### Update IAP settings with the API

Get the resource name (copy `RESOURCE_NAME` from the output):

```bash
gcloud iap settings get \
    --project=PROJECT \
    --resource-type=RESOURCE_TYPE \
    --service=SERVICE
```

Adapted (not in the official docs): removed the trailing comma after `"client_secret"` so the JSON is valid.

```bash
CLIENT_ID=clientId
CLIENT_SECRET=clientSecret
WORKFORCE_POOL_NAME=locations/global/workforcePools/test-pool
cat <<EOF > iap_settings.json
{
   "access_settings": {
     "identity_sources": ["WORKFORCE_IDENTITY_FEDERATION"],
     "workforce_identity_settings": {
       "workforce_pools": ["$WORKFORCE_POOL_NAME"],
       "oauth2": {
         "client_id": "$CLIENT_ID",
         "client_secret": "$CLIENT_SECRET"
       }
    }
  }
}
EOF
```

```bash
curl -X PATCH \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Accept: application/json" \
 -H "Content-Type: application/json" \
 -d @iap_settings.json \
"https://iap.googleapis.com/v1/RESOURCE_NAME:iapSettings?updateMask=iapSettings.accessSettings.identitySources,iapSettings.accessSettings.workforceIdentitySettings.workforcePools,iapSettings.accessSettings.workforceIdentitySettings.oauth2.clientId,iapSettings.accessSettings.workforceIdentitySettings.oauth2.clientSecret"
```

### Grant access to IAP-secured resources

End users need the IAP-Secured Web App User role (`roles/iap.httpsResourceAccessor`) on the resource, granted to a principal or principal set (a group, an attribute, or an entire pool). Use a principal identifier, not an email address.

```bash
gcloud iap web add-iam-policy-binding \
    --member=PRINCIPAL_IDENTIFIER \
    --role='roles/iap.httpsResourceAccessor' \
    --project=PROJECT_ID \
    --resource-type=RESOURCE_TYPE \
    --service=SERVICE \
    --condition=CONDITION
```

Example condition with an access level:

```text
expression="accessPolicies/12345678/accessLevels/iap_test_access_level" in request.auth.access_levels,title=iap-test-access-level,description=only access on weekdays
```

## Options / Props

### Placeholder values

| Name | Description |
|------|-------------|
| `RESOURCE_TYPE` (`iap settings set`) | `cloud-run` (Preview; also pass `--region`), `app-engine`, `iap_web`, `compute`, `organization`, or `folder` |
| `RESOURCE_TYPE` (`iap settings get`, API path) | `appengine`, `iap_web`, `compute`, `organization`, `folder`, or `cloud_run-$REGION` (Preview) |
| `RESOURCE_TYPE` (`iap web add-iam-policy-binding`) | `app-engine` or `backend-services` |
| `SERVICE` | Service name; optional for `app-engine` and `compute` |
| `CONDITION` | Optional IAM condition |

### Limitations

| Limitation |
|------------|
| One workforce pool per IAP-enabled application, and the pool can contain only one provider |
| The workforce pool, OAuth client ID and secret, and the IAP-enabled applications must all be in the same organization |
| Access levels for device-related information are not supported (IP address, time and date conditions still work) |
| Only these IAP settings are supported: CorsSettings, CsmSettings, AccessDeniedPageSettings.accessDeniedPageUri, CookieDomain |
| Programmatic access is supported only for Google service accounts (service account JWT authentication) |
| Unrestricted access to IAP-secured resources is not supported |

### Claims passed in the IAP signed header JWT

| Claim | Description |
|-------|-------------|
| `sub` | Unique user identifier, prefixed `sts.google.com:` |
| `email` | Only when a `google.email=assertion.email` mapping exists on the provider |
| `workforce_identity.workforce_pool_name` | `locations/global/workforcePools/WORKFORCE_POOL_ID` |
| `workforce_identity.iam_principal` | `principal://iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/subject/SUBJECT_ATTRIBUTE_VALUE` |

## Notes

- The OAuth client secret in these examples is passed through shell variables and written to a file; keep `iap_settings.*` out of version control and do not print it in shared terminals or CI logs.
- The `getIamPolicy`/`setIamPolicy` API method for granting access is not recommended because it touches the entire IAM policy of a resource and an error could remove the policy; the source's JSON example (which contains a comment and an unquoted shell string) is omitted. Use the gcloud command.
- Enable IAP for Cloud Run, App Engine and Compute Engine by following the service-specific pages; the source also shows Console steps and PATCH calls (App Engine `https://appengine.googleapis.com/v1/apps/PROJECT_ID?updateMask=iap.enabled`; Compute Engine backend service URL).
- The session duration is set on the pool provider; see "Manage IAP with Workforce Identity Federation sessions". Optional context-aware access levels are described in the Chrome Enterprise Premium access levels documentation.
- Corrected from the official docs: `"client_secret": "$CLIENT_SECRET",` in the `iap_settings.json` heredoc had a trailing comma before the closing brace (invalid JSON); it was removed.
- Workforce Identity Federation IAM setup is in the `gcp-foundation` skill.
- Source: https://docs.cloud.google.com/iap/docs/use-workforce-identity-federation (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [external-identities.md](./external-identities.md)
- [faq.md](./faq.md)
