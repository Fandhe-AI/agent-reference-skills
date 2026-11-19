---
source: https://docs.cloud.google.com/deployment-manager/docs/dm-convert/convert
---

# Converting Deployment Manager Configurations with DM Convert

Step-by-step guide (Preview) for converting a Deployment Manager configuration to Terraform (HCL) or KRM with the DM Convert docker image, applying the result with Terraform or Config Connector, importing existing resources, and abandoning the old deployment.

## Signature / Usage

### Set up environment variables

Adapted (not in the official docs): removed the trailing `\` after the first `export` line, which joined the two `export` commands into one.

```bash
export PROJECT_ID=$(gcloud config get-value project)
export DM_CONVERT_IMAGE="us-central1-docker.pkg.dev/\
dm-convert-host/deployment-manager/dm-convert:public-preview"
```

Required tools: `gcloud`, `docker`, `kubectl`, `bq`, `jq` (all available in Cloud Shell).

### Prepare the configuration

Replace `PROJECT_ID` with your project ID and save as `deployment.yaml`:

```yaml
resources:
- name: bigquerydataset
  type: bigquery.v2.dataset
  properties:
    datasetReference:
      datasetId: bigquerydataset
      projectId: PROJECT_ID
    defaultTableExpirationMs: 36000000
    location: us-west1
- type: bigquery.v2.table
  name: bigquerytable
  properties:
    datasetId: bigquerydataset
    labels:
      data-source: external
      schema-type: auto-junk
    tableReference:
      projectId: PROJECT_ID
      tableId: bigquerytable
  metadata:
    dependsOn:
    - bigquerydataset
```

Or acquire the expanded configuration of a live deployment (replace `DEPLOYMENT_NAME` and `PROJECT_ID`):

```bash
# Configure your project/deployment
DEPLOYMENT_NAME=DEPLOYMENT_NAME
PROJECT_ID=PROJECT_ID

# Fetch the latest manifest for the given deployment
gcloud deployment-manager deployments describe $DEPLOYMENT_NAME \
  --project $PROJECT_ID --format="value(deployment.manifest)"

# The output should look like this:
# https://www.googleapis.com/deploymentmanager/v2/projects/$PROJECT_ID/global/deployments/bq/manifests/manifest-1618872644848

# The manifest name is the last path segment from the URI
# in the above command output
MANIFEST_NAME="manifest-1618872644848"
# Save the expanded manifest to deployment.yaml
gcloud deployment-manager manifests describe $MANIFEST_NAME \
  --deployment $DEPLOYMENT_NAME --project $PROJECT_ID \
  --format="value(expandedConfig)" > deployment.yaml
```

### Convert

Run in the directory containing `deployment.yaml`:

Adapted (not in the official docs): `$(pwd)` is quoted so a working directory whose path contains spaces is mounted as one `--volume` argument.

```bash
CONVERTED_RESOURCES=OUTPUT_FILE

docker run --rm -it --workdir=/convert \
--volume="$(pwd)":/convert \
$DM_CONVERT_IMAGE \
--config deployment.yaml \
--output_format OUTPUT_FORMAT \
--output_file OUTPUT_FILE \
--output_tf_import_file OUTPUT_IMPORT_FILE \
--deployment_name DEPLOYMENT_NAME \
--project_id $PROJECT_ID
```

View the result:

```bash
cat OUTPUT_FILE
```

### Apply with Terraform

Adapted (not in the official docs): `cat <<EOF > echo > main.tf` is corrected to `cat <<EOF > main.tf`.

```bash
# Configure default project
cat <<EOF > main.tf
provider "google" {
  project = "$PROJECT_ID"
}
EOF
```

```bash
# NOTE: if Terraform state gets corrupted during testing,
# use init --reconfigure to reset backend
terraform init
echo "***************  TERRAFORM PLAN  ******************"
terraform plan
echo "**************  TERRAFORM APPLY  ******************"
terraform apply
```

### (Optional) Import existing resources

```bash
# NOTE: if Terraform state gets corrupted during testing,
# use init --reconfigure to reset backend
terraform init
```

Review the generated import commands, make them executable, run them, then plan:

```bash
cat OUTPUT_IMPORT_FILE
```

```bash
# Make the import file executable
chmod +x OUTPUT_IMPORT_FILE
# Perform the import
./OUTPUT_IMPORT_FILE
```

```bash
terraform plan
```

The plan shows both resources updated in place, removing the Deployment Manager label `goog-dm` (`Plan: 0 to add, 2 to change, 0 to destroy.`). Then apply:

```bash
# Accept changes by entering yes when prompted
terraform apply
```

Verify Terraform manages the resources by changing `default_table_expiration_ms` of `google_bigquery_dataset.bigquerydataset` from 10 hours to 12 hours (`43200000`), applying, then checking with `bq`:

```bash
# Accept changes by entering yes when prompted
terraform apply
# Access the dataset properties via bq to verify the changes
bq show --format=prettyjson bigquerydataset | jq '.defaultTableExpirationMs'
```

### Apply with Config Connector (KRM)

Config Connector needs a Kubernetes cluster with the add-on (see https://docs.cloud.google.com/config-connector/docs/how-to/install-upgrade-uninstall).

```bash
gcloud container clusters get-credentials GKE_CLUSTER
```

```bash
# Ensure that the namespace is annotated to create resources in the correct
# project/folder/organization. https://cloud.google.com/config-connector/docs/how-to/install-upgrade-uninstall#specify
kubectl apply -n CONFIG_CONNECTOR_NAMESPACE \
  -f OUTPUT_FILE

# Wait for the resources to become healthy
kubectl wait -n CONFIG_CONNECTOR_NAMESPACE \
  --for=condition=Ready \
  --timeout=5m -f OUTPUT_FILE
```

### Clean up the sample (destructive)

```bash
# NOTE: if Terraform state gets corrupted during testing,
# use init --reconfigure to reset backend
echo "***************  TERRAFORM INIT  ******************"
terraform init
# Remove delete protection on BigQuery table
sed -i "/resource \"google_bigquery_table\"/a deletion_protection=\"false\"" \
OUTPUT_FILE
terraform apply
echo "***************  TERRAFORM DESTROY ****************"
terraform destroy
```

```bash
# If the resource was created via Config Connector:
kubectl delete -n CONFIG_CONNECTOR_NAMESPACE \
  -f OUTPUT_FILE
```

### Abandon the sample deployment

Run only for sample deployments created in this guide:

```bash
gcloud deployment-manager deployments delete DEPLOYMENT_NAME --delete-policy ABANDON
```

### List supported resources

```bash
docker run --rm -it \
us-central1-docker.pkg.dev/dm-convert-host/deployment-manager/dm-convert:public-preview \
--output_format tf \
--list_supported_types
```

## Options / Props

| Flag / placeholder | Description |
|--------------------|-------------|
| `--config` | Input Deployment Manager configuration (`deployment.yaml`) |
| `--output_format` / `OUTPUT_FORMAT` | `TF` for Terraform or `KRM`; the list commands use lowercase `tf` / `krm` |
| `--output_file` / `OUTPUT_FILE` | File that receives the converted output |
| `--output_tf_import_file` / `OUTPUT_IMPORT_FILE` | (Terraform only) file that receives the import commands; generated from `--project_id` if given, otherwise from the resource's `projectId` attribute |
| `--deployment_name` / `DEPLOYMENT_NAME` | Deployment name; relevant if templates use the `deployment` environment variable |
| `--project_id` | Project used for import commands |
| `--list_supported_types` | Print supported resource types and type providers |
| `--opt_out_data_collection` | `true` disables anonymous usage data for that run |
| `--log_dir` | Directory for DM Convert logs |

## Notes

- Deprecated: the Deployment Manager documentation says "Support for Google Cloud Deployment Manager was discontinued on April 1, 2026." and "After June 30, 2027, you won't be able to use the Deployment Manager service, and it will be turned down."; use Infrastructure Manager (https://docs.cloud.google.com/deployment-manager/docs/deprecations, retrieved 2026-11-19).
- Preview: subject to the "Pre-GA Offerings Terms"; available "as is" with limited support.
- Corrected from the official docs: the source had `export PROJECT_ID=$(gcloud config get-value project) \`, whose trailing `\` joins the two `export` lines into one command; the `\` was removed.
- Corrected from the official docs: the source had `cat <<EOF > echo > main.tf`, where the heredoc still goes to `main.tf` (the last redirection) but an extra empty file named `echo` is created; it was changed to `cat <<EOF > main.tf`.
- Corrected from the official docs: the source mounts `--volume=$(pwd):/convert` with an unquoted command substitution, which the shell splits when the current directory path contains spaces; it was changed to `--volume="$(pwd)":/convert`.
- `--delete-policy` takes `abandon` or `delete` (default `delete`) in gcloud 593.0.0 help; the upper-case `ABANDON` in the source command is also accepted. `abandon` only removes the resource reference from the deployment.
- Destructive: `terraform destroy`, `kubectl delete` and `gcloud deployment-manager deployments delete` remove resources (the last one with `--delete-policy delete`, the default); try them on a disposable project first. The `sed -i` form is the GNU syntax used in Cloud Shell; the sample table is `google_bigquery_table`.
- The source runs the generated import script directly; review it first (`cat OUTPUT_IMPORT_FILE`) as the source does. Review diffs between imported state and generated configuration before applying. The `goog-dm` label removal in the plan is accepted because Deployment Manager labels are not needed once Terraform manages the resources.
- The source's Terraform setup is "suitable for testing purposes"; for production store state in Cloud Storage (https://docs.cloud.google.com/architecture/managing-infrastructure-as-code). The `gcloud container clusters get-credentials` command takes `--location`, `--region` or `--zone` in gcloud 593.0.0 help unless a default is configured.
- Config Connector itself has no cost, but GKE clusters and the resources it creates do.
- Terraform CLI and HCL behave as HashiCorp documents them; this skill covers using them with Google Cloud. The GKE cluster itself and Config Sync are in `gcp-gke`.
- To list the supported KRM types, run the same command with `--output_format krm`. The example `terraform plan` output and the edited HCL fragment of the source are not reproduced here.
- Source: https://docs.cloud.google.com/deployment-manager/docs/dm-convert/convert (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [dm-convert.md](./dm-convert.md)
- [best-practices.md](./best-practices.md)
- [troubleshooting.md](./troubleshooting.md)
