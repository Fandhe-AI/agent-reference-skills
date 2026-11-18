---
source: https://docs.cloud.google.com/vpc-service-controls/docs/vpc-accessible-services
---

# VPC accessible services

The VPC accessible services feature limits the set of services accessible from network endpoints inside a service perimeter. It applies only to traffic from your VPC network endpoints to Google APIs; unlike service perimeters it does not apply to communication between Google APIs or to tenancy unit networks that implement certain Google Cloud services.

## Signature / Usage

Example: a perimeter `my-authorized-perimeter` with projects `my-authorized-compute-project` (hosts a VPC network) and `my-authorized-gcs-project` (uses Cloud Storage, Bigtable, and others). The VPC network already uses the restricted VIP, which does not stop it reaching supported services such as Bigtable in `my-authorized-gcs-project`. To limit it to Cloud Storage, enable VPC accessible services and allow only `storage.googleapis.com`:

```bash
gcloud access-context-manager perimeters update my-authorized-perimeter \
  --enable-vpc-accessible-services \
  --add-vpc-allowed-services=storage.googleapis.com
```

After this command the VPC network can only access Cloud Storage resources. The restriction also applies to projects and VPC networks you add to the perimeter later.

### Service patterns

- Service patterns configure which Google APIs can be accessed from VPC networks in a perimeter when using the private VIP. Specify Google API URL patterns for unsupported services to allow, and deny all other unsupported API requests on the private VIP path.
- They can attach HTTP headers (such as `X-Goog-Allowed-Resources`) to API requests for unsupported services without a proxy, enforcing tenant-based or domain-based restrictions to mitigate exfiltration risks.

## Options / Props

| Setting | Description |
|---------|-------------|
| List of services | Individual services accessible from the perimeter's network endpoints. |
| `RESTRICTED-SERVICES` | Value that automatically includes all services protected by the perimeter. |

### Requirements for limiting access

| Requirement | Detail |
|-------------|--------|
| Perimeter protects the same services | Configure the perimeter to protect the same set of services you want to make accessible. |
| Supported services only | Configure VPC networks to use the restricted VIP. |
| Unsupported Google APIs | Configure VPC networks to use the private VIP and configure service patterns. |
| Destination IP control | Use VPC firewall rules to restrict traffic based on destination IP addresses. |

## Notes

- Source: https://docs.cloud.google.com/vpc-service-controls/docs/vpc-accessible-services (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- `perimeters update` changes the enforced configuration and the positional `PERIMETER` needs an access policy (`--policy` or the `access_context_manager/policy` property). The command's help shows a `perimeters dry-run update` counterpart with the same flags. Enabling VPC accessible services is disruptive (requests to services not in the allowed list are denied); test in dry run first and try it on a disposable perimeter.
- The prose of this page writes the value as `RESTRICTED-SERVICES` (hyphen), while the perimeter YAML on the context-aware access page shows `RESTRICTED_SERVICES` (underscore). Both are kept as in their sources; check the form with `gcloud access-context-manager perimeters describe` output before scripting.
- The source also recommends optimizing perimeters with recommender (Preview).

## Related

- [service-perimeters.md](./service-perimeters.md)
- [private-connectivity.md](./private-connectivity.md)
- [restricted-vip-services.md](./restricted-vip-services.md)
