---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/prepare-environment-multi-cluster-gateways
---

# Enable multi-cluster Gateways

Prepares a fleet for the multi-cluster GKE Gateway controller: create VPC-native clusters with Gateway API and Workload Identity Federation for GKE, register them to a fleet, enable multi-cluster Services, then enable the fleet `ingress` feature with a config cluster. Multi-cluster Gateways use the Fleet `multiclusteringress` feature flag but are distinct from the Multi Cluster Ingress product; pipelines should follow this page's ordering (Gateway API before Fleet ingress; Traffic Director API required).

## Signature / Usage

### Enable APIs

```bash
gcloud services enable \
  trafficdirector.googleapis.com \
  multiclusteringress.googleapis.com \
  dns.googleapis.com \
  gkehub.googleapis.com \
  cloudresourcemanager.googleapis.com \
  multiclusterservicediscovery.googleapis.com \
  --project=PROJECT_ID
```

### Create and register clusters

`VERSION` is the GKE version, 1.24 or later. Repeat for `gke-west-2` (`us-west1-a`) and `gke-east-1` (`us-east1-b`).

```bash
gcloud container clusters create gke-west-1 \
    --gateway-api=standard \
    --location=us-west1-a \
    --workload-pool=PROJECT_ID.svc.id.goog \
    --cluster-version=VERSION \
    --enable-fleet \
    --project=PROJECT_ID
```

```bash
gcloud container fleet memberships list --project=PROJECT_ID
```

```bash
gcloud container clusters get-credentials gke-west-1 --location=us-west1-a --project=PROJECT_ID
gcloud container clusters get-credentials gke-west-2 --location=us-west1-a --project=PROJECT_ID
gcloud container clusters get-credentials gke-east-1 --location=us-east1-b --project=PROJECT_ID
```

```bash
kubectl config rename-context gke_PROJECT_ID_us-west1-a_gke-west-1 gke-west-1
kubectl config rename-context gke_PROJECT_ID_us-west1-a_gke-west-2 gke-west-2
kubectl config rename-context gke_PROJECT_ID_us-east1-b_gke-east-1 gke-east-1
```

### Enable multi-cluster Services

```bash
gcloud container fleet multi-cluster-services enable \
    --project PROJECT_ID
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member "principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/PROJECT_ID.svc.id.goog/subject/ns/gke-mcs/sa/gke-mcs-importer" \
    --role "roles/compute.networkViewer" \
    --project=PROJECT_ID
```

Adapted (not in the official docs): the source writes `service-PROJECT_ID@...`; the MCS service agent address uses the project number, `service-PROJECT_NUMBER@...`.

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member "serviceAccount:service-PROJECT_NUMBER@gcp-sa-mcsd.iam.gserviceaccount.com" \
    --role roles/multiclusterservicediscovery.serviceAgent \
    --project=PROJECT_ID
```

```bash
gcloud container fleet multi-cluster-services describe --project=PROJECT_ID
```

### Enable multi-cluster Gateway in the fleet

This example uses `gke-west-1` as the config cluster; it can be changed later.

```bash
gcloud container fleet ingress enable \
    --config-membership=projects/PROJECT_ID/locations/us-west1/memberships/gke-west-1 \
    --project=PROJECT_ID
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member "serviceAccount:service-PROJECT_NUMBER@gcp-sa-multiclusteringress.iam.gserviceaccount.com" \
    --role "roles/container.admin" \
    --project=PROJECT_ID
```

If the cluster network project differs from the fleet project (for example Shared VPC):

```bash
gcloud projects add-iam-policy-binding NETWORK_PROJECT_ID \
    --member "serviceAccount:service-PROJECT_NUMBER@gcp-sa-multiclusteringress.iam.gserviceaccount.com" \
    --role "roles/compute.networkUser" \
    --project=NETWORK_PROJECT_ID
```

```bash
gcloud container fleet ingress describe --project=PROJECT_ID
```

```bash
kubectl get gatewayclasses --context=gke-west-1
```

```bash
kubectl config use-context gke-west-1
```

### Shared VPC scenario 2 (fleet, config and workload clusters in one service project)

Cloud DNS API in the host project only; other APIs in the fleet host (service) project; MCS service agent role on the Shared VPC host project; a manual firewall rule for load balancer traffic.

```bash
gcloud services enable dns.googleapis.com \
  --project=SHARED_VPC_HOST_PROJECT_ID
```

```bash
gcloud projects add-iam-policy-binding SHARED_VPC_HOST_PROJECT_ID \
--member "serviceAccount:service-FLEET_HOST_PROJECT_NUMBER@gcp-sa-mcsd.iam.gserviceaccount.com" \
--role roles/multiclusterservicediscovery.serviceAgent
```

```bash
gcloud compute firewall-rules create FIREWALL_RULE_NAME \
  --project=HOST_PROJECT \
  --network=SHARED_VPC \
  --direction=INGRESS \
  --allow=tcp:0-65535 \
  --source-ranges=130.211.0.0/22,35.191.0.0/16
```

### Troubleshooting

Install the Gateway API if `gatewayclasses` is missing:

```bash
gcloud container clusters update CLUSTER_NAME \
    --gateway-api=standard \
    --location=CONTROL_PLANE_LOCATION
```

Controller does not start (CRDs added after Fleet ingress was enabled): disable and re-enable Fleet ingress.

```bash
gcloud container fleet ingress disable
```

```bash
gcloud container fleet ingress enable \
    --config-membership=CONFIG_MEMBERSHIP \
    --project=PROJECT_ID
```

`ERROR: Lost connection`: restore the service agent role.

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member "serviceAccount:service-PROJECT_NUMBER@gcp-sa-multiclusteringress.iam.gserviceaccount.com" \
    --role "roles/multiclusteringress.serviceAgent" \
    --project=PROJECT_ID
```

## Options / Props

### Requirements

| Requirement | Detail |
| --- | --- |
| Cluster type | VPC-native only |
| Regional / cross-region GatewayClasses | Proxy-only subnet required |
| Add-on | `HttpLoadBalancing` enabled |
| Istio | 1.15.2 or later, 1.14.5 or later, or 1.13.9 or later |
| Shared VPC | Assign `Compute Network User` in the host project to the GKE service account of the service project |
| Multi-cluster extras | Gateway API enabled, Workload Identity Federation for GKE enabled, fleet prerequisites done, six APIs enabled (Cloud Service Mesh, Multi Cluster Ingress, Cloud DNS, GKE Hub, Resource Manager, Multi-cluster Service Discovery) |

### Multi-cluster GatewayClasses

| GatewayClass | Use |
| --- | --- |
| `gke-l7-global-external-managed-mc` | Global external |
| `gke-l7-regional-external-managed-mc` | Regional external |
| `gke-l7-cross-regional-internal-managed-mc` | Cross-regional internal |
| `gke-l7-rilb-mc` | Regional internal |
| `gke-l7-gxlb-mc` | Global external Classic |

### Limitations

| Limitation | Detail |
| --- | --- |
| `gke-l7-rilb-mc` | No load balancing to backends in different regions |
| `backendRefs` | `Service` unsupported; only `ServiceImport` |
| Fleet host project | All clusters must be in the fleet host project |
| Cross-project / cross-VPC | Not supported; all clusters on the same Gateway in the same Shared VPC host or service project and the same VPC |
| MCS | Subject to all MCS requirements |
| Leaked load balancers | Possible if the config cluster is changed to one missing existing `Gateway` resources, or Fleet ingress is disabled while `Gateway` resources using a multi-cluster GatewayClass exist |
| Regional Fleet control plane failure | Controller fails statically; no load balancer changes until recovery |

Shared VPC topologies: scenario 1 (fleet host project, config cluster and workload clusters all in the Shared VPC host project) and scenario 2 (all in the same Shared VPC service project, same VPC).

## Notes

- Kubernetes Gateway API resources on GKE, and Multi Cluster Ingress, are not an HTTP framework router (`hono`, `fastify`) and not Cloud Load Balancing configured directly (planned `gcp-networking`).
- Adapted from the official docs: the MCS service agent member is `serviceAccount:service-PROJECT_NUMBER@gcp-sa-mcsd.iam.gserviceaccount.com`; the source writes `service-PROJECT_ID@gcp-sa-mcsd...` in the single-project step.
- Security: the controller service agent is granted `roles/container.admin` (as required by the source) and the firewall rule opens `tcp:0-65535` only from Google health check and proxy ranges `130.211.0.0/22,35.191.0.0/16`; do not widen the source ranges.
- Disabling Fleet ingress is destructive: with `Gateway` resources present, load balancers can leak. Try on a disposable cluster first.
- Terraform: use non-authoritative `google_project_iam_member`; authoritative `google_project_iam_binding` / `google_project_iam_policy` can remove `roles/multiclusteringress.serviceAgent`, causing `Lost connection`.
- Enable the Gateway API before enabling Fleet ingress. Enabling MCS resources is not charged separately; Compute Engine resources are charged to the cluster project; multi-cluster Gateway pricing is on the GKE pricing page.
- The source also shows sample `describe` / `get gatewayclasses` output and the scenario 2 step to enable the other APIs in the fleet host project (`trafficdirector`, `multiclusterservicediscovery`, `multiclusteringress`, `gkehub`, `cloudresourcemanager`).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/prepare-environment-multi-cluster-gateways (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [multi-cluster-gateways.md](./multi-cluster-gateways.md)
- [multi-cluster-services.md](./multi-cluster-services.md)
- [choose-mc-lb-api.md](./choose-mc-lb-api.md)
