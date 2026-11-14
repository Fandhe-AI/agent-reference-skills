---
source: https://docs.cloud.google.com/sdk/gcloud/reference/recommender
---

# Diagnostics and Troubleshooting

Copy-paste commands for diagnosing access and policy problems: effective policies, policy history, asset insights, simulations and ADC errors.

## Signature / Usage

### List all allow and deny policies that apply to a project

```bash
gcloud beta projects get-ancestors-iam-policy PROJECT_ID --include-deny --format=json
```

Requires Security Reviewer (`roles/iam.securityReviewer`) on the organization that contains the resource. An organization-level deny cannot be overridden by child policies.

### Effective allow policy of a resource

```bash
gcloud asset get-effective-iam-policy \
    --scope=organizations/my-organization-id \
    --names=//compute.googleapis.com/projects/my-project/zones/us-central1-a/instances/my-instance
```

### Review IAM policy changes

Audit log entries for `SetIamPolicy`:

```bash
gcloud logging read \
    'logName:RESOURCE_TYPE/RESOURCE_ID/logs/cloudaudit.googleapis.com%2Factivity
    AND protoPayload.methodName=SetIamPolicy' \
    --freshness=TIME_PERIOD \
    --RESOURCE_TYPE_SINGULAR=RESOURCE_ID
```

Cloud Asset Inventory history of IAM policies:

```bash
gcloud asset get-history \
    --RESOURCE_TYPE=RESOURCE_ID \
    --asset-names=ASSET_NAME_1,ASSET_NAME_2,... \
    --content-type=iam-policy \
    --start-time=START_TIME \
    --end-time=END_TIME
```

### Find who holds a role or permission

```bash
gcloud asset search-all-iam-policies \
    --scope=projects/my-project \
    --query="policy:alex@example.com policy.role.permissions:\"\"" \
    --asset-types=cloudresourcemanager.* \
    --format="default(explanation.matchedPermissions)"
```

### Recommender insights from Cloud Asset Inventory

```bash
gcloud recommender insights list \
    --project=my-project \
    --location=global \
    --insight-type=google.cloudasset.asset.Insight
```

Filter by subtype:

```bash
gcloud recommender insights list \
    --SCOPE \
    --location=global \
    --insight-type=google.cloudasset.asset.Insight \
    --filter="insightSubtype:SUBTYPE"
```

### Simulate an organization policy change

```bash
gcloud policy-intelligence simulate orgpolicy \
  --organization=ORGANIZATION_ID \
  --policies=POLICY_PATH
```

### Inspect a policy and a custom constraint

```bash
gcloud org-policies describe gcp.restrictServiceUsage \
  --project=PROJECT_ID
```

```bash
gcloud org-policies describe-custom-constraint CONSTRAINT_NAME \
    --organization=ORGANIZATION_ID
```

### Validate an IAM condition (alpha)

```bash
gcloud alpha iam policies lint-condition --condition-from-file="condition.json"
```

### Check billing and quota state

```bash
gcloud beta billing projects describe PROJECT_ID
```

```bash
gcloud quotas info list --project=PROJECT_ID_OR_NUMBER \
    --service=SERVICE_NAME --format="value(metric)"
```

### Fix ADC quota-project and credential errors

```bash
gcloud auth application-default set-quota-project YOUR_PROJECT
```

```bash
gcloud config set billing/quota_project YOUR_PROJECT
```

```bash
gcloud auth list
```

### Test whether the caller holds permissions (REST)

Save the permissions to check in `request.json`:

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://cloudresourcemanager.googleapis.com/v1/projects/PROJECT_ID:testIamPermissions"
```

## Options / Props

| Placeholder | Meaning |
| --- | --- |
| `RESOURCE_TYPE` | `projects`, `folders` or `organizations` (logging); singular form for `--RESOURCE_TYPE_SINGULAR` and `asset get-history` |
| `TIME_PERIOD` | Log freshness window; default `1d` |
| `START_TIME` / `END_TIME` | History range; maximum 7 days, no more than 35 days in the past |
| `--insight-type` | `google.cloudasset.asset.Insight` for asset insights |

## Notes

- The fetched sources describe Policy Troubleshooter only as a console and API tool and give no `gcloud policy-troubleshoot` command, so none is included here.
- All commands on this page are read-only or dry-run; `set-quota-project` and `config set` change local configuration only. Run them in a test environment first.
- Recommender asset insights need the Recommender API enabled and `recommender.cloudAssetInsights.*` permissions.
- Source: https://docs.cloud.google.com/iam/docs/troubleshoot-policies (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/iam/docs/review-iam-policy-history (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/iam/docs/testing-permissions (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/iam/docs/linting-policies (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/asset-inventory/docs/asset-insights (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/asset-inventory/docs/view-effective-policies (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/using-constraints (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/docs/authentication/troubleshoot-adc (retrieved 2026-11-14)

## Related

- [troubleshoot-policies.md](../references/iam-guides/iam-troubleshooting/troubleshoot-policies.md)
- [review-iam-policy-history.md](../references/iam-guides/iam-troubleshooting/review-iam-policy-history.md)
- [test-iam-permissions.md](../references/iam-guides/access-testing/test-iam-permissions.md)
- [asset-insights.md](../references/asset-support/asset-analysis/asset-insights.md)
- [troubleshoot-adc.md](../references/auth-mcp/adc/troubleshoot-adc.md)
