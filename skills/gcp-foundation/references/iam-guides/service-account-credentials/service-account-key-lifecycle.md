---
source: https://docs.cloud.google.com/iam/docs/keys-create-delete
---

# Service Account Key Lifecycle (Create, List, Get, Disable, Enable, Delete, Upload)

Manage user-managed service account keys. Keys are a security risk; prefer a more secure authentication method whenever possible (for example Workload Identity Federation).

## Signature / Usage

Create a JSON key (a service account can have up to 10 keys):

```bash
gcloud iam service-accounts keys create KEY_FILE \
    --iam-account=SA_NAME@PROJECT_ID.iam.gserviceaccount.com
```

```text
created key [e44da1202f82f8f4bdd9d92bc412d1d8a837fa83] of type [json] as
[/usr/home/username/KEY_FILE] for
[SA_NAME@PROJECT_ID.iam.gserviceaccount.com]
```

Downloaded key file format:

```json
{
  "type": "service_account",
  "project_id": "PROJECT_ID",
  "private_key_id": "KEY_ID",
  "private_key": "---BEGIN PRIVATE KEY---\nPRIVATE_KEY\n---END PRIVATE KEY---\n",
  "client_email": "SERVICE_ACCOUNT_EMAIL",
  "client_id": "CLIENT_ID",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/SERVICE_ACCOUNT_EMAIL"
}
```

REST create:

```text
POST https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts/SA_NAME@PROJECT_ID.iam.gserviceaccount.com/keys
```

```json
{
  "keyAlgorithm": "KEY_ALGORITHM"
}
```

Response (`privateKeyData` is returned only once):

```json
{
  "name": "projects/PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT_EMAIL/keys/KEY_ID",
  "privateKeyType": "TYPE_GOOGLE_CREDENTIALS_FILE",
  "privateKeyData": "ENCODED_PRIVATE_KEY",
  "validAfterTime": "DATE",
  "validBeforeTime": "DATE",
  "keyAlgorithm": "KEY_ALG_RSA_2048"
}
```

List keys, fetch one key's metadata, and get a public key:

```bash
gcloud iam service-accounts keys list \
    --iam-account=SA_NAME@PROJECT_ID.iam.gserviceaccount.com

gcloud iam service-accounts keys list --iam-account=SA_NAME \
    --filter="name~KEY_ID" --format=json

gcloud beta iam service-accounts keys get-public-key KEY_ID \
    --iam-account=SA_NAME@PROJECT_ID.iam.gserviceaccount.com \
    --output-file=FILENAME
```

```text
GET https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts/SA_NAME@PROJECT_ID.iam.gserviceaccount.com/keys?keyTypes=KEY_TYPES
GET https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts/SA_NAME@PROJECT_ID.iam.gserviceaccount.com/keys/KEY_ID?publicKeyType=KEY_TYPE
```

Disable, enable, delete (disable first, delete when you are sure it is unused):

```bash
gcloud iam service-accounts keys disable KEY_ID \
    --iam-account=SA_NAME@PROJECT_ID.iam.gserviceaccount.com \
    --project=PROJECT_ID

gcloud iam service-accounts keys enable KEY_ID \
    --iam-account=SA_NAME@PROJECT_ID.iam.gserviceaccount.com \
    --project=PROJECT_ID

gcloud iam service-accounts keys delete KEY_ID \
    --iam-account=SA_NAME@PROJECT_ID.iam.gserviceaccount.com
```

```text
POST https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts/SA_NAME@PROJECT_ID.iam.gserviceaccount.com/keys/KEY_ID:disable
POST https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts/SA_NAME@PROJECT_ID.iam.gserviceaccount.com/keys/KEY_ID:enable
DELETE https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts/SA_NAME@PROJECT_ID.iam.gserviceaccount.com/keys/KEY_ID
```

Upload your own public key (RSA, wrapped in a base64-encoded X.509 v3 certificate). Generate a key pair and self-signed certificate valid 365 days:

```bash
openssl req -x509 -nodes -newkey rsa:2048 -days 365 \
    -keyout /path/to/private_key.pem \
    -out /path/to/public_key.pem \
    -subj "/CN=unused"
```

```bash
gcloud iam service-accounts keys upload KEY_FILE \
    --iam-account=SA_NAME@PROJECT_ID.iam.gserviceaccount.com
```

```text
POST https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts/SA_NAME@PROJECT_ID.iam.gserviceaccount.com/keys:upload
```

```json
{
  "publicKeyData": "PUBLIC_KEY_DATA"
}
```

Upload response metadata includes `"keyAlgorithm": "KEY_ALG_RSA_2048"`, `"keyOrigin": "USER_PROVIDED"`, `"keyType": "USER_MANAGED"`.

### Exempt a project from the key-creation constraint (tag-based)

Tag key `disableServiceAccountKeyCreation` with values `enforced` (attach to organization) and `not_enforced` (attach to exempt projects/folders). The organization policy rule for the exempt case uses:

```text
"resource.matchTag('ORGANIZATION_ID/disableServiceAccountKeyCreation', 'not_enforced')"
```

Configure the `iam.disableServiceAccountKeyCreation` constraint as not enforced where that condition matches and enforced on all other resources. The same pattern applies to upload with `iam.disableServiceAccountKeyUpload` and a `disableServiceAccountKeyUpload` tag:

```text
"resource.matchTag('ORGANIZATION_ID/disableServiceAccountKeyUpload', 'not_enforced')"
```

## Options / Props

| Item | Detail |
|---|---|
| Role | Service Account Key Admin (`roles/iam.serviceAccountKeyAdmin`) on the project or service account |
| Exempting from constraints | Organization Policy Administrator (`roles/orgpolicy.policyAdmin`), Organization Viewer (`roles/resourcemanager.organizationViewer`), Tag Administrator (`roles/resourcemanager.tagAdmin`) on the organization |
| `keyAlgorithm` | Optional; default (subject to change) is 2048-bit RSA |
| `keyTypes` (list filter) | Filter by key type (user-managed vs system-managed) |
| `publicKeyType` (get) | Public key format; gcloud default is X.509 PEM, `--type=raw` for the raw key |
| Key formats | JSON (default) or P12 (only for backward compatibility) |

## Notes

- Do not store or paste real private key contents in chat, tickets, or source control; the private key is downloadable only once.
- If your organization was created on or after May 3, 2024, `iam.disableServiceAccountKeyCreation` (and upload) is enforced by default.
- Keys never expire by default; the `iam.serviceAccountKeyExpiryHours` constraint limits validity. For uploads under that constraint the certificate `-days` value must not exceed the limit.
- After creating a key you may need to wait 60+ seconds before using it; retry with exponential backoff.
- Deleting or disabling a key does not revoke short-lived credentials already issued from it; to revoke, disable or delete the service account (which immediately cuts off all workloads using it).
- Keys listed that you did not create are Google-managed keys used by the Service Account Credentials API.
- Uploaded X.509 certificates are publicly visible: use a generic subject and no optional attributes.
- Starting August 27, 2026, new access to the Gemini API from service accounts is temporarily restricted (existing ones keep working); use authentication-enabled API keys for new integrations (source caution on the key creation page). This skill is separate from `google-gemini-api`.
- Basic roles contain key-management permissions; avoid them in production.
- Source: https://docs.cloud.google.com/iam/docs/keys-create-delete
- Source: https://docs.cloud.google.com/iam/docs/keys-list-get
- Source: https://docs.cloud.google.com/iam/docs/keys-disable-enable
- Source: https://docs.cloud.google.com/iam/docs/keys-upload
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [service-account-key-rotation-and-migration.md](./service-account-key-rotation-and-migration.md)
- gcp-client-libraries (Application Default Credentials in code)
