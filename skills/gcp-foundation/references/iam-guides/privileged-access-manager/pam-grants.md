---
source: https://docs.cloud.google.com/iam/docs/pam-request-temporary-elevated-access
---

# Privileged Access Manager: Request, Approve, View, Revoke, and Withdraw Grants

Lifecycle of a grant against a PAM entitlement.

## Signature / Usage

### Request a grant

```bash
gcloud alpha pam grants create \
    --entitlement=ENTITLEMENT_ID \
    --requested-duration="GRANT_DURATIONs" \
    [--scheduled-activation-time=SCHEDULED_ACTIVATION_TIME] \
    --justification="JUSTIFICATION" \
    --location=global \
    [--additional-email-recipients=EMAIL_ADDRESS_1, EMAIL_ADDRESS_2] \
    --RESOURCE_TYPE=RESOURCE_ID
```

On a child resource of an inherited entitlement, add `--requested-resources=REQUESTED_RESOURCE` (for example `projects/PROJECT_ID`). Fine-grained scope uses a file:

```yaml
- gcpIamAccess:
    resource: REQUESTED_RESOURCE
    resourceType: REQUESTED_RESOURCE_TYPE
    roleBindings:
    - entitlementRoleBindingId: ENTITLEMENT_ROLE_BINDING_ID_1
      accessRestrictions:
        resourceNames:
        - ACCESS_RESTRICTION_NAME_1
        - ACCESS_RESTRICTION_NAME_2
    - entitlementRoleBindingId: ENTITLEMENT_ROLE_BINDING_ID_2
      accessRestrictions:
        resourceNamePrefixes:
        - ACCESS_RESTRICTION_PREFIX_1
        - ACCESS_RESTRICTION_PREFIX_2
```

```bash
gcloud alpha pam grants create \
    --entitlement=ENTITLEMENT_ID \
    --requested-duration="GRANT_DURATIONs" \
    --justification="JUSTIFICATION" \
    --location=global \
    --RESOURCE_TYPE=RESOURCE_ID \
    --requested-access-from-file=requested-scope.yaml
```

REST (`createGrant`):

```text
POST https://privilegedaccessmanager.googleapis.com/v1beta/SCOPE/locations/global/entitlements/ENTITLEMENT_ID/grants?requestId=REQUEST_ID
```

```json
{
  "requestedDuration": "GRANT_DURATIONs",
  "activationTrigger": {
    "requestedActivationTime": "SCHEDULED_ACTIVATION_TIME"
  },
  "justification": {
    "unstructuredJustification": "JUSTIFICATION"
  },
  "additionalEmailRecipients": [
    "EMAIL_ADDRESS_1",
    "EMAIL_ADDRESS_2"
  ]
}
```

Find entitlements you can request against (`GRANT_REQUESTER`):

```text
GET https://privilegedaccessmanager.googleapis.com/v1beta/SCOPE/locations/global/entitlements:search?callerAccessType=GRANT_REQUESTER&filter=FILTER&pageSize=PAGE_SIZE&pageToken=PAGE_TOKEN
```

### Approve or deny

```bash
gcloud pam entitlements search \
    --caller-access-type=grant-approver \
    --location=global \
    --RESOURCE_TYPE=RESOURCE_ID
```

```bash
gcloud alpha pam grants search \
    --entitlement=ENTITLEMENT_ID \
    --caller-relationship=CALLER_RELATIONSHIP_TYPE \
    --location=global \
    --RESOURCE_TYPE=RESOURCE_ID
```

```bash
gcloud pam grants approve \
    GRANT_ID \
    --entitlement=ENTITLEMENT_ID \
    --reason="APPROVAL_REASON" \
    --location=global \
    --RESOURCE_TYPE=RESOURCE_ID
```

```text
POST https://privilegedaccessmanager.googleapis.com/v1/SCOPE/locations/global/entitlements/ENTITLEMENT_ID/grants/GRANT_ID:approve
POST https://privilegedaccessmanager.googleapis.com/v1/SCOPE/locations/global/entitlements/ENTITLEMENT_ID/grants/GRANT_ID:deny
```

```json
{
    "reason": "REASON"
}
```

### View grants

```bash
gcloud alpha pam grants list \
    --entitlement=ENTITLEMENT_ID \
    --location=global \
    --RESOURCE_TYPE=RESOURCE_ID
```

`gcloud alpha pam grants describe` shows one grant; `grants:search` with `callerRelationship` (`had-created`, `had-approved`, `can-approve`) lists your own.

### Revoke (admin) and withdraw (requester)

```bash
gcloud pam grants revoke \
     GRANT_ID \
    --entitlement=ENTITLEMENT_ID \
    --reason="REVOKE_REASON" \
    --location=global \
    --RESOURCE_TYPE=RESOURCE_ID
```

```bash
gcloud alpha pam grants withdraw \
     GRANT_ID \
    --entitlement=ENTITLEMENT_ID \
    --location=global \
    --RESOURCE_TYPE=RESOURCE_ID
```

## Options / Props

| Name | Description |
|---|---|
| `--requested-duration` | Seconds with `s` suffix, up to the entitlement maximum |
| `--scheduled-activation-time` | RFC 3339; up to 7 days ahead; omit to activate right after creation/approval |
| `--justification` | Required if the entitlement demands it |
| `--additional-email-recipients` | Extra notification addresses (useful for workforce identities) |
| `--requested-resources` | Child resource to scope an inherited entitlement to |
| `--requested-access-from-file` | Role-binding level restrictions (`resourceNames` or `resourceNamePrefixes`); up to five resource filters in console |
| `requestId` (REST) | Optional non-zero UUID; duplicates within 60 minutes are ignored |
| `--caller-relationship` | `had-created`, `had-approved`, `can-approve` |
| `--reason` | Reason for approve/deny/revoke |
| Grant states | `Active`, `Scheduled`, `Approval awaited`, `Denied`, `Expired`, `Revoked`, `Withdrawn`, `Ended` |

## Notes

- You can request only against entitlements you were added to. Maximum 10 open grants (Active, Scheduled, Approval awaited) per user per entitlement; no duplicate scope; no overlapping scheduled grants on the same entitlement with the same scope and overlapping time.
- A grant needing approval expires if not decided within 24 hours (immediate) or by the scheduled activation time.
- You cannot approve your own request. An approver can be in both levels but approves once. Any denial moves the grant to `denied` immediately. After first-level approvals, second-level approvers are notified.
- Only `Active` grants can be revoked (needs `privilegedaccessmanager.grants.revoke`); the console also offers "Revoke all grants" per entitlement. Withdraw applies to pending or scheduled grants and ends active ones (preview).
- Approval history is kept for 30 days and deleted with the entitlement. Grants are deleted 30 days after reaching a terminal state.
- Audit: the console Audit logs tab and Cloud Audit Logs (Data Access logs if enabled). Grant activation relies on IAM Conditions and access change propagation.
- Search/approve calls need no PAM-specific permissions.
- Source: https://docs.cloud.google.com/iam/docs/pam-request-temporary-elevated-access
- Source: https://docs.cloud.google.com/iam/docs/pam-approve-deny-grants
- Source: https://docs.cloud.google.com/iam/docs/pam-view-grants
- Source: https://docs.cloud.google.com/iam/docs/pam-revoke-grants
- Source: https://docs.cloud.google.com/iam/docs/pam-withdraw-grants
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [pam-overview-and-setup.md](./pam-overview-and-setup.md)
- [pam-entitlements-and-settings.md](./pam-entitlements-and-settings.md)
