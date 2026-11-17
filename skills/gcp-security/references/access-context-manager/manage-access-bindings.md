---
source: https://docs.cloud.google.com/access-context-manager/docs/manage-access-bindings
---

# Manage access bindings

Access bindings define how access levels and session controls apply to a user group or service account. This page covers listing, viewing, updating and deleting existing bindings. Session controls are in Preview (Pre-GA Offerings Terms apply; "as is", limited support).

## Signature / Usage

### List access bindings

```bash
gcloud access-context-manager cloud-bindings list \
  --organization ORGANIZATION_ID
```

Filter flag for specific resources (for service accounts a filter is required):

```sh
  --filter="FILTER"
```

REST (list all `USER_LOGIN` bindings, then with a filter):

```sh
curl -H "X-Goog-User-Project: PROJECT_ID" -X GET \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
"https://accesscontextmanager.googleapis.com/v1/organizations/ORGANIZATION_ID/gcpUserAccessBindings"
```

Adapted (not in the official docs): the filter is sent with `-G --data-urlencode` instead of `?filter=FILTER` in the URL, because filters such as `principal:service_account OR principal:service_account_project_number` contain spaces that curl rejects in a URL.

```sh
curl -G -H "X-Goog-User-Project: PROJECT_ID" \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
--data-urlencode "filter=FILTER" \
"https://accesscontextmanager.googleapis.com/v1/organizations/ORGANIZATION_ID/gcpUserAccessBindings"
```

### View an access binding

```bash
  gcloud access-context-manager cloud-bindings describe \
  --binding=BINDING_ID
```

```text
GET https://accesscontextmanager.googleapis.com/v1/BINDING_ID
```

```text
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://accesscontextmanager.googleapis.com/v1/BINDING_ID"
```

Sample response:

```text
{
  "name": "organizations/427391306986/gcpUserAccessBindings/aAQS-YRSviv2hC12vZFUN3AZzvwa6KV2hJ89iMytB_nHUcT1l",
  "groupKey": "045jfvxd0ybeul8",
  "accessLevels": [
    "accessPolicies/305009197125/accessLevels/device_lock"
  ],
  "dryRunAccessLevels": [
    "accessPolicies/305009197125/accessLevels/another"
  ]
}
```

### Update an access binding

Adapted (not in the official docs): the two bracketed optional session-flag lines that follow `--dry-run-level` in the source (no `\` continuations) are left out so the block is a runnable command; session flags are shown in the next block.

```bash
gcloud access-context-manager cloud-bindings update \
  --binding=ACCESS_BINDING \
  --binding-file=BINDING_FILE_PATH \
  --level=DEFAULT_ACCESS_LEVEL \
  --dry-run-level=DEFAULT_DRY_RUN_ACCESS_LEVEL
```

Default session controls for a Google Group binding (the guide sets `--session-length` and `--session-reauth-method` together; see the Notes for the gcloud defaults):

```bash
gcloud access-context-manager cloud-bindings update \
    --binding=my-binding-id --session-length=2h \
    --session-reauth-method=login
```

REST request body:

```json
{
  "accessLevels": [
    "DEFAULT_ACCESS_LEVEL"
  ],
  "scopedAccessSettings": [
    {
      "scope": {
        "clientScope": {
          "restrictedClientApplication": {
            "clientId": "CLIENT_ID"
          }
        }
      },
      "activeSettings": {
        "accessLevels": [
          "ACCESS_LEVEL_A"
        ],
        "sessionSettings": {
          "sessionLength": "SESSION_LENGTH",
          "sessionReauthMethod": "SESSION_REAUTH_METHOD",
          "sessionLengthEnabled": true
        }
      }
    },
    {
      "scope": {
        "clientScope": {
          "restrictedClientApplication": {
            "name": "CLIENT_NAME"
          }
        }
      },
      "activeSettings": {
        "accessLevels": [
          "ACCESS_LEVEL_C"
        ]
      }
    }
  ]
}
```

Adapted (not in the official docs): the source shows `PATCH ...` inside a `bash` fence; it is an HTTP request line, so it is tagged `text`.

```text
PATCH https://accesscontextmanager.googleapis.com/v1/ACCESS_BINDING?updateMask=FIELD_MASK
```

### Delete an access binding

```bash
   gcloud access-context-manager cloud-bindings delete \
       --binding ACCESS_BINDING
```

```text
DELETE https://accesscontextmanager.googleapis.com/v1/ACCESS_BINDING_NAME
```

```text
curl -X DELETE \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://accesscontextmanager.googleapis.com/v1/ACCESS_BINDING_NAME"
```

A successful delete returns a 2xx status and an empty response.

## Options / Props

### Placeholders

| Name | Description |
|------|-------------|
| `ORGANIZATION_ID` | Organization ID. If the `access-context-manager/organization` property is unset, use the ID of the organization used when creating the `GcpAccessAdmin` role |
| `PROJECT_ID` | Project ID, sent as `X-Goog-User-Project` |
| `FILTER` | User groups: `principal:group_key`. Service accounts: `principal:service_account OR principal:service_account_project_number` (the only acceptable filter for service accounts) |
| `BINDING_ID` | ID or fully qualified identifier of the access binding |
| `ACCESS_BINDING` | `organizations/ORG_ID/gcpUserAccessBindings/ACCESS_BINDING_NAME` |
| `ACCESS_BINDING_NAME` | Unique string returned in `name` when the binding was created |
| `FIELD_MASK` | Required comma-separated top-level keys to update: `accessLevels`, `dryRunAccessLevels`, `scopedAccessSettings` |
| `CLIENT_ID` / `CLIENT_NAME` | OAuth client ID or client name (either can be used when an application contains `sessionSettings`) |

### `cloud-bindings update` flags

| Flag | Description |
|------|-------------|
| `--binding-file` | YAML file with the binding scheme; supports only `scopedAccessSettings` |
| `--level` | Default access level `accessPolicies/POLICY_ID/accessLevels/ACCESS_LEVEL_NAME`; empty string (`--level=`) removes it |
| `--dry-run-level` | Default dry run access level applied to all applications not specified in the YAML; empty string removes it |
| `--session-length` | Session duration in hour format, such as `15h` or `2h` (REST `sessionLength`: a `google-duration` string in seconds, such as `1800s` for 30 minutes or `7200s` for two hours); `0` removes the session control |
| `--session-reauth-method` | `login`, `password` or `security-key` (REST: `LOGIN`, `PASSWORD`, `SECURITY_KEY`; see below). Defaults to `login` when only `--session-length` is set; cannot be used when `--session-length` is empty or `0` (gcloud 593.0.0 help) |

### Re-authentication methods

| Value | Behavior |
|-------|----------|
| `LOGIN` | Standard login, which can include MFA or other Workspace-defined factors |
| `PASSWORD` | Only a password, even if other factors are defined; with an external IdP, users are redirected to the IdP (implicitly re-authenticated if the IdP session is live) |
| `SECURITY_KEY` | Hardware security key |

### How `--level` and `--binding-file` combine

| Used | Result |
|------|--------|
| Only `--binding-file` | Only applications in the file have policies applied |
| Only `--level` | The access level applies to all applications |
| Both | `--level` applies to all applications; the YAML policies apply only to applications defined in the file |

## Notes

- Adapted from the official docs: the update command ends with `[  --session-length=DEFAULT_SESSION_LENGTH                ]` and `[  --session-reauth-method=DEFAULT_SESSION_REAUTH_METHOD  ]` on extra lines without `\` continuations; those lines are left out of the first update block, and the session example comes from the gcloud help.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/cloud-bindings/update (gcloud 593.0.0 help).
- With a bare binding ID (such as `--binding=my-binding-id` or `BINDING_ID`), gcloud also needs `--organization=ORGANIZATION_ID` or the `access_context_manager/organization` property; the fully qualified `organizations/ORG_ID/gcpUserAccessBindings/ACCESS_BINDING_NAME` form needs neither.
- Corrected from the official docs: the request line `PATCH https://accesscontextmanager.googleapis.com/v1/ACCESS_BINDING?updateMask=FIELD_MASK` is in a `bash` block, but it is not a shell command; send it with an HTTP client.
- Session controls feature is Preview ("Pre-GA Offerings Terms"; features are available "as is" and might have limited support).
- You cannot change the user group of a binding after creation; create a new binding instead. The console cannot update bindings with dry run access levels or session controls.
- Without a `fieldMask`, a PATCH updates nothing. When arguments are not provided, `update` makes no change. Session controls in the YAML override the default session settings for those applications.
- Updates can promote a dry run access level to a live one; try new levels in `dryRunAccessLevels` first, because a live level controls access to the Google Cloud console and Google Cloud APIs for the group.
- Deleting a binding removes its access levels and session controls for that group or service account; to restore them, create the binding again. Try it on a disposable binding first.
- The curl examples embed `gcloud auth print-access-token`; do not print or log the token in shared terminals or CI logs.
- Source inconsistency: the guide says `--session-length` and `--session-reauth-method` must be used together, while the gcloud 593.0.0 help says `--session-reauth-method` defaults to `login` when only `--session-length` is set and cannot be used when `--session-length` is empty or `0`.
- The gcloud 593.0.0 help shows `--session-reauth-method` values in lowercase (`login`, `password`, `security-key`, default `login`), while the REST API uses `LOGIN`, `PASSWORD`, `SECURITY_KEY`.
- The source also shows Console steps and PowerShell variants.
- Corrected from the official docs: the source describes the REST `SESSION_LENGTH` as "ISO 8601 duration format, such as `30m` for 30 minutes, or `2h` for two hours". The Access Context Manager v1 Discovery document types `SessionSettings.sessionLength` as `format: google-duration`, whose JSON form is seconds with an `s` suffix (`1800s`, `7200s`); `30m` / `2h` are the gcloud `--session-length` forms.
- Adapted from the official docs: the source appends `?filter=FILTER` to the URL. The service-account filters in the table contain spaces, which must be URL-encoded; `curl -G --data-urlencode "filter=..."` encodes the value and sends it as a query parameter of the same `GET` request.
- Source: https://docs.cloud.google.com/access-context-manager/docs/manage-access-bindings (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-access-policy.md](./create-access-policy.md)
- [overview.md](./overview.md)
