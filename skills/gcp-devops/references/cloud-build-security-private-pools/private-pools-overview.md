---
source: https://docs.cloud.google.com/build/docs/private-pools/private-pools-overview
---

# Private pools overview

By default a Cloud Build build runs in a secure, hosted environment (the default pool) with public internet access, each build on its own isolated worker. Private pools are private, dedicated pools of workers that Cloud Build hosts and fully manages (they scale up and down to zero, with no infrastructure to set up, upgrade or scale) and that you can customize far more, including access to resources in a private network.

## Signature / Usage

### Run a build in a private pool

Snippet taken from https://docs.cloud.google.com/build/docs/private-pools/run-builds-in-private-pool.

```yaml
steps:
- name: 'bash'
  args: ['echo', 'I am running in a private pool!']
options:
  pool:
    name: 'projects/PRIVATEPOOL_PROJECT_ID/locations/REGION/workerPools/PRIVATEPOOL_ID'
```

## Options / Props

### Default pool vs private pool

| Feature | Default pool | Private pool |
|---|---|---|
| Fully managed | Yes | Yes |
| Pay per build minute | Yes | Yes |
| Auto scaling, scales to 0 | Yes | Yes |
| Access to public internet | Yes | Configurable |
| Peer into a VPC or shared VPC to access private resources | No | Yes |
| VPC Service Controls support | No | Yes |
| Static internal IP ranges | No | Yes |
| Ability to disable public IPs | No | Yes |
| Maximum concurrent builds | 30 | 100+ |
| Machine types | 5 | 64 |
| Regions | global, supported regions | supported regions |
| Region in which the build is run | The region specified in `gcloud builds submit` or on the console triggers page | The region where you create the private pool |

## Notes

- Source: https://docs.cloud.google.com/build/docs/private-pools/private-pools-overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/build/docs/private-pools/run-builds-in-private-pool (build config that selects a private pool).
- The default pool has limits on how much you can customize the environment, particularly around private network access. Machine types: 5 for the default pool (https://docs.cloud.google.com/build/docs/api/reference/rest/v1/projects.builds#machinetype), 64 for private pools (see private-pool-config-file-schema.md). Supported regions: https://docs.cloud.google.com/build/docs/locations.
- Private pools are customer-specific resources created in a Google Cloud project; they can be created, updated and deleted through the API, the Google Cloud CLI, the Google Cloud console, or provisioning tools such as Terraform.
- With IAM permissions, builds on a private pool can be submitted cross-project: builds do not have to originate from the project that owns the pool. The service account a build runs as can be configured to let workers access resources in other projects during the build.
- Network architecture: private pools are hosted in a Google-owned service producer network with internal IP addresses (https://docs.cloud.google.com/vpc/docs/private-services-access). To reach resources in your own network, create a private VPC peering connection between your VPC network and the service producer network. The source diagram shows two projects routing all builds to one private pool whose service producer network is peered to the customer's VPC network.
- Next steps in the source: set up the environment (https://docs.cloud.google.com/build/docs/private-pools/set-up-private-pool-environment), create and manage pools, networking use cases, and VPC Service Controls. VPC peering and Private Service Connect are covered by the `gcp-networking` skill.

## Related

- [create-manage-private-pools.md](./create-manage-private-pools.md)
- [run-builds-in-private-pool.md](./run-builds-in-private-pool.md)
- [private-pool-config-file-schema.md](./private-pool-config-file-schema.md)
- [use-in-private-network.md](./use-in-private-network.md)
- [using-vpc-service-controls.md](./using-vpc-service-controls.md)
