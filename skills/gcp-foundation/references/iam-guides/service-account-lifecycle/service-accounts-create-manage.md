---
source: https://docs.cloud.google.com/iam/docs/service-accounts-create
---

# Create, list, edit, disable/enable, delete and undelete service accounts

Console, gcloud and REST procedures for the full service account lifecycle (client library samples exist in C++, C#, Go, Java, Python on the official pages).

## Signature / Usage

### Create

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME \
  --description="DESCRIPTION" \
  --display-name="DISPLAY_NAME"
```

Optionally grant a project role to the new account:

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" \
  --role="ROLE_NAME"
```

Optionally let a user attach the service account to resources (Service Account User on the service account):

```bash
gcloud iam service-accounts add-iam-policy-binding \
  SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com \
  --member="user:USER_EMAIL" \
  --role="roles/iam.serviceAccountUser"
```

REST (`serviceAccounts.create`):

```text
POST https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts
```

```json
{
  "accountId": "SA_NAME",
  "serviceAccount": {
    "description": "SA_DESCRIPTION",
    "displayName": "SA_DISPLAY_NAME"
  }
}
```

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts"
```

Response:

```json
{
  "name": "projects/my-project/serviceAccounts/my-service-account@my-project.iam.gserviceaccount.com",
  "projectId": "my-project",
  "uniqueId": "123456789012345678901",
  "email": "my-service-account@my-project.iam.gserviceaccount.com",
  "displayName": "My service account",
  "etag": "BwUp3rVlzes=",
  "description": "A service account for running jobs in my project",
  "oauth2ClientId": "987654321098765432109"
}
```

Python client sample (create):

```python
from typing import Optional

from google.cloud import iam_admin_v1
from google.cloud.iam_admin_v1 import types


def create_service_account(
    project_id: str, account_id: str, display_name: Optional[str] = None
) -> types.ServiceAccount:
    iam_admin_client = iam_admin_v1.IAMClient()
    request = types.CreateServiceAccountRequest()

    request.account_id = account_id
    request.name = f"projects/{project_id}"

    service_account = types.ServiceAccount()
    service_account.display_name = display_name
    request.service_account = service_account

    account = iam_admin_client.create_service_account(request=request)

    print(f"Created a service account: {account.email}")
    return account
```

### List

```bash
gcloud iam service-accounts list --project=PROJECT_ID
```

```text
GET https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts
```

Output:

```text
DISPLAY NAME: SA_DISPLAY_NAME_1
EMAIL: SA_NAME_1@PROJECT_ID.iam.gserviceaccount.com
DISABLED: False
```

### Edit display name / description

Adapted (not in the official docs): the official page omits the trailing `\` after `--project=PROJECT_ID`; it is added here so the command runs as one line.

```bash
gcloud iam service-accounts update \
    SA_NAME@PROJECT_ID.iam.gserviceaccount.com \
    --project=PROJECT_ID \
    --description="UPDATED_SA_DESCRIPTION" \
    --display-name="UPDATED_DISPLAY_NAME"
```

```text
PATCH https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts/SA_ID
```

### Disable / enable

```bash
gcloud iam service-accounts disable SA_NAME@PROJECT_ID.iam.gserviceaccount.com
```

Output: `Disabled service account SA_NAME@PROJECT_ID.iam.gserviceaccount.com`

```bash
gcloud iam service-accounts enable SA_NAME@PROJECT_ID.iam.gserviceaccount.com
```

```text
POST https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts/SA_ID:disable
POST https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts/SA_ID:enable
```

### Delete

```bash
gcloud iam service-accounts delete \
    SA_NAME@PROJECT_ID.iam.gserviceaccount.com
```

```bash
curl -X DELETE \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts/SA_ID"
```

### Undelete

Deleted principals appear in allow policies with the numeric ID:

```json
{
  "version": 1,
  "etag": "BwUjMhCsNvY=",
  "bindings": [
    {
      "members": [
        "deleted:serviceAccount:my-service-account@project-id.iam.gserviceaccount.com?uid=123456789012345678901"
      ],
      "role": "roles/iam.serviceAccountUser"
    },
  ]
}
```

Logs Explorer query to find the numeric ID (`resourceName` after `serviceAccounts`):

```text
resource.type="service_account"
resource.labels.email_id="SERVICE_ACCOUNT_EMAIL"
"DeleteServiceAccount"
```

```bash
gcloud beta iam service-accounts undelete ACCOUNT_ID
```

```text
POST https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts/SA_NUMERIC_ID:undelete
```

## Options / Props

| Field | Rule |
|---|---|
| `SERVICE_ACCOUNT_NAME` / `accountId` | 6-30 characters, lowercase alphanumerics and dashes; cannot be changed after creation |
| `DISPLAY_NAME` / `displayName` | Friendly name; editable |
| `DESCRIPTION` / `description` | Optional; editable |
| `SA_ID` (REST) | Email address or unique numeric ID |

| Operation | Required role |
|---|---|
| Create | `roles/iam.serviceAccountCreator` (plus `roles/resourcemanager.projectIamAdmin` to grant access to the new account on the project) |
| View / list | `roles/iam.serviceAccountViewer` |
| Edit, disable, enable | `roles/iam.serviceAccountAdmin` |
| Delete | `roles/iam.serviceAccountDeleter` |
| Delete and undelete | `roles/iam.serviceAccountAdmin` |

## Notes

- Enable the IAM API first (`serviceusage.services.enable`, from `roles/owner` or `roles/serviceusage.serviceUsageAdmin`). Basic roles also contain these permissions; do not grant them in production.
- Email format: `SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com`. Each account gets a permanent 21-digit numeric ID.
- After creation, wait 60 seconds or more; reads are eventually consistent. Retry with exponential backoff on errors.
- Only user-managed service accounts are listed; service agents cannot be listed.
- Disabling stops access through the account (disabling the default App Engine / Compute Engine accounts cuts off instances); disabling an already-disabled account has no effect; disabled accounts can be re-enabled. Disable before deleting.
- Warning: deleting is destructive. Undelete is possible only within 30 days and only if no account with the same name exists (delete the new same-name account first). After 30 days IAM permanently removes the account, and support cannot recover it.
- A re-created same-name account is a separate identity and does not inherit roles; an undeleted account keeps its identity and roles. Role bindings of a deleted account are purged after at most 60 days. Deleted accounts do not count toward the quota. Change risk recommendations can warn when deleting important accounts.
- `gcloud beta iam service-accounts undelete` takes the numeric ID.
- Source: https://docs.cloud.google.com/iam/docs/service-accounts-create
- Source: https://docs.cloud.google.com/iam/docs/service-accounts-list-edit
- Source: https://docs.cloud.google.com/iam/docs/service-accounts-disable-enable
- Source: https://docs.cloud.google.com/iam/docs/service-accounts-delete-undelete
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [service-accounts-overview-types.md](../service-account-concepts/service-accounts-overview-types.md)
- gcp-cli covers gcloud generally; gcp-client-libraries covers ADC and client library code.
