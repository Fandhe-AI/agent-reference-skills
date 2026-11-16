---
source: https://docs.cloud.google.com/service-mesh/docs/onboarding/provision-control-plane
---

# Provision a managed Cloud Service Mesh control plane on GKE

Uses the fleet API to set up managed Cloud Service Mesh with Istio APIs on GKE (not Google Cloud APIs). Google handles reliability, upgrades, scaling and security. Prerequisites: a Cloud project, a Billing account, the required roles, and Workload Identity enabled on clusters and node pools.

## Signature / Usage

### Configure gcloud and enable the API

```bash
gcloud auth login --project FLEET_PROJECT_ID
gcloud components update
gcloud services enable mesh.googleapis.com \
    --project=FLEET_PROJECT_ID
```

### Per cluster: enable the fleet feature and register the cluster

```bash
gcloud container fleet mesh enable --project FLEET_PROJECT_ID
```

```bash
gcloud container clusters update CLUSTER_NAME \
  --location CLUSTER_LOCATION \
  --fleet-project FLEET_PROJECT_ID
```

```bash
gcloud container fleet memberships list --project FLEET_PROJECT_ID
```

Example output:

```
NAME                 EXTERNAL_ID                           LOCATION
cluster-1            1d8e255d-2b55-4df9-8793-0435461a2cbc  us-central1
```

If the network project differs from the fleet host project (for example Shared VPC), run once per network project:

```bash
gcloud projects add-iam-policy-binding "NETWORK_PROJECT_ID"  \
     --member "serviceAccount:service-FLEET_PROJECT_NUMBER@gcp-sa-servicemesh.iam.gserviceaccount.com" \
     --role roles/anthosservicemesh.serviceAgent
```

If the cluster project differs from the fleet host project, run once per cluster project:

```bash
gcloud projects add-iam-policy-binding "CLUSTER_PROJECT_ID" \
    --member "serviceAccount:service-FLEET_PROJECT_NUMBER@gcp-sa-servicemesh.iam.gserviceaccount.com" \
    --role roles/anthosservicemesh.serviceAgent
gcloud services enable mesh.googleapis.com \
    --project=CLUSTER_PROJECT_ID
```

### Enable automatic management

Pass a comma-separated list to `--memberships` to apply to several clusters.

```bash
gcloud container fleet mesh update \
   --management automatic \
   --memberships MEMBERSHIP_NAME \
   --project FLEET_PROJECT_ID \
   --location MEMBERSHIP_LOCATION
```

`MEMBERSHIP_LOCATION` is the membership region (for a zonal cluster in `us-central1-c`, use `us-central1`) or `global` if registered before May 2023 or with `global`.

### Fleet default configuration (new clusters)

Applies only to clusters created after enabling it; sync existing clusters. Supports Mesh CA only (use per-cluster setup for Certificate Authority Service).

```bash
echo "management: automatic" > mesh.yaml
gcloud container fleet mesh enable --project FLEET_PROJECT_ID \
    --fleet-default-member-config mesh.yaml
```

Adapted (not in the official docs): the source command printed the project ID (`value(PROJECT_ID)`) although `FLEET_PROJECT_NUMBER` is needed; it now prints the project number.

```bash
gcloud projects describe FLEET_PROJECT_ID --format="value(projectNumber)"
```

### Verify

```bash
gcloud container fleet mesh describe --project FLEET_PROJECT_ID
```

Expect `state: ACTIVE` for `controlPlaneManagement` and `dataPlaneManagement`, `code: REVISION_READY`, and `implementation: ISTIOD | TRAFFIC_DIRECTOR` (note which one).

### Enable injection for a namespace

Managed (`TRAFFIC_DIRECTOR`), and recommended for `ISTIOD`:

```bash
kubectl label namespace NAMESPACE \
    istio.io/rev- istio-injection=enabled --overwrite
```

Deprecated managed `ISTIOD` revision-based injection (existing users):

```bash
kubectl -n istio-system get controlplanerevision
kubectl label namespace NAMESPACE \
    istio-injection- istio.io/rev=REVISION_LABEL --overwrite
kubectl get namespace -L istio-injection
```

Restart existing workloads in labeled namespaces so proxies are injected.

### Customize injection per pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: example
spec:
  containers:
  - name: hello
    image: alpine
  - name: istio-proxy
    image: auto
    resources:
      requests:
        cpu: "200m"
        memory: "256Mi"
      limits:
        cpu: "200m"
        memory: "256Mi"
    volumeMounts:
    - mountPath: /etc/certs
      name: certs
    lifecycle:
      preStop:
        exec:
          command: ["sleep", "10"]
  volumes:
  - name: certs
    secret:
      secretName: istio-certs
```

### Migrate from in-cluster, delete old control plane, roll back

```bash
kubectl rollout restart deployment -n NAMESPACE
```

```bash
kubectl delete Service,Deployment,HorizontalPodAutoscaler,PodDisruptionBudget istiod -n istio-system --ignore-not-found=true
```

Roll back (`asm-191-1` is only an example revision label):

```bash
kubectl label namespace NAMESPACE istio-injection- istio.io/rev=asm-191-1 --overwrite
kubectl rollout restart deployment -n NAMESPACE
kubectl -n istio-system rollout undo deploy istio-ingressgateway
```

## Options / Props

### Roles to install

| Role | Role ID | Grant location |
|---|---|---|
| GKE Hub Admin | `roles/gkehub.admin` | Fleet project |
| Service Usage Admin | `roles/serviceusage.serviceUsageAdmin` | Fleet project |
| CA Service Admin (Beta) | `roles/privateca.admin` | Fleet project |

### Roles to run

| Role | Role ID | Grant location |
|---|---|---|
| Anthos Service Mesh Service Agent | `roles/anthosservicemesh.serviceAgent` | Fleet project (also grant in network / cluster projects when they differ) |
| Mesh Managed Control Plane Service Agent (legacy) | `roles/meshcontrolplane.serviceAgent` | Fleet project; legacy, not needed for new installations |

### APIs enabled by `mesh.googleapis.com`

| API | Can be disabled |
|---|---|
| `meshconfig.googleapis.com`, `meshca.googleapis.com`, `container.googleapis.com`, `gkehub.googleapis.com`, `monitoring.googleapis.com`, `stackdriver.googleapis.com`, `opsconfigmonitoring.googleapis.com` | No |
| `connectgateway.googleapis.com`, `trafficdirector.googleapis.com`, `networkservices.googleapis.com`, `networksecurity.googleapis.com` | Yes\*, only if no cluster in the fleet uses managed Cloud Service Mesh; disabling them stops the managed control plane |

### Requirements and limits

| Item | Detail |
|---|---|
| `mdp-controller` (`kube-system`) | Requests cpu 50m, memory 128Mi |
| `istio-cni-node` DaemonSet (`kube-system`) | Requests cpu 100m, memory 100Mi per node |
| Org policy | `constraints/compute.disableInternetNetworkEndpointGroup` must be disabled, or ServiceEntry may not work |
| GKE Autopilot | Supported only with GKE 1.21.3+; cross-project only with GKE 1.23+; default proxy requests and limits 500m CPU and 512 Mb memory (override with custom injection) |
| GKE Sandbox | Not supported with `TRAFFIC_DIRECTOR` (Istio CNI and Traffic Director incompatible) |
| Fleet | All clusters of a mesh, and all clusters in a project containing a mesh cluster, must be in the same fleet |
| Multi-project | Same fleet host project and same Shared VPC network; a separate fleet host project is recommended |
| Not supported | `hostNetwork: true` pods; `IstioOperator` API; CA Service with fleet-default configuration |

## Notes

- Managed Cloud Service Mesh follows GKE release channels (Rapid first, then Regular, then Stable); changing the channel is not supported and components follow the new channel automatically. Best practice: place a subset of clusters in an earlier channel.
- Provisioning overwrites existing Istio CRDs in the cluster.
- Configuration validation is two-tier: a validating webhook rejects bad syntax immediately; custom resources failing asynchronous semantic checks are omitted from the mesh (no fallback to the last valid version); ConfigMaps (`MeshConfig`, `ASM-Options`) that are invalid are rejected and the last working configuration is kept even though `kubectl get` shows the new data. Monitor resource status conditions and the Fleet Feature State rather than trusting `kubectl apply`.
- With `TRAFFIC_DIRECTOR`, the mesh automatically annotates services (including `ClusterIP`, `NodePort`, `LoadBalancer`) in mesh-enabled namespaces with `cloud.google.com/neg` and `cloud.google.com/neg-status`; it cannot be disabled. Configure CI/CD tools to ignore these annotations.
- Managed data plane: proxies are updated by evicting pods (honoring pod disruption budgets), starting after the control plane upgrade and normally completing within 2 weeks. Ingress gateways are not deployed automatically.
- GKE Standard: set `sidecar.istio.io/proxyCPULimit` when setting `proxyCPU`, and `proxyMemoryLimit` when setting `proxyMemory`, otherwise the limit is unlimited. Set `image` to `auto` in the `istio-proxy` container. GKE Autopilot only considers `requests`.
- The `ISTIOD` revision-based injection path is deprecated (see deprecations.md); two control plane revisions in the list are not supported.
- Cleaning up (`kubectl delete ... istiod`, rollback, uninstall) is destructive; try it on a disposable cluster first. Delete the in-cluster control plane only after all namespaces use the managed one.
- The multi-cluster HelloWorld example pulls from Docker Hub, which private clusters cannot reach; use Artifact Registry or Cloud NAT.
- The source also shows Console steps (Feature Manager) and Terraform (GKEHub feature membership); both are omitted, as are the `clusters create-auto --fleet-project` one-step example, the `get-credentials` command, the `sidecar.istio.io/proxyCPU` annotation form (annotation names are in the note above) and the `kubectl label ... istio.io/rev=asm-191-1` / `rollout undo` rollback block.
- Cleanup and rollback commands in the source are destructive; try them on a disposable cluster first.
- Source: https://docs.cloud.google.com/service-mesh/docs/onboarding/provision-control-plane (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: the source command `gcloud projects list --filter="FLEET_PROJECT_ID" --format="value(PROJECT_ID)"` returns the project ID, not the project number needed for `FLEET_PROJECT_NUMBER`.

## Related

- [overview.md](./overview.md)
- [supported-features-managed.md](./supported-features-managed.md)
- [managed-control-plane-overview.md](./managed-control-plane-overview.md)
- [security-overview.md](./security-overview.md)
