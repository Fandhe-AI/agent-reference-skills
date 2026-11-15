---
source: https://docs.cloud.google.com/iam/docs/review-iam-policy-history
---

# Reviewing IAM Allow Policy Change History

Review allow policy changes by searching audit logs for the `SetIamPolicy` method, or with Cloud Asset Inventory.

## Signature / Usage

Logs Explorer query for all allow policy changes on a resource:

```
logName="RESOURCE_TYPE/RESOURCE_ID/logs/cloudaudit.googleapis.com%2Factivity"
protoPayload.methodName:SetIamPolicy
```

Narrowed to a specific user or service account:

```
logName="RESOURCE_TYPE/RESOURCE_ID/logs/cloudaudit.googleapis.com%2Factivity"
protoPayload.methodName:SetIamPolicy
protoPayload.serviceData.policyDelta.bindingDeltas.member:"EMAIL_ADDRESS"
```

gcloud (Linux, macOS, or Cloud Shell). Adapted (not in the official docs): `methodName=SetIamPolicy` changed to `methodName:SetIamPolicy` (substring match, as in the Logs Explorer queries above) so qualified method names such as `google.iam.v1.IAMPolicy.SetIamPolicy` are not missed.

```bash
gcloud logging read \
    'logName:RESOURCE_TYPE/RESOURCE_ID/logs/cloudaudit.googleapis.com%2Factivity
    AND protoPayload.methodName:SetIamPolicy' \
    --freshness=TIME_PERIOD \
    --RESOURCE_TYPE_SINGULAR=RESOURCE_ID
```

Cloud Asset Inventory history:

```bash
gcloud asset get-history \
    --RESOURCE_TYPE=RESOURCE_ID \
    --asset-names=ASSET_NAME_1,ASSET_NAME_2,... \
    --content-type=iam-policy \
    --start-time=START_TIME \
    --end-time=END_TIME
```

## Options / Props

| Placeholder | Description |
|---|---|
| `RESOURCE_TYPE` | `projects`, `folders`, `organizations` (logging); singular `project`, `folder`, `organization` for `--RESOURCE_TYPE_SINGULAR` and `asset get-history` |
| `RESOURCE_ID` | Project ID (alphanumeric) or numeric folder / organization ID |
| `TIME_PERIOD` | Freshness window; default `1d` |
| `ASSET_NAME` | Formatted resource names, e.g. `//cloudresourcemanager.googleapis.com/projects/my-project` |
| `START_TIME` | Start of range; max range 7 days; no more than 35 days in the past |
| `END_TIME` | Optional; defaults to now; same limits |

## Notes

- Console path for Cloud Asset Inventory: Asset Inventory, IAM Policy tab, filter `Resource : RESOURCE_ID`, open the resource, Change History tab, then compare two timestamped records.
- On Windows PowerShell use backtick line continuation and in cmd.exe `^`; single quotes in cmd.exe must become double quotes.
- Source: https://docs.cloud.google.com/iam/docs/review-iam-policy-history
- Retrieved 2026-11-14. Text CC BY 4.0, code samples Apache 2.0.

## Related

- [troubleshoot-policies.md](./troubleshoot-policies.md)
