---
source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/restricting-domains
---

# Domain Restricted Sharing

Limit which principals can be granted IAM roles in your organization by domain or organization: only principals in allowed domains / organizations can be granted roles.

## Signature / Usage

Three methods:

1. `iam.managed.allowedPolicyMembers` managed constraint
2. Custom constraint on `iam.googleapis.com/AllowPolicy`
3. `iam.allowedPolicyMemberDomains` legacy managed constraint

### Managed constraint `iam.managed.allowedPolicyMembers`

Adapted (not in the official docs): `rules` is nested under `spec` (the official sample leaves it at the top level).

```yaml
name: organizations/ORG_ID/policies/iam.managed.allowedPolicyMembers
spec:
  rules:
  - enforce: true
    parameters:
      allowedMemberSubjects:
        - ALLOWED_MEMBER_1
        - ALLOWED_MEMBER_2
      allowedPrincipalSets:
        - ALLOWED_PRINCIPAL_SET_1
        - ALLOWED_PRINCIPAL_SET_2
```

`ALLOWED_MEMBER_*` example: `user:example-user@example.com`; `ALLOWED_PRINCIPAL_SET_*` example: `//cloudresourcemanager.googleapis.com/organizations/0123456789012`.

```bash
gcloud org-policies set-policy POLICY_PATH \
  --update-mask=spec
```

REST:

```text
POST https://orgpolicy.googleapis.com/v2/{parent=organizations/ORGANIZATION_ID}/policies
```

```json
{
  "name": "organizations/ORG_ID/policies/CONSTRAINT_NAME",
  "spec": {
    "rules": [
      {
        "enforce": true,
        "parameters": {
          "allowedMemberSubjects": [
            "ALLOWED_MEMBER_1",
            "ALLOWED_MEMBER_2"
          ],
          "allowedPrincipalSets": [
            "ALLOWED_PRINCIPAL_SET_1",
            "ALLOWED_PRINCIPAL_SET_2"
          ]
        }
      }
    ]
  }
}
```

### Custom constraint

Restrict grants to your organization (`memberInPrincipalSet`):

```yaml
name: organizations/ORG_ID/customConstraints/custom.allowInternalIdentitiesOnly
resourceTypes:
- iam.googleapis.com/AllowPolicy
methodTypes:
  - CREATE
  - UPDATE
condition:
  "resource.bindings.all(
    binding,
    binding.members.all(member,
      MemberInPrincipalSet(member, ['//cloudresourcemanager.googleapis.com/organizations/ORG_ID'])
    )
  )"
actionType: ALLOW
displayName: Only allow organization members to be granted roles
```

Refine with `memberInPrincipalSet`, `memberTypeMatches`, `memberSubjectMatches` joined by `&&`, `||`, `!`:

```yaml
name: organizations/ORG_ID/customConstraints/custom.allowInternalIdentitiesOnly
resourceTypes:
- iam.googleapis.com/AllowPolicy
methodTypes:
  - CREATE
  - UPDATE
condition:
  "resource.bindings.all(
    binding,
    binding.members.all(member,
      (
        MemberInPrincipalSet(member, ['//cloudresourcemanager.googleapis.com/organizations/ORG_ID'])
        ||
        MemberSubjectMatches(member, ['user:admin@example.com'])
      )
    )
  )"
actionType: ALLOW
displayName: Only allow organization members and service agents to be granted roles
```

Set up and enforce:

```bash
gcloud org-policies set-custom-constraint CONSTRAINT_PATH
```

```bash
gcloud org-policies list-custom-constraints --organization=ORGANIZATION_ID
```

```yaml
name: projects/PROJECT_ID/policies/CONSTRAINT_NAME
spec:
  rules:
  - enforce: true
```

```bash
gcloud org-policies set-policy POLICY_PATH
```

### Legacy constraint `iam.allowedPolicyMemberDomains`

List-type legacy managed constraint; `allowed_values` holds an organization principal set or a Google Workspace customer ID. Denied values are not supported (the policy cannot be saved with IDs in `denied_values`).

```yaml
name: organizations/ORGANIZATION_ID/policies/iam.allowedPolicyMemberDomains
spec:
  rules:
  - condition: # This condition applies to the values block.
      expression: "resource.matchTag('ORGANIZATION_ID/environment', 'dev')"
    values:
      allowedValues:
      - PRINCIPAL_SET
  - values:
      allowedValues:
      - PRINCIPAL_SET
```

`PRINCIPAL_SET` examples: `is:principalSet://cloudresourcemanager.googleapis.com/organizations/01234567890123` or `is:C03g5e3bc`.

```bash
gcloud org-policies set-policy POLICY_PATH
```

Violation error:

```
ERROR: (gcloud.projects.set-iam-policy) FAILED_PRECONDITION:
One or more users named in the policy do not belong to a permitted customer.
```

### Find the identifiers

```bash
gcloud organizations list
```

Shows `DISPLAY_NAME`, `ID` (organization ID), and `DIRECTORY_CUSTOMER_ID` (the Google Workspace customer ID). API lookup:

```text
GET https://cloudresourcemanager.googleapis.com/v3/organizations:search{query=domain:altostrat.com}
```

Organization principal set format: `principalSet://iam.googleapis.com/organizations/01234567890123`. Workspace Directory API:

```bash
curl -# -X GET "https://www.googleapis.com/admin/directory/v1/customers/customerKey" \
-H "Authorization: Bearer $access_token" -H "Content-Type: application/json"
```

(OAuth scope `https://www.googleapis.com/auth/admin.directory.customer.readonly`; the customer ID is the `id` field.)

### Exceptions: share publicly (`allUsers`, `allAuthenticatedUsers`)

Only possible with custom constraints. Create a tag, attach it to resources to be shared, and use a conditional policy:

```bash
gcloud resource-manager tags keys create allUsersIngress \
  --parent=organizations/ORGANIZATION_ID
```

```bash
gcloud resource-manager tags values create True \
--parent=ORGANIZATION_ID/allUsersIngress \
--description="Allow allUsers to access internal Cloud Run services"
```

```yaml
name: organizations/ORGANIZATION_ID/customConstraints/custom.allowInternalAndSpecialIdentitiesOnly
resourceTypes:
- iam.googleapis.com/AllowPolicy
methodTypes:
  - CREATE
  - UPDATE
condition:
  "resource.bindings.all(
    binding,
    binding.members.all(member,
      (
        MemberInPrincipalSet(member, ['//cloudresourcemanager.googleapis.com/organizations/ORG_ID'])
        ||
        MemberSubjectMatches(member, ['allUsers', 'allAuthenticatedUsers'])
      )
    )
  )"
actionType: ALLOW
displayName: Only allow organization members, allusers, and allAuthenticatedUsers to be granted roles
```

Register the custom constraint above:

```bash
gcloud org-policies set-custom-constraint CONSTRAINT_PATH
```

Adapted (not in the official docs): the official sample defines the custom constraint but never enforces it, and its conditional `allowAll` rule has no unconditional rule beside it (a policy with a conditional rule must also contain an unconditional rule). This version enforces the custom constraint, and the legacy policy keeps an unconditional rule that restricts to your organization principal set plus the tag-conditional `allowAll`.

Enforce the custom constraint:

```yaml
name: organizations/ORGANIZATION_ID/policies/custom.allowInternalAndSpecialIdentitiesOnly
spec:
  rules:
  - enforce: true
```

Legacy constraint policy with the tag-conditional exception and an unconditional restriction:

```yaml
name: organizations/ORGANIZATION_ID/policies/iam.allowedPolicyMemberDomains
spec:
  rules:
  - allowAll: true
    condition:
      expression: resource.matchTag("ORGANIZATION_ID/allUsersIngress", "True")
      title: allowAllUsersIngress
  - values:
      allowedValues:
      - PRINCIPAL_SET
```

```bash
gcloud org-policies set-policy POLICY_PATH
```

## Options / Props

Accounts that may need to be exceptions (allowed members, or forced access for the legacy constraint):

| Action | Principal identifier |
|---|---|
| Enable BigQuery log sink for a billing account | `serviceAccount:bUNIQUE_ID@gcp-sa-logging.iam.gserviceaccount.com` |
| Enable storage access logging | `serviceAccount:cloud-storage-analytics@google.com` |
| Use Pub/Sub as an endpoint for a Google Chat app | `serviceAccount:chat-api-push@system.gserviceaccount.com` |
| Use Pub/Sub for Google Play real-time developer notifications | `serviceAccount:google-play-developer-notifications@system.gserviceaccount.com` |
| Use a signed URL with Cloud CDN | `serviceAccount:service-PROJECT_NUMBER@cloud-cdn-fill.iam.gserviceaccount.com` |
| Private origin authentication with Cloud CDN | `serviceAccount:service-PROJECT_NUMBER@https-lb.iam.gserviceaccount.com` |

What entering an identifier allows:

| Identifier | Principals allowed to be granted roles |
|------------|---------------------------------------|
| Organization principal set | Workforce identity pools in the org; service accounts and workload identity pools in any org project; service agents of org resources |
| Google Workspace customer ID | All identities in all domains of that customer ID, plus the same pools / service accounts / service agents |

## Notes

- Organizations created on or after May 3, 2024 have `iam.allowedPolicyMemberDomains` enforced by default with your domain as the only allowed value.
- Your organization principal set / Workspace ID is not automatically allowed; include it explicitly.
- With the domain restriction constraint, the console offers no Deny / Deny All.
- Public Cloud Run services are unreachable from outside the organization under DRS unless the Cloud Run Invoker IAM check is disabled for the service.
- Forcing access with the legacy constraint (use sparingly; it temporarily removes the guardrail): remove the policy, grant access, re-apply the policy; or create a Google group in an allowed domain, turn off domain restriction for that group in Workspace admin, add the service account, and grant the group access.
- Policy simulation is not available for legacy managed constraints. Sharing publicly (`allUsers`) requires custom constraints; granting it weakens the guardrail, so scope it by tag.
- Adapted from the official docs: `rules` nested under `spec` in the managed-constraint example; the public-sharing example now registers and enforces the custom constraint and adds the unconditional restriction rule required beside the conditional `allowAll` rule.
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/restricting-domains
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [constraints-reference.md](./constraints-reference.md)
- [custom-constraints.md](./custom-constraints.md)
- [tags-condition.md](./tags-condition.md)
- gcp-security (IAP, VPC Service Controls)
