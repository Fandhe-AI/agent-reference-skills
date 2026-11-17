---
source: https://docs.cloud.google.com/nat/docs/ports-and-addresses
---

# IP addresses and ports

How Cloud NAT gateways use IP addresses and allocate source ports to Compute Engine VMs and GKE nodes. Public NAT uses regional external IP addresses (automatic or manual); Private NAT uses internal IPv4 addresses from a `PRIVATE_NAT` subnet.

## Signature / Usage

### Address assignment and port settings (gcloud help examples)

Snippets taken from the `gcloud compute routers nats create` and `update` help EXAMPLES (see Notes): manual NAT IP addresses (reserved static address resources in the same region), then a changed minimum of ports per VM.

```bash
gcloud compute routers nats create nat1 --router=my-router \
    --nat-external-ip-pool=ip-address1,ip-address2
```

```bash
gcloud compute routers nats update nat1 --router=my-router \
    --min-ports-per-vm=128
```

## Options / Props

### Address allocation

| Item | Public NAT | Private NAT |
|---|---|---|
| Address type | Regional external IP, routable on the internet | Regional internal IPv4 from the primary range of a Private NAT subnet (`--purpose=PRIVATE_NAT`), same region and VPC network; not routable on the internet |
| Methods | Automatic allocation (tiers Premium default, or Standard) or manual assignment of reserved addresses (Premium, Standard or both) | Manual only: specify Private NAT subnet(s) in a rule |
| Auto-added addresses | Static reserved addresses; do not count toward per-project quotas | n/a |
| Usable addresses per subnet | n/a | `2(32 - PREFIX_LENGTH) - 4` (written as in the source; four addresses are unusable per subnet) |

### Ports

| Item | Value |
|---|---|
| Ports per NAT IP address | 64,512 TCP and 64,512 UDP source ports (well-known ports 0-1,023 not used) |
| Default allocation method | Public NAT: static; Private NAT: dynamic |
| Default minimum ports per VM | 64 (static), 32 (dynamic) |
| Minimum when alias ranges larger than /32 (static) | max(specified minimum, 1,024); GKE nodes at least 1,024 |
| Public NAT allocation granularity | Powers of two, at least the minimum |
| Private NAT allocation | Twice the required minimum ports per VM |
| Dynamic allocation growth | Doubles when close to exhaustion, up to the maximum |
| TIME_WAIT defaults | Cloud NAT 30 or 120 seconds (depends on gateway creation date); Linux VM 60 s; Windows VM 240 s |

### Port settings impact on connections

| Change | Effect |
|---|---|
| Increase min ports (static) | No interruption |
| Increase min/max (dynamic) | No interruption |
| Reduce min ports (static) | Established connections broken immediately |
| Reduce min ports (dynamic) | No disruption |
| Reduce max ports (dynamic) | All existing connections broken; allocations reset to minimum |
| Static to dynamic | Breaks connections only if max < previous min, or max < 1024 |
| Dynamic to static | Breaks all active connections |
| Automatic to manual NAT IPs | Disruptive; breaks all active NAT connections; auto addresses deleted |
| Remove a manual NAT IP | Breaks established connections immediately; drain instead |

### Capacity examples (from the source)

- Public, 1 NAT IP, 64 min ports: up to 1,008 VMs; 2 IPs: 2,016 VMs; 4,096 min ports: 15 VMs per IP.
- Private, /29 NAT subnet, 64 min ports: up to 2,016 VMs; 1024 min ports: 126 VMs; /28 with 64: 6,048 VMs.

## Notes

- Mixed-tier manual assignment is allowed only if addresses of different tiers are not in the same rule (including the default rule); same-rule mixes are rejected.
- Endpoint-independent mapping (EIM) requires static port allocation and is not available for Private NAT; EIM can cause "endpoint independent conflict" drops when one NAT tuple is mapped to several internal address and port pairs. Dynamic allocation cannot be configured with EIM.
- Automatic allocation: you cannot predict the next address (use manual assignment for allowlists); addresses are released only when the last VM stops using ports; reservations are not logged by Cloud NAT logging. If manual addresses run out, packets are dropped (logged with error logging on).
- Draining: draining a manual NAT IP stops new connections but lets established ones close; removing one breaks connections immediately. A new manual address cannot be added as drained.
- Running out of capacity: for manual NAT IPs calculate the needed count before raising min ports; with automatic allocation, raising min ports acquires more addresses; with Private NAT, size the NAT subnet.
- If you depend on source port randomization for security, increase min ports per VM or assign an external IP to the VM. Ports are assigned as a random range but sequentially within it.
- With dynamic allocation, connection timeouts or latency can occur while ports are added.
- Snippets taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/nats/create and `.../update` (gcloud 593.0.0 help); the page has no code.
- Changing `--min-ports-per-vm` or the NAT IP list on a live gateway can break established connections (see the table above); try it on a disposable gateway first.
- Source: https://docs.cloud.google.com/nat/docs/ports-and-addresses (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [public-nat.md](./public-nat.md)
- [private-nat.md](./private-nat.md)
- [nat-rules-overview.md](./nat-rules-overview.md)
- [quota.md](./quota.md)
