---
source: https://docs.cloud.google.com/iap/docs/tcp-by-host
---

# Set up IAP TCP forwarding

Create IAP TCP tunnels to a private IP address or FQDN, in Google Cloud or in non-Google Cloud environments connected through Cloud Interconnect or Cloud VPN, using tunnel destination groups for permission checks.

## Signature / Usage

### Prerequisites

Hybrid connectivity is required for resources outside Google Cloud. Your cloud router must advertise the IAP-TCP range `35.235.240.0/20` so response traffic returns through Cloud VPN or Cloud Interconnect, not the internet; otherwise tunnels to external resources cannot be created (see "Advertising custom IP ranges" in the Cloud Router docs).

### Create a destination group

Requires `iap.tunnelDestGroups.create` (granted by `iap.tunnelDestGroupEditor`). Destination groups represent resources with the same tunnel access restrictions; any number may exist and they may overlap.

```bash
gcloud iap tcp dest-groups create YOUR_GROUP_NAME \
  --region=REGION \
  --ip-range-list=IP_RANGE_LIST \
  --fqdn-list=FQDN_LIST
```

List existing groups:

```bash
gcloud iap tcp dest-groups list \
  --region=REGION
```

### Grant tunnel permission on the group

```bash
gcloud iap tcp dest-groups add-iam-policy-binding \
  --member=MEMBER \
  --role=ROLE \
  --dest-group=GROUP_NAME \
  --region=REGION
```

### Find the VPC network name

```bash
gcloud compute networks list --format='value(name)'
```

### SSH, tunnel and SCP examples (IP `172.16.1.2`; an FQDN also works)

```bash
gcloud compute ssh 172.16.1.2 \
    --region=us-central1 \
    --dest-group=DESTINATION_GROUP_NAME \
    --network=default \
    --tunnel-through-iap
```

With an explicit private key (for `Permission denied (publickey)`):

```bash
gcloud compute ssh 172.16.1.2 \
    --region=us-central1 \
    --dest-group=DESTINATION_GROUP_NAME \
    --network=default \
    --tunnel-through-iap \
    -- -i ~/.ssh/google_compute_engine
```

As a specific user:

```bash
gcloud compute ssh user@172.16.1.2 \
    --region=us-central1 \
    --dest-group=DESTINATION_GROUP_NAME \
    --network=default \
    --tunnel-through-iap
```

Tunnel `localhost:8022` to port `8085` (the destination must listen on it):

```bash
gcloud compute start-iap-tunnel 172.16.1.2 8085 \
    --local-host-port=localhost:8022 \
    --region=us-central1 \
    --dest-group=DESTINATION_GROUP_NAME \
    --network=default
```

```bash
gcloud compute scp file.txt 172.16.1.2:~/ \
    --region=us-central1 \
    --dest-group=DESTINATION_GROUP_NAME \
    --network=default \
    --tunnel-through-iap
```

### SSH ProxyCommand (`~/.ssh/config`)

```text
Host example
ProxyCommand gcloud compute start-iap-tunnel 172.16.1.2 '%p' --region=us-central1 --dest-group=DESTINATION_GROUP_NAME --network=default --verbosity=warning
```

Run with `ssh example`. For many hostnames:

```text
Host *.internal.company.com
ProxyCommand gcloud compute start-iap-tunnel '%h' '%p' --region=us-central1 --dest-group=DESTINATION_GROUP_NAME --network=default --verbosity=warning
```

Run with `ssh example.internal.company.com`.

## Options / Props

### Destination group parameters

| Name | Description |
|------|-------------|
| `YOUR_GROUP_NAME` | Lowercase letters (a-z) and dashes (-) only |
| `REGION` | Required; should match the location of the destination resources (for a VPN, the VPN gateway region), for example `us-central1` |
| `IP_RANGE_LIST` | Optional. Comma-separated CIDR ranges, such as `10.1.2.0/24,172.0.0.0/8` |
| `FQDN_LIST` | Optional. Comma-separated hostnames, such as `*.internal.company.com`. A wildcard prefix matches any hostname with that ending; otherwise an exact match is required. A request matching any IP range or FQDN is a match |
| `MEMBER` | For example `user:exampleuser@company.com` |
| `ROLE` | `roles/iap.tunnelResourceAccessor` |

### Permissions

| Task | Permission (role) |
|------|-------------------|
| Create a destination group | `iap.tunnelDestGroups.create` (`iap.tunnelDestGroupEditor`) |
| Create a tunnel | `iap.tunnelDestGroups.accessViaIAP` on the group (`iap.tunnelResourceAccessor`) |
| Set permissions on a group | `iap.tunnelDestGroups.setIamPolicy` (`iap.admin`) |

### Switching `ssh`, `scp` and `start-iap-tunnel` to IP / FQDN

| Change | Detail |
|--------|--------|
| Target | Give an IP address or FQDN instead of the instance name |
| Location | `--region` instead of `--zone`; must match the destination group's region |
| Group | `--dest-group` names the destination group |
| Network | `--network` names the VPC network with access to the destination (often `default`) |

## Notes

- The IP must be the destination's private IP; public IPs cannot be used. An FQDN must resolve to a private IP, and resolution happens inside the specified VPC network, not the client's network.
- `--plain` is implied for IP / FQDN targets, so SSH keys are not managed or pushed automatically.
- A password-protected account prompts for a password; key-pair accounts need `-- -i`.
- Console and REST (`projects.iap_tunnel.locations.destGroups`) forms exist; managing groups (describe, update, delete) is in the `iap tcp dest-groups` gcloud commands. The full `gcloud compute ssh|scp|start-iap-tunnel` flag lists are in the `gcp-compute` skill.
- Deleting a destination group (`gcloud iap tcp dest-groups delete GROUP_NAME --region=REGION`, or the garbage can icon on the **SSH and TCP resources** tab) deletes the group resource; try the change on a disposable group first.
- Source: https://docs.cloud.google.com/iap/docs/tcp-by-host (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [using-tcp-forwarding.md](./using-tcp-forwarding.md)
- [tcp-forwarding-overview.md](./tcp-forwarding-overview.md)
- [faq.md](./faq.md)
