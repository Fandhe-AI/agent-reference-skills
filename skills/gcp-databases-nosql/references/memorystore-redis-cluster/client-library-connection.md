---
source: https://docs.cloud.google.com/memorystore/docs/cluster/client-library-connection
---

# Client library code samples

Client library settings for connecting to Memorystore for Redis Cluster: Lettuce (plain), go-redis (in-transit encryption), and redis-py / Lettuce / Jedis / Go with IAM authentication plus in-transit encryption.

## Signature / Usage

### redis-py with IAM authentication and in-transit encryption (redis-py 5.1+)

Adapted (not in the official docs): the `<TO-DO-n>` placeholders were replaced by quoted upper-case placeholders so the snippet is valid Python.

```python
from google.cloud import iam_credentials_v1
from redis.backoff import ConstantBackoff
from redis.retry import Retry
from redis.exceptions import (
 ConnectionError,
 AuthenticationWrongNumberOfArgsError,
 AuthenticationError
)
from redis.utils import (str_if_bytes)

import redis

service_account="projects/-/serviceAccounts/SERVICE_ACCOUNT_EMAIL"

host="DISCOVERY_ENDPOINT_IP"

ssl_ca_certs="SERVER_CA_FILE_NAME"

def generate_access_token():
  # Create a client
  client = iam_credentials_v1.IAMCredentialsClient()

  # Initialize request argument(s)
  request = iam_credentials_v1.GenerateAccessTokenRequest(
      name=service_account,
      scope=['https://www.googleapis.com/auth/cloud-platform'],
  )

  # Make the request
  response = client.generate_access_token(request=request)

  # Handle the response
  return str(response.access_token)

def iam_connect(connection: redis.Connection):
  "Initialize the connection and authenticate"
  connection._parser.on_connect(connection)

  auth_args = (generate_access_token(),)
  connection.send_command("AUTH", *auth_args, check_health=False)

  try:
      auth_response = connection.read_response()
  except AuthenticationWrongNumberOfArgsError:
      connection.send_command("AUTH", connection.password, check_health=False)
      auth_response = connection.read_response()

  if str_if_bytes(auth_response) != "OK":
      raise AuthenticationError("Invalid Username or Password")

# Connect to Memorystore for Redis Cluster
backoff = ConstantBackoff(3)
retry = Retry(retries=-1, backoff=backoff, supported_errors=(ConnectionError, ConnectionResetError))
r=redis.cluster.RedisCluster(host=host, port=6379,redis_connect_func=iam_connect, retry=retry, ssl=True, ssl_ca_certs=ssl_ca_certs)

print(r.get('key'))
```

## Options / Props

| Library | Recommended version | Sample covers |
|---|---|---|
| Lettuce | 6.2.4 and later | Plain connection (no IAM auth, no TLS); also IAM auth + TLS |
| go-redis | 9.11.0 and later | In-transit encryption (TLS) |
| redis-py | 5.1 and later | IAM auth + TLS |
| Jedis | 4.4.0 and later | IAM auth + TLS |
| Go | 1.24.5 and later | IAM auth + TLS |

Lettuce settings used by the plain sample (Java, not reproduced here): `reconnectDelay` with full jitter (100 ms min, 5 s max, 100 ms base), periodic topology refresh every 1 minute, all adaptive refresh triggers (MOVED_REDIRECT, ASK_REDIRECT, PERSISTENT_RECONNECTS, UNCOVERED_SLOT, UNKNOWN_NODE), `dynamicRefreshSources(true)`, `closeStaleConnections(true)`, TCP `keepAlive(true)`, `autoReconnect(true)`, a `nodeFilter` removing FAIL / EVENTUAL_FAIL / NOADDR nodes, and `validateClusterNodeMembership(false)`.

## Notes

- If you use Lettuce, set `validateClusterNodeMembership` to `false`; otherwise topology changes can cause `unknownPartition` errors.
- IAM token guidelines from the source (Java samples): refresh tokens in the background with a single thread per client process; expose last error for debugging; fail fast at setup if a token can't be retrieved; don't call IAM inline in `getToken`; the token is required for every connection and typical scale is tens of thousands of connections.
- The generated IAM access token is the Redis AUTH password (username `default`); never print or log it.
- Corrected from the official docs: the redis-py sample originally had `service_account="projects/-/serviceAccounts/<TO-DO-1: email of service account used to authenticate to Redis Cluster>"`, `host=<TO-DO-2: your Redis Cluster discovery endpoint ip>` and `ssl_ca_certs=<TO-DO-3, your trusted server ca file name>`, which are not valid Python.
- Omitted: the Lettuce plain sample, go-redis TLS sample, and the Lettuce, Jedis and Go IAM samples (Java / Go). The Go IAM sample in the source also contains a syntax error (`log.Printf"Failed ...`) and a `log.Fatal` with a format verb.
- Client libraries and emulators in general: `gcp-client-libraries`. Memorystore pages here cover managed Valkey / Redis / Memcached on Google Cloud, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/memorystore/docs/cluster/client-library-connection (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [connect-cluster-instance.md](./connect-cluster-instance.md)
- [cluster-node-specification.md](./cluster-node-specification.md)
