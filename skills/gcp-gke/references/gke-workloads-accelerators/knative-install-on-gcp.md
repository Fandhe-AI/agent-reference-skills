---
source: https://docs.cloud.google.com/kubernetes-engine/enterprise/knative-serving/docs/install/on-gcp
---

# Install Knative serving on Google Cloud

Install the default components of Knative serving on GKE clusters in Google Cloud. Knative serving now uses Cloud Service Mesh and GKE Enterprise fleets. The default install targets public clusters and enables Cloud Monitoring metrics for GKE Enterprise on Google Cloud clusters.

## Signature / Usage

### Check whether the "GKE add-on" installation exists

Run this before installing. Replace `CLUSTER_NAME` with the cluster name, `CLUSTER_LOCATION` with its location (region or zone), and `PROJECT_ID` with your project ID.

Adapted (not in the official docs): `--region` replaced with `--location` because the location may be a zone (the source example passes the zone `us-central1-c` to `--region`).

```bash
gcloud container clusters describe \
CLUSTER_NAME \
--location CLUSTER_LOCATION \
--project PROJECT_ID --format='get(addonsConfig.cloudRunConfig)'
```

Nothing returned means the add-on was never installed; `disabled=true` means it was uninstalled; configuration details such as `loadBalancerType=LOAD_BALANCER_TYPE_EXTERNAL` mean the add-on is installed (use the upgrade-to-fleets steps instead). Example:

Adapted (not in the official docs): `--region` replaced with `--location`, because `us-central1-c` is a zone.

```bash
gcloud container clusters describe my-addon-cluster \
--location us-central1-c --project my-gcp-project \
--format='get(addonsConfig.cloudRunConfig)'
```

Response:

```text
loadBalancerType=LOAD_BALANCER_TYPE_EXTERNAL
```

### Install

1. Enable Knative serving in your fleet (replace `PROJECT_ID` with your project ID):

```bash
gcloud container fleet cloudrun enable --project=PROJECT_ID
```

2. Optional: verify the feature component. The `appdevexperience` state should be `ACTIVE`:

```console
gcloud container fleet features list  --project=PROJECT_ID
```

Result:

```console
NAME               STATE
appdevexperience   ACTIVE
```

3. For each GKE Enterprise cluster where you want Knative serving, run the following. Replace `CLUSTER_LOCATION` with the region or zone and `CLUSTER_NAME` with the cluster ID or fully qualified identifier.

```bash
gcloud container fleet cloudrun apply --gke-cluster=CLUSTER_LOCATION/CLUSTER_NAME
```

4. Verify the Knative serving version labels, then check that all Knative serving deployments are running in the `knative-serving` and `appdevexperience` namespaces:

Adapted (not in the official docs): `kubectl get all` returns a `List`, so the template ranges over `.items` and prints each resource's `serving.knative.dev/release` label.

```bash
kubectl get all -n knative-serving -o 'go-template={{range .items}}{{.kind}}/{{.metadata.name}} {{with .metadata.labels}}{{index . "serving.knative.dev/release"}}{{end}}{{"\n"}}{{end}}'
```

## Notes

- Warning (from the source): these steps perform a new installation of Knative serving and irreversibly overwrite a previous non-fleet installation. Do not run them in clusters where you previously enabled Knative serving. For previous "free-trial" installations, first upgrade Knative serving to use GKE Enterprise fleets. Try on a disposable cluster first.
- Private clusters require a custom installation; installation prerequisites must be met first.
- If the "GKE add-on" installation exists, follow the upgrade-to-fleets steps rather than these.
- Knative serving on GKE is distinct from Cloud Run (`gcp-run`), which is a separate fully managed product. The `gcloud container fleet cloudrun` command group name reflects the former Cloud Run for Anthos lineage.
- The source also shows a Console verification step (Feature Manager and GKE clusters pages), omitted here.
- Corrected from the official docs: `--region CLUSTER_LOCATION` and `--region us-central1-c` in the `clusters describe` commands changed to `--location` (`us-central1-c` is a zone, not a region).
- Corrected from the official docs: the source template `{{index .metadata.labels "serving.knative.dev/release"}}` reads the labels of the `List` returned by `kubectl get all`, which has none; the example ranges over `.items` and prints the label of each resource (empty for resources without it).
- Source: https://docs.cloud.google.com/kubernetes-engine/enterprise/knative-serving/docs/install/on-gcp (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [knative-architecture-overview.md](./knative-architecture-overview.md)
- [knative-resource-model.md](./knative-resource-model.md)
