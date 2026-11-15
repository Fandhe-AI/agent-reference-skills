---
source: https://oslogin.googleapis.com/$discovery/rest?version=v1
---

# Cloud OS Login API REST API (oslogin)

## Signature / Usage

Base URL: `https://oslogin.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `oslogin.projects.locations.signSshPublicKey`

- Versions: v1, v1beta, v1alpha
- `POST https://oslogin.googleapis.com/v1/{+parent}:signSshPublicKey`
- Signs an SSH public key for a user to authenticate to a virtual machine on Google Compute Engine.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SignSshPublicKeyRequest`; Response: `SignSshPublicKeyResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent for the signing request. Format: projects/{project}/locations/{location} |

### `oslogin.users.getLoginProfile`

- Versions: v1, v1beta, v1alpha
- `GET https://oslogin.googleapis.com/v1/{+name}/loginProfile`
- Retrieves the profile information used for logging in to a virtual machine on Google Compute Engine.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `LoginProfile`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The unique ID for the user in format `users/{user}`. |
| `projectId` | query | string | yes | Required. The project ID of the Google Cloud Platform project. |
| `systemId` | query | string | no | Optional. A system ID for filtering the results of the request. |

### `oslogin.users.importSshPublicKey`

- Versions: v1, v1beta, v1alpha
- `POST https://oslogin.googleapis.com/v1/{+parent}:importSshPublicKey`
- Adds an SSH public key and returns the profile information. Default POSIX account information is set when no username and UID exist as part of the login profile.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `SshPublicKey`; Response: `ImportSshPublicKeyResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The unique ID for the user in format `users/{user}`. |
| `projectId` | query | string | no | The project ID of the Google Cloud Platform project. |
| `regions` | query | repeated string | no | Optional. The regions to which to assert that the key was written. If unspecified, defaults to all regions. Regions are listed at https://cloud.google.com/about/locations#region. |

### `oslogin.users.projects.delete`

- Versions: v1, v1beta, v1alpha
- `DELETE https://oslogin.googleapis.com/v1/{+name}`
- Deletes a POSIX account.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A reference to the POSIX account to update. POSIX accounts are identified by the project ID they are associated with. A reference to the POSIX account is in format `users/{user}/projects/{project}`. |

### `oslogin.users.projects.locations.signSshPublicKey`

- Versions: v1beta, v1alpha
- `POST https://oslogin.googleapis.com/v1beta/{+parent}:signSshPublicKey`
- Signs an SSH public key for a user to authenticate to an instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `SignSshPublicKeyRequest`; Response: `SignSshPublicKeyResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent project and region for the signing request. |

### `oslogin.users.projects.provisionPosixAccount`

- Versions: v1, v1beta, v1alpha
- `POST https://oslogin.googleapis.com/v1/{+name}`
- Adds a POSIX account and returns the profile information. Default POSIX account information is set when no username and UID exist as part of the login profile.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `ProvisionPosixAccountRequest`; Response: `PosixAccount`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The unique ID for the user in format `users/{user}/projects/{project}`. |

### `oslogin.users.projects.zones.signSshPublicKey`

- Versions: v1beta, v1alpha
- `POST https://oslogin.googleapis.com/v1beta/{+parent}:signSshPublicKey`
- Signs an SSH public key for a user to authenticate to an instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `SignSshPublicKeyRequest`; Response: `SignSshPublicKeyResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent project and region for the signing request. |

### `oslogin.users.sshPublicKeys.create`

- Versions: v1, v1beta, v1alpha
- `POST https://oslogin.googleapis.com/v1/{+parent}/sshPublicKeys`
- Create an SSH public key
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `SshPublicKey`; Response: `SshPublicKey`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The unique ID for the user in format `users/{user}`. |

### `oslogin.users.sshPublicKeys.delete`

- Versions: v1, v1beta, v1alpha
- `DELETE https://oslogin.googleapis.com/v1/{+name}`
- Deletes an SSH public key.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The fingerprint of the public key to update. Public keys are identified by their SHA-256 fingerprint. The fingerprint of the public key is in format `users/{user}/sshPublicKeys/{fingerprint}`. |

### `oslogin.users.sshPublicKeys.get`

- Versions: v1, v1beta, v1alpha
- `GET https://oslogin.googleapis.com/v1/{+name}`
- Retrieves an SSH public key.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `SshPublicKey`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The fingerprint of the public key to retrieve. Public keys are identified by their SHA-256 fingerprint. The fingerprint of the public key is in format `users/{user}/sshPublicKeys/{fingerprint}`. |

### `oslogin.users.sshPublicKeys.patch`

- Versions: v1, v1beta, v1alpha
- `PATCH https://oslogin.googleapis.com/v1/{+name}`
- Updates an SSH public key and returns the profile information. This method supports patch semantics.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `SshPublicKey`; Response: `SshPublicKey`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The fingerprint of the public key to update. Public keys are identified by their SHA-256 fingerprint. The fingerprint of the public key is in format `users/{user}/sshPublicKeys/{fingerprint}`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Mask to control which fields get updated. Updates all if not present. |

### Example request skeleton

Generated from the Discovery entry of `oslogin.users.getLoginProfile` (not in the official docs); replace the `{...}` path variables and required query parameters (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://oslogin.googleapis.com/v1/{+name}/loginProfile?projectId={projectId}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta, v1alpha of `oslogin` (retrieved 2026-11-14). Resources on this page: projects, users.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/oslogin/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://oslogin.googleapis.com/$discovery/rest?version=v1, https://oslogin.googleapis.com/$discovery/rest?version=v1beta, https://oslogin.googleapis.com/$discovery/rest?version=v1alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
