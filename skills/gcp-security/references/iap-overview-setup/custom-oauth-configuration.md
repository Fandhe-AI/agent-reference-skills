---
source: https://docs.cloud.google.com/iap/docs/custom-oauth-configuration
---

# Use custom OAuth clients with IAP

By default IAP uses Google-managed OAuth clients, which can only manage access for internal users within an organization. A custom OAuth client is required for external users, for projects that aren't in a Google Cloud organization, and for custom brand information in consent screens. Custom clients can be applied on IAP (at project, folder, organization or service level) or directly on the platform (legacy methods for App Engine, GKE and load balancer backend services).

## Signature / Usage

### Create the OAuth client manually (Method 1)

Configure the OAuth Branding page first (App name, User support email, Audience **Internal** or **External**, Contact information). In **APIs & Services > Credentials** create an **OAuth client ID** of type **Web application**, then add this Authorized redirect URI, replacing `YOUR_CLIENT_ID` with the new client ID:

```text
https://iap.googleapis.com/v1/oauth/clientIds/YOUR_CLIENT_ID:handleRedirect
```

### Create the OAuth client with IAP auto-generate credentials (Method 2)

On the IAP page, open **More options > Settings** for the resource, select **Custom OAuth**, and click **Auto Generate Credentials**. IAP creates the client and adds a redirect URI of this form:

```text
https://iap.googleapis.com/v1/oauth/clientIds/CLIENT_ID:handleRedirect
```

### Apply the custom OAuth client to IAP (gcloud)

Adapted (not in the official docs): in the source YAML `oauthSettings` is not indented under `accessSettings`, which is invalid for `gcloud iap settings set` (the help example nests it); the indentation is fixed.

```bash
cat << EOF > iap-oauth.yaml
accessSettings:
  oauthSettings:
    clientId: CLIENT_ID
    clientSecret: CLIENT_SECRET
EOF
```

Adapted (not in the official docs): `--project=PROJECT_ID` is added to the project-level command, as in the `gcloud iap settings set` help example (the source text says to use `--folder` or `--organization` "instead of the `--project` flag").

```bash
gcloud iap settings set iap-oauth.yaml --project=PROJECT_ID
```

For a specific service:

Adapted (not in the official docs): the stray space in `--resource-type= RESOURCE_TYPE` is removed.

```bash
gcloud iap settings set iap-oauth.yaml \
    --project=PROJECT_ID \
    --resource-type=RESOURCE_TYPE \
    --region=REGION \
    --service=SERVICE_NAME
```

### Apply the custom OAuth client to IAP (REST API)

```bash
cat << EOF > iap-oauth.json
{
"accessSettings": {
  "oauthSettings": {
    "clientId": "CLIENT_ID",
    "clientSecret": "CLIENT_SECRET"
  }
}
}
EOF
```

Adapted (not in the official docs): the source hard-codes a demo project and service, omits the `\` after the `Authorization` header, sends `Content-Type: application/yaml` with a JSON body, and uses the mask fields `oauthClientId` / `oauthClientSecret`; the Discovery `OAuthSettings` fields are `clientId` and `clientSecret`, and the mask follows the `updateIapSettings` description (`iapSettings.accessSettings...`).

```bash
curl -X PATCH \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
"https://iap.googleapis.com/v1/projects/PROJECT_ID/iap_web/forwarding_rule-REGION/services/FORWARDING_RULE_NAME:iapSettings?update_mask=iapSettings.accessSettings.oauthSettings.clientId,iapSettings.accessSettings.oauthSettings.clientSecret" \
-d @iap-oauth.json
```

### Legacy: App Engine (gcloud)

Follow "Creating OAuth clients for IAP" to configure the consent screen and create the client, then:

```bash
gcloud iap web enable \
    --oauth2-client-id=CLIENT_ID \
    --oauth2-client-secret=CLIENT_SECRET \
    --resource-type=app-engine
```

### Legacy: GKE (BackendConfig)

GKE 1.24 or later can use the Kubernetes Gateway API instead. Create a Secret wrapping the OAuth client:

```bash
kubectl create secret generic MY_SECRET --from-literal=client_id=CLIENT_ID \
  --from-literal=client_secret=CLIENT_SECRET
```

```text
secret "MY_SECRET" created
```

Adapted (not in the official docs): in the source YAML `iap:` is not indented under `spec:`, so the BackendConfig is invalid; the indentation is fixed.

```yaml
apiVersion: cloud.google.com/v1
kind: BackendConfig
metadata:
  name: CONFIG_DEFAULT
  namespace: my-namespace
spec:
  iap:
    enabled: true
    oauthclientCredentials:
      secretName: MY_SECRET
```

Enable IAP by associating Service ports with the BackendConfig, for example as the default for all ports:

```yaml
metadata:
  annotations:
      cloud.google.com/backend-config: '{"default": "CONFIG_DEFAULT"}'
```

### Legacy: load balancer backend service (gcloud)

For Compute Engine and Cloud Run. Run the global or regional command.

```bash
gcloud compute backend-services update BACKEND_SERVICE_NAME \
    --global \
    --iap=enabled,oauth2-client-id=CLIENT_ID,oauth2-client-secret=CLIENT_SECRET
```

```bash
gcloud compute backend-services update BACKEND_SERVICE_NAME \
    --region REGION_NAME \
    --iap=enabled,oauth2-client-id=CLIENT_ID,oauth2-client-secret=CLIENT_SECRET
```

## Options / Props

### Google-managed vs custom OAuth client

| | Google managed OAuth client | Custom OAuth client |
|---|---|---|
| Users | Internal only | Internal and External |
| Brand | Google Cloud brand | Customer owned brand |
| OAuth configuration | Google configured | Customer configured |
| OAuth credentials | Google managed | Customer managed |
| Application access | Browser flow only | Browser flow and programmatic access |

### `--resource-type` values for `gcloud iap settings set`

| Value |
|-------|
| `app-engine` |
| `backend-services` |
| `cloud-run` |
| `compute` |
| `folder` |
| `forwarding-rule` |
| `iap_web` |
| `organization` |

### Troubleshooting BackendConfig secrets

| Error | Fix |
|-------|-----|
| `BackendConfig default/config-default is not valid: error retrieving secret "foo": secrets "foo" not found.` | Create the Kubernetes Secret correctly |
| `BackendConfig default/config-default is not valid: secret "foo" missing client_secret data.` | Create the OAuth credentials correctly and reference the right `client_id` and `client_secret` keys |

## Notes

- `--resource-type` values for `gcloud iap settings set`: Use `--folder=FOLDER_ID` or `--organization=ORGANIZATION_ID` instead of `--project` to set the client at another hierarchy level; a client set at a level gives the same custom branding to all services running within it. `--region` is the Cloud Run region; `--service` is the service name.
- Google-managed OAuth clients cannot programmatically access IAP-protected applications; such applications can still be reached programmatically with a separate OAuth client configured through the `programmatic_clients` setting or a service account JWT. The Google-managed client does not create a new OAuth client and secret per application; it uses an internal Google-managed client.
- With custom OAuth clients you are responsible for creating and managing the credentials, including storing the client secret securely and sharing it with authorized clients. The OAuth consent screen must be configured; for custom branding to appear you must submit the app for Google verification.
- Important: the source recommends the legacy platform method for App Engine and backend service users; with the IAP-level method described first, your services won't be visible in the IAP UI.
- Secrets: `CLIENT_SECRET` on the command line, in `iap-oauth.yaml` / `iap-oauth.json` and in `kubectl create secret --from-literal` lands in shell history and files. Keep the files in a protected location and delete them after use; do not print or commit them. **Download credentials** saves a JSON file with the client ID and secret: secure or delete it.
- Test access: in the IAP page **Applications** tab open an application URL; the first access after configuring the consent screen shows that consent screen.
- Corrected from the official docs: the YAML `accessSettings:` followed by `oauthSettings:` at the same indentation (so `accessSettings` is empty); the project-level `gcloud iap settings set iap-oauth.yaml` without `--project` (in gcloud 593.0.0 without a default project it fails with `Could not parse IAP settings resource`); `--resource-type= RESOURCE_TYPE`; the REST `curl` with `-H "Authorization: Bearer $(gcloud auth print-access-token)"` lacking the trailing `\`, `-H "Content-Type: application/yaml"` for a JSON file, the demo IDs `projects/cb-managed-ingress-demo/iap_web/forwarding_rule-us-central1/services/psc-fr`, and the mask `oauthSettings.oauthClientId,...oauthSettings.oauthClientSecret`; and the BackendConfig with `iap:` not indented under `spec:`. Each was fixed as stated before its block. The legacy App Engine and backend-service REST (`curl` with `settings.json` containing `oauth2ClientId` / `oauth2ClientSecret`), Console steps and Terraform samples from the source are omitted.
- Source: https://docs.cloud.google.com/iap/docs/custom-oauth-configuration (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [managed-oauth-client.md](./managed-oauth-client.md)
- [concepts-overview.md](./concepts-overview.md)
- [enabling-app-engine.md](./enabling-app-engine.md)
- [enabling-kubernetes-howto.md](./enabling-kubernetes-howto.md)
