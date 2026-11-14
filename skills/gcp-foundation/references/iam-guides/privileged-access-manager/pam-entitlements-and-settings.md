---
source: https://docs.cloud.google.com/iam/docs/pam-create-entitlements
---

# Privileged Access Manager: Entitlements and Settings

Create entitlements, and configure resource-wide PAM settings (automated approvers and notification behavior).

## Signature / Usage

Entitlement file `entitlement.yaml`:

```yaml
privilegedAccess:
  gcpIamAccess:
    resourceType: cloudresourcemanager.googleapis.com/RESOURCE_MANAGER_RESOURCE_TYPE
    resource: //cloudresourcemanager.googleapis.com/SCOPE
    roleBindings:
    - role: ROLE_1
      conditionExpression: CONDITION_EXPRESSION_1
    - role: ROLE_2
      conditionExpression: CONDITION_EXPRESSION_2
maxRequestDuration: MAXIMUM_GRANT_DURATION
eligibleUsers:
- principals:
  - REQUESTING_MEMBER_1
  - REQUESTING_MEMBER_2
approvalWorkflow:
  manualApprovals:
    requireApproverJustification: true
    steps:
    - approvalsNeeded: APPROVALS_NEEDED_1
      approverEmailRecipients:
      - APPROVER_EMAIL_ADDRESSES_1
      - APPROVER_EMAIL_ADDRESSES_2
      approvers:
      - principals:
       - APPROVING_MEMBER_1
       - APPROVING_MEMBER_2
    - approvalsNeeded: APPROVALS_NEEDED_2
      approverEmailRecipients:
       - APPROVER_EMAIL_ADDRESSES_3
       - APPROVER_EMAIL_ADDRESSES_4
      approvers:
      - principals:
        - APPROVING_MEMBER_3
        - APPROVING_MEMBER_4
requesterJustificationConfig:
  unstructured: {}
additionalNotificationTargets:
  adminEmailRecipients:
  - ADMIN_EMAIL_ADDRESS_1
  - ADMIN_EMAIL_ADDRESS_2
  requesterEmailRecipients:
  - REQUESTER_EMAIL_ADDRESS_1
  - REQUESTER_EMAIL_ADDRESS_2
```

```bash
gcloud alpha pam entitlements create \
    ENTITLEMENT_ID \
    --entitlement-file=entitlement.yaml \
    --location=global \
    --RESOURCE_TYPE=RESOURCE_ID
```

REST:

```text
POST https://privilegedaccessmanager.googleapis.com/v1beta/SCOPE/locations/global/entitlements?entitlementId=ENTITLEMENT_ID
```

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://privilegedaccessmanager.googleapis.com/v1beta/SCOPE/locations/global/entitlements?entitlementId=ENTITLEMENT_ID"
```

The response is a long-running operation; poll `GET https://privilegedaccessmanager.googleapis.com/v1beta/SCOPE/locations/global/operations/OPERATION_ID`. The request body mirrors the YAML structure as JSON (`privilegedAccess.gcpIamAccess`, `maxRequestDuration`, `eligibleUsers`, `approvalWorkflow.manualApprovals.steps`, `requesterJustificationConfig`, `additionalNotificationTargets`).

Terraform: `google_privileged_access_manager_entitlement`. Config Connector: `PrivilegedAccessManagerEntitlement`.

### Settings: allow service accounts / agent identities as approvers and tune notifications

```yaml
emailNotificationSettings:
  customNotificationBehavior:
    adminNotifications:
      grantActivated: NOTIFICATION_MODE_1
      grantActivationFailed: DISABLED
      grantEnded: ENABLED
      grantExternallyModified: ENABLED
    approverNotifications:
      pendingApproval: NOTIFICATION_MODE_2
    requesterNotifications:
      entitlementAssigned: ENABLED
      grantActivated: ENABLED
      grantExpired: NOTIFICATION_MODE_3
      grantRevoked: ENABLED
etag:'"ZjlkNWZlMWUtNDlhYS00YjJjAYlzNWYtZWFkNGVjOWU3NWMkBwYRsottW5Md"'
name: RESOURCE_TYPE/RESOURCE_ID/locations/global/settings
serviceAccountApproverSettings:
  enabled: SA_AS_APPROVER
```

```bash
gcloud alpha pam settings update \
    --location=global \
    --RESOURCE_TYPE=RESOURCE_ID \
    --settings-file FILENAME.yaml
```

Export current settings (needed for the `etag`):

```bash
gcloud alpha pam settings export \
    --destination=FILENAME.yaml \
    --location=global \
    -- RESOURCE_TYPE=RESOURCE_ID
```

REST: `PATCH https://privilegedaccessmanager.googleapis.com/v1beta/SCOPE/locations/global/settings?updateMask=UPDATED_FIELDS` (for example `emailNotificationSettings,serviceAccountApproverSettings`; `*` updates all).

## Options / Props

| Name | Type | Description |
|---|---|---|
| `ENTITLEMENT_ID` | string | 4-63 chars, `[a-z0-9-]`, starts with a letter |
| `roleBindings` | list | Up to 30 roles, each with optional `conditionExpression`; access-level attributes are not supported in conditions |
| `maxRequestDuration` | duration | `1800s` (30 min) to `604800s` (168 h / 7 days) |
| `eligibleUsers.principals` | list | Up to 20 requesters; all principal types except `allUsers` / `allAuthenticatedUsers`; use a group for more |
| `approvalWorkflow.manualApprovals.steps` | list | Up to 2 levels (Security Command Center Premium/Enterprise); up to 20 approver principals per step |
| `approvalsNeeded` | int | Must be <= number of principals in an approver group, otherwise grants stay in `approval awaited` |
| approver principal types | | Users, groups, domains, workforce pool identifiers; workload pool identifiers and service accounts / agent identities only when enabled in settings |
| `requireApproverJustification` | bool | Approvers must justify |
| `requesterJustificationConfig` | object | `unstructured: {}` requires justification; `notMandatory: {}` does not |
| `additionalNotificationTargets` | object | `adminEmailRecipients`, `requesterEmailRecipients`; approvers use `approverEmailRecipients` per step |
| `serviceAccountApproverSettings.enabled` | bool | Default `false`; omitted field inherits from parent; empty field resets to default |
| `emailNotificationSettings` | object | `ENABLED` / `DISABLED` per event; omitted inherits; empty resets to default |

## Notes

- Each setting field has three states: set (applied), present but empty (defaults), absent (inherit from parent). Settings tab default is "Inherit from parent"; choose "Override inheritance" to change a child.
- If automated approval is disabled, grants needing service account / agent identity approval are never approved and entitlements with only such approvers are ineffective.
- Updating settings requires the current `etag` in the body.
- New entitlements may take a few minutes to propagate.
- Required roles for creation: PAM Admin plus the matching IAM admin role (see overview page). Creation uses `resourcemanager.{organizations,folders,projects}.setIamPolicy` and `privilegedaccessmanager.entitlements.create`.
- Roles with `setIamPolicy` permissions or `iam.roles.update` (for example `roles/iam.roleAdmin`) in an entitlement let requesters grant themselves lasting access.
- Source: https://docs.cloud.google.com/iam/docs/pam-create-entitlements
- Source: https://docs.cloud.google.com/iam/docs/pam-configure-settings
- Source: https://docs.cloud.google.com/iam/docs/pam-view-export-settings
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [pam-overview-and-setup.md](./pam-overview-and-setup.md)
- [pam-grants.md](./pam-grants.md)
