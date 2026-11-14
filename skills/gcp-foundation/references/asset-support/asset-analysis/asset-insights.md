---
source: https://docs.cloud.google.com/asset-inventory/docs/asset-insights
---

# Asset Insights

Cloud Asset Inventory insights detect risks in IAM policies of your resources. They are part of the Recommender service, provided as insight type `google.cloudasset.asset.Insight`, and generated daily from a snapshot of Cloud Asset Inventory data.

## Signature / Usage

Prerequisites: enable the Recommender API; hold `recommender.cloudAssetInsights.get`, `.list`, `.update` (or Cloud Asset Insights Viewer `roles/recommender.cloudAssetInsightsViewer` / Admin `roles/recommender.cloudAssetInsightsAdmin`).

```bash
gcloud recommender insights list \
    --SCOPE \
    --location=global \
    --insight-type=google.cloudasset.asset.Insight \
    --filter="insightSubtype:SUBTYPE"
```

Example:

```bash
gcloud recommender insights list \
    --project=my-project \
    --location=global \
    --insight-type=google.cloudasset.asset.Insight
```

Response:

```
INSIGHT_ID: 00000000-0000-0000-0000-000000000000
CATEGORY: SECURITY
INSIGHT_STATE: ACTIVE
LAST_REFRESH_TIME: 2024-01-30T00:00:00Z
SEVERITY: LOW
INSIGHT_SUBTYPE: EXTERNAL_MEMBER
DESCRIPTION: Domain example.com detected in 1 IAM policies
```

REST:

```bash
curl -X GET \
     -H "X-Goog-User-Project: BILLING_PROJECT_ID" \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     https://recommender.googleapis.com/v1/projects/my-project/locations/global/insightTypes/google.cloudasset.asset.Insight/insights
```

Response content (`EXTERNAL_MEMBER`):

```json
{
   "name": "organizations/000000000000/locations/global/insightTypes/google.cloudasset.asset.Insight/insights/00000000-0000-0000-0000-000000000000",
   "description": "Domain example.com detected in 1 IAM policies",
   "content": {
      "domain": "example.com",
      "policyCount": 1,
      "policySearchQuery": "policy: example.com",
      "matchedPolicies" :[
         {
            "resource" :"//cloudresourcemanager.googleapis.com/projects/000000000000",
            "project" :"projects/000000000000",
            "matchedBindings" :[
               {
                  "role" :"roles/viewer",
                  "matchedMembers" :[
                     "user:example@example.com"
                  ]
               }
            ]
         }
      ]
   },
   "lastRefreshTime": "2024-01-30T00:00:00Z",
   "observationPeriod": "0s",
   "stateInfo": {
      "state": "ACTIVE"
   },
   "category": "SECURITY",
   "targetResources": [
      "//cloudresourcemanager.googleapis.com/organizations/000000000000"
   ],
   "insightSubtype": "EXTERNAL_MEMBER",
   "etag": "\"00000000000\"",
   "initialRefreshTime": "2024-01-30T00:00:00Z"
}
```

## Options / Props

Insight subtypes:

| Subtype | Detects |
|---------|---------|
| `EXTERNAL_MEMBER` | IAM policies with users or groups from a domain outside your organization's domains |
| `EXTERNAL_POLICY_EDITOR` | External users or groups granted permission to modify IAM policies |
| `EXTERNAL_CLOUD_STORAGE_OBJECT_VIEWER` | External users or groups granted `storage.objects.list` or `storage.objects.get` |
| `EXTERNAL_SERVICE_ACCOUNT_IMPERSONATOR` | External users or groups granted permission to impersonate service accounts |
| `TERMINATED_MEMBER` | Users or groups with deactivated, deleted, or purged accounts |
| `PUBLIC_IAM_POLICY` | Policies containing all users or all authenticated users |
| `OWNER_TERMINATED_PROJECT` | Projects with no active users or groups in the project's IAM policy |

Extra `content` fields:

| Field | Included in |
|-------|-------------|
| `user` | `TERMINATED_MEMBER` |
| `domain` | `EXTERNAL_MEMBER`, `EXTERNAL_POLICY_EDITOR`, `EXTERNAL_CLOUD_STORAGE_OBJECT_VIEWER`, `EXTERNAL_SERVICE_ACCOUNT_IMPERSONATOR` |
| `assetName` | `OWNER_TERMINATED_PROJECT`, `PUBLIC_IAM_POLICY` |
| `policyCount` | All subtypes: distinct policies with matching members |
| `matchedPolicies` | All subtypes: sampling of matching policies (matching bindings and members only) |
| `policySearchQuery` | A query for the IAM policy search API to fetch the policies in real time |

`SCOPE` is `project=`, `folder=`, or `organization=`; if `--filter` is omitted all subtypes are returned.

## Notes

- Insights ignore group memberships and service accounts and are not an exhaustive vulnerability list.
- Each insight includes a sample capped at 100 distinct policies; retrieve all matches with an IAM policy search.
- Source: https://docs.cloud.google.com/asset-inventory/docs/asset-insights (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [search-iam-policies.md](./search-iam-policies.md)
- [effective-policies-and-analysis.md](./effective-policies-and-analysis.md)
