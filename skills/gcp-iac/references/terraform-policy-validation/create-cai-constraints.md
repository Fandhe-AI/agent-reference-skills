---
source: https://docs.cloud.google.com/docs/terraform/policy-validation/create-cai-constraints
---

# Create CAI constraints

CAI-based constraints operate on Cloud Asset Inventory (CAI) Asset data. `gcloud beta terraform vet` converts Terraform resource changes to CAI Asset data, so one policy can be used before apply and as an audit check with compatible tools. Includes the list of supported Terraform resources (Preview feature; requires a policy library).

## Signature / Usage

### Collect sample data

Create resources of the appropriate type and export them as JSON (see the CAI quickstart). Verify the Asset type is supported by both Cloud Asset Inventory and `gcloud beta terraform vet` (table below).

Adapted (not in the official docs): the closing quote of `"ancestors"` and the removal of the trailing comma after the array element make the sample valid JSON.

```json
[
  {
    "name": "//compute.googleapis.com/projects/789/regions/us-central1/addresses/my-internal-address",
    "asset_type": "compute.googleapis.com/Address",
    "ancestors": [
      "organization/123",
      "folder/456",
      "project/789"
    ],
    "resource": {
      "version": "v1",
      "discovery_document_uri": "https://www.googleapis.com/discovery/v1/apis/compute/v1/rest",
      "discovery_name": "Address",
      "parent": "//cloudresourcemanager.googleapis.com/projects/789",
      "data": {
        "address": "10.0.42.42",
        "addressType": "INTERNAL",
        "name": "my-internal-address",
        "region": "projects/789/global/regions/us-central1"
      }
    }
  }
]
```

### Write Rego

The asset under review is `input.review`; constraint parameters are `input.parameters`.

Adapted (not in the official docs): `allowed_address_types` is read into a set and the check is `== 0` instead of `>= 1`, so the rule fires for an `addressType` that is not in the allowlist.

```rego
# validator/gcp_compute_address_address_type_allowlist_constraint_v1.rego
package templates.gcp.GCPComputeAddressAddressTypeAllowlistConstraintV1

violation[{
  "msg": message,
  "details": metadata,
}] {
  asset := input.review
  asset.asset_type == "compute.googleapis.com/Address"

  allowed_address_types := {t | t := input.parameters.allowed_address_types[_]}
  count({asset.resource.data.addressType} & allowed_address_types) == 0
  message := sprintf(
    "Compute address %s has a disallowed address_type: %s",
    [asset.name, asset.resource.data.addressType]
  )
  metadata := {"asset": asset.name}
}
```

### Test your Rego

Put sample data in `validator/test/fixtures/gcp_compute_address_address_type_allowlist_constraint_v1_test/assets/data.json`, the directory the test below reads (`data.test.fixtures` + the test file name + `assets`). Use non-sensitive data in the Rego Playground.

Adapted (not in the official docs): `allowed_address_types` is passed as a list (`["EXTERNAL"]`) instead of the string `"EXTERNAL"`.

```rego
# validator/gcp_compute_address_address_type_allowlist_constraint_v1_test.rego
package templates.gcp.GCPComputeAddressAddressTypeAllowlistConstraintV1

import data.test.fixtures.gcp_compute_address_address_type_allowlist_constraint_v1_test.assets as assets

test_violation_with_disallowed_address_type {
  parameters := {
    "allowed_address_types": ["EXTERNAL"]
  }
  violations := violation with input.review as assets[_]
    with input.parameters as parameters
  count(violations) == 1
}
```

### Constraint template skeleton

```yaml
# policies/templates/gcp_compute_address_address_type_allowlist_constraint_v1.yaml
apiVersion: templates.gatekeeper.sh/v1beta1
kind: ConstraintTemplate
metadata:
  name: gcpcomputeaddressaddresstypeallowlistconstraintv1
spec:
  crd:
    spec:
      names:
        kind: GCPComputeAddressAddressTypeAllowlistConstraintV1
      validation:
        openAPIV3Schema:
          properties:
            allowed_address_types:
              description: "A list of address_types allowed, for example: ['INTERNAL']"
              type: array
              items:
                type: string
  targets:
    - target: validation.gcp.forsetisecurity.org
      rego: |
            #INLINE("validator/gcp_compute_address_address_type_allowlist_constraint_v1.rego")
            #ENDINLINE
```

### Set up a constraint

```yaml
# policies/constraints/gcp_compute_address_internal_only.yaml
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: GCPComputeAddressAddressTypeAllowlistConstraintV1
metadata:
  name: gcp_compute_address_internal_only
spec:
  severity: high
  match:
    ancestries:
    - "**"
  parameters:
    allowed_address_types:
    - "INTERNAL"
```

## Options / Props

### Constraint fields

| Field | Description |
|-------|-------------|
| `severity` | `low`, `medium`, or `high` |
| `match.ancestries` | Ancestry paths to include, glob-style |
| `match.excludedAncestries` | (Optional) Ancestry paths to exclude, glob-style |
| `parameters` | Values for the constraint template's input parameters |
| `kind` | Must contain the constraint template name; `metadata.name` should be a descriptive slug |

### Ancestry path matching examples

| Ancestry path matcher | Description |
|-----------------------|-------------|
| `organizations/**` | All organizations |
| `organizations/123/**` | Everything in organization 123 |
| `organizations/123/folders/**` | Everything in organization 123 that is under a folder |
| `organizations/123/folders/456` | Everything in folder 456 in organization 123 |
| `organizations/123/folders/456/projects/789` | Everything in project 789 in folder 456 in organization 123 |

### Template naming and file rules

| Rule | Detail |
|------|--------|
| Template name format | `GCP{resource}{feature}Constraint{version}`, CamelCase |
| Single-resource templates | Follow gcloud group names ("compute" not "gce", "sql" not "cloud-sql", "container-cluster" not "gke") |
| Multi-resource templates | Omit the resource part (example `GCPAddressTypeAllowlistConstraintV1`) |
| Version number | A single number, not semver; every version is a unique template |
| Rego file name | Template name in snake_case, for example `gcp_compute_address_address_type_allowlist_constraint_v1.rego` |
| Skeleton | Same file name as the Rego; `spec.crd.spec.names.kind` contains the template name; `metadata.name` is the template name lower-cased |

### Supported resources

The list depends on the installed `gcloud beta terraform vet` version.

| Terraform resource | Cloud Asset Inventory Assets |
|---|---|
| google_access_context_manager_access_policy_iam_binding | accesscontextmanager.googleapis.com/AccessPolicy |
| google_access_context_manager_access_policy_iam_member | accesscontextmanager.googleapis.com/AccessPolicy |
| google_access_context_manager_access_policy_iam_policy | accesscontextmanager.googleapis.com/AccessPolicy |
| google_access_context_manager_service_perimeter | accesscontextmanager.googleapis.com/ServicePerimeter |
| google_apigee_environment_iam_binding | apigee.googleapis.com/Environment |
| google_apigee_environment_iam_member | apigee.googleapis.com/Environment |
| google_apigee_environment_iam_policy | apigee.googleapis.com/Environment |
| google_bigquery_dataset | bigquery.googleapis.com/Dataset |
| google_bigquery_dataset_iam_binding | bigquery.googleapis.com/Dataset |
| google_bigquery_dataset_iam_member | bigquery.googleapis.com/Dataset |
| google_bigquery_dataset_iam_policy | bigquery.googleapis.com/Dataset |
| google_bigquery_table | bigquery.googleapis.com/Table |
| google_bigquery_table_iam_binding | bigquery.googleapis.com/Table |
| google_bigquery_table_iam_member | bigquery.googleapis.com/Table |
| google_bigquery_table_iam_policy | bigquery.googleapis.com/Table |
| google_bigtable_instance | bigtableadmin.googleapis.com/Cluster, bigtableadmin.googleapis.com/Instance |
| google_binary_authorization_attestor_iam_binding | binaryauthorization.googleapis.com/Attestor |
| google_binary_authorization_attestor_iam_member | binaryauthorization.googleapis.com/Attestor |
| google_binary_authorization_attestor_iam_policy | binaryauthorization.googleapis.com/Attestor |
| google_cloud_run_domain_mapping | run.googleapis.com/DomainMapping |
| google_cloud_run_service | run.googleapis.com/Service |
| google_cloud_run_service_iam_binding | run.googleapis.com/Service |
| google_cloud_run_service_iam_member | run.googleapis.com/Service |
| google_cloud_run_service_iam_policy | run.googleapis.com/Service |
| google_cloudfunctions_function | cloudfunctions.googleapis.com/CloudFunction |
| google_cloudfunctions_function_iam_binding | cloudfunctions.googleapis.com/CloudFunction |
| google_cloudfunctions_function_iam_member | cloudfunctions.googleapis.com/CloudFunction |
| google_cloudfunctions_function_iam_policy | cloudfunctions.googleapis.com/CloudFunction |
| google_compute_address | compute.googleapis.com/Address |
| google_compute_backend_service_iam_binding | compute.googleapis.com/BackendService |
| google_compute_backend_service_iam_member | compute.googleapis.com/BackendService |
| google_compute_backend_service_iam_policy | compute.googleapis.com/BackendService |
| google_compute_disk | compute.googleapis.com/Disk |
| google_compute_disk_iam_binding | compute.googleapis.com/Disk |
| google_compute_disk_iam_member | compute.googleapis.com/Disk |
| google_compute_disk_iam_policy | compute.googleapis.com/Disk |
| google_compute_firewall | compute.googleapis.com/Firewall |
| google_compute_forwarding_rule | compute.googleapis.com/ForwardingRule |
| google_compute_global_address | compute.googleapis.com/GlobalAddress |
| google_compute_global_forwarding_rule | compute.googleapis.com/GlobalForwardingRule |
| google_compute_image_iam_binding | compute.googleapis.com/Image |
| google_compute_image_iam_member | compute.googleapis.com/Image |
| google_compute_image_iam_policy | compute.googleapis.com/Image |
| google_compute_instance | compute.googleapis.com/Instance |
| google_compute_instance_iam_binding | compute.googleapis.com/Instance |
| google_compute_instance_iam_member | compute.googleapis.com/Instance |
| google_compute_instance_iam_policy | compute.googleapis.com/Instance |
| google_compute_network | compute.googleapis.com/Network |
| google_compute_region_backend_service_iam_binding | compute.googleapis.com/RegionBackendService |
| google_compute_region_backend_service_iam_member | compute.googleapis.com/RegionBackendService |
| google_compute_region_backend_service_iam_policy | compute.googleapis.com/RegionBackendService |
| google_compute_region_disk_iam_binding | compute.googleapis.com/RegionDisk |
| google_compute_region_disk_iam_member | compute.googleapis.com/RegionDisk |
| google_compute_region_disk_iam_policy | compute.googleapis.com/RegionDisk |
| google_compute_security_policy | compute.googleapis.com/SecurityPolicy |
| google_compute_snapshot | compute.googleapis.com/Snapshot |
| google_compute_ssl_policy | compute.googleapis.com/SslPolicy |
| google_compute_subnetwork | compute.googleapis.com/Subnetwork |
| google_compute_subnetwork_iam_binding | compute.googleapis.com/Subnetwork |
| google_compute_subnetwork_iam_member | compute.googleapis.com/Subnetwork |
| google_compute_subnetwork_iam_policy | compute.googleapis.com/Subnetwork |
| google_container_cluster | container.googleapis.com/Cluster |
| google_container_node_pool | container.googleapis.com/NodePool |
| google_data_catalog_entry_group_iam_binding | datacatalog.googleapis.com/EntryGroup |
| google_data_catalog_entry_group_iam_member | datacatalog.googleapis.com/EntryGroup |
| google_data_catalog_entry_group_iam_policy | datacatalog.googleapis.com/EntryGroup |
| google_data_catalog_tag_template_iam_binding | datacatalog.googleapis.com/TagTemplate |
| google_data_catalog_tag_template_iam_member | datacatalog.googleapis.com/TagTemplate |
| google_data_catalog_tag_template_iam_policy | datacatalog.googleapis.com/TagTemplate |
| google_dns_managed_zone | dns.googleapis.com/ManagedZone |
| google_dns_policy | dns.googleapis.com/Policy |
| google_endpoints_service_consumers_iam_binding | servicemanagement.googleapis.com/ServiceConsumers |
| google_endpoints_service_consumers_iam_member | servicemanagement.googleapis.com/ServiceConsumers |
| google_endpoints_service_consumers_iam_policy | servicemanagement.googleapis.com/ServiceConsumers |
| google_endpoints_service_iam_binding | servicemanagement.googleapis.com/Service |
| google_endpoints_service_iam_member | servicemanagement.googleapis.com/Service |
| google_endpoints_service_iam_policy | servicemanagement.googleapis.com/Service |
| google_filestore_instance | file.googleapis.com/Instance |
| google_folder_iam_binding | cloudresourcemanager.googleapis.com/Folder |
| google_folder_iam_member | cloudresourcemanager.googleapis.com/Folder |
| google_folder_iam_policy | cloudresourcemanager.googleapis.com/Folder |
| google_folder_organization_policy | cloudresourcemanager.googleapis.com/Folder |
| google_healthcare_consent_store_iam_binding | healthcare.googleapis.com/ConsentStore |
| google_healthcare_consent_store_iam_member | healthcare.googleapis.com/ConsentStore |
| google_healthcare_consent_store_iam_policy | healthcare.googleapis.com/ConsentStore |
| google_iap_tunnel_iam_binding | iap.googleapis.com/Tunnel |
| google_iap_tunnel_iam_member | iap.googleapis.com/Tunnel |
| google_iap_tunnel_iam_policy | iap.googleapis.com/Tunnel |
| google_iap_tunnel_instance_iam_binding | iap.googleapis.com/TunnelInstance |
| google_iap_tunnel_instance_iam_member | iap.googleapis.com/TunnelInstance |
| google_iap_tunnel_instance_iam_policy | iap.googleapis.com/TunnelInstance |
| google_iap_web_iam_binding | iap.googleapis.com/Web |
| google_iap_web_iam_member | iap.googleapis.com/Web |
| google_iap_web_iam_policy | iap.googleapis.com/Web |
| google_kms_crypto_key | cloudkms.googleapis.com/CryptoKey |
| google_kms_crypto_key_iam_binding | cloudkms.googleapis.com/CryptoKey |
| google_kms_crypto_key_iam_member | cloudkms.googleapis.com/CryptoKey |
| google_kms_crypto_key_iam_policy | cloudkms.googleapis.com/CryptoKey |
| google_kms_key_ring | cloudkms.googleapis.com/KeyRing |
| google_kms_key_ring_iam_binding | cloudkms.googleapis.com/KeyRing |
| google_kms_key_ring_iam_member | cloudkms.googleapis.com/KeyRing |
| google_kms_key_ring_iam_policy | cloudkms.googleapis.com/KeyRing |
| google_monitoring_alert_policy | monitoring.googleapis.com/AlertPolicy |
| google_monitoring_notification_channel | monitoring.googleapis.com/NotificationChannel |
| google_notebooks_instance_iam_binding | notebooks.googleapis.com/Instance |
| google_notebooks_instance_iam_member | notebooks.googleapis.com/Instance |
| google_notebooks_instance_iam_policy | notebooks.googleapis.com/Instance |
| google_notebooks_runtime_iam_binding | notebooks.googleapis.com/Runtime |
| google_notebooks_runtime_iam_member | notebooks.googleapis.com/Runtime |
| google_notebooks_runtime_iam_policy | notebooks.googleapis.com/Runtime |
| google_organization_iam_binding | cloudresourcemanager.googleapis.com/Organization |
| google_organization_iam_custom_role | iam.googleapis.com/Role |
| google_organization_iam_member | cloudresourcemanager.googleapis.com/Organization |
| google_organization_iam_policy | cloudresourcemanager.googleapis.com/Organization |
| google_organization_policy | cloudresourcemanager.googleapis.com/Organization |
| google_privateca_ca_pool_iam_binding | privateca.googleapis.com/CaPool |
| google_privateca_ca_pool_iam_member | privateca.googleapis.com/CaPool |
| google_privateca_ca_pool_iam_policy | privateca.googleapis.com/CaPool |
| google_privateca_certificate_template_iam_binding | privateca.googleapis.com/CertificateTemplate |
| google_privateca_certificate_template_iam_member | privateca.googleapis.com/CertificateTemplate |
| google_privateca_certificate_template_iam_policy | privateca.googleapis.com/CertificateTemplate |
| google_project | cloudbilling.googleapis.com/ProjectBillingInfo, cloudresourcemanager.googleapis.com/Project |
| google_project_iam_binding | cloudresourcemanager.googleapis.com/Project |
| google_project_iam_custom_role | iam.googleapis.com/Role |
| google_project_iam_member | cloudresourcemanager.googleapis.com/Project |
| google_project_iam_policy | cloudresourcemanager.googleapis.com/Project |
| google_project_organization_policy | cloudresourcemanager.googleapis.com/Project |
| google_project_service | serviceusage.googleapis.com/Service |
| google_pubsub_lite_reservation | pubsublite.googleapis.com/Reservation |
| google_pubsub_lite_subscription | pubsublite.googleapis.com/Subscription |
| google_pubsub_lite_topic | pubsublite.googleapis.com/Topic |
| google_pubsub_schema | pubsub.googleapis.com/Schema |
| google_pubsub_subscription | pubsub.googleapis.com/Subscription |
| google_pubsub_subscription_iam_binding | pubsub.googleapis.com/Subscription |
| google_pubsub_subscription_iam_member | pubsub.googleapis.com/Subscription |
| google_pubsub_subscription_iam_policy | pubsub.googleapis.com/Subscription |
| google_pubsub_topic | pubsub.googleapis.com/Topic |
| google_pubsub_topic_iam_binding | pubsub.googleapis.com/Topic |
| google_pubsub_topic_iam_member | pubsub.googleapis.com/Topic |
| google_pubsub_topic_iam_policy | pubsub.googleapis.com/Topic |
| google_redis_instance | redis.googleapis.com/Instance |
| google_secret_manager_secret_iam_binding | secretmanager.googleapis.com/Secret |
| google_secret_manager_secret_iam_member | secretmanager.googleapis.com/Secret |
| google_secret_manager_secret_iam_policy | secretmanager.googleapis.com/Secret |
| google_spanner_database | spanner.googleapis.com/Database |
| google_spanner_database_iam_binding | spanner.googleapis.com/Database |
| google_spanner_database_iam_member | spanner.googleapis.com/Database |
| google_spanner_database_iam_policy | spanner.googleapis.com/Database |
| google_spanner_instance | spanner.googleapis.com/Instance |
| google_spanner_instance_iam_binding | spanner.googleapis.com/Instance |
| google_spanner_instance_iam_member | spanner.googleapis.com/Instance |
| google_spanner_instance_iam_policy | spanner.googleapis.com/Instance |
| google_sql_database | sqladmin.googleapis.com/Database |
| google_sql_database_instance | sqladmin.googleapis.com/Instance |
| google_storage_bucket | storage.googleapis.com/Bucket |
| google_storage_bucket_iam_binding | storage.googleapis.com/Bucket |
| google_storage_bucket_iam_member | storage.googleapis.com/Bucket |
| google_storage_bucket_iam_policy | storage.googleapis.com/Bucket |
| google_vpc_access_connector | vpcaccess.googleapis.com/Connector |

## Notes

- Preview feature (Pre-GA Offerings Terms apply).
- Compatible tools (not official Google products and not supported, but might be compatible with policies written for `gcloud beta terraform vet`): CFT Scorecard (https://github.com/GoogleCloudPlatform/cloud-foundation-toolkit/blob/master/cli/docs/scorecard.md) and Forseti (https://opensource.google/projects/forsetisecurity).
- CAI data is usually only available after a resource has been created or updated; converting Terraform resource changes to CAI Assets lets one policy run before apply and as an audit.
- If a resource address matches both `ancestries` and `excludedAncestries`, it is excluded.
- Limitations: values computed server side are unknown in the plan and therefore also absent from the converted CAI Assets. Ancestry uses the default project (`--project`) to resolve unknown project IDs; without one the path defaults to `organizations/unknown`. The source's `GCPAlwaysViolatesConstraintV1` constraint that disallows unknown ancestry is the same as the one in create-terraform-constraints.md (omitted here).
- To request support for a resource not on the list, open an enhancement request on https://github.com/GoogleCloudPlatform/terraform-google-conversion/issues/new?assignees&labels=enhancement&projects&template=enhancement.md and consider contributing code.
- Corrected from the official docs: the source sample has `"ancestors: [` (no closing quote) and a trailing `},` before `]`, which is not valid JSON.
- Corrected from the official docs: the source Rego uses `count({asset.resource.data.addressType} & allowed_address_types) >= 1`, which raises a violation only for allowed types. The same page contradicts it: the message reads "has a disallowed address_type", the template is an allowlist ("A list of address_types allowed"), the constraint is introduced with "to only allow `INTERNAL` address types", and `test_violation_with_disallowed_address_type` allows `EXTERNAL` against the `INTERNAL` sample data and expects `count(violations) == 1`.
- Corrected from the official docs: the source test passes `"allowed_address_types": "EXTERNAL"` (a string), while the template schema declares `type: array` of `string` and the Rego intersects it with a set (`&`); the Rego therefore reads the parameter into a set and the test passes a list.
- Source inconsistency: the prose says "Your Rego must have a `violations` rule", while the code defines `violation`.
- Corrected from the official docs: the source puts sample data in `validator/test/fixtures/<constraint filename>/assets/data.json`, while its test reads `data.test.fixtures.gcp_compute_address_address_type_allowlist_constraint_v1_test.assets` (the test file name), so data placed as the prose says is not found. The page names the fixture directory after the test file, `validator/test/fixtures/gcp_compute_address_address_type_allowlist_constraint_v1_test/assets/data.json`, to match the test.
- Run `make build` in the policy-library repository to inline the Rego into `policies/templates` (the directory layout is the same as in create-terraform-constraints.md, with `gcp_` file names).
- Source: https://docs.cloud.google.com/docs/terraform/policy-validation/create-cai-constraints (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-policy-library.md](./create-policy-library.md)
- [create-terraform-constraints.md](./create-terraform-constraints.md)
- [policy-validation-troubleshooting.md](./policy-validation-troubleshooting.md)
- [validate-policies.md](./validate-policies.md)
