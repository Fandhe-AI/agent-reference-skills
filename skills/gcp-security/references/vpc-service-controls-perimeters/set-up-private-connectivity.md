---
source: https://docs.cloud.google.com/vpc-service-controls/docs/set-up-private-connectivity
---

# Set up private connectivity to Google APIs and services

Set up private connectivity from VPC hosts and on-premises hosts to Google APIs supported by VPC Service Controls: routes, firewall rules and DNS for the `restricted.googleapis.com` VIP. The full `gcloud compute` flag lists are in the `gcp-compute` skill, and the `gcloud dns` (Cloud DNS) flag lists are in the `gcp-networking` skill.

## Signature / Usage

### Route to the restricted VIP (custom static route)

Needed if the VPC network has no default route to the default internet gateway. Traffic to `restricted.googleapis.com` stays inside Google's network.

```bash
gcloud compute routes create ROUTE_NAME \
  --network=NETWORK_NAME \
  --destination-range=DESTINATION_RANGE \
  --next-hop-gateway=default-internet-gateway
```

### Announce the restricted range to on-premises (Cloud Router)

Replace all custom advertised routes on the router (`RANGES`: `199.36.153.4/30`, `2600:2d00:0002:1000::/56`, or both comma-separated):

```bash
gcloud compute routers update my-router \
    --advertisement-mode CUSTOM \
    --set-advertisement-groups ALL_SUBNETS \
    --set-advertisement-ranges RANGES
```

For a single BGP session:

```bash
gcloud compute routers update-bgp-peer my-router \
    --peer-name my-bgp-session \
    --advertisement-mode CUSTOM \
    --set-advertisement-groups ALL_SUBNETS \
    --set-advertisement-ranges RANGES
```

### Cloud DNS private zone for `googleapis.com`

```bash
gcloud dns managed-zones create ZONE_NAME \
 --visibility=private \
 --networks=https://www.googleapis.com/compute/v1/projects/PROJECT_ID/global/networks/NETWORK_NAME \
 --description=DESCRIPTION \
 --dns-name=googleapis.com
```

```bash
gcloud dns record-sets transaction start --zone=ZONE_NAME
```

Adapted (not in the official docs): the wildcard record name is quoted (`--name='*.googleapis.com.'`) so shells such as zsh do not treat `*` as a file glob and abort with "no matches found".

```bash
gcloud dns record-sets transaction add --name='*.googleapis.com.' \
    --type=CNAME restricted.googleapis.com. \
    --zone=ZONE_NAME \
    --ttl=300
```

```bash
gcloud dns record-sets transaction add --name=restricted.googleapis.com. \
    --type=A 199.36.153.4 199.36.153.5 199.36.153.6 199.36.153.7 \
    --zone=ZONE_NAME \
    --ttl=300
```

IPv6 record set (only if you configure IPv6 for `restricted.googleapis.com`):

```bash
gcloud dns record-sets transaction add --name=restricted.googleapis.com. \
    --type=AAAA 2600:2d00:0002:1000:: \
    --zone=ZONE_NAME \
    --ttl=300
```

```bash
gcloud dns record-sets transaction execute --zone=ZONE_NAME
```

### Inbound DNS forwarding for on-premises hosts

```bash
gcloud dns policies create POLICY_NAME \
 --networks=https://www.googleapis.com/compute/v1/projects/PROJECT_ID/global/networks/NETWORK_NAME \
 --enable-inbound-forwarding \
 --description=DESCRIPTION
```

Find the Cloud DNS forwarder IP address:

```bash
gcloud compute addresses list --filter='name ~ ^dns-forwarding.*' \
 --format='csv[no-heading](address, subnetwork)'
```

### On-premises BIND with response policy zones

`/etc/bind/named.conf.options`:

```text
options {
  directory "/var/cache/bind";

  dnssec-validation no;

  auth-nxdomain no;    # conform to RFC 1035
  listen-on-v6 { any; };
  listen-on { any; };
  response-policy { zone "googleapis.zone"; };
  allow-query { any;};
};
```

`/etc/bind/named.conf.local`:

```text
include "/etc/bind/named.conf.default-zones";

zone "googleapis.zone" {
  type master;
  file "/etc/bind/db.googleapis.zone";
  allow-query {none;};
};
```

`/etc/bind/db.googleapis.zone`:

```text
$TTL 1H
@                       SOA LOCALHOST. noreply.localhost(1 1h 15m 30d 2h)
                        NS  LOCALHOST.

*.googleapis.com CNAME restricted.googleapis.com.
restricted.googleapis.com CNAME rpz-passthru.
```

## Options / Props

### IP ranges

| Purpose | IPv4 | IPv6 |
|---|---|---|
| `restricted.googleapis.com` VIP | `199.36.153.4/30` (A records `199.36.153.4`-`199.36.153.7`) | `2600:2d00:0002:1000::/56` |
| Direct connectivity (Google Cloud resources only, not on-premises) | `34.126.0.0/18` | `2001:4860:8040::/42` |

### Prerequisites

| Requirement | Detail |
|---|---|
| APIs | Enable the APIs you want to access. |
| Role | Project owner, editor, or IAM principals with the Network Admin role (`compute.networkAdmin`) can create or update subnets. |
| VPC network | Set up for Private Google Access and Private Google Access for on-premises hosts. Auto and custom mode VPC networks are supported; legacy networks are not. |
| VMs | Private IP only (no public IP) in a subnet with Private Google Access enabled. |
| On-premises hosts | An existing Cloud VPN tunnel or Cloud Interconnect connection to the VPC network. |

## Notes

- `restricted.googleapis.com` denies access to Google APIs and services not supported by VPC Service Controls. VPC Service Controls is enforced for supported, configured services regardless of the domain you use; the restricted VIP adds data-exfiltration mitigation.
- The route to the restricted range must have the default internet gateway as next hop. To prevent access to the internet, remove other routes whose next hop is the default internet gateway. If you have multiple tunnels or interconnects, cross-region asymmetric routes back to on-premises are not supported.
- IPv6: not all services accept traffic from IPv6 clients. Dual-stack clients reach services over IPv4. On-premises IPv6 clients can use any GUA or ULA addresses except the ULA range `fda3:e722:ac3:cc00::/64`, which is reserved for internal use. IPv6 routes are advertised only in BGP sessions where IPv6 is enabled (`--enable-ipv6` on `update-bgp-peer` if IPv6 traffic is disabled for the session).
- Direct connectivity: routes and firewall rules must allow IPv4 traffic to `34.126.0.0/18` and IPv6 to `2001:4860:8040::/42`; these addresses support VPC Service Controls and need no DNS records.
- Firewall rules: communication to `restricted.googleapis.com` is TCP port `443`. The source suggests an egress deny rule for all outbound traffic plus higher-priority egress rules that permit selected destinations and the restricted ranges. Blocking internet access can break legitimate traffic (such as software updates) and third-party APIs, and you can then reach VMs only through an on-premises network over Cloud VPN or Cloud Interconnect. Configure on-premises firewalls to allow the same ranges; direct connectivity is not supported from on-premises.
- DNS special cases: custom BIND is not supported with Dataflow (use Cloud DNS private zones or a DNS forwarding method). With Shared VPC, include the host project in the same perimeter as projects that connect to the network. GKE may also need DNS for `gcr.io` (see the source's GKE setup page).
- The BIND example is for on-premises implementations only. As written it sets `dnssec-validation no;` (disables DNSSEC validation) and `listen-on { any; }; allow-query { any;};` (answers any client); restrict `listen-on` / `allow-query` to your networks if the server is reachable beyond them. Adjust only deliberately.
- Corrected from the official docs: the source writes `--name=*.googleapis.com.` unquoted; in bash it works only while no file matches the pattern, and zsh aborts on the unmatched glob.
- The Cloud Router commands take `--region`; if it is not specified, gcloud might prompt for a region (interactive mode only). Set the `compute/region` property to avoid the prompt.
- The `gcloud dns record-sets transaction` steps stage changes and apply them on `execute`. The source also shows Console steps for Cloud Router advertisements, and the variants with `--add-advertisement-ranges` (append to an existing custom advertisement; requires advertisement mode already `custom`); those are omitted.
- Source: https://docs.cloud.google.com/vpc-service-controls/docs/set-up-private-connectivity (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [dry-run-mode.md](./dry-run-mode.md)
- [manage-service-perimeters.md](./manage-service-perimeters.md)
- [create-service-perimeters.md](./create-service-perimeters.md)
