---
source: https://docs.cloud.google.com/service-mesh/deprecations
---

# Deprecations

Lists Cloud Service Mesh features that are deprecated, with deprecation and end-of-support dates. The Google Cloud Terms of Service ("Discontinuation of Services") define the deprecation policy; deprecated features remain available for at least the period stated there before shutdown.

## Signature / Usage

### Find affected fleets

Snippet taken from https://docs.cloud.google.com/service-mesh/docs/onboarding/provision-control-plane. Check the `implementation` field.

```bash
gcloud container fleet mesh describe --project FLEET_PROJECT_ID
```

## Options / Props

| Feature | Deprecated date | End-of-support date | Details |
|---|---|---|---|
| Managed Cloud Service Mesh `ISTIOD` implementation | September 28, 2026 | March 1, 2028 | Modernize clusters using `ISTIOD` to the `TRAFFIC_DIRECTOR` control plane before end of support to keep using managed Cloud Service Mesh |
| In-cluster control plane on GKE | September 28, 2026 | March 1, 2028 | In-cluster `ISTIOD` for GKE on Google Cloud is deprecated; migrate to the managed control plane on a new cluster. In-cluster on Google Distributed Cloud (software only) remains supported |
| Attached clusters (Amazon EKS and Microsoft AKS) | May 27, 2025 | March 17, 2027 | Support for attached clusters on EKS and AKS is deprecated. GKE attached clusters are not deprecated |

## Notes

- Related shutdowns stated in the supported-platforms page: GKE on AWS and GKE on Azure shut down on March 17, 2027.
- Source: https://docs.cloud.google.com/service-mesh/deprecations (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/service-mesh/docs/onboarding/provision-control-plane (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [managed-control-plane-overview.md](./managed-control-plane-overview.md)
- [supported-platforms.md](./supported-platforms.md)
- [supported-features-managed.md](./supported-features-managed.md)
