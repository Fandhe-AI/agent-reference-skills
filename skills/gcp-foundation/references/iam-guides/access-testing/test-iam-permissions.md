---
source: https://docs.cloud.google.com/iam/docs/testing-permissions
---

# Testing Permissions with testIamPermissions

Most Google Cloud resources expose `testIamPermissions()`, which takes a resource identifier and a set of permissions and returns the subset the authenticated caller holds. It is intended for GUIs and apps deciding what to show (the Google Cloud console uses it internally).

## Signature / Usage

REST example (Resource Manager `projects.testIamPermissions`):

```
POST https://cloudresourcemanager.googleapis.com/v1/projects/PROJECT_ID:testIamPermissions
```

Request JSON body:

```
{
  "permissions":  [
    "resourcemanager.projects.get",
    "resourcemanager.projects.delete"
  ]
}
```

curl (Linux, macOS, or Cloud Shell), with the body saved as `request.json`:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://cloudresourcemanager.googleapis.com/v1/projects/PROJECT_ID:testIamPermissions"
```

Response when the caller can get but not delete the project:

```
{
  "permissions": [
    "resourcemanager.projects.get"
  ]
}
```

Python (Resource Manager client library):

Adapted (not in the official docs): the imports below are added so the snippet is self-contained.

```python
from typing import List

from google.cloud import resourcemanager_v3


def test_permissions(project_id: str) -> List[str]:
    """Tests IAM permissions of currently authenticated user to a project."""

    projects_client = resourcemanager_v3.ProjectsClient()
    if not project_id.startswith("projects/"):
        project_id = "projects/" + project_id

    owned_permissions = projects_client.test_iam_permissions(
        resource=project_id,
        permissions=["resourcemanager.projects.get", "resourcemanager.projects.delete"],
    ).permissions

    print("Currently authenticated user has following permissions:", owned_permissions)
    return owned_permissions
```

## Notes

- Adapted from the official docs: `from typing import List` and `from google.cloud import resourcemanager_v3` added to the Python snippet (install `google-cloud-resource-manager`).
- No IAM role is required to test permissions. Enabling the Resource Manager API needs `serviceusage.services.enable` (Owner or `roles/serviceusage.serviceUsageAdmin`).
- Samples exist in C++, C#, Java, and Python (see gcp-client-libraries for library setup); local development uses `gcloud auth application-default login` for Application Default Credentials. Federated (external IdP) users must first sign in to the gcloud CLI with their federated identity.
- The client libraries test the permissions of the identity that generates the credentials (for example a service account).
- For troubleshooting access to a resource, use Policy Troubleshooter instead. Other resources expose their own method, e.g. Cloud Storage bucket `testIamPermissions`.
- Source: https://docs.cloud.google.com/iam/docs/testing-permissions
- Retrieved 2026-11-14. Text CC BY 4.0, code samples Apache 2.0.

## Related

- [troubleshoot-policies.md](../iam-troubleshooting/troubleshoot-policies.md)
