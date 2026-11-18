---
source: https://docs.cloud.google.com/iap/docs/tcp-forwarding-overview
---

# TCP forwarding overview

IAP TCP forwarding lets you control who can reach administrative services such as SSH and RDP on your backends from the public internet. Requests must pass authentication and authorization checks (the target resource's IAM policy) before reaching the resource, so these services are not openly exposed.

## Signature / Usage

### How it works

For general TCP traffic, IAP creates a listening port on the local host that forwards all traffic to a specified instance, wrapping all client traffic in HTTPS. `gcloud compute ssh` wraps the SSH connection in HTTPS and forwards it without needing a listening local port.

```bash
gcloud compute ssh INSTANCE_NAME
```

## Notes

- Administrative services are those typically used to administer a machine, such as RDP, SSH, and MySQL's admin interface.
- Load-balanced targets are not supported. Calling the IAP TCP forwarding service from mobile devices is not supported.
- Enabling IAP on an administrative resource does not automatically block direct requests to it. IAP only blocks TCP requests that are not from IAP TCP forwarding IPs to the relevant services on the resource.
- TCP forwarding does not require a public, routable IP address on the resource; it uses internal IPs.
- Snippet taken from https://docs.cloud.google.com/iap/docs/using-tcp-forwarding
- The full flag lists of `gcloud compute ssh` (https://docs.cloud.google.com/sdk/gcloud/reference/compute/ssh) and `gcloud compute start-iap-tunnel` (https://docs.cloud.google.com/sdk/gcloud/reference/compute/start-iap-tunnel) are in the `gcp-compute` skill.
- Source: https://docs.cloud.google.com/iap/docs/tcp-forwarding-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [using-tcp-forwarding.md](./using-tcp-forwarding.md)
- [securing-tcp-with-vpc-sc.md](./securing-tcp-with-vpc-sc.md)
- [tcp-by-host.md](./tcp-by-host.md)
