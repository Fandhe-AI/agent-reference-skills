---
source: https://docs.cloud.google.com/build/docs/private-pools/using-vpc-service-controls
---

# Use VPC Service Controls with private pools

VPC Service Controls sets up a secure perimeter to guard against data exfiltration. This page shows how to run Cloud Build private pools inside a service perimeter. The perimeter is created at the organization level, the Cloud Build API is restricted, and the pool is created with no public egress. VPC Service Controls protection is available only for builds run in private pools.

## Signature / Usage

### Allow a service account to call Cloud Build through the perimeter

Ingress policy file (`INGRESS-FILENAME`) that lets the service account make the `CreateBuild` API call.

```yaml
- ingressFrom:
    identities:
    - serviceAccount:SERVICE_ACCOUNT_EMAIL
    sources:
    - accessLevel: '*'
  ingressTo:
    operations:
    - serviceName: 'cloudbuild.googleapis.com'
      methodSelectors:
      - method: '*'
    resources:
    - 'projects/PROJECT_NUMBER'
```

Update the perimeter policy:

```bash
gcloud beta access-context-manager perimeters update PERIMETER_NAME \
    --set-ingress-policies=INGRESS-FILENAME \
    --policy=POLICY_ID
```

### Restrict builds to specific private pools (organization policy)

Require builds in the organization to use only one private pool:

```bash
gcloud resource-manager org-policies allow \
    cloudbuild.allowedWorkerPools \
    projects/PRIVATEPOOL_PROJECT_ID/locations/LOCATION/workerPools/PRIVATEPOOL_ID \
    --organization ORGANIZATION_ID
```

Any private pool under the organization:

```bash
gcloud resource-manager org-policies allow \
    cloudbuild.allowedWorkerPools under:organizations/ORGANIZATION_ID \
    --organization ORGANIZATION_ID
```

All builds in the projects under a folder use any private pool in the specified project:

```bash
gcloud resource-manager org-policies allow \
    cloudbuild.allowedWorkerPools under:projects/PROJECT_ID \
    --folder FOLDER_ID
```

All builds in a project use any private pool in the specified project:

```bash
gcloud resource-manager org-policies allow \
    cloudbuild.allowedWorkerPools under:projects/PRIVATEPOOL_PROJECT_ID \
    --project BUILD_PROJECT_ID
```

### Create a private pool in the perimeter

Private pool config file with `egressOption: NO_PUBLIC_EGRESS`:

```yaml
privatePoolV1Config:
  networkConfig:
    egressOption: NO_PUBLIC_EGRESS
    peeredNetwork: PEERED_NETWORK
  workerConfig:
    diskSizeGb: 'PRIVATE_POOL_DISK_SIZE'
    machineType: PRIVATE_POOL_MACHINE_TYPE
```

```bash
gcloud builds worker-pools create PRIVATEPOOL_ID --config-from-file PRIVATEPOOL_CONFIG_FILE --region REGION
```

## Options / Props

### Required roles

| Role | Used for |
|---|---|
| Organization Viewer (`roles/resourcemanager.organizationViewer`) | Set up a service perimeter |
| Access Context Manager Editor (`roles/accesscontextmanager.policyEditor`) | Set up a service perimeter |
| Organization Policy Administrator (`roles/orgpolicy.policyAdmin`) | Manage organization policies such as `constraints/cloudbuild.allowedWorkerPools` |

### Build log options inside the perimeter (choose one in the build config before running)

| Option | Setting |
|---|---|
| Cloud Logging | `loggingMode` set to `CLOUD_LOGGING_ONLY` |
| User-created Cloud Storage logs bucket | Create a logs bucket in your private project |
| No logs | `loggingMode` set to `NONE` |

### Placeholders

| Name | Meaning |
|---|---|
| `SERVICE_ACCOUNT_EMAIL` | Email address of the service account |
| `PROJECT_NUMBER` | Project number of the project added to the perimeter |
| `PERIMETER_NAME` / `POLICY_ID` | Perimeter name / access policy ID |
| `INGRESS-FILENAME` | Name of your ingress policy file |
| `PEERED_NETWORK` | `projects/NETWORK_PROJECT_ID/global/networks/NETWORK_NAME` |
| `PRIVATE_POOL_DISK_SIZE` | Disk size in GB. This page says greater than or equal to 100 and less than or equal to 1000; `0` uses the default of 100 (other pages state a maximum of 4000) |
| `egressOption` | Set to `NO_PUBLIC_EGRESS` to create the pool within the perimeter |

### Limitations

| Limitation |
|---|
| VPC Service Controls protection is available only for builds run in private pools, not default pools |
| Cloud Build Pub/Sub triggers are not supported when VPC Service Controls is used |

## Notes

- Source: https://docs.cloud.google.com/build/docs/private-pools/using-vpc-service-controls (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Before you begin: install gcloud (`gcloud components update`); set up a private connection between your VPC network and the VPC network where private pools reside; if builds push images or artifacts to Artifact Registry or Cloud Storage in another project, add that project to the same service perimeter as the project the builds originate from; optionally review machine types and regions in private-pool-config-file-schema.md.
- Builds run within the service perimeter do not have permission to store build logs in the default Cloud Storage logs bucket, so set one of the log options in the table above before running a build. The source calls the field `loggingMode` (with `CLOUD_LOGGING_ONLY` or `NONE`); in the Cloud Build v1 build config the field is `options.logging` (for example `options: logging: CLOUD_LOGGING_ONLY`, as in configure-user-specified-service-accounts.md).
- Setup steps: follow the VPC Service Controls quickstart (https://docs.cloud.google.com/vpc-service-controls/docs/set-up-service-perimeter) to create a perimeter, add the project where the pool will be created (with Shared VPC, add the host project and service projects to the same perimeter), and restrict the Cloud Build API. After that, all Cloud Build API calls are checked to originate from within the perimeter.
- Service accounts: the source notes that the default service account used to run builds changed and recommends specifying your own (see configure-user-specified-service-accounts.md). You must grant the legacy Cloud Build or Compute Engine service account access to the perimeter (the ingress rule above) if you use it to start builds with a trigger, the Cloud Build API or the command line, or if you use user-specified service accounts to start builds with a trigger. You do not need to grant the legacy or Compute Engine account access if you use user-specified service accounts to start builds through the API or command line. To find the legacy account email, open the IAM page for the project added to the perimeter.
- The ingress rule sets `sources: accessLevel: '*'`, which lets the named service account call `cloudbuild.googleapis.com` (all methods) on the project from any source. Keep the identity list to the service accounts that start builds.
- Development machines: because checks are enforced on the Cloud Build API, calls (API, console UI, gcloud) fail from outside the perimeter. Either use a machine inside the perimeter (for example a Compute Engine VM, or an on-premises machine connected by VPN) or grant developers access through access levels based on IP address or user identity (https://docs.cloud.google.com/vpc-service-controls/docs/use-access-levels).
- Organization policy `constraints/cloudbuild.allowedWorkerPools` can be applied to the organization, a folder or a project. The `gcloud resource-manager org-policies allow` command supports `under:` and `is` prefixes. If you apply it to a project, all builds in the project must use the private pool; builds trying to use the default shared pool fail. If your organization contains services such as App Engine or Cloud Run functions that implicitly use Cloud Build, enforcing the constraint may cause those services not to work as expected. Try it first on a disposable project.
- Public internet from the pool's VPC: to let the VPC network reach where your repository is hosted (for example github.com), (1) ensure the peered VPC network allows public egress to the repository host (routes and firewall rules), and (2) either set `egressOption` to `PUBLIC_EGRESS` in the config file or set up the pool to use a static external IP (https://docs.cloud.google.com/build/docs/private-pools/access-external-resources-using-static-external-ip).
- Cloud Build private pool with a perimeter is created with `--no-public-egress` when using flags (see create-manage-private-pools.md). The source also shows Console steps and the Quickstart reference. VPC Service Controls and Access Context Manager belong to the `gcp-security` skill; Organization Policy to `gcp-foundation`.

## Related

- [private-pools-overview.md](./private-pools-overview.md)
- [create-manage-private-pools.md](./create-manage-private-pools.md)
- [private-pool-config-file-schema.md](./private-pool-config-file-schema.md)
- [use-in-private-network.md](./use-in-private-network.md)
- [configure-user-specified-service-accounts.md](./configure-user-specified-service-accounts.md)
