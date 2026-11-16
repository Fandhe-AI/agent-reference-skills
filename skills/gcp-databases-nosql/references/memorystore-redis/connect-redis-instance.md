---
source: https://docs.cloud.google.com/memorystore/docs/redis/connect-redis-instance
---

# Connect to a Redis instance

Connect to a Memorystore for Redis instance from a Compute Engine VM (telnet or `redis-cli`), with AUTH, via the read endpoint, over TLS with Stunnel, from a local machine through port forwarding, or from GKE. The client must be on the instance's authorized network with a supported RFC 1918 IP address.

## Signature / Usage

### telnet from a Compute Engine VM

```bash
sudo apt-get install telnet
```

```bash
telnet INSTANCE_IP_ADDRESS 6379
```

Expected: `Trying INSTANCE_IP_ADDRESS…` / `Connected to INSTANCE_IP_ADDRESS`. Then `PING` returns `PONG`, `SET HELLO WORLD` returns `+OK`, `GET HELLO` returns `$5` and `WORLD`.

### redis-cli from a Compute Engine VM

```bash
sudo apt-get install redis-tools
```

Adapted (not in the official docs): the lower-case placeholder `redis-instance-ip-address` was upper-cased to `REDIS_INSTANCE_IP_ADDRESS`.

```bash
redis-cli -h REDIS_INSTANCE_IP_ADDRESS
```

### Instance with AUTH enabled

Get the AUTH string first (see managing AUTH).

Adapted (not in the official docs): the `redis-cli -a` form is omitted (it exposes the AUTH string in shell history and the process list) and the lower-case placeholders were upper-cased; only the interactive `AUTH` form is kept.

```bash
redis-cli -h INSTANCE_IP_ADDRESS
AUTH AUTH_STRING
```

Then run `SET` and `GET` to verify the authenticated connection.

### Read endpoint

Find the read endpoint IP from the read replica information of the instance.

Adapted (not in the official docs): the lower-case placeholder `read-endpoint-ip` was upper-cased to `READ_ENDPOINT_IP`.

```bash
telnet READ_ENDPOINT_IP 6379
```

### In-transit encryption with Stunnel and telnet

Install tools on the VM:

```bash
sudo apt-get install stunnel4
```

Save all of the instance's CA certificates (up to three, from `gcloud redis instances describe`) left-justified into `/tmp/server_ca.pem`:

```bash
gcloud redis instances describe INSTANCE_ID --region=REGION
```

Create `/etc/stunnel/redis-client.conf`, replacing REDIS_INSTANCE_IP:

```text
output=/tmp/stunnel.log
CAfile=/tmp/server_ca.pem
client=yes
pid=/var/run/stunnel.pid
verifyChain=yes
sslVersion=TLSv1.2
[redis]
accept=127.0.0.1:6378
connect=REDIS_INSTANCE_IP:6378
```

```bash
sudo stunnel /etc/stunnel/redis-client.conf
```

```bash
telnet localhost 6378
```

If AUTH is enabled, authenticate in the telnet session (replace AUTH_STRING with the instance's authentication string), then `PING` returns `PONG`:

Adapted (not in the official docs): the source's alternative `redis-cli -h 127.0.0.1 -p 6378 -a AUTH_STRING` through the Stunnel port is omitted because it exposes the AUTH string in shell history and the process list; authenticate inside the session instead.

```text
AUTH AUTH_STRING
```

### Local machine via port forwarding

```bash
gcloud compute instances create COMPUTE_VM_NAME --machine-type=f1-micro --zone=ZONE
```

```bash
gcloud compute ssh COMPUTE_VM_NAME --zone=ZONE -- -N -L 6379:REDIS_INSTANCE_IP_ADDRESS:6379
```

In a new terminal, `redis-cli ping` should return `PONG`.

### GKE pod

Requires a VPC-native (IP alias) cluster for private services access instances.

```bash
gcloud container clusters get-credentials CLUSTER_NAME --zone=CLUSTER_ZONE --project=PROJECT_ID
```

```bash
kubectl run -i --tty redisbox --image=redis:7.2 -- sh
```

```bash
redis-cli -h HOST-IP info
```

## Notes

- Adapted from the official docs: the source also shows `redis-cli -h 127.0.0.1 -p 6378 -a AUTH_STRING` (Stunnel) and `redis-cli -h instance-ip-address -a auth-string`; both put the AUTH string in shell history and the process list, so they are omitted. Use the `AUTH` command inside the session. Never print or share the AUTH string.
- Adapted from the official docs: lower-case placeholders were upper-cased; the source writes `redis-cli -h redis-instance-ip-address`, `redis-cli -h instance-ip-address` / `AUTH auth-string` and `telnet read-endpoint-ip 6379`.
- Omitted: the source's `k8s-custom-iptables` workaround (clone and run `install.sh`) for GKE clusters version 1.7 or lower or without IP aliases, the `redis-benchmark` example, and the busybox shell example.
- Telnet to port 6379 is plaintext; use Stunnel (port 6378, `verifyChain=yes`, `sslVersion=TLSv1.2`) for instances with in-transit encryption.
- Delete the test Compute Engine VM afterwards to avoid charges. Some serverless environments need a Serverless VPC Access connector. A CMEK instance may need a different IP address on reconnect after a Cloud KMS outage.
- GKE: to a direct peering instance use the workaround; private services access needs VPC-native clusters.
- Managed Valkey / Redis / Memcached on Google Cloud; distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`). Sample apps for Compute Engine, GKE, Cloud Run, App Engine and Cloud Run functions are on other pages.
- Source: https://docs.cloud.google.com/memorystore/docs/redis/connect-redis-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [networking.md](./networking.md)
- [about-redis-auth.md](./about-redis-auth.md)
- [about-read-replicas.md](./about-read-replicas.md)
- [create-manage-instances.md](./create-manage-instances.md)
