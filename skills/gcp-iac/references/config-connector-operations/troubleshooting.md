---
source: https://docs.cloud.google.com/config-connector/docs/troubleshooting
---

# Troubleshoot Config Connector

Techniques and a symptom table for common Config Connector problems: checking version, Pods, logs and events; abandon and acquire for immutable fields; forced cleanup; and logging queries.

## Signature / Usage

### Check the installed version

```bash
kubectl get ns cnrm-system -o jsonpath='{.metadata.annotations.cnrm\.cloud\.google\.com/version}'
```

### Check that Config Connector is running

```bash
kubectl get pod -n cnrm-system
```

In namespaced mode there is one `cnrm-controller-manager` Pod per namespace; check one namespace (replace `NAMESPACE`):

```bash
kubectl get pod -n cnrm-system \
    -l cnrm.cloud.google.com/scoped-namespace=NAMESPACE \
    -l cnrm.cloud.google.com/component=cnrm-controller-manager
```

### Check the controller logs

```bash
kubectl logs -n cnrm-system \
    -l cnrm.cloud.google.com/component=cnrm-controller-manager \
    -c manager
```

For one namespace in namespaced mode:

```bash
kubectl logs -n cnrm-system \
    -l cnrm.cloud.google.com/scoped-namespace=NAMESPACE \
    -l cnrm.cloud.google.com/component=cnrm-controller-manager \
    -c manager
```

### Abandon and acquire (to change an immutable field)

1. Set `cnrm.cloud.google.com/deletion-policy` to `abandon` in the resource YAML.
2. Apply the YAML to update the deletion policy.
3. Abandon (delete) the Config Connector resource.
4. Update the immutable fields in the YAML.
5. Apply the YAML to acquire the abandoned resource.

For an unexpected immutable-field error after create or acquire (`infeasible update ... would require recreation` or `cannot make changes to immutable field(s)`), the Google Cloud API changed a field you manage: after step 3 print the live state with gcloud, align the YAML fields with it, then apply to acquire.

### Remove a field from the live resource

Removing a field from the spec makes it externally managed; zero it out instead. Lists use `[]`:

```yaml
spec:
  targetServiceAccounts: []
```

Primitives use `""` (string), `"false"` (bool) or `0` (integer):

```yaml
spec:
  workloadIdentityConfig:
    identityNamespace: ""
```

### Use a non-Kubernetes-valid resource name

```yaml
apiVersion: sql.cnrm.cloud.google.com/v1beta1
kind: SQLUser
metadata:
  name: 'test'
spec:
  instanceRef:
    name: sqlinstance-sample-postgresql
  host: "%"
  type: CLOUD_IAM_USER
  resourceID: test.example@example-project.iam
```

### Workload Identity test Pod (403 insufficient scopes)

Save the following Pod configuration as `wi-test.yaml`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: workload-identity-test
  namespace: cnrm-system
spec:
  containers:
  - image: google/cloud-sdk:slim
    name: workload-identity-test
    command: ["sleep","infinity"]
  serviceAccountName: cnrm-controller-manager
```

In namespaced mode use `serviceAccountName: cnrm-controller-manager-NAMESPACE`.

```bash
kubectl apply -f wi-test.yaml
```

Open an interactive session in the Pod:

```bash
kubectl exec -it workload-identity-test \
    --namespace cnrm-system \
    -- /bin/bash
```

Run `gcloud auth list` in the Pod; the identity must be the Google service account bound to your resources, not the Compute Engine default service account (which means Workload Identity Federation for GKE is not enabled on the cluster or node pool). Then:

```bash
kubectl delete pod workload-identity-test \
    --namespace cnrm-system
```

### Check that a service supports ServiceIdentity

```bash
gcloud beta services identity create --service SERVICE_NAME.googleapis.com
```

### Valid GKE versions for the add-on

```bash
gcloud container get-server-config --format "yaml(validMasterVersions)" \
    --zone ZONE
```

### Uninstall blocked by webhooks (`failed calling webhook`)

Delete the webhooks first, then uninstall:

```bash
kubectl delete validatingwebhookconfiguration abandon-on-uninstall.cnrm.cloud.google.com --ignore-not-found --wait=true
kubectl delete validatingwebhookconfiguration validating-webhook.cnrm.cloud.google.com --ignore-not-found --wait=true
kubectl delete mutatingwebhookconfiguration mutating-webhook.cnrm.cloud.google.com --ignore-not-found --wait=true
```

### Inspect an OOMKilled controller Pod

```bash
kubectl describe pod POD_NAME -n cnrm-system
```

### Find who deleted a resource (Cloud Logging query)

```text
resource.type="k8s_cluster"
resource.labels.project_id="my-project-id"
resource.labels.cluster_name="my-cluster-name"
protoPayload.methodName="com.google.cloud.cnrm.bigquery.v1beta1.bigquerydatasets.delete"
protoPayload.resourceName="bigquery.cnrm.cloud.google.com/v1beta1/namespaces/my-namespace/bigquerydatasets/my-dataset"
```

Check `authenticationInfo.principalEmail` of the first delete request.

### Query controller logs for one resource (Cloud Logging)

The source notes that the query syntax doesn't support comments: the `# comment` lines below are explanatory text and cannot be included in queries.

```text
# Filter to include only logs coming from the controller Pods
resource.type="k8s_container"
resource.labels.container_name="manager"
resource.labels.namespace_name="cnrm-system"
labels.k8s-pod/cnrm_cloud_google_com/component="cnrm-controller-manager"

# Filter to include only logs coming from a particular GKE cluster
resource.labels.cluster_name="GKE_CLUSTER_NAME"
resource.labels.location="GKE_CLUSTER_LOCATION"

# Filter to include only logs for a particular Config Connector resource
jsonPayload.logger="RESOURCE_KIND-controller"
jsonPayload.resource.namespace="RESOURCE_NAMESPACE"
jsonPayload.resource.name="RESOURCE_NAME"
```

`RESOURCE_KIND` is the lower-case kind (for example `pubsubtopic`). Log fields: `logger` (kind in lower case, for example `pubsubtopic-controller`), `resource.namespace`, `resource.name`. All Pods write structured JSON logs.

### Forced cleanup (last resort)

Edit the stuck resource with `kubectl edit`, delete `metadata.finalizers`, and save. Config Connector might not finish deleting the Google Cloud resource, so delete leftovers manually.

## Options / Props

| Symptom | Cause | Resolution |
|---------|-------|------------|
| Resource flips `UpToDate` / `Updating` every 5-15 minutes | Unintended diff, for example external systems (CI/CD, controllers, cron) or Google Cloud reformatting a value | Rule out external writers; fetch the live state (REST or gcloud), compare and align your resource |
| `UpdateFailed` or loop after Google Cloud auto-updates a field (for example SQLInstance `maintenanceVersion`) | `state-into-spec: merge` annotation (default before 1.123.1 for CRDs added in 1.113.0 and earlier, or `spec.stateIntoSpec: Merge` in `ConfigConnector` / `ConfigConnectorContext`) | Omit the field, set `state-into-spec: absent`, then migrate from Merge to Absent (abandon and re-acquire) |
| Frequent retries exhaust API quota | Default exponential backoff, maximum 2 minutes | Direct controllers on 1.160.0+: `backoff-max-delay-in-seconds` (or `"0"`). Terraform/DCL controllers: switch to a direct controller, fix the failure, or as a last resort `deletion-policy: "abandon"` and delete the object, or `spec.actuationMode: Paused` on `ConfigConnectorContext` (pauses all resources in the namespace) |
| Resource has no status | Config Connector not running properly | Check that Pods are `READY` |
| `KNV2005` excessive updates (Config Sync) | Config Sync and Config Connector fight, typically when Config Sync sets a list field and Config Connector defaults subfields (lists are atomic) | Match the manifest to what Config Connector sets (temporarily stop syncing), or annotate `client.lifecycle.config.k8s.io/mutation: ignore`, or set `state-into-spec: absent` (not supported by all resources) |
| Resource "deleted by Config Connector" | Config Connector never deletes without an external cause (`kubectl delete`, Argo CD, API client) | Find the first delete request in the cluster audit logs |
| Controller Pod `OOMKilled` or `Terminating` | Memory limit exceeded | Raise memory request and limit with the `ControllerResource` custom resource |
| Namespace stuck `Terminating` | Namespaced mode and the `ConfigConnectorContext` was deleted before the resources | Forced cleanup, then delete underlying Google Cloud resources manually; delete the `ConfigConnectorContext` only after all resources are gone |
| `DeleteFailed` after the project was deleted | Project deleted before its child resources | Restore the project, or forced cleanup; delete projects only after child resources |
| `Compute Engine metadata ... not defined` | The IAM service account used by Config Connector does not exist | Ensure the service account exists; follow the installation instructions |
| 403 `Request had insufficient authentication scopes` | Workload Identity Federation for GKE not enabled (cluster or node pools) | Enable it on the cluster and node pools |
| 403 `The caller does not have permission` | Config Connector's Kubernetes service account lacks permission to impersonate your IAM service account | Follow the installation instructions |
| 403 `Caller is missing IAM permission` | The IAM service account lacks the permission in the message | Grant it; check `spec.projectRef` or the `cnrm.cloud.google.com/project-id` annotation (namespace name is the project ID if none is set); check Workload Identity |
| `IAMPolicy` / `IAMPartialPolicy` / `IAMPolicyMember` 400 service account does not exist | `IAMServiceAccount` deleted before the dependent IAM resources | Delete the `IAMPolicyMember`; remove only the affected bindings from `IAMPolicy` / `IAMPartialPolicy`. Role bindings are retained for 60 days. Clean up IAM resources before the `IAMServiceAccount` |
| `ServiceIdentity` `Invalid service producer` | Service does not support on-demand service identity creation | Test with `gcloud beta services identity create` |
| `Node version 1.15.x-gke.x s unsupported` (add-on) | GKE version requirements unmet, or Workload Identity Federation / GKE Monitoring disabled | Pick a valid version; enable both features |
| `failed calling webhook` on uninstall | Add-on disabled before CRDs were removed | Delete the webhooks, then uninstall |
| `cnrm` Pods fail to update after switching from add-on to manual install | `PodSecurityPolicy` blocks seccomp annotations | Add the matching annotation on the PodSecurityPolicy |
| Immutable field update rejected | Rejected at admission; GitOps tools may get stuck | Delete and recreate, or abandon and acquire |
| `No matches for kind` | CRD missing; installation out of date or invalid | Verify the kind is supported; upgrade (automatic for the add-on, manual otherwise) |
| Labels not propagated | Google Cloud resource does not support labels | Check the product's REST API docs |
| Invalid `metadata.name` characters | Kubernetes name rules | Use `resourceID` |
| Field removed from spec still set | Removed fields become externally managed (except fields inside lists) | Zero out the field |
| Invalid value `merge` for `state-into-spec` | CRD added in 1.114.0+ supports only `Absent`; or SQLInstance on 1.134.0 / 1.134.1 (known issue) | Set `absent` in the manifest and `spec.stateIntoSpec: Absent` in the CR; upgrade to 1.134.2 or later |
| Pods `Pending` or `CrashLoopBackOff` (`exec format error`) | Config Connector does not support Arm nodes (C4A, N4A, Tau T2A) | Add an x86 node pool (for example `e2-standard-2`); do not add tolerations for `kubernetes.io/arch=arm64:NoSchedule` |

## Notes

- Warning from the source: forced cleanup is outside normal usage and there are no guarantees about the underlying Google Cloud resources; use it as a last resort.
- Abandoning and deleting resources can remove or orphan real Google Cloud resources; try the procedures on a disposable project first.
- The source also shows long error-message samples, a Prometheus metrics pointer and GitHub issue links; they are not repeated here.
- Config Connector manages Google Cloud resources as Kubernetes objects; the GKE cluster itself and Config Sync are in `gcp-gke`. Cloud Logging is in `gcp-observability`.
- `gcloud beta services identity create --service SERVICE_NAME.googleapis.com` is not a dry run: the gcloud help describes it as creating a service identity for a consumer (project, folder or organization). If it succeeds, the identity now exists in the current project; run it in the project where you intend to use the `ServiceIdentity`.
- The source's heading reads "Resource keeps updating every 5-15 mins" while its body says the status alternates "every 5-10 minutes"; the table row follows the heading.
- Additional help: file an issue on GitHub (GoogleCloudPlatform/k8s-config-connector) or contact Google Cloud Support.
- Source: https://docs.cloud.google.com/config-connector/docs/troubleshooting (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [reconciliation.md](./reconciliation.md)
- [managing-fields-externally.md](./managing-fields-externally.md)
- [best-practices.md](./best-practices.md)
- [securing-access-to-resources.md](./securing-access-to-resources.md)
