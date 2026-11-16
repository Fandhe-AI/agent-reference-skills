---
source: https://docs.cloud.google.com/memorystore/docs/valkey/connect-instance
---

# Connect to an instance

Find the endpoints of a Memorystore for Valkey instance with `gcloud memorystore instances describe` and connect from a Compute Engine VM with `valkey-cli`, with or without in-transit encryption (TLS).

## Signature / Usage

### View endpoints

Run `gcloud memorystore instances describe` (see the view-instance-information page, same command as in configure-instances.md).

```bash
gcloud memorystore instances describe INSTANCE_ID --location=REGION_ID
```

Cluster Mode Enabled: in the `endpoints:` section note the `ipAddress` and `port` (6379 in the source output) of the `connectionType: CONNECTION_TYPE_DISCOVERY` entry; together they are the discovery endpoint. The output also shows fields such as `authorizationMode`, `engineVersion`, `nodeType`, `shardCount`, `replicaCount`, `transitEncryptionMode` and `zoneDistributionConfig`.

Cluster Mode Disabled: the output has `mode: CLUSTER_DISABLED` and two connections, `CONNECTION_TYPE_PRIMARY` (primary endpoint) and `CONNECTION_TYPE_READER` (reader endpoint), each with `ipAddress` and `port: 6379`.

### Cluster Mode Enabled with valkey-cli

```bash
valkey-cli -h DISCOVERY_ENDPOINT_ADDRESS -p PORT_NUMBER -c
```

Run `CLUSTER SHARDS` to view the topology, then connect to a node:

```bash
valkey-cli -h NODE_IP_ADDRESS -p NODE_PORT -c
```

Once connected, test with Valkey commands: `PING` returns `PONG`, `SET HELLO WORLD` returns `OK`, and `GET HELLO` returns `"WORLD"`.

### Cluster Mode Disabled with valkey-cli

Primary endpoint:

```bash
valkey-cli -h PRIMARY_ENDPOINT_ADDRESS -p PORT_NUMBER
```

Reader endpoint:

```bash
valkey-cli -h READER_ENDPOINT_ADDRESS -p PORT_NUMBER
```

The primary endpoint accepts writes (`SET HELLO WORLD`); the reader endpoint serves reads (`GET HELLO`).

### In-transit encryption (TLS)

Cluster Mode Enabled:

```bash
valkey-cli -h DISCOVERY_ENDPOINT_ADDRESS -p PORT_NUMBER -c --tls --cacert /tmp/server_ca.pem
```

With IAM or token authentication add the user and token:

Adapted (not in the official docs): `-a TOKEN` is replaced with `--askpass`, so `valkey-cli` prompts for the token instead of taking it as a process argument.

```bash
valkey-cli -h DISCOVERY_ENDPOINT_ADDRESS -p PORT_NUMBER -c --tls --cacert /tmp/server_ca.pem --user USERNAME --askpass
```

Cluster Mode Disabled, primary and reader endpoints:

```bash
valkey-cli -h PRIMARY_ENDPOINT_ADDRESS -p PORT_NUMBER --tls --cacert /tmp/server_ca.pem
```

```bash
valkey-cli -h READER_ENDPOINT_ADDRESS -p PORT_NUMBER --tls --cacert /tmp/server_ca.pem
```

With IAM or token authentication the source adds the user and token, for example on the primary endpoint:

Adapted (not in the official docs): `-a TOKEN` is replaced with `--askpass`, so `valkey-cli` prompts for the token instead of taking it as a process argument.

```bash
valkey-cli -h PRIMARY_ENDPOINT_ADDRESS -p PORT_NUMBER --tls --cacert /tmp/server_ca.pem --user USERNAME --askpass
```

## Options / Props

| Item | Detail |
|---|---|
| Firewall ports | Allow TCP port 6379 and TCP ports 11000 through 13047 for all Private Service Connect endpoints. |
| `-c` | `valkey-cli` cluster support mode; without it, keys on another shard return `MOVED`. |
| `valkey-cli` version | 6.0 or newer for TLS. |
| CA mode per-instance | Install the instance CA certificates on the client. |
| CA mode shared | Install the CA certificate bundle on the client. |
| CA mode customer-managed | No extra CA certificates to download or install. |
| Cross region | Clients in a different region than the instance can connect. |

## Notes

- Do not connect to the data endpoint of a Cluster Mode Enabled instance; it is reserved for Memorystore.
- Corrected from the official docs: the source's commands end with `--user USERNAME -a TOKEN`, which puts the token in shell history and the process list. The valkey-cli reference says "The username is only sent together with a password, so also set one with `-a`, `--askpass`, or `VALKEYCLI_AUTH`" (https://valkey.io/topics/cli/). The token authentication page (https://docs.cloud.google.com/memorystore/docs/valkey/manage-basic-auth) documents the `AUTH USERNAME TOKEN` client command for authenticating after connecting. Do not paste real tokens into shared terminals, and never print access tokens. Keep `--tls` and `--cacert` whenever TLS is enabled.
- Delete the Compute Engine VM after testing to avoid charges.
- Source inconsistency: the source's Cluster Mode Disabled reader TLS example with credentials adds `-c` (cluster mode) while the other Cluster Mode Disabled commands do not; it is omitted here, and the manage-iam-auth page says not to use `-c` with a Cluster Mode Disabled instance.
- The source also shows the full describe output (PSC forwarding rules, connection IDs, service attachments).
- Memorystore pages cover managed Valkey / Redis / Memcached on Google Cloud, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/connect-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [client-library-code-samples.md](./client-library-code-samples.md)
- [instance-node-specification.md](./instance-node-specification.md)
- [create-instances.md](./create-instances.md)
