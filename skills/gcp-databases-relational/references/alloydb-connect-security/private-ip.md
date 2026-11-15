---
source: https://docs.cloud.google.com/alloydb/docs/private-ip
---

# Private IP overview

Private IP keeps AlloyDB traffic inside a private network and minimizes attack surface. You choose either private services access (VPC peering) or Private Service Connect (PSC) as the connectivity method.

## Signature / Usage

The page has no commands. Snippets taken from https://docs.cloud.google.com/alloydb/docs/cluster-create (the connectivity method is chosen when the cluster is created).

Private services access:

```bash
gcloud alloydb clusters create CLUSTER_ID \
    --database-version=POSTGRES_VERSION \
    --password=PASSWORD \
    --region=REGION_ID \
    --project=PROJECT_ID \
    --network=NETWORK
```

Private Service Connect:

```bash
gcloud alloydb clusters create CLUSTER_ID \
    --database-version=POSTGRES_VERSION \
    --password=PASSWORD \
    --region=REGION_ID \
    --project=PROJECT_ID \
    --enable-private-service-connect
```

## Options / Props

Private services access versus Private Service Connect:

| Aspect | Private services access | Private Service Connect |
|--------|-------------------------|-------------------------|
| IP requirement | Reserve a CIDR range (`/24` at a minimum) from the consumer VPC network. The whole range is reserved and locked whether or not it is in use. | A single IP address for a forwarding rule at the endpoint per VPC network. |
| Client ranges | Only RFC 1918 ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`). Use PSC for clients outside RFC 1918. | Both RFC 1918 and non-RFC 1918 ranges can be used for endpoints. |
| Scope | Projects within the same VPC network. | Multiple VPC networks or projects. |
| Fit | Small-scale, single-VPC scenarios. | Large-scale, multi-VPC setups. |
| Cost | Minimal; uses the VPC peering already in the project. | Higher: cost per endpoint per hour and data transfer per GiB. |
| Isolation | Less isolated (VPC Network Peering). | More isolated (consumer and producer VPC networks are separate). |
| Direction | Bidirectional (inbound and outbound). | Unidirectional by default (inbound only); extra configuration for outbound. |

## Notes

- Caution from the source: after you create the AlloyDB cluster, the private IP access method cannot be changed. Decide carefully during initial setup.
- Private services access is implemented as a VPC peering connection between your VPC and the underlying Google Cloud VPC where the instance resides; VMs need no internet access or external IP.
- With PSC, you enable it when creating the cluster, and when creating an instance you specify which projects from your VPC network can access it.
- Terraform templates for networking setup exist (cloudnetworking-config-solutions); the source also links Terraform guides, which are omitted here.
- AlloyDB is managed PostgreSQL on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle`.
- Source: https://docs.cloud.google.com/alloydb/docs/private-ip (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- The borrowed `gcloud alloydb clusters create` snippet puts the password on the command line: gcloud 593.0.0 has no prompt option (`--password` is required), so use a throwaway initial password and change it afterwards, or prefer IAM database authentication ([connect-iam.md](./connect-iam.md)). `POSTGRES_VERSION` takes the gcloud enum `POSTGRES_14`–`POSTGRES_18`.
- Source: https://docs.cloud.google.com/alloydb/docs/cluster-create (snippet; retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-private-service-connect.md](./about-private-service-connect.md)
- [connection-overview.md](./connection-overview.md)
- [auth-proxy-connect.md](./auth-proxy-connect.md)
