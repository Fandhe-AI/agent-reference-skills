---
source: https://docs.cloud.google.com/memorystore/docs/memcached/connect-memcached-instance
---

# Connect to a Memcached instance

Connect to Memorystore for Memcached from Compute Engine VMs, GKE clusters, Cloud Run functions, App Engine flexible and App Engine standard. Any open source Memcached client library works.

## Signature / Usage

### From a Compute Engine VM

The VM must be in the same project and region and on the same network (or VPC network) as the instance.

```bash
sudo apt-get install telnet
```

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
telnet NODE_IP_ADDRESS 11211
```

```text
get greeting
```

Result: `END`

```text
set greeting 1 0 11
hello world
```

Result: `STORED`

```text
get greeting
```

Result:

```text
VALUE greeting 1 11
hello world
END
```

### From a GKE cluster

The cluster must be in the same region and network as the instance, and must be VPC-native (IP aliasing enabled; check `useIpAliases: true` in `gcloud container clusters describe`).

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
gcloud container clusters get-credentials CLUSTER_NAME --zone=CLUSTER_ZONE --project=PROJECT_ID
```

```bash
kubectl run -i --tty busybox --image=busybox -- sh
```

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
telnet NODE_IP_ADDRESS 11211
```

Find the reserved IP range or node IPs:

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
gcloud memcache instances describe INSTANCE_ID --region=REGION
```

## Notes

- Cloud Run functions and App Engine standard need a Serverless VPC Access connector first (see the VPC connection guides linked in the source).
- The telnet connection is plaintext; TLS and instance-level authentication are not supported by the service.
- The source also describes a workaround for GKE 1.7 or lower (or 1.8+ without IP aliases) that clones and runs a third-party iptables repository; it is omitted here because it executes unreviewed third-party code. Use a VPC-native cluster instead.
- Console steps (GKE page, Cloud Shell) are omitted.
- Distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Adapted from the official docs: the source writes its placeholders in lower case (`node-ip-address`, `cluster-name`, `cluster-zone`, `project-id`, `instance-id`, `region`); they are upper-cased here.
- Source: https://docs.cloud.google.com/memorystore/docs/memcached/connect-memcached-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [networking.md](./networking.md)
- [use-auto-discovery.md](./use-auto-discovery.md)
- [best-practices.md](./best-practices.md)
