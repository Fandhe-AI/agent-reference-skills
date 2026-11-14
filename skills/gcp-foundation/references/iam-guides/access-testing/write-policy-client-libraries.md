---
source: https://docs.cloud.google.com/iam/docs/write-policy-client-libraries
---

# Grant Roles Using Client Libraries (Read-Modify-Write)

Quickstart that uses the Resource Manager API IAM methods to read a project's allow policy, grant `roles/logging.logWriter` to a principal, write the policy, list the role's members, then revoke the role. Samples exist for C#, Go, Java, and Python (see gcp-client-libraries for library setup).

## Signature / Usage

Install (Python). Adapted (not in the official docs): `google-cloud-resource-manager` added because the sample imports `google.cloud.resourcemanager_v3`, which the official command does not install:

```
pip install --upgrade google-cloud-resource-manager google-api-python-client google-auth google-auth-httplib2
```

Python sample (Resource Manager v3 client):

```python
from google.cloud import resourcemanager_v3
from google.iam.v1 import iam_policy_pb2, policy_pb2


def quickstart(project_id: str, principal: str) -> None:
    """Demonstrates basic IAM operations.

    This quickstart shows how to get a project's IAM policy,
    add a principal to a role, list members of a role,
    and remove a principal from a role.

    Args:
        project_id: ID or number of the Google Cloud project you want to use.
        principal: The principal ID requesting the access.
    """

    # Role to be granted.
    role = "roles/logging.logWriter"
    crm_service = resourcemanager_v3.ProjectsClient()

    # Grants your principal the 'Log Writer' role for the project.
    modify_policy_add_role(crm_service, project_id, role, principal)

    # Gets the project's policy and prints all principals with the 'Log Writer' role.
    policy = get_policy(crm_service, project_id)
    binding = next(b for b in policy.bindings if b.role == role)
    print(f"Role: {(binding.role)}")
    print("Members: ")
    for m in binding.members:
        print(f"[{m}]")

    # Removes the principal from the 'Log Writer' role.
    modify_policy_remove_principal(crm_service, project_id, role, principal)


def get_policy(
    crm_service: resourcemanager_v3.ProjectsClient, project_id: str
) -> policy_pb2.Policy:
    """Gets IAM policy for a project."""

    request = iam_policy_pb2.GetIamPolicyRequest()
    request.resource = f"projects/{project_id}"

    policy = crm_service.get_iam_policy(request)
    return policy


def set_policy(
    crm_service: resourcemanager_v3.ProjectsClient,
    project_id: str,
    policy: policy_pb2.Policy,
) -> None:
    """Adds a new role binding to a policy."""

    request = iam_policy_pb2.SetIamPolicyRequest()
    request.resource = f"projects/{project_id}"
    request.policy.CopyFrom(policy)

    crm_service.set_iam_policy(request)


def modify_policy_add_role(
    crm_service: resourcemanager_v3.ProjectsClient,
    project_id: str,
    role: str,
    principal: str,
) -> None:
    """Adds a new role binding to a policy."""

    policy = get_policy(crm_service, project_id)

    for bind in policy.bindings:
        if bind.role == role:
            bind.members.append(principal)
            break
    else:
        binding = policy_pb2.Binding()
        binding.role = role
        binding.members.append(principal)
        policy.bindings.append(binding)

    set_policy(crm_service, project_id, policy)


def modify_policy_remove_principal(
    crm_service: resourcemanager_v3.ProjectsClient,
    project_id: str,
    role: str,
    principal: str,
) -> None:
    """Removes a principal from a role binding."""

    policy = get_policy(crm_service, project_id)

    for bind in policy.bindings:
        if bind.role == role:
            if principal in bind.members:
                bind.members.remove(principal)
            break

    set_policy(crm_service, project_id, policy)


if __name__ == "__main__":
    # TODO: Replace with your project ID.
    project_id = "your-project-id"
    # TODO: Replace with the ID of your principal.
    # For examples, see https://cloud.google.com/iam/docs/principal-identifiers
    principal = "your-principal"
    quickstart(project_id, principal)
```

## Options / Props

| Language | Install |
|---|---|
| C# | `install-package Google.Apis.Iam.v1`, `install-package Google.Apis.CloudResourceManager.v1` |
| Go | `go get golang.org/x/oauth2/google`, `go get google.golang.org/api/cloudresourcemanager/v1` |
| Java | Maven artifacts `google-api-services-cloudresourcemanager` (`v3-rev20240128-2.0.0`), `google-auth-library-oauth2-http`, `google-http-client-jackson2`, `google-api-services-iam` (`v1-rev20240118-2.0.0`) |
| Python | `pip install --upgrade google-cloud-resource-manager google-api-python-client google-auth google-auth-httplib2` |

## Notes

- Adapted from the official docs: `google-cloud-resource-manager` is added to the Python install because the v3 sample needs it.
- Replace `your-project` with the project ID and the principal with an identifier such as `user:my-user@example.com`.
- Use a new project: running this against an existing project temporarily grants some users access to its resources.
- This is a read-modify-write on the project allow policy; when conditional bindings may exist, request policy version 3 and keep the `etag` (see troubleshoot-conditional-bindings).
- Authentication uses Application Default Credentials.
- The C#, Go, and Java samples are omitted here; the structure (get policy, add or reuse binding, set policy, list members, remove member) is identical.
- Source: https://docs.cloud.google.com/iam/docs/write-policy-client-libraries
- Retrieved 2026-11-14. Text CC BY 4.0, code samples Apache 2.0.

## Related

- [troubleshoot-conditional-bindings.md](../iam-troubleshooting/troubleshoot-conditional-bindings.md)
- [test-iam-permissions.md](./test-iam-permissions.md)
