---
source: https://docs.cloud.google.com/vpc-service-controls/docs/private-connectivity
---

# Private Google Access with VPC Service Controls

Private Google Access gives hosts in a VPC network or an on-premises network that use private IP addresses private connectivity to Google APIs and services. You can extend a service perimeter to those hosts to control access to protected resources.

## Signature / Usage

Hosts in a VPC network must have a private IP address only (no public IP address) and be in a subnet with Private Google Access enabled. On-premises hosts must send requests to Google APIs through a VPC network, either through a Cloud VPN tunnel or a Cloud Interconnect connection.

The DNS, routing, and perimeter setup is described below. For a VPC network inside a perimeter that already uses the restricted VIP, VPC accessible services limit which supported services it can reach (example from the VPC accessible services page):

```bash
gcloud access-context-manager perimeters update my-authorized-perimeter \
  --enable-vpc-accessible-services \
  --add-vpc-allowed-services=storage.googleapis.com
```

### Which VIP to use

- Send all requests to Google APIs and services to the VIP ranges for `restricted.googleapis.com` (recommended). The ranges are not announced to the internet and traffic stays within Google Cloud's network.
- If you need APIs not supported by VPC Service Controls, use `private.googleapis.com` or a Private Service Connect endpoint with the `all-apis` bundle, combined with VPC Service Controls service patterns. Using `private.googleapis.com` without service patterns can allow access to services that are not compliant with VPC Service Controls and might introduce data exfiltration risks.
- If you do not need unsupported APIs, use `restricted.googleapis.com`, which denies access to Google APIs and services not supported by VPC Service Controls.

### VPC network example

The perimeter contains one project with an authorized VPC network and another with the protected Cloud Storage resource. VM instances are in a subnet with Private Google Access and only need VPC restricted services.

- DNS in the VPC network maps `*.googleapis.com` to `restricted.googleapis.com`, which resolves to `199.36.153.4/30`.
- A custom static route sends traffic with destination `199.36.153.4/30` to `default-internet-gateway` as the next hop. The traffic is still routed privately through Google's network to the API or service.
- The VPC network can access `My-authorized-gcs-project` because both projects are in the same perimeter.

### On-premises network example

Use a static route in the on-premises router, or announce the restricted Google API address range through BGP from Cloud Router. Define a service perimeter for the project that contains the VPC network connected to the on-premises network.

- On-premises DNS maps `*.googleapis.com` to `restricted.googleapis.com`, which resolves to `199.36.153.4/30`.
- Cloud Router advertises the `199.36.153.4/30` range through the VPN tunnel.
- A custom static route in the VPC network sends `199.36.153.4/30` to `default-internet-gateway`.
- The VPC network is authorized for the `sensitive-buckets` project, and on-premises hosts have the same access. On-premises hosts cannot access other resources outside the perimeter.
- The project that connects to the on-premises network must be a member of the perimeter to reach restricted resources. On-premises access also works if the relevant projects are connected by a perimeter bridge.

## Options / Props

### IP address ranges for `restricted.googleapis.com`

| Family | Range |
|--------|-------|
| IPv4 | `199.36.153.4/30` |
| IPv6 | `2600:2d00:0002:1000::/56` |

## Notes

- Source: https://docs.cloud.google.com/vpc-service-controls/docs/private-connectivity (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/vpc-service-controls/docs/vpc-accessible-services. It updates the enforced perimeter configuration and needs an access policy (`--policy` or the `access_context_manager/policy` property).
- `perimeters update` is disruptive: requests from the VPC network to services not in the allowed list are denied as soon as the change propagates. Test with `gcloud access-context-manager perimeters dry-run update` (same flags) and try it on a disposable perimeter first.
- Do not route to `private.googleapis.com` from VPCs inside a perimeter unless you need unsupported services and use service patterns; the architecture guidance says such a route negates protection from insider data exfiltration.
- The source's next step links a codelab on deploying an agent and Agent Gateway with VPC to configure private connectivity within a service perimeter.

## Related

- [vpc-accessible-services.md](./vpc-accessible-services.md)
- [restricted-vip-services.md](./restricted-vip-services.md)
- [service-perimeters.md](./service-perimeters.md)
- [architect-perimeters.md](./architect-perimeters.md)
