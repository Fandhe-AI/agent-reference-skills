---
source: https://docs.cloud.google.com/memorystore/docs/memcached/create-instance-gcloud
---

# Create a Memorystore for Memcached instance by using the gcloud CLI

Quickstart: create an instance, connect from a Compute Engine VM, run Memcached commands, and delete the instance. A private services access connection must exist first.

## Signature / Usage

### Before you begin

Update gcloud, enable the Service Networking API and the Memorystore for Memcached API (`memcache.googleapis.com`).

```bash
gcloud components update
```

### Create the instance

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
gcloud config set core/project PROJECT_ID
```

```bash
gcloud memcache instances create myinstance --node-count=3 --node-cpu=4 \
    --node-memory=10GB --region=us-central1 --memcached-version=1.6.15
```

Note the IP address of one of the nodes:

```bash
gcloud memcache instances describe myinstance --region=us-central1
```

### Connect from a Compute Engine VM

The client must be in the same region and use the same network as the instance, or a Shared VPC network.

```bash
sudo apt-get install telnet
```

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
telnet NODE_IP_ADDRESS 11211
```

Commands in the telnet session:

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

### Clean up

```bash
gcloud memcache instances delete myinstance --region=us-central1
```

gcloud prompts `Do you want to continue (Y/n)?` and, on success, returns `Deleted instance [myinstance]`.

## Notes

- Destructive: deleting the instance discards all associated data; this quickstart instance is disposable.
- The telnet session is unencrypted and unauthenticated (instance-level authentication and TLS are not available); it relies on VPC network isolation.
- Distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Adapted from the official docs: the source writes `gcloud config set core/project project-id` and `telnet node-ip-address 11211`; the placeholders are upper-cased here.
- Source: https://docs.cloud.google.com/memorystore/docs/memcached/create-instance-gcloud (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-manage-instances.md](./create-manage-instances.md)
- [connect-memcached-instance.md](./connect-memcached-instance.md)
- [networking.md](./networking.md)
- [use-auto-discovery.md](./use-auto-discovery.md)
- [monitor-instances.md](./monitor-instances.md)
