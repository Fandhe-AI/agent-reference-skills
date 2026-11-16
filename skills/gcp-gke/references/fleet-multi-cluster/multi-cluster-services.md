---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/multi-cluster-services
---

# Configuring multi-cluster Services

How to enable and use multi-cluster Services (MCS) so that Services exported from one GKE cluster are discoverable and callable from every cluster in the fleet. This page covers a single-project setup; for multi-project Shared VPC use "Setting up multi-cluster Services with Shared VPC" (https://docs.cloud.google.com/kubernetes-engine/docs/how-to/msc-setup-with-shared-vpc-networks).

## Signature / Usage

### Enable APIs

```bash
gcloud services enable \
    multiclusterservicediscovery.googleapis.com \
    gkehub.googleapis.com \
    cloudresourcemanager.googleapis.com \
    trafficdirector.googleapis.com \
    dns.googleapis.com \
    connectgateway.googleapis.com \
    --project=PROJECT_ID
```

Replace `PROJECT_ID` with the project ID from the project where you plan to register your clusters to a fleet.

### Enable MCS and register clusters

```bash
gcloud container fleet multi-cluster-services enable \
    --project PROJECT_ID
```

Enabling MCS in the fleet host project creates or ensures the `service-PROJECT_NUMBER@gcp-sa-mcsd.iam.gserviceaccount.com` service account exists. Register each cluster (Workload Identity Federation for GKE strongly recommended):

```bash
gcloud container fleet memberships register MEMBERSHIP_NAME \
   --gke-cluster CLUSTER_LOCATION/CLUSTER_NAME \
   --enable-workload-identity \
   --project PROJECT_ID
```

Grant the MCS importer its permission (`PROJECT_ID` and `PROJECT_NUMBER` are those of the fleet host project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member "principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/PROJECT_ID.svc.id.goog/subject/ns/gke-mcs/sa/gke-mcs-importer" \
    --role "roles/compute.networkViewer"
```

Create a namespace in each cluster that should share Services, then verify:

```bash
kubectl create ns NAMESPACE
```

```bash
gcloud container fleet multi-cluster-services describe \
    --project PROJECT_ID
```

### Export a Service

```yaml
# export.yaml
kind: ServiceExport
apiVersion: net.gke.io/v1
metadata:
 namespace: NAMESPACE
 name: SERVICE_EXPORT_NAME
```

```bash
kubectl apply -f export.yaml
```

### Consume a Service

From any Pod in any fleet cluster, the name resolves as `SERVICE_EXPORT_NAME.NAMESPACE.svc.clusterset.local`. Headless Service Pods with a hostname are also addressable as `HOSTNAME.MEMBERSHIP_NAME.LOCATION.SERVICE_EXPORT_NAME.NAMESPACE.svc.clusterset.local` (or `HOSTNAME.MEMBERSHIP_NAME.SERVICE_EXPORT_NAME.NAMESPACE.svc.clusterset.local` for a global Membership). Check import progress via the EndpointSlice named in the ServiceImport's `net.gke.io/derived-service` annotation:

```bash
kubectl get endpointslice -l kubernetes.io/service-name=DERIVED_SERVICE_NAME -n NAMESPACE
```

### Authenticating service accounts

Not needed if the cluster was registered with Workload Identity Federation for GKE. Otherwise grant `roles/compute.networkViewer` on the project to the node service account; for the Compute Engine default service account also enable scopes `https://www.googleapis.com/auth/compute.readonly` and `https://www.googleapis.com/auth/cloud-platform`.

### Disable MCS

Delete each ServiceExport in every cluster (allow up to one hour), unregister clusters if not needed, then:

```bash
kubectl delete serviceexport SERVICE_EXPORT_NAME \
    -n NAMESPACE
```

```bash
gcloud container fleet multi-cluster-services disable \
    --project PROJECT_ID
```

```bash
gcloud services disable multiclusterservicediscovery.googleapis.com \
    --project PROJECT_ID
```

Force disable (not recommended; can leave managed resources that continue to incur charges):

```bash
gcloud container fleet multi-cluster-services disable --force \
    --project PROJECT_ID
```

### Troubleshooting

Adapted (not in the official docs): the source passes `PROJECT_ID` as the resource name; `kubectl describe serviceexports` takes the ServiceExport name.

```bash
kubectl describe serviceexports SERVICE_EXPORT_NAME -n NAMESPACE
```

## Options / Props

### Requirements

| Requirement | Detail |
| --- | --- |
| `gke-mcs-importer` Pod | Deployed with elevated RBAC to manage endpoints, services and ServiceImports; cannot view or modify deployments |
| Cluster type | VPC-native GKE clusters only (non VPC-native Standard clusters unsupported) |
| Network | Same VPC, peered or Shared VPC; a fleet cannot contain clusters from more than one Shared VPC network; a single multi-cluster service must be exported from a single project and VPC network |
| Network policies | MCS is not supported with network policies |
| Add-on | `HttpLoadBalancing` must remain enabled (default) |
| Service types | ClusterSetIP and Headless only; NodePort and LoadBalancer unsupported; only DNS "A" records |
| Pricing | Included in the GKE cluster management fee; Traffic Director API must be enabled; Cloud DNS is billed separately |

### Limits (not enforced, performance issues when exceeded)

| Limit | Value |
| --- | --- |
| Exporting clusters per namespaced-name Service | 5 clusters (beyond that only a subset of endpoints may be imported) |
| Pods behind a single Service | Below 250 Pods is safe |
| Unique Service ports exported simultaneously | No more than 250 (name, namespace, port number tuples) |
| Port reuse | Same port number cannot be reused within one MCS Service even with different protocols |
| Import into new namespace | Up to five minutes; initial export sync takes about five minutes |

### Membership state codes

| Code | Meaning |
| --- | --- |
| `OK` | Membership added to MCS and ready |
| `WARNING` | MCS reconciling membership setup |
| `FAILED` | Membership not added; other `OK` memberships unaffected |
| `ERROR` | Membership missing resources; other `OK` memberships unaffected |

### ServiceExport condition reasons (when `Exported` is False)

| Reason | Meaning |
| --- | --- |
| `NoMatchingService` | No Service matching name and namespace in this cluster |
| `Conflict` | Existing exported Service with same name and namespace does not match, or is exported from a different network or project |
| `ReadinessProbeError` | readinessProbe violates health check limits: `PeriodSeconds` / `TimeoutSeconds` capped at 300 seconds, `SuccessThreshold` / `FailureThreshold` capped at 10, `TimeoutSeconds` must not exceed `PeriodSeconds` |
| `ServiceError`, `PodsError`, `EndpointsError` | Usually a Google Cloud infrastructure problem; contact support |

## Notes

- Knative or Cloud Run are unrelated: this is Kubernetes multi-cluster Service discovery on GKE (Cloud Run is `gcp-run`).
- Corrected from the official docs: the source writes `kubectl describe serviceexports PROJECT_ID -n NAMESPACE`; the argument is the ServiceExport name, so it is `SERVICE_EXPORT_NAME`.
- Known issues: with a named `targetPort`, the health check uses the default port instead of the `containerPort` (use numeric `targetPort` and `readinessProbe.httpGet.port`); MCS derives the health check port from the Pod `readinessProbe` only; one invalid readinessProbe on a single exported Service can block synchronization of other Services in the fleet.
- Do not export Services in `default` or `kube-system` (unintended name grouping). A Service already exported by clusters in a different project with the same name and namespace cannot be exported from another project.
- IPmasq agent: custom Pod IP ranges or a custom ConfigMap can masquerade MCS traffic and break it; use the default range, list all Pod ranges in `nonMasqueradeCIDRs`, or use Egress NAT Policy (Autopilot).
- Starting from GKE version 1.33 the Endpoints API is deprecated; use EndpointSlice.
- Disabling is destructive to exported Services; try on a disposable fleet first. Force disable can leave billable managed resources.
- Deleting a ServiceExport: if ServiceExports remain, disable fails (wait one hour); if managed resources remain, wait up to three hours and rerun.
- The source also shows Console steps and describe output samples; the Cloud Service Mesh dashboard shows endpoint health.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/multi-cluster-services (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [multi-cluster-services-overview.md](./multi-cluster-services-overview.md)
- [prepare-environment-multi-cluster-gateways.md](./prepare-environment-multi-cluster-gateways.md)
- [multi-cluster-ingress.md](./multi-cluster-ingress.md)
