---
source: https://docs.cloud.google.com/access-context-manager/docs/create-access-policy
---

# Create an access policy

Create the single organization-level access policy, or a scoped access policy for a folder or project, and optionally delegate administration of a scoped policy through an IAM binding. Create calls return a long-running `Operation`.

## Signature / Usage

### Create an organization-level access policy

An organization cannot have a second organization-level access policy. In the console, creating an access level creates a default access policy automatically.

```bash
gcloud access-context-manager policies create \
--organization ORGANIZATION_ID --title POLICY_TITLE
```

Expected output (`POLICY_NAME` is a numeric ID assigned by Google Cloud):

```text
Create request issued
Waiting for operation [accessPolicies/POLICY_NAME/create/1521580097614100] to complete...done.
Created.
```

REST request body, then the call:

Adapted (not in the official docs): `parent` is written as `organizations/ORGANIZATION_ID`, the format the Discovery document requires for `AccessPolicy.parent`.

```json
{
 "parent": "organizations/ORGANIZATION_ID",
 "title": "POLICY_TITLE"
}
```

```text
POST https://accesscontextmanager.googleapis.com/v1/accessPolicies
```

### Create a scoped access policy

Adapted (not in the official docs): removed the `[...]` brackets around `--scopes=SCOPE`, which are optional-argument notation and not valid in a shell command (without `--scopes` the command is the organization-level one above).

```bash
gcloud access-context-manager policies create \
--organization ORGANIZATION_ID --scopes=SCOPE --title POLICY_TITLE
```

Adapted (not in the official docs): the field is `scopes`, a list, as in the Discovery `AccessPolicy` schema (the source writes `"scope": "SCOPE"`), and `parent` uses the `organizations/ORGANIZATION_ID` format.

```json
{
 "parent": "organizations/ORGANIZATION_ID",
 "scopes": ["SCOPE"],
 "title": "POLICY_TITLE"
}
```

### Delegate administration of a scoped policy

Adapted (not in the official docs): removed the `[...]` brackets around `POLICY`, which are optional-argument notation and not valid in a shell command.

```bash
gcloud access-context-manager policies add-iam-policy-binding \
POLICY --member=PRINCIPAL --role=ROLE
```

REST: call `accessPolicies.setIamPolicy` with the policy ID returned by `accessPolicies.create`. The request body contains the IAM policy to set.

Adapted (not in the official docs): removed the trailing comma after `"policy": "IAM_POLICY"`, which is invalid JSON; the block is a sketch because `IAM_POLICY` stands for a `Policy` object, not a string.

```text
{
 "policy": "IAM_POLICY"
}
```

```text
POST https://accesscontextmanager.googleapis.com/v1/accessPolicies/POLICY_ID:setIamPolicy
```

## Options / Props

| Placeholder | Description |
|-------------|-------------|
| `ORGANIZATION_ID` | Numeric ID of the organization |
| `POLICY_TITLE` | Human-readable title. For scoped policies: maximum 50 characters, starts with a letter, only ASCII letters, digits and `_`, case sensitive, unique within the organization's access policy |
| `SCOPE` | One folder or project (only one allowed) that must exist in the organization; if omitted the policy applies to the entire organization. The gcloud help examples use `folders/345` and `projects/567` (project number) |
| `POLICY` | ID or fully qualified identifier of the policy |
| `PRINCIPAL` | `user\|group\|serviceAccount:email` or `domain:domain` |
| `ROLE` | Complete path of a predefined role such as `roles/accesscontextmanager.policyReader`, or `organizations/{ORGANIZATION_ID}/roles/accesscontextmanager.policyReader` for a custom role |
| `POLICY_ID` | Policy ID returned from `accessPolicies.create` (the `name` field is `accessPolicy/POLICY_ID`) |

## Notes

- An organization can have only one organization-level access policy and multiple scoped policies. Only VPC Service Controls supports scoped policies; keep using organization-level policies for services such as Identity-Aware Proxy.
- After you create a scoped policy you cannot change its scope; delete and recreate the policy to change it. Deleting a policy that is in use is disruptive, so try the delete-and-recreate step on a disposable policy first.
- The source also shows Console steps for scoped policies (maximum 50 characters, same name rules) and refers to the access-control page for required permissions.
- Corrected from the official docs: `--organization ORGANIZATION_ID [--scopes=SCOPE] --title POLICY_TITLE` and `add-iam-policy-binding \` / `[POLICY] --member=PRINCIPAL --role=ROLE` (optional-argument brackets in a shell command).
- Corrected from the official docs: `"parent": "ORGANIZATION_ID",` (both request bodies) and `"scope": "SCOPE",` (scoped request body).
- Corrected from the official docs: `"policy": "IAM_POLICY",` (trailing comma). `IAM_POLICY` is a collection of bindings; each binding binds one or more principals to a single role.
- `setIamPolicy` replaces the whole IAM policy of the access policy. Read the current one with `accessPolicies.getIamPolicy`, edit it, and send it back with its `etag` so that concurrent changes are rejected instead of overwritten; `gcloud access-context-manager policies add-iam-policy-binding` adds a single binding.
- Source inconsistency: the source says the `name` field of the returned access policy is `accessPolicy/POLICY_ID`; the Discovery document gives the format `accessPolicies/{access_policy}`.
- Source: https://docs.cloud.google.com/access-context-manager/docs/create-access-policy (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [scoped-policies.md](./scoped-policies.md)
- [overview.md](./overview.md)
- [create-basic-access-level.md](./create-basic-access-level.md)
