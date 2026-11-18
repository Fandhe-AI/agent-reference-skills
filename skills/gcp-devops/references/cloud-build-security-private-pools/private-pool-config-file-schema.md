---
source: https://docs.cloud.google.com/build/docs/private-pools/private-pool-config-file-schema
---

# Private pool config file schema

A private pool config file tells Cloud Build how to create a private pool (disk size, machine type, network and release settings). It is required when you create and manage private pools with gcloud or the Cloud Build API, and is different from the Cloud Build build config file, which configures a build rather than a pool. Write it in JSON for `curl`; YAML or JSON for gcloud.

## Signature / Usage

### Structure (YAML)

Adapted (not in the official docs): removed the trailing commas after `PEERED_NETWORK`, `PRIVATE_POOL_DISK_SIZE` and `PRIVATE_POOL_MACHINE_TYPE`; in YAML they become part of the scalar value.

```yaml
privatePoolV1Config:
  networkConfig:
    egressOption: NO_PUBLIC_EGRESS
    peeredNetwork: PEERED_NETWORK
    peeredNetworkIpRange: PEERED_NETWORK_IP_RANGE
  workerConfig:
    diskSizeGb: PRIVATE_POOL_DISK_SIZE
    machineType: PRIVATE_POOL_MACHINE_TYPE
    workerRelease: CHANNEL_OR_VERSION
```

### Structure (JSON)

```json
{
  "privatePoolV1Config": {
    "networkConfig": {
      "egressOption": "NO_PUBLIC_EGRESS",
      "peeredNetwork": "PEERED_NETWORK",
      "peeredNetworkIpRange": "PEERED_NETWORK_IP_RANGE"
    },
    "workerConfig": {
      "diskSizeGb": "PRIVATE_POOL_DISK_SIZE",
      "machineType": "PRIVATE_POOL_MACHINE_TYPE",
      "workerRelease": "CHANNEL_OR_VERSION"
    }
  }
}
```

## Options / Props

### Fields

| Field | Required | Description |
|---|---|---|
| `networkConfig` | Optional | Specify only if you peer your VPC network with the service producer network |
| `networkConfig.egressOption` | Optional | Set to `NO_PUBLIC_EGRESS` when creating the pool within a VPC Service Controls perimeter. If omitted, public egress is enabled. Enum values in the Cloud Build API: `EGRESS_OPTION_UNSPECIFIED`, `NO_PUBLIC_EGRESS`, `PUBLIC_EGRESS` |
| `networkConfig.peeredNetwork` | Required if `networkConfig` is present | Network resource URL of the VPC network peered to the service producer network: `projects/NETWORK_PROJECT_ID/global/networks/NETWORK_NAME`. If not specified, Cloud Build uses the service producer network by default |
| `networkConfig.peeredNetworkIpRange` | Optional | Internal IP range for VMs within the peered network's allocated range, CIDR `'STARTING_IP/SUBNET_PREFIX_SIZE'`. If it cannot be allocated within the private connection range (size limits or invalid starting IP) the pool cannot be created |
| `workerConfig` | Required | Configuration options for your private pool |
| `workerConfig.diskSizeGb` | Optional | Disk size in GB; greater than or equal to 100 and less than or equal to 4000. If omitted or `0`, Cloud Build uses the default of 100 |
| `workerConfig.machineType` | Optional | Compute Engine machine type; default `e2-medium` if not specified; otherwise one of the machine types below |
| `workerConfig.enableNestedVirtualization` | Optional | For a `C3` machine type, run other VM instances inside the pool's VM (https://docs.cloud.google.com/compute/docs/instances/nested-virtualization/overview) |
| `workerConfig.workerRelease` | Optional | Release channel name or a specific release version used for all builds on this pool (https://docs.cloud.google.com/build/docs/release-channels) |

### `peeredNetworkIpRange` details

| Item | Rule |
|---|---|
| Format | `'STARTING_IP/SUBNET_PREFIX_SIZE'`; if the field is used, `SUBNET_PREFIX_SIZE` must be specified, begin with `/`, and be less than or equal to 29 |
| `STARTING_IP` | Optional; if omitted a starting address is assigned automatically from within the private connection range |
| Default | `/24` if no value is specified (automatically assigned starting IP, 256 IPs) |
| Max builder VMs | Limited to the number of usable IPs in the range (total possible IPs minus two) |
| `192.168.0.0/24` | Range starting at 192.168.0.0, prefix size 24: 256 IPs, 254 usable |
| `/29` | Automatically determined starting IP, prefix size 29: eight IPs, six usable |

### Machine types (64 in total)

| Series | Machine types |
|---|---|
| `e2` (15) | e2-medium, e2-standard-2, e2-standard-4, e2-standard-8, e2-standard-16, e2-standard-32, e2-highmem-2, e2-highmem-4, e2-highmem-8, e2-highmem-16, e2-highcpu-2, e2-highcpu-4, e2-highcpu-8, e2-highcpu-16, e2-highcpu-32 |
| `n2d` (31) | n2d-standard-2, n2d-standard-4, n2d-standard-8, n2d-standard-16, n2d-standard-32, n2d-standard-48, n2d-standard-64, n2d-standard-80, n2d-standard-96, n2d-standard-128, n2d-standard-224, n2d-highmem-2, n2d-highmem-4, n2d-highmem-8, n2d-highmem-16, n2d-highmem-32, n2d-highmem-48, n2d-highmem-64, n2d-highmem-80, n2d-highmem-96, n2d-highcpu-2, n2d-highcpu-4, n2d-highcpu-8, n2d-highcpu-16, n2d-highcpu-32, n2d-highcpu-48, n2d-highcpu-64, n2d-highcpu-80, n2d-highcpu-96, n2d-highcpu-128, n2d-highcpu-224 |
| `c3` (18) | c3-standard-4, c3-standard-8, c3-standard-22, c3-standard-44, c3-standard-88, c3-standard-176, c3-highcpu-4, c3-highcpu-8, c3-highcpu-22, c3-highcpu-44, c3-highcpu-88, c3-highcpu-176, c3-highmem-4, c3-highmem-8, c3-highmem-22, c3-highmem-44, c3-highmem-88, c3-highmem-176 |

### Machine type availability by region

| Machine type family | Regions |
|---|---|
| `c3-standard-*` | asia-northeast1, asia-southeast1, australia-southeast1, europe-west1, europe-west2, europe-west3, europe-west4, europe-west9, me-central2, me-west1, northamerica-northeast1, southamerica-east1, us-central1, us-east1, us-east4, us-east5, us-west1, us-west2, us-west3, us-west4 |
| `c3-highcpu-*` | asia-southeast1, europe-west1, europe-west3, europe-west4, me-central2, us-central1, us-east1, us-east4, us-east5, us-west2, us-west3 |
| `c3-highmem-*` | asia-southeast1, europe-west1, europe-west2, europe-west3, europe-west4, us-central1, us-east1, us-east4, us-east5, us-west1, us-west2, us-west4 |
| `e2-*` | africa-south1, asia-east1, asia-east2, asia-northeast1, asia-northeast2, asia-northeast3, asia-south1, asia-south2, asia-southeast1, asia-southeast2, australia-southeast1, australia-southeast2, europe-central2, europe-north1, europe-north2, europe-southwest1, europe-west1, europe-west2, europe-west3, europe-west4, europe-west6, europe-west8, europe-west9, europe-west10, europe-west12, me-central1, me-central2, me-west1, northamerica-northeast1, northamerica-northeast2, northamerica-south1, southamerica-east1, southamerica-west1, us-central1, us-east1, us-east4, us-east5, us-south1, us-west1, us-west2, us-west3, us-west4 |
| `n2d-*` | africa-south1, asia-east1, asia-east2, asia-northeast1, asia-northeast2, asia-northeast3, asia-south1, asia-south2, asia-southeast1, asia-southeast2, australia-southeast1, australia-southeast2, europe-central2, europe-north1, europe-southwest1, europe-west1, europe-west10, europe-west12, europe-west2, europe-west3, europe-west4, europe-west6, europe-west8, europe-west9, me-central1, me-central2, me-west1, northamerica-northeast1, northamerica-northeast2, southamerica-east1, southamerica-west1, us-central1, us-east1, us-east4, us-east5, us-south1, us-west1, us-west2, us-west3, us-west4 |

## Notes

- Source: https://docs.cloud.google.com/build/docs/private-pools/private-pool-config-file-schema (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Larger prefix numbers mean smaller subnets: `/24` allows 256 IPs (eight host bits), `/29` leaves eight possible IPs (three bits).
- The default machine type is `e2-medium` per this schema page; the create page's gcloud placeholder text says `e2-standard-2` when `--worker-machine-type` is left blank. The gcloud 593.0.0 help examples use `e2-standard-2`. Set `machineType` explicitly if the default matters.
- The source machine-type table is laid out in three side-by-side columns (`e2`, `n2d`, `c3`); the region table has five columns. Both are regrouped above without changing any value.
- Adapted from the official docs: the source YAML showed `PEERED_NETWORK,`, `PRIVATE_POOL_DISK_SIZE,` and `PRIVATE_POOL_MACHINE_TYPE,` with trailing commas.
- The Cloud Build API also defines a Private Service Connect network configuration and `rankedMachineSeries` for private pools that this page does not describe; see https://docs.cloud.google.com/build/docs/api/reference/rest/v1/projects.locations.workerPools.

## Related

- [create-manage-private-pools.md](./create-manage-private-pools.md)
- [run-builds-in-private-pool.md](./run-builds-in-private-pool.md)
- [using-vpc-service-controls.md](./using-vpc-service-controls.md)
