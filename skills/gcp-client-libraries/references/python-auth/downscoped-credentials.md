---
source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst
---

# Downscoped Credentials (Credential Access Boundaries)

Downscoping with Credential Access Boundaries restricts the IAM permissions a short-lived credential can use. You define a Credential Access Boundary (resources plus an upper bound of permissions on each) and build a downscoped credential from a source credential and that boundary. Typical pattern: a token broker with elevated access mints downscoped short-lived tokens and passes them over a secure authenticated channel to a token consumer.

## Signature / Usage

### Token broker

```python
import google.auth

from google.auth import downscoped
from google.auth.transport import requests

# Initialize the credential access boundary rules.
available_resource = '//storage.googleapis.com/projects/_/buckets/bucket-123'
available_permissions = ['inRole:roles/storage.objectViewer']
availability_expression = (
    "resource.name.startsWith('projects/_/buckets/bucket-123/objects/customer-a')"
)

availability_condition = downscoped.AvailabilityCondition(
    availability_expression)
rule = downscoped.AccessBoundaryRule(
    available_resource=available_resource,
    available_permissions=available_permissions,
    availability_condition=availability_condition)
credential_access_boundary = downscoped.CredentialAccessBoundary(
    rules=[rule])

# Retrieve the source credentials via ADC.
source_credentials, _ = google.auth.default()

# Create the downscoped credentials.
downscoped_credentials = downscoped.Credentials(
    source_credentials=source_credentials,
    credential_access_boundary=credential_access_boundary)

# Refresh the tokens.
downscoped_credentials.refresh(requests.Request())

# These values will need to be passed to the Token Consumer.
access_token = downscoped_credentials.token
expiry = downscoped_credentials.expiry
```

### Token consumer

The consumer injects the downscoped token into `google.oauth2.credentials.Credentials` with a `refresh_handler` so expiry is handled on demand:

Adapted (not in the official docs): imports `google.oauth2.credentials`; the official `import google.oauth2` does not load the `credentials` submodule, so `google.oauth2.credentials.Credentials` raises AttributeError.

```python
import google.oauth2.credentials

from google.auth.transport import requests
from google.cloud import storage

# Downscoped token retrieved from token broker.
# The `get_token_from_broker` callable requests a token and an expiry
# from the token broker.
downscoped_token, expiry = get_token_from_broker(
    requests.Request(),
    scopes=['https://www.googleapis.com/auth/cloud-platform'])

# Create the OAuth credentials from the downscoped token and pass a
# refresh handler to handle token expiration. Passing the original
# downscoped token or the expiry here is optional, as the refresh_handler
# will generate the downscoped token on demand.
credentials = google.oauth2.credentials.Credentials(
    downscoped_token,
    expiry=expiry,
    scopes=['https://www.googleapis.com/auth/cloud-platform'],
    refresh_handler=get_token_from_broker)

# Initialize a storage client with the oauth2 credentials.
storage_client = storage.Client(
    project='my_project_id', credentials=credentials)
# Call GCS APIs.
# The token broker has readonly access to objects starting with "customer-a"
# in bucket "bucket-123".
bucket = storage_client.bucket('bucket-123')
blob = bucket.blob('customer-a-data.txt')
print(blob.download_as_bytes().decode("utf-8"))
```

### Least privilege for tokens in flight

Pass the downscoped credentials straight to a client, so the in-flight token has only the limited access even if the source credentials are elevated:

```python
# Create the downscoped credentials.
downscoped_credentials = downscoped.Credentials(
    # source_credentials have elevated access but only a subset of
    # these permissions are needed here.
    source_credentials=source_credentials,
    credential_access_boundary=credential_access_boundary)

# Pass the token directly.
storage_client = storage.Client(
    project='my_project_id', credentials=downscoped_credentials)
# If the source credentials have elevated levels of access, the
# token in flight here will have limited readonly access to objects
# starting with "customer-a" in bucket "bucket-123".
bucket = storage_client.bucket('bucket-123')
blob = bucket.blob('customer-a-data.txt')
print(blob.download_as_string())
```

## Notes

- Only Cloud Storage supports Credential Access Boundaries. Other Google Cloud services do not.
- The broker returns `downscoped_credentials.token` to the consumer; it is a credential. Send it only over a secure authenticated channel, and never print or log it.
- `get_token_from_broker` is a placeholder callable that you implement (fragment); the last two blocks reuse names from the broker block.
- Corrected from the official docs: the token consumer began with `import google.oauth2`.
- The official examples print the downloaded object content (not a credential); for objects that may contain sensitive data, process the bytes instead of printing them.
- `download_as_string()` is kept verbatim from the guide; in google-cloud-storage it is a deprecated alias of `download_as_bytes()` (per the `Blob.download_as_string` docstring in google-cloud-storage 3.17.1; product usage: `gcp-storage`).
- Applies to google-auth 2.62.2 (PyPI); Python `>=3.10`. Reference: https://cloud.google.com/iam/docs/downscoping-short-lived-credentials
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)

## Related

- [user-credentials.md](./user-credentials.md)
- [impersonated-credentials.md](./impersonated-credentials.md)
- [adc-default.md](./adc-default.md)
