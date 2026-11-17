---
source: https://docs.cloud.google.com/load-balancing/docs/proxy-only-subnets
---

# Proxy-only subnets for Envoy-based load balancers

A proxy-only subnet is a pool of IP addresses reserved exclusively for the Envoy proxies of Google Cloud Envoy-based load balancers (and Secure Web Proxy). Packets from a proxy to a backend use a source IP from this subnet. You must create one per region of each VPC network that uses these load balancers, before creating the load balancer's forwarding rules.

## Signature / Usage

### Create a proxy-only subnet

```bash
gcloud compute networks subnets create SUBNET_NAME \
    --purpose=SUBNET_PURPOSE \
    --role=ACTIVE \
    --region=REGION \
    --network=VPC_NETWORK_NAME \
    --range=CIDR_RANGE
```

Replace `SUBNET_PURPOSE` with `REGIONAL_MANAGED_PROXY` or `GLOBAL_MANAGED_PROXY`, and use a mask no longer than `/26` (recommended `/23`).

### Create a dual-stack proxy-only subnet

The VPC network must be custom subnet mode (`--subnet-mode custom`) with `--enable-ula-internal-ipv6`.

```bash
gcloud compute networks subnets create NEW_PROXY_ONLY_SUBNET_NAME \
   --purpose=SUBNET_PURPOSE \
   --role=ACTIVE \
   --region=REGION \
   --network=VPC_NETWORK_NAME \
   --range=NEW_PROXY_ONLY_SUBNET_RANGE \
   --stack-type=IPV4_IPV6
```

### Replace a proxy-only subnet with a larger one

Create the new subnet as `BACKUP`, allow both ranges in backend firewall rules, activate the new subnet with a drain timeout, wait for the old subnet to reach `READY`, then restrict the firewall rule and delete the old subnet.

```bash
gcloud compute networks subnets create NEW_PROXY_ONLY_SUBNET_NAME \
   --purpose=SUBNET_PURPOSE \
   --role=BACKUP \
   --region=REGION \
   --network=VPC_NETWORK_NAME \
   --range=NEW_PROXY_ONLY_SUBNET_RANGE
```

```bash
gcloud compute firewall-rules update PROXY_ONLY_SUBNET_FIREWALL_RULE \
  --source-ranges=ORIGINAL_PROXY_ONLY_SUBNET_RANGE,NEW_PROXY_ONLY_SUBNET_RANGE
```

```bash
gcloud compute networks subnets update NEW_PROXY_ONLY_SUBNET_NAME \
   --region=REGION \
   --role=ACTIVE \
   --drain-timeout=CONNECTION_DRAINING_TIMEOUT
```

`--drain-timeout=0s` immediately breaks connections between backends and proxies in the original subnet. `CONNECTION_DRAINING_TIMEOUT` is in seconds.

```bash
gcloud compute networks subnets describe ORIGINAL_PROXY_ONLY_SUBNET_NAME \
   --region=REGION
```

The original subnet shows `DRAINING` and then `READY` (with role `BACKUP`, no longer used).

```bash
gcloud compute firewall-rules update PROXY_ONLY_SUBNET_FIREWALL_RULE \
  --source-ranges=NEW_PROXY_ONLY_SUBNET_RANGE
```

```bash
gcloud compute networks subnets delete ORIGINAL_PROXY_ONLY_SUBNET_NAME \
  --region=REGION
```

### Migrate purpose from INTERNAL_HTTPS_LOAD_BALANCER

```bash
gcloud compute networks subnets update PROXY_ONLY_SUBNET \
    --purpose=REGIONAL_MANAGED_PROXY \
    --region=REGION
```

No downtime; takes effect nearly instantly.

## Options / Props

### Purpose values

| Purpose | One active per VPC network and region | Products powered |
|---|---|---|
| `GLOBAL_MANAGED_PROXY` | Yes | Cross-region internal Application Load Balancer; cross-region internal proxy Network Load Balancer |
| `REGIONAL_MANAGED_PROXY` | Yes | Regional external Application Load Balancer; regional internal Application Load Balancer; regional external proxy Network Load Balancer; regional internal proxy Network Load Balancer; Secure Web Proxy; Cloud DNS Outbound Endpoints (Preview) |

### Sizing and capacity

| Item | Value |
|---|---|
| Minimum size | 64 addresses (prefix `/26` or shorter) |
| Recommended start | `/23` (512 addresses); `/22` when sharing with Secure Web Proxy |
| Bandwidth per proxy | up to 18 MB per second |
| New connections per proxy | 600 (HTTP) or 150 (HTTPS) per second |
| Active connections per proxy | 3,000 |
| Requests per proxy | 1,400 per second with Cloud Logging disabled; 700 per second when logging 100% of requests |
| Allocation window | Greater of bandwidth-based and connection/request-based need, measured over 10 minutes |
| Stack type | `IPV4_ONLY` or `IPV4_IPV6`; `IPV6_ONLY` not supported |
| Roles | `ACTIVE` and `BACKUP` (one of each per purpose, region and network) |
| Monitoring metric | `loadbalancing.googleapis.com/subnet/proxy_only/addresses` |

### Limitations

| Limitations |
|---|
| One `ACTIVE` and one `BACKUP` proxy-only subnet per region per VPC network; no backup unless an active one exists. |
| `INTERNAL_HTTPS_LOAD_BALANCER` and `REGIONAL_MANAGED_PROXY` subnets can't coexist in one network and region. |
| A backup subnet can be promoted to active by update (the old active becomes backup), but you can't set the backup role by update, and you can't promote during the draining period. |
| An existing subnet can't be reused (`--purpose` can't be modified by `subnets update` except the migration above); the range can't be expanded with `expand-ip-range`. |
| Proxy-only subnets don't support VPC Flow Logs. |
| An active subnet can't be deleted while a regional load balancer exists in that region and network, or while a backup subnet exists (error: "Invalid resource usage: Cannot delete ACTIVE subnetwork because a BACKUP subnetwork exists."). |

## Notes

- Google Cloud Load Balancing — not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`).
- Destructive and connectivity-breaking: `subnets delete`, narrowing firewall `--source-ranges` and `--drain-timeout=0s` can break backend connectivity; try on a disposable resource first. Keep both ranges allowed until draining finishes.
- Backends must allow ingress from the proxy-only subnet; the load balancer's forwarding rule IP and backend IPs do not come from this subnet. Google Cloud doesn't warn when the subnet runs out of addresses; alert on the metric above. Non-RFC 1918 ranges are allowed.
- If the client sends packets with the port explicitly specified (for example `example.net:443`), Envoy-based load balancers don't remove it by default; match it with a URL map host rule. The gRPC library for Go appends the port to the hostname, so a matching host rule is needed.
- Each additional proxy incurs an hourly charge (see the Cloud Load Balancing pricing page). If a region lacks proxy capacity, choose another region, a network that already has a proxy-only subnet, or wait.
- Subnet creation is a Compute Engine / VPC resource; the full flag list is in the `gcp-compute` skill (official reference: https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/subnets/create). Subnets in general are in the `gcp-networking` skill.
- The source also shows Console steps.
- Source: https://docs.cloud.google.com/load-balancing/docs/proxy-only-subnets (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [https.md](./https.md)
- [application-load-balancer.md](./application-load-balancer.md)
