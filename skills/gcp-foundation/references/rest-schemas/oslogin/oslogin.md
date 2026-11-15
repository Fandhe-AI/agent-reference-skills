---
source: https://oslogin.googleapis.com/$discovery/rest?version=v1
---

# Cloud OS Login API message schemas (oslogin)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/oslogin/`.

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `GoogleCloudOsloginControlplaneRegionalV1alphaSignSshPublicKeyRequest`

- A request message for signing an SSH public key.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `appEngineInstance` | string | The App Engine instance to sign the SSH public key for. Expected format: apps/{app}/services/{service}/versions/{version}/instances/{instance} |
| `cloudRunResource` | string | Optional. The Cloud Run resource to sign the SSH public key for. Expected formats: - `projects/{project}/locations/{location}/services/{service}` - `projects/{project}/locations/{location}/workerPools/{worker_pool}` - `projects/{project}/locations/{location}/jobs/{job}` - `projects/{project}/locations/{location}/instances/{instance}` |
| `computeInstance` | string | The Compute instance to sign the SSH public key for. Expected format: projects/{project}/zones/{zone}/instances/{numeric_instance_id} |
| `serviceAccount` | string | Optional. The service account for the instance. If the instance in question does not have a service account, this field should be left empty. If the wrong service account is provided, this operation will return a signed certificate that will not be accepted by the VM. |
| `sshPublicKey` | string | Required. The SSH public key to sign. |

### `GoogleCloudOsloginControlplaneRegionalV1alphaSignSshPublicKeyResponse`

- The response message for signing an SSH public key.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `signedSshPublicKey` | string | The signed SSH public key to use in the SSH handshake. |

### `GoogleCloudOsloginControlplaneRegionalV1betaSignSshPublicKeyRequest`

- A request message for signing an SSH public key.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `appEngineInstance` | string | The App Engine instance to sign the SSH public key for. Expected format: apps/{app}/services/{service}/versions/{version}/instances/{instance} |
| `cloudRunResource` | string | Optional. The Cloud Run resource to sign the SSH public key for. Expected formats: - `projects/{project}/locations/{location}/services/{service}` - `projects/{project}/locations/{location}/workerPools/{worker_pool}` - `projects/{project}/locations/{location}/jobs/{job}` - `projects/{project}/locations/{location}/instances/{instance}` |
| `computeInstance` | string | The Compute instance to sign the SSH public key for. Expected format: projects/{project}/zones/{zone}/instances/{numeric_instance_id} |
| `serviceAccount` | string | Optional. The service account for the instance. If the instance in question does not have a service account, this field should be left empty. If the wrong service account is provided, this operation will return a signed certificate that will not be accepted by the VM. |
| `sshPublicKey` | string | Required. The SSH public key to sign. |

### `GoogleCloudOsloginControlplaneRegionalV1betaSignSshPublicKeyResponse`

- The response message for signing an SSH public key.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `signedSshPublicKey` | string | The signed SSH public key to use in the SSH handshake. |

### `ImportSshPublicKeyResponse`

- A response message for importing an SSH public key.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `details` | string | Detailed information about import results. |
| `loginProfile` | LoginProfile | The login profile information for the user. |

### `LoginProfile`

- The user profile information used for logging in to a virtual machine on Google Compute Engine.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. A unique user ID. |
| `posixAccounts` | array<PosixAccount> | The list of POSIX accounts associated with the user. |
| `sshPublicKeys` | object | A map from SSH public key fingerprint to the associated key object. |

### `LoginProfile` (v1beta)

- The user profile information used for logging in to a virtual machine on Google Compute Engine.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. A unique user ID. |
| `posixAccounts` | array<PosixAccount> | The list of POSIX accounts associated with the user. |
| `securityKeys` | array<SecurityKey> | The registered security key credentials for a user. |
| `sshPublicKeys` | object | A map from SSH public key fingerprint to the associated key object. |

### `PosixAccount`

- The POSIX account information associated with a Google account.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accountId` | string | Output only. A POSIX account identifier. |
| `gecos` | string | The GECOS (user information) entry for this account. |
| `gid` | string (int64) | The default group ID. |
| `homeDirectory` | string | The path to the home directory for this account. |
| `name` | string | Output only. The canonical resource name. |
| `operatingSystemType` | string enum | The operating system type where this account applies. |
| `primary` | boolean | Only one POSIX account can be marked as primary. |
| `shell` | string | The path to the logic shell for this account. |
| `systemId` | string | System identifier for which account the username or uid applies to. By default, the empty value is used. |
| `uid` | string (int64) | The user ID. |
| `username` | string | The username of the POSIX account. |

### `ProvisionPosixAccountRequest`

- A request message for creating a POSIX account entry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `regions` | array<string> | Optional. The regions to wait for a POSIX account to be written to before returning a response. If unspecified, defaults to all regions. Regions are listed at https://cloud.google.com/about/locations#region. |

### `SecurityKey`

- The credential information for a Google registered security key.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `deviceNickname` | string | The security key nickname explicitly set by the user. |
| `privateKey` | string | Hardware-backed private key text in SSH format. |
| `publicKey` | string | Public key text in SSH format, defined by \[RFC4253\]("https://www.ietf.org/rfc/rfc4253.txt") section 6.6. |
| `universalTwoFactor` | UniversalTwoFactor | The U2F protocol type. |
| `webAuthn` | WebAuthn | The Web Authentication protocol type. |

### `SignSshPublicKeyRequest`

- A request message for signing an SSH public key.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appEngineInstance` | string | The App Engine instance to sign the SSH public key for. Expected format: apps/{app}/services/{service}/versions/{version}/instances/{instance} |
| `cloudRunResource` | string | Optional. The Cloud Run resource to sign the SSH public key for. Expected formats: - `projects/{project}/locations/{location}/services/{service}` - `projects/{project}/locations/{location}/workerPools/{worker_pool}` - `projects/{project}/locations/{location}/jobs/{job}` - `projects/{project}/locations/{location}/instances/{instance}` |
| `computeInstance` | string | The Compute instance to sign the SSH public key for. Expected format: projects/{project}/zones/{zone}/instances/{numeric_instance_id} |
| `serviceAccount` | string | Optional. The service account for the instance. If the instance in question does not have a service account, this field should be left empty. If the wrong service account is provided, this operation will return a signed certificate that will not be accepted by the VM. |
| `sshPublicKey` | string | Required. The SSH public key to sign. |

### `SignSshPublicKeyRequest` (v1beta)

-
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `sshPublicKey` | string | Required. The SSH public key to sign. |

### `SignSshPublicKeyResponse`

- The response message for signing an SSH public key.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `signedSshPublicKey` | string | The signed SSH public key to use in the SSH handshake. |

### `SshPublicKey`

- The SSH public key information associated with a Google account.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expirationTimeUsec` | string (int64) | An expiration time in microseconds since epoch. |
| `fingerprint` | string | Output only. The SHA-256 fingerprint of the SSH public key. |
| `key` | string | Required. Public key text in SSH format, defined by RFC4253 (https://www.ietf.org/rfc/rfc4253.txt) section 6.6. |
| `name` | string | Output only. The canonical resource name. |

### `UniversalTwoFactor`

- Security key information specific to the U2F protocol.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `appId` | string | Application ID for the U2F protocol. |

### `WebAuthn`

- Security key information specific to the Web Authentication protocol.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `rpId` | string | Relying party ID for Web Authentication. |

### Shape of `GoogleCloudOsloginControlplaneRegionalV1alphaSignSshPublicKeyRequest`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "appEngineInstance": "string",
  "cloudRunResource": "string",
  "computeInstance": "string",
  "serviceAccount": "string",
  "sshPublicKey": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta, v1alpha of `oslogin` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://oslogin.googleapis.com/$discovery/rest?version=v1, https://oslogin.googleapis.com/$discovery/rest?version=v1beta, https://oslogin.googleapis.com/$discovery/rest?version=v1alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
