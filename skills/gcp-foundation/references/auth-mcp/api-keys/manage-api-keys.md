---
source: https://docs.cloud.google.com/docs/authentication/api-keys
---

# Manage API keys

How to create, copy, rotate, delete/undelete, inspect, and look up API keys (Google Cloud API Keys API), including the difference between standard API keys and authorization keys. Restrictions are covered in a sibling page.

## Signature / Usage

### Types of API keys

Both types associate a request with a project for billing and quota. A **standard API key** doesn't authenticate a principal (so IAM cannot check authorization) and can be used with any API that accepts API keys unless API restrictions apply; it cannot be used with services that don't accept API keys, including in express mode. An **authorization key** is bound to a service account: requests are processed as if made with that service account, like a long-lived access token. Supported APIs include AI Platform (`aiplatform.googleapis.com`) and the Gemini API (`generativelanguage.googleapis.com`).

Authorization key caveats:

- Requests authenticated by authorization keys aren't recorded in service account usage metrics.
- Binding keys to a service account is blocked by a default organization policy constraint (see "Enable authorization keys").
- For APIs that create or manage Google Cloud resources, don't use authorization keys in production; use them only to accelerate initial exploration.

Key components: **string** (for example `AIzaSyDaGmWKa4JsXZ-HjGw7ISLn_3namBGewQe`; used to access APIs; there is no JSON file), **ID** (used by administrative tools; found in the console edit-page URL or by listing keys with gcloud; can't be used to access APIs), **display name** (optional), **bound service account** (authorization keys only).

### Required roles

Create API keys: API Keys Admin (`roles/serviceusage.apiKeysAdmin`) and Service Usage Viewer (`roles/serviceusage.serviceUsageViewer`). Create authorization keys: the same plus Service Account User (`roles/iam.serviceAccountUser`) and Service Account API Key Binding Admin (`roles/iam.serviceAccountApiKeyBindingAdmin`). Console use needs no authentication setup; for gcloud use Cloud Shell; for client libraries and REST, set up ADC / gcloud credentials.

### Enable authorization keys

Before creating an authorization key, either update the `constraints/iam.managed.disableServiceAccountApiKeyCreation` organization policy constraint to allow specific services (users must then add a matching API restriction), or disable the constraint. Changing it requires an organization resource (projects without an organization aren't supported). Authorization keys restricted solely to the Gemini API (`generativelanguage.googleapis.com`) need no change since that service is allowed by default.

Console: Organization policies page, filter `Block service`, select **Block service account API key bindings**, **Manage policy**, **Override parent's policy**, **Add a rule**; set **Enforcement** to **Off** to disable, or **On** with **User-defined** values to allowlist a service; **Set policy**.

gcloud, allow a service: create `spec.yaml` (`SCOPE` = `organizations`, `folders`, or `projects`; `SCOPE_ID` its ID; `SERVICE_NAME` e.g. `compute.googleapis.com`):

```
name: SCOPE/SCOPE_ID/policies/iam.managed.disableServiceAccountApiKeyCreation
spec:
  rules:
  - enforce: true
    parameters:
      allowedServices:
      - SERVICE_NAME
```

```
gcloud org-policies set-policy spec.yaml \
    --update-mask spec
```

gcloud, disable the constraint: use this `spec.yaml`, then the same `set-policy` command:

```
name: SCOPE/SCOPE_ID/policies/iam.managed.disableServiceAccountApiKeyCreation
spec:
  rules:
  - enforce: false
```

### Create an API key

Console: **Credentials** page, **Create credentials** > **API key**, add at least one API key restriction, optionally select **Authenticate API calls through a service account** and choose the service account (authorization key), **Create**. The dialog shows the key string.

gcloud (`SERVICE_1`... are service names such as `bigquery.googleapis.com`, found on the API dashboard):

```
gcloud services api-keys create \
    --display-name=DISPLAY_NAME \
    --api-target=service=SERVICE_1 \
    --api-target=service=SERVICE_2
```

Authorization key for services such as Vertex AI and the Gemini API (use `gcloud beta` with `--service-account`):

```
gcloud beta services api-keys create \
    --display-name=DISPLAY_NAME \
    --api-target=service=SERVICE_1 \
    --api-target=service=SERVICE_2 \
    --service-account=SERVICE_ACCOUNT_EMAIL_ADDRESS
```

REST, `keys.create` returns a long-running operation you must poll (`DISPLAY_NAME`, `PROJECT_ID`, `SERVICE_1`...):

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
          "displayName" : "DISPLAY_NAME",
          "restrictions" : {
            "apiTargets": [
              {
                "service": "SERVICE_1"
              },
              {
                "service" : "SERVICE_2"
              }
            ]
          }
        }' \
     "https://apikeys.googleapis.com/v2/projects/PROJECT_ID/locations/global/keys"
```

Authorization key via REST (adds `serviceAccountEmail`):

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
          "displayName" : "DISPLAY_NAME",
          "restrictions" : {
            "apiTargets": [
              {
                "service": "SERVICE_1"
              },
              {
                "service" : "SERVICE_2"
              }
            ]
          },
          "serviceAccountEmail" : "SERVICE_ACCOUNT_EMAIL_ADDRESS"
        }' \
     "https://apikeys.googleapis.com/v2/projects/PROJECT_ID/locations/global/keys"
```

Copy your key string and keep it secure; use restrictions to limit how it can be used.

### Get project information from a key string

```
gcloud services api-keys lookup KEY_STRING
```

REST (`lookupKey`):

```
curl -X GET \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json; charset=utf-8" \
"https://apikeys.googleapis.com/v2/keys:lookupKey?keyString=KEY_STRING"
```

### Create a copy of an API key

Creates a new key (unique string and ID) with the existing key's restrictions. Console only: **Credentials** > the key > **Create a copy**, name it, confirm restrictions, **Create**. Other methods: create a key and apply the same restrictions.

### Rotate an API key

Create a new key with the same restrictions, update applications, then delete the old key. Console only: key details > **Rotate key**, name it, **Create**, copy the new key string and update applications, then in the **Previous key** section click **Delete the previous key**. A prematurely deleted key can be undeleted.

### Undelete an API key

A deleted key can be restored within 30 days. Console: **Credentials** > **Restore deleted credentials** > **Restore** (may take a few minutes to propagate). gcloud: get the ID of the deleted key, then undelete:

```bash
gcloud services api-keys list --show-deleted
```

```bash
gcloud services api-keys undelete KEY_ID
```

REST: list with `showDeleted=true` (ID is the `uid` field), then undelete (long-running operation):

```
curl -X GET \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
"https://apikeys.googleapis.com/v2/projects/PROJECT_ID/locations/global/keys?showDeleted=true"
```

```
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json; charset=utf-8" \
"https://apikeys.googleapis.com/v2/projects/PROJECT_ID/locations/global/keys/KEY_ID:undelete"
```

### Determine the API key type

In the console, a displayed service account identifier means an authorization key; otherwise it is a standard key. With gcloud:

```bash
gcloud services api-keys describe KEY_ID
```

### Poll long-running operations

API Keys API methods return an operation object; poll it with `operations.get` (`OPERATION_NAME` e.g. `operations/akmf.p7-358517206116-cd10a88a-7740-4403-a8fd-979f3bd7fe1c`):

```
curl -X GET \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json; charset=utf-8" \
    "https://apikeys.googleapis.com/v2/OPERATION_NAME"
```

### Limits

Up to 300 API keys per project (a system limit that quota increase requests cannot change; use more projects if needed) and up to 1200 application restrictions per API key.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `displayName` | string | Optional descriptive name of the key. |
| `restrictions.apiTargets[].service` | string | Service names the key may call, such as `bigquery.googleapis.com`. |
| `serviceAccountEmail` | string | Binds the key to a service account (authorization key). |
| `--service-account` (`gcloud beta`) | flag | Same as above for gcloud. |
| `constraints/iam.managed.disableServiceAccountApiKeyCreation` | org policy | Controls whether and for which services authorization keys can be created. |

## Notes

- Authorization keys are bearer credentials equivalent to a long-lived service account token; prefer keyless auth (IAM, short-lived credentials) in production and treat key strings as secrets. See the best-practices page.
- The source page also provides C++, Java and Python client-library samples for create/restrict/undelete/lookup; they are not reproduced (the fetched Java/Python copies have identifiers replaced by documentation URLs). Per-language code belongs to the `gcp-client-libraries` skill.
- Source: https://docs.cloud.google.com/docs/authentication/api-keys (retrieved 2026-11-14; text CC BY 4.0, code samples Apache 2.0)

## Related

- [api-key-restrictions.md](./api-key-restrictions.md)
- [api-key-best-practices.md](./api-key-best-practices.md)
- [use-api-keys.md](./use-api-keys.md)
- `google-gemini-api` skill (Gemini API keys)
