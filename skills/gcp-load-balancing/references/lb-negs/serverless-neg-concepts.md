---
source: https://docs.cloud.google.com/load-balancing/docs/negs/serverless-neg-concepts
---

# Serverless network endpoint groups overview

A serverless NEG is a backend that points to a Cloud Run, App Engine, Cloud Run functions or API Gateway resource, so serverless workloads can sit behind Application Load Balancers and use a dedicated frontend IP address, URL map routing, shared SSL certificates, Cloud CDN and Google Cloud Armor. Serverless NEGs are not supported by proxy Network Load Balancers or passthrough Network Load Balancers.

## Signature / Usage

### Create a NEG

```bash
gcloud compute network-endpoint-groups create my-neg \
    --zone=us-central1-a --network=my-network --subnet=my-subnetwork
```

This is the gcloud help example for a (zonal) NEG; serverless NEGs use `--network-endpoint-type=serverless` with `--cloud-run-service`, `--cloud-run-url-mask` or similar flags and have no zone, network or subnet. The full flag list is in the `gcp-compute` skill (https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-endpoint-groups/create).

## Options / Props

### Supported load balancers

| Serverless NEG type | Regional internal ALB | Cross-region internal ALB | Global external ALB | Classic ALB | Regional external ALB |
|---|---|---|---|---|---|
| Cloud Run (Cloud Run and Cloud Run functions 2nd gen) | Yes | Yes | Yes | Yes | Yes |
| App Engine | — | — | Yes | Yes | — |
| Cloud Functions (Cloud Run functions 1st gen) | — | — | Yes | Yes | — |

### Network tier

| Load balancer | Tier |
|---|---|
| Global external ALB | Standard or Premium; Premium is required only to set up serverless NEGs in multiple regions |
| Regional external ALB | Always Standard |
| Cross-region and regional internal ALB | Always Premium |

### Backend service limits

| Load balancer | Limit |
|---|---|
| Global external ALB (global backend service) | Several serverless NEGs, but only one per region; combined NEGs must be functionally equivalent deployments in different regions and of the same backend type (Cloud Run with Cloud Run, App Engine with App Engine) |
| Cross-region internal ALB (global backend service) | Only Cloud Run / Cloud Run functions (2nd gen) resources; one resource attached |
| Regional internal / regional external ALB (regional backend service) | One serverless NEG; Cloud Run / Cloud Run functions (2nd gen) only; 5000 QPS per project across all such load balancers' serverless NEGs (not per load balancer) |

## Notes

- Supported load balancers: A serverless NEG can represent: a Cloud Run resource or group; a Cloud Run function or group (formerly 2nd gen); a Cloud Run function (1st gen) or group; an App Engine standard or flexible app, a service, a version or a group of services; an API Gateway (Preview). Resources in one NEG must share a common URL pattern.
- Outlier detection (global backend service with serverless NEGs): Available for cross-region internal ALB and global external ALB, not for classic ALB. Methods: consecutive `5xx` errors, or consecutive gateway errors (`502`, `503`, `504`). Not supported fields: `outlierDetection.enforcingSuccessRate`, `outlierDetection.successRateMinimumHosts`, `outlierDetection.successRateRequestVolume`, `outlierDetection.successRateStdevFactor`. The source recommends higher `outlierDetection.baseEjectionTime`; its tests with 180 seconds and sustained QPS above 100 gave less than 5% observed error rates. Cannot be configured on IAP-enabled backend services.
- Google Cloud Load Balancing — not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`). Cloud Run and App Engine themselves are in the `gcp-run` skill.
- Endpoint: a serverless NEG has no IP or port, at most one endpoint of type `SERVERLESS` (an FQDN or a URL mask), and must be in the same region and the same project as the backing resource. With several NEGs in different regions the load balancer sends traffic to the closest region.
- URL masks (for example `example.com/<service>`) map requests to services on a custom domain with one NEG and no URL map change per service; internal ALBs can use URL masks only for Cloud Run / Cloud Run functions (2nd gen) services.
- Backend service restrictions: the backend service timeout (`timeoutSec`) is not applicable (modifying it fails with `Timeout sec is not supported for a backend service with Serverless network endpoint groups`); the fixed timeout is 60 minutes, so retry on the client. No balancing mode (`RATE`, `UTILIZATION`, `CONNECTION` have no effect). No health checks. Cannot mix serverless NEGs with other NEG types. `gcloud compute backend-services edit` cannot be used; use `update`.
- Without Cloud Run service health or outlier detection the load balancer cannot detect failing resources and keeps sending traffic to them; test new versions first. Failover automation is supported on global and cross-region load balancers.
- Global external ALB with Cloud Run: no Knative serving; end-user request authentication is not supported (IAP can be used, but IAP and Cloud CDN cannot be enabled on the same backend service).
- App Engine: no multi-region load balancing (one region per project); with IAP use the same OAuth client ID for all App Engine services of one load balancer and only one IAP policy on the request path; both flexible and standard backends together do not support cross-project service referencing. Use App Engine ingress controls so users cannot bypass the load balancer, Cloud Armor security policies, SSL certificates and private keys through the App Engine URL.
- Traffic management: load balancing locality policy and session affinity are not supported with serverless NEG backends (for Cloud Run use its own session affinity).
- Cross-project service referencing in Shared VPC works: frontend (IP, forwarding rule, target proxy, URL map) may be in another project, but the backend service, serverless NEGs and the serverless resource must be in the same project.
- Console: serverless NEGs can be created or edited only while creating or editing a load balancer on the Load balancing page.
- Pricing: see https://cloud.google.com/vpc/network-pricing#cloud-load-balancing.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-endpoint-groups/create (gcloud 593.0.0 help).
- Source inconsistency: the source says global external Application Load Balancers can use a serverless NEG "using either Standard or Premium Network Service Tiers" and that regional external Application Load Balancers "are always Standard Tier", but the external Application Load Balancer page (https://docs.cloud.google.com/load-balancing/docs/https, retrieved 2026-11-17) says regional external Application Load Balancers can be configured in either Premium or Standard Tier, and the global external traffic management page (https://docs.cloud.google.com/load-balancing/docs/https/traffic-management-global, retrieved 2026-11-17) says global external Application Load Balancers are "always in Premium Tier". The tier row above is the serverless NEG page's statement.
- Source inconsistency: the source says serverless NEG load balancers handle "5000 QPS per project", but the quotas page (https://docs.cloud.google.com/load-balancing/docs/quotas, retrieved 2026-11-17) states the limit "in a project and region".
- Source: https://docs.cloud.google.com/load-balancing/docs/negs/serverless-neg-concepts (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [negs.md](./negs.md)
- [internet-neg-concepts.md](./internet-neg-concepts.md)
- [hybrid-neg-concepts.md](./hybrid-neg-concepts.md)
