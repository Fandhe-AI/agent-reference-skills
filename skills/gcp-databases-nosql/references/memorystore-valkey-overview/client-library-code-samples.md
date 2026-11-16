---
source: https://docs.cloud.google.com/memorystore/docs/valkey/client-library-code-samples
---

# Client library code samples

Client libraries and samples for Memorystore for Valkey in both Cluster Mode Enabled and Cluster Mode Disabled modes, including IAM authentication with in-transit encryption.

## Signature / Usage

### Cluster Mode Enabled

Memorystore for Valkey is compatible with all Memorystore for Redis Cluster client code samples (https://docs.cloud.google.com/memorystore/docs/cluster/client-library-code-samples and https://docs.cloud.google.com/memorystore/docs/cluster/client-library-connection). Use a cluster-aware client with the discovery endpoint.

Valkey GLIDE (open-source, Rust core driver with language extensions, supports all Valkey commands and Valkey 7.2, 8.0, 9.0, 9.1) is available for C#, Go, Java, Node.js and Python (https://valkey.io/valkey-glide/).

Other compatible OSS clients: iovalkey, phpredis, predis, redisson, valkey-go, valkey-java, valkey-py, valkey-swift.

### Cluster Mode Disabled

Use the Redis or Valkey client object (not `RedisCluster` / `ValkeyCluster`), a writer client on the primary endpoint IP and a reader client on the reader endpoint IP.

redis-py (version 5.1 or later):

Adapted (not in the official docs): the endpoint placeholders were unquoted, invalid Python; they are now string literals.

```python
import redis
primaryEndpoint = "PRIMARY_ENDPOINT_IP"
readerEndpoint = "READER_ENDPOINT_IP"

primary_client = redis.Redis(host=primaryEndpoint, port=6379, db=0, decode_responses=True)
reader_client = redis.Redis(host=readerEndpoint, port=6379, db=0, decode_responses=True)

primary_client.set("key","value")
print(reader_client.get("key"))
```

Node.js (node-redis 24.4.1 or later per the source):

Adapted (not in the official docs): the endpoint placeholder was unquoted, the URL contained the variable name inside a string literal, and `key` / `value` were undefined; the placeholder is a string, the URL is interpolated and the key and value are literals.

```javascript
import { createClient } from 'redis';
import * as fs from 'fs';

const primaryEndpoint = "PRIMARY_ENDPOINT_IP"

const primary_endpoint_url = `redis://${primaryEndpoint}:6379`

const client = createClient({
url: primary_endpoint_url
});

await client.connect();
await client.set("key", "value");
const retval = await client.get("key");
console.log(retval)
```

### IAM authentication and in-transit encryption (redis-py 5.1 or later)

Adapted (not in the official docs): `<TO-DO-n ...>` placeholders turned into upper-case string literals, the stray extra `"` after the service account removed, `ssl_ca_certs` passed to `redis.Redis` (the source passed an undefined `caFilePath`), and the `print` of the access token removed so the token is never logged.

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
ssl_ca_certs="TRUSTED_SERVER_CA_FILE"

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

class ValkeyTokenProvider(redis.CredentialProvider):

    # Generated IAM tokens are valid for 15 minutes
    def get_credentials(self):
        token= generate_access_token()
        return "default",token

creds_provider = ValkeyTokenProvider()
client = redis.Redis(host=host, port=6379, credential_provider=creds_provider, ssl=True, ssl_ca_certs=ssl_ca_certs)
client.set('foo',"bar")
print(client.get('foo'))
```

## Options / Props

| Item | Recommendation |
|---|---|
| redis-py | 5.1 and later |
| go-redis | 9.11.0 and later |
| Jedis | 4.4.0 and later |
| node-redis | 24.4.1 and later (as stated in the source) |
| Go (IAM sample) | 1.24.5 and later |

## Notes

- Sample systems with Spring Boot, PostgreSQL and Memorystore for Valkey: session management, scalable leaderboard and high-performance caching (https://github.com/GoogleCloudPlatform/memorystore-samples).
- Corrected from the official docs: the redis-py sample used `primaryEndpoint = PRIMARY_ENDPOINT_IP`; the Node.js sample used `const primaryEndpoint = PRIMARY_ENDPOINT_IP`, `'redis://primaryEndpoint:6379'` and `client.set(key, value)` with undefined `key` / `value`; the IAM sample used `service_account="projects/-/serviceAccounts/<TO-DO-1: ...>""`, `host=<TO-DO-2: ...>`, `ssl_ca_certs=<TO-DO-3, ...>`, printed `str(response.access_token)` and passed `ssl_ca_certs=caFilePath`. The IAM sample's extra imports (`ConstantBackoff`, `Retry`, exceptions, `str_if_bytes`) are unused but kept as in the source.
- The sample's code comment says "Generated IAM tokens are valid for 15 minutes"; the credential provider fetches a fresh one per connection.
- Source inconsistency: the IAM authentication pages say access tokens expire one hour after they are retrieved (configurable up to 12 hours; see `memorystore-valkey-security/about-iam-auth.md`), while this sample's comment says 15 minutes. Kept as written; refresh tokens well before either limit.
- The source also shows go-redis, Jedis and Go (IAM and TLS) samples, omitted here. The Go IAM sample prints the token.
- General client-library setup (ADC, retries): `gcp-client-libraries`. IAM service accounts: `gcp-foundation`.
- Memorystore pages cover managed Valkey / Redis / Memcached on Google Cloud, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/client-library-code-samples (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [connect-instance.md](./connect-instance.md)
- [cluster-mode-enabled-and-disabled.md](./cluster-mode-enabled-and-disabled.md)
- [exponential-backoff.md](./exponential-backoff.md)
