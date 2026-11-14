---
source: https://docs.cloud.google.com/iam/docs/deny-access
---

# Deny Policies (Manage Deny Access)

Deny policies attach to an organization, folder, or project and contain deny rules that list permissions principals cannot use. They are managed with the console, gcloud, Terraform, client libraries, or the IAM `v2` REST API.

## Signature / Usage

Required roles on the organization: Deny Reviewer (`roles/iam.denyReviewer`) to view; Deny Admin (`roles/iam.denyAdmin`) to view, create, update, delete. Permissions: `iam.denypolicies.get`, `iam.denypolicies.list`, `iam.denypolicies.create`, `iam.denypolicies.update`, `iam.denypolicies.delete`. The IAM API must be enabled.

The v2 API uses a special permission name format: v1 `iam.roles.create` is v2 `iam.googleapis.com/roles.create`. Only permissions listed as supported in deny policies can be denied; permission groups can deny sets of permissions.

### Policy file format

```json
{
  "displayName": "POLICY_NAME",
  "rules": [
    {
      "denyRule": DENY_RULE_1
    },
    {
      "denyRule": DENY_RULE_2
    },
    {
      "denyRule": DENY_RULE_N
    }
  ]
}
```

Example with one rule:

```json
{
  "displayName": "My deny policy.",
  "rules": [
    {
      "denyRule": {
        "deniedPrincipals": [
          "principal://goog/subject/lucian@example.com"
        ],
        "deniedPermissions": [
          "iam.googleapis.com/roles.create"
        ]
      }
    }
  ]
}
```

### Create (gcloud)

```bash
gcloud iam policies create POLICY_ID \
    --attachment-point=ATTACHMENT_POINT \
    --kind=denypolicies \
    --policy-file=POLICY_FILE
```

```bash
gcloud iam policies create my-deny-policy \
    --attachment-point=cloudresourcemanager.googleapis.com/projects/my-project \
    --kind=denypolicies \
    --policy-file=policy.json
```

### Create (Terraform)

```terraform
data "google_project" "default" {
}

# Create a service account
resource "google_service_account" "default" {
  display_name = "IAM Deny Example - Service Account"
  account_id   = "example-sa"
  project      = data.google_project.default.project_id
}

# Create an IAM deny policy that denies a permission for the service account
resource "google_iam_deny_policy" "default" {
  provider     = google-beta
  parent       = urlencode("cloudresourcemanager.googleapis.com/projects/${data.google_project.default.project_id}")
  name         = "my-deny-policy"
  display_name = "My deny policy."
  rules {
    deny_rule {
      denied_principals  = ["principal://iam.googleapis.com/projects/-/serviceAccounts/${google_service_account.default.email}"]
      denied_permissions = ["iam.googleapis.com/roles.create"]
    }
  }
}
```

### Create (Go client library)

```go
import (
	"context"
	"fmt"
	"io"

	iam "cloud.google.com/go/iam/apiv2"
	"cloud.google.com/go/iam/apiv2/iampb"

	"google.golang.org/genproto/googleapis/type/expr"
)

// createDenyPolicy creates a deny policy.
func createDenyPolicy(w io.Writer, projectID, policyID string) error {
	ctx := context.Background()
	policiesClient, err := iam.NewPoliciesClient(ctx)
	if err != nil {
		return fmt.Errorf("NewPoliciesClient: %w", err)
	}
	defer policiesClient.Close()

	// The attachment point is identified by its URL-encoded resource name. Hence, replace
	// the "/" with "%%2F".
	attachmentPoint := fmt.Sprintf(
		"cloudresourcemanager.googleapis.com%%2Fprojects%%2F%s",
		projectID,
	)

	denyRule := &iampb.DenyRule{
		DeniedPrincipals: []string{"principalSet://goog/public:all"},
		// ExceptionPrincipals: []string{"principalSet://goog/group/project-admins@example.com"},
		DeniedPermissions: []string{"cloudresourcemanager.googleapis.com/projects.delete"},
		// ExceptionPermissions: []string{"cloudresourcemanager.googleapis.com/projects.create"},
		// If this condition is true, the deny rule will be applicable.
		DenialCondition: &expr.Expr{
			Expression: "!resource.matchTag('12345678/env', 'test')",
		},
	}

	policyRule := &iampb.PolicyRule{
		Description: "block all principals from deleting projects, unless the principal is a member of project-admins@example.com and the project being deleted has a tag with the value test",
		Kind: &iampb.PolicyRule_DenyRule{
			DenyRule: denyRule,
		},
	}

	policy := &iampb.Policy{
		DisplayName: "Restrict project deletion access",
		Rules:       [](*iampb.PolicyRule){policyRule},
	}

	req := &iampb.CreatePolicyRequest{
		// Its format is: "policies/ATTACHMENT_POINT/denypolicies"
		Parent:   fmt.Sprintf("policies/%s/denypolicies", attachmentPoint),
		Policy:   policy,
		PolicyId: policyID,
	}
	op, err := policiesClient.CreatePolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("unable to create policy: %w", err)
	}

	policy, err = op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("unable to wait for the operation: %w", err)
	}

	fmt.Fprintf(w, "Policy %s created\n", policy.GetName())

	return nil
}
```

(Abridged: comments from the official sample are trimmed; Java, Node.js and Python samples exist on the source page.)

### Create (REST)

```
POST https://iam.googleapis.com/v2/policies/ENCODED_ATTACHMENT_POINT/denypolicies?policyId=POLICY_ID
```

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://iam.googleapis.com/v2/policies/ENCODED_ATTACHMENT_POINT/denypolicies?policyId=POLICY_ID"
```

Response (a long-running operation):

```
{
  "name": "policies/cloudresourcemanager.googleapis.com%2Fprojects%2F1234567890123/denypolicies/my-policy/operations/89cb3e508bf1ff01",
  "metadata": {
    "@type": "type.googleapis.com/google.iam.v2.PolicyOperationMetadata",
    "createTime": "2022-06-28T19:06:12.455151Z"
  },
  "response": {
    "@type": "type.googleapis.com/google.iam.v2.Policy",
    "name": "policies/cloudresourcemanager.googleapis.com%2Fprojects%2F1234567890123/denypolicies/my-policy",
    "uid": "6665c437-a3b2-a018-6934-54dd16d3426e",
    "kind": "DenyPolicy",
    "displayName": "My deny policy.",
    "etag": "MTc3NDU4MjM4OTY0MzU5MjQ5OTI=",
    "createTime": "2022-06-28T19:06:12.455151Z",
    "updateTime": "2022-06-28T22:26:21.968687Z",
    "rules": [
      {
        "denyRule": {
          "deniedPrincipals": [
            "principal://goog/subject/lucian@example.com"
          ],
          "deniedPermissions": [
            "iam.googleapis.com/roles.create"
          ]
        }
      }
    ]
  }
}
```

### List and view

```bash
gcloud iam policies list \
    --attachment-point=ATTACHMENT_POINT \
    --kind=denypolicies \
    --format=json
```

```bash
gcloud iam policies get my-deny-policy \
    --attachment-point=cloudresourcemanager.googleapis.com/projects/my-project \
    --kind=denypolicies \
    --format=json \
    > ./policy.json
```

```
GET https://iam.googleapis.com/v2/policies/ENCODED_ATTACHMENT_POINT/denypolicies
GET https://iam.googleapis.com/v2/policies/ENCODED_ATTACHMENT_POINT/denypolicies/POLICY_ID
```

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://iam.googleapis.com/v2/policies/ENCODED_ATTACHMENT_POINT/denypolicies"
```

The console lists inherited deny policies as well. In list responses each policy shows `name`, `uid`, `kind: DenyPolicy`, `displayName`, `createTime`, `updateTime` (no rules; get a policy to see its rules).

### Update (read-modify-write)

Read the policy, modify it locally (for example add `iam.googleapis.com/roles.delete` to `deniedPermissions`), then write it back including the current `etag`; a mismatched `etag` fails the request.

```bash
gcloud iam policies update my-deny-policy \
    --attachment-point=cloudresourcemanager.googleapis.com/projects/my-project \
    --kind=denypolicies \
    --policy-file=policy.json
```

```
PUT https://iam.googleapis.com/v2/policies/ENCODED_ATTACHMENT_POINT/denypolicies/POLICY_ID
```

```
curl -X PUT \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://iam.googleapis.com/v2/policies/ENCODED_ATTACHMENT_POINT/denypolicies/POLICY_ID"
```

### Delete

```bash
gcloud iam policies delete my-deny-policy \
    --attachment-point=cloudresourcemanager.googleapis.com/projects/my-project \
    --kind=denypolicies
```

```
DELETE https://iam.googleapis.com/v2/policies/ENCODED_ATTACHMENT_POINT/denypolicies/POLICY_ID?etag=ETAG
```

```
curl -X DELETE \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://iam.googleapis.com/v2/policies/ENCODED_ATTACHMENT_POINT/denypolicies/POLICY_ID?etag=ETAG"
```

### Check a long-running operation

REST/client-library mutations return an LRO. Poll with truncated exponential backoff until `done` is `true`.

Adapted (not in the official docs): the official URL omits `denypolicies/POLICY_ID`, but the returned operation name contains it; append the returned `name` value as-is.

```
GET https://iam.googleapis.com/v2/OPERATION_NAME
# OPERATION_NAME = the `name` returned by the mutation, e.g.
# policies/ENCODED_ATTACHMENT_POINT/denypolicies/POLICY_ID/operations/OPERATION_ID
```

```
{
  "name": "policies/cloudresourcemanager.googleapis.com%2Fprojects%2F1234567890123/denypolicies/my-policy/operations/89cb3e508bf1ff01",
  "done": true
}
```

Use the full returned operation `name` as the path after `/v2/`; its last segment is the hexadecimal operation ID (for example `89cb3e508bf1ff01`).

## Options / Props

### Deny rule fields

| Name | Type | Description |
|------|------|-------------|
| `deniedPrincipals` | list | Principals that cannot use the permissions (principal identifiers for deny policies; `deleted:` identifiers not allowed). |
| `exceptionPrincipals` | list, optional | Principals exempt from the denial, e.g. specific users in a denied group. |
| `deniedPermissions` | list | Permissions (v2 format) that cannot be used; must be supported in deny policies; permission groups allowed in some cases. |
| `exceptionPermissions` | list, optional | Permissions not denied by the rule even if in `deniedPermissions`. |
| `denialCondition` | object, optional | `expression` (CEL, resource-tag functions only), `title`, `description`. |

### Limits

| Limit | Value |
|-------|-------|
| Deny policies per resource | 500 |
| Deny rules per resource across all attached deny policies | 500 |

## Notes

- Deny policies are inherited down the resource hierarchy and override allow policies: a denied permission cannot be used even if a granted role contains it.
- Denial conditions can only use resource tag functions; other functions and operators are unsupported.
- If a denied principal set includes service agents (for example `principalSet://goog/public:all`), add your service agents as exceptions using the project/folder/organization service agent principal set so services keep working.
- Email aliases in a deny policy are replaced with the user's primary email address.
- Deleting a deny policy is permanent and cannot be undone. Passing `--etag` / `etag` makes the delete conditional; omitting it deletes unconditionally.
- Changes usually take effect within 2 minutes, sometimes 7 minutes or more.
- Console: IAM page, **Deny** tab, **Create deny policy**.
- Source: https://docs.cloud.google.com/iam/docs/deny-access (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [allow-policies.md](./allow-policies.md)
- [access-change-propagation.md](./access-change-propagation.md)
- [conditions-attribute-reference.md](../conditions/conditions-attribute-reference.md)
