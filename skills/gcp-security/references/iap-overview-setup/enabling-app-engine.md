---
source: https://docs.cloud.google.com/iap/docs/enabling-app-engine
---

# Enabling IAP for App Engine

Secure an App Engine app with Identity-Aware Proxy using the console, gcloud or the App Engine Admin API. The default Google-managed OAuth client requires the project to belong to a Google Cloud organization and only allows access to internal users.

## Signature / Usage

### Enable IAP (gcloud)

```bash
gcloud config set project PROJECT_ID
```

Adapted (not in the official docs): the source command ends with `--versions=version`, which is not a flag of `gcloud iap web enable` in gcloud 593.0.0 (the help lists `--oauth2-client-id`, `--oauth2-client-secret`, `--resource-type`, `--region` and `--service`), so it is removed.

```bash
gcloud iap web enable --resource-type=app-engine
```

### Add principals with the IAP-secured Web App User role (gcloud)

`PRINCIPAL_IDENTIFIER` can be a domain, group, serviceAccount or user, for example `user:myemail@example.com`.

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
       --member=PRINCIPAL_IDENTIFIER \
       --role=roles/iap.httpsResourceAccessor
```

### Enable IAP (API)

```bash
cat << EOF > settings.json
{
"iap":
  {
    "enabled":true
  }
}
EOF
```

```bash
curl -X PATCH \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d @settings.json \
"https://appengine.googleapis.com/v1/apps/PROJECT_ID?updateMask=iap"
```

### Test user authentication

Open an Incognito window in Chrome, access the app URL and sign in with a Google Account that was granted the IAP-secured Web App User role. Users without the role, or who fail to authenticate, cannot access the app.

## Options / Props

### Before you begin

| Requirement | Detail |
|-------------|--------|
| Project | Google Cloud project with billing enabled |
| Organization | The project must belong to an organization to use the default Google-managed OAuth client; the managed client only allows internal users |
| App Engine | An App Engine app already set up |

### Roles

| Role | ID | Effect |
|------|----|--------|
| IAP-secured Web App User | `roles/iap.httpsResourceAccessor` | Grants access to the IAP-protected app; not granted automatically, even to `Owner` or `Editor` |

## Notes

- Important: if the project doesn't belong to an organization, or you want to allow users outside the organization, you must use a custom OAuth configuration. Enabling IAP on a project without an organization or custom credentials causes requests to fail with `HTTP 502: Empty Google Account OAuth client ID(s)/secret(s)`.
- Only principals with `roles/iap.httpsResourceAccessor` on the project are given access. The console flow selects the resource on the Identity-Aware Proxy page, adds principals (Google Account, Google Group, service account, Google Workspace domain; add an account you can use) and turns IAP on; the source also shows these Console steps and `gcloud auth login`, omitted here.
- `gcloud projects add-iam-policy-binding` grants the role for every IAP-secured resource in the project; to grant it on a single resource use the IAP IAM policy commands (`gcloud iap web add-iam-policy-binding`) or the IAP API described in the access-management page.
- IAP can be enabled on one App Engine service in a project, so some services can be public and others require authentication, using different access levels across services. To make services publicly accessible, the source grants the IAP-secured Web App User role to `allAuthenticatedUsers`; this lets anyone signed in with a Google account or service account in, so use it only for services that are meant to be open.
- Corrected from the official docs: `--versions=version` was removed from `gcloud iap web enable --resource-type=app-engine --versions=version` because gcloud 593.0.0 rejects it (`unrecognized arguments: --versions=version`).
- Source: https://docs.cloud.google.com/iap/docs/enabling-app-engine (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [concepts-overview.md](./concepts-overview.md)
- [managing-access.md](./managing-access.md)
- [custom-oauth-configuration.md](./custom-oauth-configuration.md)
- [managed-oauth-client.md](./managed-oauth-client.md)
