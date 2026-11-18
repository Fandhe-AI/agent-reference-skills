---
source: https://docs.cloud.google.com/app-hub/docs/global-regional-applications
---

# Global, multi-regional, and regional applications

An application's location (global, multi-regional or regional) determines which services and workloads you can register, and affects data residency, network latency, organization policy compliance and cost. The location cannot be changed after creation.

## Signature / Usage

### Create an application with a location

Snippet taken from https://docs.cloud.google.com/app-hub/docs/register-resources (the location comparison page has no code block). Use `--scope-type=GLOBAL` with `--location=global`, or `--scope-type=MULTI_REGIONAL` with `--location=us` or `eu`, for the other types.

```bash
gcloud apphub applications create APPLICATION_NAME \
  --project=PROJECT_ID \
  --scope-type=SCOPE_TYPE \
  --location=LOCATION \
  --display-name=DISPLAY_NAME \
  --criticality-type=CRITICALITY \
  --environment-type=ENVIRONMENT \
  --developer-owners=display-name=DEV_NAME,email=DEV_EMAIL \
  --operator-owners=display-name=OPERATOR_NAME,email=OPERATOR_EMAIL \
  --business-owners=display-name=BUSINESS_NAME,email=BUSINESS_EMAIL
```

## Options / Props

### Comparison

| | Global application | Multi-regional application | Regional application |
|---|---|---|---|
| Recommended use case | Components inherently global or distributed across multiple regions worldwide. | Components span multiple regions within a supported multi-region (`us` or `eu`) or use multi-regional resources. | All components reside in the same region, even if they span multiple projects. |
| Resource extent | Global, multi-regional and regional resources from any location. | Resources in the same multi-region (`us` or `eu`) and its constituent regions. You can't register global components. | Only resources from the same single region. You can't register global or multi-regional components. |
| Application metadata | Stored across multiple regions, accessible from any region. Data residency isn't supported. | Stored within the specified multi-region, accessible from any region. Data residency isn't supported. | Stored within the specific region, accessible from any region using the global endpoint. Data residency is supported when you use regional endpoints, which restrict request processing to the region. |
| Example | Global load-balanced application with backends in various regions. | Application in `us` with services and workloads across `us-central1` and `us-east1`. | Application with everything in `us-central1`. |

### Benefits of regional applications

| Benefit | Detail |
|---|---|
| Data residency and compliance | Metadata supports data residency when accessed through regional endpoints. |
| Reduce latency | Colocating components in one region minimizes latency between them. |
| Product feature requirements | Some products require components in the same region (for example a Compute Engine instance can only attach a persistent disk in the same region). |
| Optimize cost | Data transfer between regions often incurs networking costs; traffic within a region is typically priced lower. |
| Failure domains | Regions are independent failure domains; use multiple zones within the region for high availability. |

## Notes

- Choose regional in general; multi-regional if components span regions within `us` or `eu` and don't rely on global resources; global if components are necessarily spread across continents or rely on global resources.
- If resources in multiple regions don't form one cohesive function, define separate regional applications per region.
- Source: https://docs.cloud.google.com/app-hub/docs/global-regional-applications (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [register-resources.md](./register-resources.md)
- [supported-resources.md](./supported-resources.md)
- [best-practices.md](./best-practices.md)
- [set-up-app-hub.md](./set-up-app-hub.md)
