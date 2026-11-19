---
source: https://docs.cloud.google.com/bigquery/docs/vpc-sc
---

# VPC Service Controls for BigQuery

VPC Service Controls creates security perimeters around BigQuery resources, independent of IAM controls. Use them to prevent data leakage (access is limited to what ingress and egress rules allow), to load data securely from third-party sources or Google Cloud services such as Cloud Storage, and to control exports from BigQuery to Cloud Storage or other targets. VPC Service Controls itself is covered by the `gcp-security` skill.

## Signature / Usage

Before you begin: get the permissions needed to configure service perimeters (see Access control with IAM for VPC Service Controls) and have an access policy for your organization.

### Create an access level for an IP range

```bash
echo """
- ipSubnetworks:
  - 162.222.181.0/24
  - 2001:db8::/48
""" > level.yaml

gcloud access-context-manager levels create ACCESS_LEVEL_NAME \
    --title="TITLE" --basic-level-spec=level.yaml
```

### Create a perimeter around the BigQuery project

Adapted (not in the official docs): added the missing `\` line continuation after `--ingress-policies=ingress.yaml`, so `--policy` is part of the same command.

```bash
echo """
- ingressFrom:
    identityType: ANY_IDENTITY
    sources:
    - accessLevel: accessPolicies/POLICY_NAME/accessLevels/ACCESS_LEVEL_NAME
  ingressTo:
    operations:
    - methodSelectors:
      - method: '*'
      serviceName: bigquery.googleapis.com
    resources:
    - '*'

""" > ingress.yaml

gcloud access-context-manager perimeters create BIGQUERY_PERIMETER --title="TITLE" \
    --resources=BIGQUERY_PROJECT_NUMBER \
    --restricted-services=bigquery.googleapis.com \
    --ingress-policies=ingress.yaml \
    --policy=POLICY_NAME
```

### Update an existing perimeter

Adapted (not in the official docs): `--policy=POLICY_NAME` is added, as in the other `perimeters update` commands of the source.

```bash
gcloud access-context-manager perimeters update BIGQUERY_PERIMETER --policy=POLICY_NAME --set-ingress-policies=ingress.yaml
```

### Query an external table in a Cloud Storage bucket in another project

Allow the BigQuery project to access the Cloud Storage project (egress rule on the perimeter around the Cloud Storage project):

```bash
echo """
- egressFrom:
    identityType: ANY_IDENTITY
  egressTo:
    operations:
    - methodSelectors:
      - method: '*'
      serviceName: storage.googleapis.com
    resources:
    - projects/BIGQUERY_PROJECT_NUMBER
""" > egress.yaml

gcloud access-context-manager perimeters update CLOUD_STORAGE_PERIMETER --policy=POLICY_NAME --set-egress-policies=egress.yaml
```

Allow the Cloud Storage project to access the BigQuery project (egress rule on the perimeter around the BigQuery project):

```bash
echo """
- egressFrom:
    identityType: ANY_IDENTITY
  egressTo:
    operations:
    - methodSelectors:
      - method: '*'
      serviceName: storage.googleapis.com
    resources:
    - projects/CLOUD_STORAGE_PROJECT_NUMBER
""" > egress1.yaml

gcloud access-context-manager perimeters update BIGQUERY_PERIMETER --policy=POLICY_NAME --set-egress-policies=egress1.yaml
```

Optional: if the perimeter around the BigQuery project includes `storage.googleapis.com` as a restricted service, update the ingress rule.

Adapted (not in the official docs): the source repeats `perimeters create` for the perimeter created above, which fails because it already exists; this uses `perimeters update` with `--set-ingress-policies`.

```bash
echo """
- ingressFrom:
    identityType: ANY_IDENTITY
    sources:
    - accessLevel: accessPolicies/POLICY_NAME/accessLevels/ACCESS_LEVEL_NAME
  ingressTo:
    operations:
    - methodSelectors:
      - method: '*'
      serviceName: bigquery.googleapis.com
    - methodSelectors:
      - method: '*'
      serviceName: storage.googleapis.com
    resources:
    - '*'

""" > ingress.yaml

gcloud access-context-manager perimeters update BIGQUERY_PERIMETER --policy=POLICY_NAME --set-ingress-policies=ingress.yaml
```

## Options / Props

### Placeholders

| Placeholder | Meaning |
|---|---|
| `ACCESS_LEVEL_NAME` | ID of the access level |
| `TITLE` | Human-readable title (for the access level or the service perimeter) |
| `POLICY_NAME` | ID of the access policy |
| `BIGQUERY_PERIMETER` | ID of the perimeter protecting the BigQuery resource (the source also writes it as `PERIMETER`) |
| `BIGQUERY_PROJECT_NUMBER` | ID (number) of the BigQuery project |
| `CLOUD_STORAGE_PERIMETER` | ID of the perimeter protecting the Cloud Storage resources |
| `CLOUD_STORAGE_PROJECT_NUMBER` | ID (number) of the Cloud Storage project |

## Notes

- Corrected from the official docs: the source's create-perimeter block has `--ingress-policies=ingress.yaml` and `--policy=POLICY_NAME` on separate lines with no `\`, and the optional ingress step runs `perimeters create BIGQUERY_PERIMETER ...` again (original fragment: `gcloud access-context-manager perimeters create BIGQUERY_PERIMETER --title="TITLE" \ ... --ingress-policies=ingress.yaml`).
- `--set-ingress-policies` / `--set-egress-policies` replace the perimeter's whole ingress / egress policy list with the file contents; include the existing rules in the YAML when updating.
- Test a perimeter before enforcing it: see dry run mode for service perimeters (https://docs.cloud.google.com/vpc-service-controls/docs/dry-run-mode) and using dry-run mode to test ingress or egress policies (https://docs.cloud.google.com/vpc-service-controls/docs/ingress-egress-rules#using-dryrun-ingress-egress-rules).
- BigQuery Omni: perimeters can restrict access between BigQuery Omni and an external cloud service; see the VPC Service Controls configuration in https://docs.cloud.google.com/bigquery/docs/omni-azure-create-external-table#vpc-service (Azure Blob Storage BigLake table).
- BigQuery sharing (formerly Analytics Hub) rules: https://docs.cloud.google.com/bigquery/docs/analytics-hub-vpc-sc-rules. Support and limitations in BigQuery: https://docs.cloud.google.com/vpc-service-controls/docs/supported-products#table_bigquery. Troubleshooting: https://docs.cloud.google.com/vpc-service-controls/docs/troubleshooting#debugging.
- Cloud Storage as a source or sink is covered by the `gcp-storage` skill.
- Adapted from the official docs: the ingress `perimeters update` example omits `--policy`; the command takes `PERIMETER : --policy=POLICY` and needs `--policy` unless the `access_context_manager/policy` property is set, so `--policy=POLICY_NAME` is added as in the source's egress examples.
- Source: https://docs.cloud.google.com/bigquery/docs/vpc-sc (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [audit-logging.md](./audit-logging.md)
- [customer-managed-encryption.md](./customer-managed-encryption.md)
- Overview of VPC Service Controls: https://docs.cloud.google.com/vpc-service-controls/docs/overview
- Create an access policy: https://docs.cloud.google.com/access-context-manager/docs/create-access-policy
