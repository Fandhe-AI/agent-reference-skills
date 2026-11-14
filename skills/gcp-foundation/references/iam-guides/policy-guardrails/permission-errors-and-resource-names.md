---
source: https://docs.cloud.google.com/iam/docs/permission-error-messages
---

# Permission Error Messages and Full Resource Names

How to read IAM permission errors, and the full resource name formats required by troubleshooting and grantable-role features.

## Signature / Usage

gcloud error:

```text
ERROR: (gcloud.storage.buckets.list) PERMISSION_DENIED:
EMAIL_ADDRESS does not have
storage.buckets.list access to the Google Cloud project. Permission
'storage.buckets.list' denied on resource (or it may not exist). This command
is authenticated as EMAIL_ADDRESS which
is the active account specified by the [core/account] property.
- '@type': type.googleapis.com/google.rpc.ErrorInfo
  domain: storage.googleapis.com
  metadata:
    permission: storage.buckets.list
    error_info_id: ERROR_ID
  reason: IAM_PERMISSION_DENIED
```

REST error:

```json
{
  "error": {
    "code": 403,
    "message": "Permission 'storage.buckets.list' denied on resource (or it may not exist). Remediate access with this Troubleshooter URL or share it with your administrator - https://console.cloud.google.com/iam-admin/troubleshooter;errorId=ERROR_ID .",
    "details": [
      {
        "@type": "type.googleapis.com/google.rpc.ErrorInfo",
        "reason": "forbidden",
        "domain": "global",
        "metadata": {
          "error_info_id": "ERROR_ID",
          "permission": "storage.buckets.list"
        }
      }
    ]
  }
}
```

## Options / Props

### Full resource names

| Resource type | Full resource name format |
|---|---|
| BigQuery datasets | `//bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID` |
| Cloud Billing accounts | `//cloudbilling.googleapis.com/billingAccounts/BILLING_ACCOUNT_ID` |
| Cloud Run services | `//run.googleapis.com/projects/PROJECT_ID/locations/LOCATION_ID/services/SERVICE_ID` |
| Spanner instances | `//spanner.googleapis.com/projects/PROJECT_ID/instances/INSTANCE_ID` |
| Cloud SQL instances | `//cloudsql.googleapis.com/projects/PROJECT_ID/instances/INSTANCE_ID` |
| Cloud Storage buckets | `//storage.googleapis.com/projects/_/buckets/BUCKET_ID` |
| Compute Engine instances | `//compute.googleapis.com/projects/PROJECT_ID/zones/ZONE/instances/INSTANCE_ID` |
| Compute Engine networks | `//compute.googleapis.com/projects/PROJECT_ID/global/networks/NETWORK` |
| Compute Engine subnetworks | `//compute.googleapis.com/projects/PROJECT_ID/regions/REGION/subnetworks/SUBNETWORK` |
| GKE clusters | `//container.googleapis.com/projects/PROJECT_ID/clusters/CLUSTER_ID` |
| IAM service accounts | `//iam.googleapis.com/projects/PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT_EMAIL` |
| IAM service account keys | `//iam.googleapis.com/projects/PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT_EMAIL/keys/KEY_ID` |
| IAP App Engine app service | `//iap.googleapis.com/projects/PROJECT_NUMBER/iap_web/appengine-PROJECT_ID/services/APP_SERVICE_ID` |
| IAP Compute Engine backend service | `//iap.googleapis.com/projects/PROJECT_NUMBER/iap_web/compute/services/BACKEND_SERVICE_ID_OR_NAME` |
| Pub/Sub topics | `//pubsub.googleapis.com/projects/PROJECT_ID/topics/TOPIC_ID` |
| Organizations | `//cloudresourcemanager.googleapis.com/organizations/ORGANIZATION_NUMBER` |
| Folders | `//cloudresourcemanager.googleapis.com/folders/FOLDER_NUMBER` |
| Projects | `//cloudresourcemanager.googleapis.com/projects/PROJECT_ID` |

## Notes

- Permission errors have four causes: missing permission (no allow binding or active PAM entitlement), a deny policy, a Principal Access Boundary policy that does not include the resource, or a nonexistent resource.
- Console errors show the resource, missing permissions, suggested PAM entitlements (non-exhaustive), suggested roles ("Select a role to grant" if you can grant roles, else "Request a specific role"), and a Policy Troubleshooter URL.
- CLI/REST errors include the required permission, the resource, the authenticating account, an error ID, and a Troubleshooter link.
- The Cloud Storage bucket format shown is IAM-compatible; some services use a different format.
- IAM Conditions accept resource names for a limited number of services.
- Source: https://docs.cloud.google.com/iam/docs/permission-error-messages
- Source: https://docs.cloud.google.com/iam/docs/full-resource-names
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [deny-policies.md](./deny-policies.md)
- [pab-enforcement-versions.md](./pab-enforcement-versions.md)
