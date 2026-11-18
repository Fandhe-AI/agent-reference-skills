# cloud-build-security-private-pools

| Name | Description | Path |
|------|-------------|------|
| Cloud Build default service accounts | Legacy and Compute Engine default accounts, legacy role permissions, trigger access | [cloud-build-service-account.md](./cloud-build-service-account.md) |
| User-specified service accounts | Run builds as your own service account, log storage, cross-project setup | [configure-user-specified-service-accounts.md](./configure-user-specified-service-accounts.md) |
| Build provenance | Generate, view and validate SLSA provenance | [generate-validate-build-provenance.md](./generate-validate-build-provenance.md) |
| CMEK | Ephemeral-key disk encryption and CMEK-compliant logs | [cmek.md](./cmek.md) |
| Private pools overview | Default pool vs private pool, network architecture | [private-pools-overview.md](./private-pools-overview.md) |
| Create and manage private pools | gcloud and API create, update, view, delete | [create-manage-private-pools.md](./create-manage-private-pools.md) |
| Run builds in a private pool | Select a pool in config or gcloud, IAM | [run-builds-in-private-pool.md](./run-builds-in-private-pool.md) |
| Private pool config file schema | Fields, machine types, regions | [private-pool-config-file-schema.md](./private-pool-config-file-schema.md) |
| Private pools in a private network | VPC, shared VPC, static IPs, egress, org policy | [use-in-private-network.md](./use-in-private-network.md) |
| VPC Service Controls with private pools | Perimeter, ingress rules, allowedWorkerPools | [using-vpc-service-controls.md](./using-vpc-service-controls.md) |
