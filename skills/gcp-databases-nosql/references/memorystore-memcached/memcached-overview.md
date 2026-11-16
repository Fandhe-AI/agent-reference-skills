---
source: https://docs.cloud.google.com/memorystore/docs/memcached/memcached-overview
---

# Memorystore for Memcached overview

Memorystore for Memcached is a highly scalable, fully managed Memcached service for Google Cloud, built on open source Memcached and compliant with the binary and ASCII protocols. It works with standard OSS Memcached client libraries in all languages. Common use cases are caching of reference data, database query caching, and session storage.

## Signature / Usage

### Create an instance (basic form)

```bash
gcloud memcache instances create myinstance --node-count=3 --node-cpu=2 --node-memory=2GB --region=us-central1 --zones=us-central1-a,us-central1-b,us-central1-c --memcached-version=1.6.15
```

## Options / Props

### Key concepts

| Concept | Description |
|---|---|
| Memcached Instance | One Memcached cluster; a single node or a collection of nodes. All nodes have the same memory per node and the same number of vCPUs. Keys are divided across all nodes and are not replicated. |
| Memcached Node | Fundamental unit of an instance; each node has an IP address and port. |
| Location | Region of the instance, and how nodes are distributed across zones. Deploy in the same region as the accessing application; access from a different region is not supported. Distributing nodes automatically across zones is recommended. |
| Authorized VPC Network | Set at creation and cannot be altered later. A private services access connection must exist on the network. |
| Private services access | Must be established for the authorized VPC network before the instance can be created. |
| Configurations | Memcached-specific settings, settable at creation and changeable at runtime. |
| Auto Discovery service | Lets clients discover all nodes in the cluster programmatically. |

### Features and capabilities

| Feature | Description |
|---|---|
| Memcached versions | 1.5.16 and 1.6.15. |
| Instance sizing | Maximum 20 nodes per instance. 1 to 32 vCPUs per node. Memory per node: minimum 1 GB, maximum 256 GB, in 1 GB increments. Maximum instance size 5 TB. |
| Instance scaling | Horizontal: increase or decrease the number of nodes. Vertical scaling of nodes requires recreating the instance. |
| Security and access control | Access restricted to clients connected to the project's VPC network (all clients of a Shared VPC network if used). Instance-level authentication is not available. Admin operations are controlled by IAM roles. |
| Platform support | Compute Engine, Google Kubernetes Engine, Cloud Run (requires Serverless VPC Access), Cloud Run functions (requires Serverless VPC Access), App Engine flexible environment, App Engine standard environment (requires Serverless VPC Access). |
| Client libraries | All standard Memcached client libraries. |
| Auto Discovery | Client support currently available in Go; existing clients can be modified. Compatible with most clients that support AWS Elasticache auto discovery. |
| Monitoring | Metrics and dashboards in the Google Cloud console. |

## Notes

- Managed Valkey / Redis / Memcached on Google Cloud; distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Instance-level authentication is not available, so access control relies on the VPC network boundary.
- Snippet taken from https://docs.cloud.google.com/memorystore/docs/memcached/create-manage-instances (the overview page has no code).
- Source: https://docs.cloud.google.com/memorystore/docs/memcached/memcached-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-manage-instances.md](./create-manage-instances.md)
- [networking.md](./networking.md)
- [about-auto-discovery.md](./about-auto-discovery.md)
- [instance-node-properties.md](./instance-node-properties.md)
- [supported-versions.md](./supported-versions.md)
