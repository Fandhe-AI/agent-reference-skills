---
source: https://docs.cloud.google.com/sql/docs/postgres/authorize-networks
---

# Authorized networks

Authorized networks are the IP addresses or CIDR ranges allowed to connect directly to a Cloud SQL instance over its public IP, or over its private IP when the client uses a non-RFC 1918 address.

## Signature / Usage

### gcloud

Configuring authorized networks replaces the existing authorized networks list.

Adapted (not in the official docs): removed the trailing "..." from the placeholder list.

```bash
gcloud sql instances patch INSTANCE_ID \
--authorized-networks=NETWORK_RANGE_1,NETWORK_RANGE_2
```

### REST v1

Also replaces the existing list. Request body for `PATCH https://sqladmin.googleapis.com/v1/projects/project-id/instances/instance-id`:

```json
{
  "settings":
  {
    "ipConfiguration":
    {
      "authorizedNetworks":
        [{"value": "network_range_1"}, {"value": "network_range_2"}]
    }
  }
}
```

```bash
curl -X PATCH \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://sqladmin.googleapis.com/v1/projects/project-id/instances/instance-id"
```

Save the body as `request.json` first. The response is an `sql#operation` with `"operationType": "UPDATE"` and `"status": "PENDING"`.

## Options / Props

| Item | Description |
|------|-------------|
| Format | Single IPv4 address or range in CIDR notation, e.g. `10.10.10.0/24`. |
| Required when | Client connects directly to the public IP, or directly to the private IP from a non-RFC 1918 address. |
| Console | Instance > Connections > Networking > Public IP checkbox > Authorized networks > New IP range (name + range). "Use My IP" fills in the client's IPv4 address. |

### Limitations

| Address range | Notes |
|---------------|-------|
| 10.0.0.0/8 | RFC 1918; automatically and implicitly included by Cloud SQL, can't be added |
| 172.16.0.0/12 | RFC 1918; automatically and implicitly included, can't be added |
| 192.168.0.0/16 | RFC 1918; automatically and implicitly included, can't be added |

- IPv6 authorized networks are not supported; "Use my IP" is unavailable for IPv6 clients.
- With a VPN or proxy server, "Use my IP" doesn't show the client's actual address (by design).
- The list is implemented on the instance VM by a local firewall.

## Notes

- Source: https://docs.cloud.google.com/sql/docs/postgres/authorize-networks (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- The source also shows Console, Terraform and REST v1beta4 forms, omitted here.
- Exposes the instance on a public IP; prefer private IP, PSC or the Auth Proxy / connectors with IAM authentication when the source offers them.
- Best practices: avoid `0.0.0.0/0` (it permits access from the global internet without restriction) and use a CIDR prefix no smaller than /16, preferably greater than /19.
- Source: https://docs.cloud.google.com/sql/docs/best-practices (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the gcloud example ended the list with `--authorized-networks=NETWORK_RANGE_1,NETWORK_RANGE_2...`; copied as-is, `NETWORK_RANGE_2...` would be passed as a CIDR value. List every range explicitly, comma-separated.
- Because the gcloud and REST calls replace the whole list, include every range you want to keep.
- The source recommends enforcing SSL/TLS for direct connections (see authorize-ssl.md).
- Managed PostgreSQL on Google Cloud; distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and `mssql` / `drizzle` client code.

## Related

- [authorize-ssl.md](./authorize-ssl.md)
- [configure-private-ip.md](./configure-private-ip.md)
- [private-ip.md](./private-ip.md)
