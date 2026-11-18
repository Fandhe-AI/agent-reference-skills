---
source: https://docs.cloud.google.com/iap/docs/securing-tcp-with-vpc-sc
---

# Securing IAP for TCP forwarding with VPC Service Controls

Protect IAP for TCP forwarding with a VPC Service Controls service perimeter, and use IAP TCP forwarding from inside a perimeter.

## Signature / Usage

### Perimeter prerequisites

Set up IAP TCP forwarding without a perimeter first, then create a perimeter that:

1. Includes the project containing the Compute Engine instance you connect to (and the project of the VM running an IAP for TCP client, if any).
2. Lists **Identity-Aware Proxy TCP API** among the protected services.

### Configure DNS with Cloud DNS (client inside a perimeter)

Skip this if the client (likely the gcloud CLI) runs outside any perimeter. IAP for TCP uses domains that are not subdomains of `googleapis.com`, so also configure the `*.googleapis.com` DNS as usual for VPC Service Controls, then create a private zone for `tunnel.cloudproxy.app`. `PROJECT_ID` hosts the VPC network, `NETWORK_NAME` is the network running the client, `ZONE_NAME` is a name such as `iap-tcp-zone`.

```bash
gcloud dns managed-zones create ZONE_NAME \
 --visibility=private \
 --networks=https://www.googleapis.com/compute/v1/projects/PROJECT_ID/global/networks/NETWORK_NAME \
 --dns-name=tunnel.cloudproxy.app \
 --description="Description of your managed zone"
```

```bash
gcloud dns record-sets transaction start --zone=ZONE_NAME
```

The A record reroutes traffic to the restricted VIP:

```bash
gcloud dns record-sets transaction add \
 --name=tunnel.cloudproxy.app. \
 --type=A 199.36.153.4 199.36.153.5 199.36.153.6 199.36.153.7 \
 --zone=ZONE_NAME \
 --ttl=300
```

```bash
gcloud dns record-sets transaction add \
 --name="*.tunnel.cloudproxy.app." \
 --type=CNAME tunnel.cloudproxy.app. \
 --zone=ZONE_NAME \
 --ttl=300
```

```bash
gcloud dns record-sets transaction execute --zone=ZONE_NAME
```

## Options / Props

| Option | Value |
|--------|-------|
| Restricted VIP | `199.36.153.4 199.36.153.5 199.36.153.6 199.36.153.7` |
| Private VIP (alternative, depending on perimeter and network configuration) | `199.36.153.8 199.36.153.9 199.36.153.10 199.36.153.11` |
| Domain | `tunnel.cloudproxy.app` |
| Shared VPC | Add both the host project and the service projects to the perimeter |

## Notes

- Perimeter changes can block production traffic. Create the perimeter in dry-run mode first and test on a disposable project before enforcing.
- Instead of Cloud DNS you can use BIND, following the VPC Service Controls private connectivity directions with the IAP for TCP domains instead of `googleapis.com`.
- Use the private VIP in place of the restricted VIP in the A record when your configuration allows.
- Source: https://docs.cloud.google.com/iap/docs/securing-tcp-with-vpc-sc (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [using-tcp-forwarding.md](./using-tcp-forwarding.md)
- [faq.md](./faq.md)
