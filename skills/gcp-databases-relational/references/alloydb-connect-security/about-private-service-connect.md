---
source: https://docs.cloud.google.com/alloydb/docs/about-private-service-connect
---

# About Private Service Connect

Private Service Connect (PSC) gives private, secure connectivity between your VPC networks and AlloyDB instances without VPC Network Peering. Your VPC is the consumer; the AlloyDB service published by Google Cloud is the producer.

## Signature / Usage

The page has no commands. Snippet taken from https://docs.cloud.google.com/alloydb/docs/cluster-create (PSC is enabled when the cluster is created):

```bash
gcloud alloydb clusters create CLUSTER_ID \
    --database-version=POSTGRES_VERSION \
    --password=PASSWORD \
    --region=REGION_ID \
    --project=PROJECT_ID \
    --enable-private-service-connect
```

To connect through PSC, start the Auth Proxy with its `--psc` flag; it also needs a private DNS record resolving `pscDnsName` to the endpoint IP.

## Options / Props

| Concept | Description |
|---------|-------------|
| Service connection policy | Authorizes AlloyDB to create PSC connections to consumer VPC networks, so endpoints are provisioned automatically. Created per consumer VPC with a subnet used to allocate endpoint IPs; also defines a connection limit on how many endpoints can be created. |
| Service attachment | One unique service attachment URL is generated for each primary, read pool or secondary instance in a PSC-enabled cluster. Used to create a PSC endpoint. |
| Network attachment | Regional resource in the consumer VPC and project that enables outbound connectivity (migration, foreign data wrappers). Accept mode: `ACCEPT_AUTOMATIC` or `ACCEPT_MANUAL`. |
| PSC endpoint | A forwarding rule associated with an internal IP address. Let AlloyDB create it automatically or create it manually by specifying the instance's service attachment. |
| `pscDnsName` | Unique pre-generated DNS name per instance. Create a record in a private Cloud DNS zone for each consumer VPC mapping it to the endpoint's internal IP. |
| Allowed projects | Projects permitted to access the instance. One unique endpoint per allowed project. |

DNS usage:

- Auth Proxy and Language Connectors: require a private DNS record resolving `pscDnsName` to the endpoint's internal IP.
- Direct connections (such as `psql`): use the endpoint IP directly or the private DNS name; the DNS name is recommended for a consistent hostname across networks.

## Notes

- Supported scenarios: connect from multiple VPC networks (different groups, teams, projects or organizations); connect to a primary, read pool or secondary instance.
- If a project is not explicitly allowed, you can still create an endpoint for its instances but the endpoint stays in `PENDING` state.
- You cannot enable outbound connectivity on AlloyDB instances created before March 01, 2025 (see "Update an instance for outbound connectivity" in https://docs.cloud.google.com/alloydb/docs/configure-private-service-connect).
- Limitations: endpoints can be created in RFC 1918 and non-RFC 1918 ranges; private DNS resolution for PSC outbound connections (foreign data wrappers, `dblink`) is not supported.
- Setup steps are in https://docs.cloud.google.com/alloydb/docs/configure-private-service-connect (not in this page).
- AlloyDB is managed PostgreSQL on Google Cloud, distinct from Supabase Postgres (`supabase`) and Cloudflare D1 / Hyperdrive (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/alloydb/docs/about-private-service-connect (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- The borrowed `gcloud alloydb clusters create` snippet puts the password on the command line: gcloud 593.0.0 has no prompt option (`--password` is required), so use a throwaway initial password and change it afterwards, or prefer IAM database authentication ([connect-iam.md](./connect-iam.md)). `POSTGRES_VERSION` takes the gcloud enum `POSTGRES_14`–`POSTGRES_18`.
- Source: https://docs.cloud.google.com/alloydb/docs/cluster-create (snippet; retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/alloydb/docs/auth-proxy/connect (`--psc` flag; retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [private-ip.md](./private-ip.md)
- [connection-overview.md](./connection-overview.md)
- [auth-proxy-overview.md](./auth-proxy-overview.md)
