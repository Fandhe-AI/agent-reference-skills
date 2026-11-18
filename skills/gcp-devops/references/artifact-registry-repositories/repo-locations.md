---
source: https://docs.cloud.google.com/artifact-registry/docs/repositories/repo-locations
---

# Repository locations

You specify a location when you create a repository; it determines where repository storage is created and cannot be changed afterward. A location is a region (specific geographic place) or a multi-region (large area containing two or more places).

## Signature / Usage

### List supported locations

```bash
gcloud artifacts locations list
```

## Options / Props

### Regions

| Continent | Region | Description |
|---|---|---|
| North America | `northamerica-northeast1` | Montréal |
| North America | `northamerica-northeast2` | Toronto |
| North America | `northamerica-south1` | Queretaro |
| North America | `us-central1` | Iowa |
| North America | `us-east1` | South Carolina |
| North America | `us-east4` | Northern Virginia |
| North America | `us-east5` | Columbus |
| North America | `us-south1` | Dallas |
| North America | `us-west1` | Oregon |
| North America | `us-west2` | Los Angeles |
| North America | `us-west3` | Salt Lake City |
| North America | `us-west4` | Las Vegas |
| South America | `southamerica-east1` | São Paulo |
| South America | `southamerica-west1` | Santiago |
| Europe | `europe-central2` | Warsaw |
| Europe | `europe-north1` | Finland |
| Europe | `europe-north2` | Stockholm |
| Europe | `europe-southwest1` | Madrid |
| Europe | `europe-west1` | Belgium |
| Europe | `europe-west2` | London |
| Europe | `europe-west3` | Frankfurt |
| Europe | `europe-west4` | Netherlands |
| Europe | `europe-west6` | Zürich |
| Europe | `europe-west8` | Milan |
| Europe | `europe-west9` | Paris |
| Europe | `europe-west10` | Berlin |
| Europe | `europe-west12` | Turin |
| Middle East | `me-central1` | Doha |
| Middle East | `me-central2` | Dammam |
| Middle East | `me-west1` | Tel Aviv |
| Asia | `asia-east1` | Taiwan |
| Asia | `asia-east2` | Hong Kong |
| Asia | `asia-northeast1` | Tokyo |
| Asia | `asia-northeast2` | Osaka |
| Asia | `asia-northeast3` | Seoul |
| Asia | `asia-south1` | Mumbai |
| Asia | `asia-south2` | Delhi |
| Asia | `asia-southeast1` | Singapore |
| Asia | `asia-southeast2` | Jakarta |
| Asia | `asia-southeast3` | Bangkok |
| Australia | `australia-southeast1` | Sydney |
| Australia | `australia-southeast2` | Melbourne |
| Africa | `africa-south1` | Johannesburg |

### Multi-regions

| Multi-region | Description |
|---|---|
| `asia` | Data centers in Asia |
| `europe` | Data centers in the European Union (object data is not stored in the `europe-west2` or `europe-west6` data center) |
| `us` | Data centers in the United States |

## Notes

- Single-region repositories may optimize latency and bandwidth for systems in the same region. Multi-region repositories may keep working if one region is down, but operations may be slower, and if a multi-region repository has an operational failure, all its users are affected regardless of region.
- Generally store artifacts where the majority of users are. For Compute Engine, same-region storage can perform better; you cannot specify a zone as a repository location, but all VMs in zones of a region have similar access performance.
- Multi-region data centers are spread across a general area (for example `europe` persists in multiple EU data centers); you cannot choose which ones.
- GKE Image streaming requires the repository to be in the same region as the GKE nodes, or in a corresponding multi-region. Nodes in `us-east1` can use repositories in `us-east1` or `us`. Nodes in `northamerica-northeast1` (Canada) can only use repositories in the same region.
- Location constraints: if your organization policy has resource location constraints, Artifact Registry enforces them when you create a repository, not retroactively. To apply new constraints to stored artifacts, create new repositories and migrate artifacts, for example with the gcrane tool (https://github.com/google/go-containerregistry/tree/main/cmd/gcrane). Deleting the old repository is destructive; try migration on a disposable project first.
- Artifacts are stored in the selected location in accordance with the Service Specific Terms.
- Source: https://docs.cloud.google.com/artifact-registry/docs/repositories/repo-locations (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [repositories.md](./repositories.md)
- [create-repos.md](./create-repos.md)
