---
source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst
---

# Making Authenticated Requests (requests, urllib3, gRPC)

Once you have credentials, attach them to a transport and use it to call APIs. google-auth supports several transports; usually your application or an opinionated client library chooses one.

## Signature / Usage

### Requests (recommended HTTP transport)

`google.auth.transport.requests` uses the Requests library through a custom `Session`:

```python
from google.auth.transport.requests import AuthorizedSession

authed_session = AuthorizedSession(credentials)

response = authed_session.get(
    'https://www.googleapis.com/storage/v1/b')
```

### urllib3

`urllib3` is the library underneath Requests; its interface is lower level and useful when you need more control over how requests are made:

```python
from google.auth.transport.urllib3 import AuthorizedHttp

authed_http = AuthorizedHttp(credentials)

response = authed_http.request(
    'GET', 'https://www.googleapis.com/storage/v1/b')
```

You can pass your own `urllib3.PoolManager`:

```python
import urllib3

http = urllib3.PoolManager()
authed_http = AuthorizedHttp(credentials, http)
```

### gRPC: let google-auth create the channel

google-auth provides Call Credentials for gRPC; the easiest route is its channel helper:

```python
import google.auth.transport.grpc
import google.auth.transport.requests

http_request = google.auth.transport.requests.Request()

channel = google.auth.transport.grpc.secure_authorized_channel(
    credentials, http_request, 'pubsub.googleapis.com:443')
```

### gRPC: build the channel yourself

Use `google.auth.transport.grpc.AuthMetadataPlugin`:

Adapted (not in the official docs): adds `from google.auth.transport.grpc import AuthMetadataPlugin`, the class the guide names just before the example, which the example uses without importing.

```python
import grpc
from google.auth.transport.grpc import AuthMetadataPlugin

metadata_plugin = AuthMetadataPlugin(credentials, http_request)

# Create a set of grpc.CallCredentials using the metadata plugin.
google_auth_credentials = grpc.metadata_call_credentials(
    metadata_plugin)

# Create SSL channel credentials.
ssl_credentials = grpc.ssl_channel_credentials()

# Combine the ssl credentials and the authorization credentials.
composite_credentials = grpc.composite_channel_credentials(
    ssl_credentials, google_auth_credentials)

channel = grpc.secure_channel(
    'pubsub.googleapis.com:443', composite_credentials)
```

The resulting channel can back a gRPC stub (the official guide creates `pubsub_pb2.PublisherStub(channel)` and calls `ListTopics`; that block is omitted here because it depends on generated protobuf modules).

## Notes

- Even though gRPC is its own transport, you still need one of the HTTP transports with it, because most credential types make HTTP requests to refresh their access token. The sample uses the Requests transport, but any HTTP transport works. If your credentials never make HTTP requests to refresh (for example `jwt.Credentials`) you can pass `None`.
- Fragments: `credentials` is assumed from the earlier pages; the last gRPC block needs the `http_request` from the previous block; the `urllib3.PoolManager` block reuses the `AuthorizedHttp` import.
- Corrected from the official docs: the last gRPC block began with only `import grpc` and used `AuthMetadataPlugin(credentials, http_request)` without importing it.
- Never print or log the `Authorization` header or token that these transports attach.
- For per-call behavior of Google Cloud client libraries, see the `python-calls` category.
- Applies to google-auth 2.62.2 (PyPI); Python `>=3.10`.
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)

## Related

- [credential-types.md](./credential-types.md)
- [adc-default.md](./adc-default.md)
- [id-tokens.md](./id-tokens.md)
