---
source: https://docs.cloud.google.com/memorystore/docs/cluster/connect-cluster-instance
---

# Connect to a Memorystore for Redis Cluster instance

Client support, firewall ports, finding the discovery endpoint, and connecting from a Compute Engine VM with `redis-cli` (plain and with in-transit encryption).

## Signature / Usage

### View the discovery endpoint

Run `gcloud redis clusters describe` (see the create-manage-instances page, "view instance details"); take the address and port from `discoveryEndpoints`. Sample output:

```yaml
authorizationMode: AUTH_MODE_DISABLED
createTime: '2023-08-04T17:49:07.988918793Z'
discoveryEndpoints:
- address: 10.142.0.13
  port: 6379
  pscConfig:
  - network: projects/my-project-364018/global/networks/default
name: projects/my-project-364018/locations/us-east1/clusters/my-cluster-1
pscConnections:
- address: 10.142.0.13
  forwardingRule: https://www.googleapis.com/compute/v1/projects/my-project-364018/regions/us-east1/forwardingRules/sca-auto-fr-5bc46f69-ec80-4c5a-8971-ce267a4d8ddd
  network: projects/my-project-364018/global/networks/default
  projectId: my-project-364018
  pscConnectionId: '25734306048376845'
- address: 10.142.0.10
  forwardingRule: https://www.googleapis.com/compute/v1/projects/my-project-364018/regions/us-east1/.
  forwardingRules/sca-auto-fr-817b64c5-85ac-48d0-82e3-c6fa99b4e67d
  network: projects/my-project-364018/global/networks/default
  projectId: my-project-364018
  pscConnectionId: '25734306048376842'
replicaCount: 0
shardCount: 3
sizeGb: 39
state: ACTIVE
tier: PERFORMANCE
transitEncryptionMode: TRANSIT_ENCRYPTION_MODE_DISABLED
uid: cddda5de-d91f-449b-8755-3a665430271a
```

### Connect with redis-cli (no TLS)

```bash
redis-cli -h DISCOVERY_ENDPOINT_ADDRESS -p PORT_NUMBER -c
```

Run `CLUSTER SHARDS` to see the topology, then connect to a node:

```bash
redis-cli -h NODE_IP_ADDRESS -p NODE_PORT -c
```

Then `PING` returns `PONG`, `SET HELLO WORLD` returns `OK`, and `GET HELLO` returns `"WORLD"`.

### Connect to an in-transit encryption enabled instance

```bash
redis-cli -h DISCOVERY_ENDPOINT_ADDRESS -p PORT_NUMBER -c --tls --cacert /tmp/server_ca.pem
```

With IAM or basic token-based authentication, add credentials next to the TLS flags:

Adapted (not in the official docs): `-a TOKEN` is replaced with `--askpass`, so `redis-cli` prompts for the token instead of taking it as a process argument.

```bash
redis-cli -h DISCOVERY_ENDPOINT_ADDRESS -p PORT_NUMBER -c --tls --cacert /tmp/server_ca.pem --user USERNAME --askpass
```

Node connection with TLS:

```bash
redis-cli -h NODE_IP_ADDRESS -p NODE_PORT -c --tls --cacert /tmp/server_ca.pem
```

### redis-py best practice

```python
from rediscluster import RedisCluster
endpoints = [{"host": "IPADDRESS", "port": "6379"}]

rdb = RedisCluster(
    startup_nodes=endpoints,
    skip_full_coverage_check=True, # Required for Memorystore
    decode_responses = True)

print(rdb.set('PYTHON', 'CLUSTER'))
print(rdb.get('PYTHON'))
print(rdb.unlink('PYTHON'))
```

## Options / Props

| Item | Value |
|---|---|
| Firewall (TCP) | Allow 6379 and 11000 through 13047 for all of the cluster's Private Service Connect endpoints |
| redis-cli | Version 6.0 or newer |
| `-c` | Cluster support mode; without it, accessing a key on another shard returns `MOVED` |
| `--cacert` | Server CA certificate (needed for per-instance and shared CA modes; not needed for customer-managed CA) |

## Notes

- Memorystore for Redis Cluster provides no client library of its own; use third-party libraries that support the Redis protocol.
- Corrected from the official docs: the source's command ends with `--user USERNAME -a TOKEN`, which puts the token in shell history and the process list. The redis-cli reference describes `--askpass` as "Force user to input password with mask from STDIN. If this argument is used, '-a' and REDISCLI_AUTH environment variable will be ignored." (https://redis.io/docs/latest/develop/tools/cli/). Never print the token, and never weaken `--tls` or AUTH.
- Source inconsistency: the sample output wraps the second `forwardingRule` value across two lines (`.../regions/us-east1/.` then `forwardingRules/...`); kept verbatim.
- Do not connect to the data endpoint directly; use the discovery endpoint.
- Cross-region access from a client in another region is supported.
- Source inconsistency: the redis-py section imports `rediscluster` (the redis-py-cluster package) while its heading says redis-py; kept verbatim.
- CA certificate setup: per-instance CA (install cluster CA certificates), shared CA (install CA certificate bundle), customer-managed CA (no extra download).
- Delete the test Compute Engine VM afterward to avoid charges.
- Memorystore pages here cover managed Valkey / Redis / Memcached on Google Cloud, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/memorystore/docs/cluster/connect-cluster-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [client-library-connection.md](./client-library-connection.md)
- [create-instances.md](./create-instances.md)
- [cluster-node-specification.md](./cluster-node-specification.md)
