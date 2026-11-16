---
source: https://docs.cloud.google.com/memorystore/docs/memcached/use-auto-discovery
---

# Use the Auto Discovery service

How to find and connect to a Memcached instance's discovery endpoint and read the node list.

## Signature / Usage

### Find the discovery endpoint

Adapted (not in the official docs): placeholders upper-cased; `--project=project` written as `PROJECT_ID` because gcloud takes a project ID, not a project name.

```bash
gcloud memcache instances describe INSTANCE_ID --project=PROJECT_ID --region=REGION --format="default(discoveryEndpoint)"
```

Output form: `discoveryEndpoint: [IP-address]:[port-number]`

### Query it with Telnet

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
telnet DISCOVERY_ENDPOINT_IP_ADDRESS DISCOVERY_ENDPOINT_PORT_NUMBER
```

```text
config get cluster
```

Response format:

Adapted (not in the official docs): a space is added between the node entries (`[node1-port] [node2-ip]`), matching the space-separated node list on the auto discovery overview page.

```text
CONFIG cluster 0 [length-of-payload-in-next-two-lines]
[integer]
[node1-ip]|[node1-ip]|[node1-port] [node2-ip]|[node2-ip]|[node2-port]
\r\n
END\r\n
```

## Notes

- First line: the last integer is the number of bytes in the next two lines (only needed when writing a parser). Second line: Configuration Version ID. Third line: Node List with IPs and ports.
- Do not use the discovery endpoint for data queries such as `set` and `get`.
- The discovery endpoint is also shown on the instance details page in the console.
- Adapted from the official docs: the source writes `gcloud memcache instances describe instance-id --project=project --region=region --format="default(discoveryEndpoint)"` and `telnet discovery-endpoint-ip-address discovery-endpoint-port-number`; the placeholders are upper-cased and `project` is shown as `PROJECT_ID`.
- Corrected from the official docs: the source's response format writes `[node1-port][node2-ip]` with no separator, while the overview page's Node List example is `node1-ip|node1-ip|node1-port node2-ip|node2-ip|node2-port` (space-separated); the format here uses the space so a parser splits nodes correctly.
- Source: https://docs.cloud.google.com/memorystore/docs/memcached/use-auto-discovery (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-auto-discovery.md](./about-auto-discovery.md)
- [connect-memcached-instance.md](./connect-memcached-instance.md)
- [supported-memcached-configurations.md](./supported-memcached-configurations.md)
