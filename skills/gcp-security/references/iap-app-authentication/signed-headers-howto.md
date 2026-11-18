---
source: https://docs.cloud.google.com/iap/docs/signed-headers-howto
---

# Securing your app with signed headers

When signed headers are configured, Identity-Aware Proxy (IAP) sends a JSON Web Token (JWT) in the `x-goog-iap-jwt-assertion` request header so your app can confirm that a request was authorized by IAP. Verifying the JWT protects the app if IAP is accidentally disabled, firewalls are misconfigured, or someone inside the project reaches the app directly. You must use signed headers for all app types. For App Engine standard environment apps, the Users API is an alternative.

## Signature / Usage

### Verify the JWT header, payload and signature

Use a third-party JWT library for your language that supports the `ES256` algorithm. Fetch the IAP public keys from one of two URLs: `https://www.gstatic.com/iap/verify/public_key` (a JSON dictionary that maps the `kid` claims to the public key values) or `https://www.gstatic.com/iap/verify/public_key-jwk` (JWK format).

Python sample (validates signature, audience and expiry; returns the `sub` and `email` claims):

Adapted (not in the official docs): the issuer is checked before returning; `id_token.verify_token` checks the signature, expiry and audience but not `iss`. The optional `email` claim is read with `get()`; use `sub` as the stable identifier.

```python
from google.auth.transport import requests
from google.oauth2 import id_token


def validate_iap_jwt(iap_jwt, expected_audience):
    """Validate an IAP JWT.

    Args:
      iap_jwt: The contents of the X-Goog-IAP-JWT-Assertion header.
      expected_audience: The Signed Header JWT audience. See
          https://cloud.google.com/iap/docs/signed-headers-howto
          for details on how to get this value.

    Returns:
      (user_id, user_email, error_str).
    """

    try:
        decoded_jwt = id_token.verify_token(
            iap_jwt,
            requests.Request(),
            audience=expected_audience,
            certs_url="https://www.gstatic.com/iap/verify/public_key",
        )
        if decoded_jwt.get("iss") != "https://cloud.google.com/iap":
            raise ValueError(f"Wrong issuer: {decoded_jwt.get('iss')}")
        return (decoded_jwt["sub"], decoded_jwt.get("email"), "")
    except Exception as e:
        return (None, None, f"**ERROR: JWT validation error {e}**")
```

### Get the values for the `aud` claim

Find the project ID on the Google Cloud console **Project info** card, then run:

```bash
gcloud projects describe PROJECT_ID
```

The `projectNumber` field of the output is the project number. For Compute Engine and GKE, the `id` field of the backend service is the service ID:

```bash
gcloud compute backend-services describe SERVICE_NAME --project=PROJECT_ID --global
```

In the console, open Identity-Aware Proxy settings, click **More** next to the load balancer resource, and select **Signed Header JWT Audience**.

### Create a health check exception

Compute Engine and GKE health checks do not carry JWT headers and IAP does not process them. Set a non-sensitive request path on the health check (not shared by any other resource; if omitted the request goes to `/`), then serve HTTP 200 for that path before calling the validation routine:

```text
if HttpRequest.path_info = '/HEALTH_CHECK_REQUEST_PATH'
  return HttpResponse(status=200)
else
  VALIDATION_FUNCTION
```

### Cache the public keys (for example inside a VPC Service Controls perimeter)

IAP rotates its public keys periodically; cache them and automate the refresh. A VPC Service Controls perimeter can block direct access to the public URL, so the source stores the keys in a Cloud Storage bucket. The Cloud Run function below fetches `public_key-jwk` and writes it to the bucket (`BUCKET_NAME`, `OBJECT_NAME` are environment variables; `OBJECT_NAME` defaults to `iap_public_keys.jwk`):

```python
import functions_framework
import requests
from google.cloud import storage
import os

# Environment variables to be set in the function configuration
BUCKET_NAME = os.environ.get("BUCKET_NAME")
OBJECT_NAME = os.environ.get("OBJECT_NAME", "iap_public_keys.jwk")
IAP_KEYS_URL = "https://www.gstatic.com/iap/verify/public_key-jwk"

@functions_framework.http
def update_iap_keys(request):
    """Fetches IAP public keys from the public URL and stores them in a Cloud Storage bucket."""
    if not BUCKET_NAME:
        print("Error: BUCKET_NAME environment variable not set.")
        return "BUCKET_NAME environment variable not set.", 500

    try:
        # Fetch the keys
        response = requests.get(IAP_KEYS_URL)
        response.raise_for_status()  # Raise an exception for bad status codes
        keys_content = response.text
        print(f"Successfully fetched keys from {IAP_KEYS_URL}")

        # Store in Cloud Storage
        storage_client = storage.Client()
        bucket = storage_client.bucket(BUCKET_NAME)
        blob = bucket.blob(OBJECT_NAME)

        blob.upload_from_string(keys_content, content_type='application/json')

        print(f"Successfully wrote IAP keys to gs://{BUCKET_NAME}/{OBJECT_NAME}")
        return f"Successfully updated {OBJECT_NAME} in bucket {BUCKET_NAME}", 200

    except requests.exceptions.RequestException as e:
        print(f"Error fetching keys from {IAP_KEYS_URL}: {e}")
        return f"Error fetching keys: {e}", 500
    except Exception as e:
        print(f"Error interacting with Cloud Storage: {e}")
        return f"Error interacting with Cloud Storage: {e}", 500
```

`function_source/requirements.txt`:

```text
functions-framework==3.*
requests
google-cloud-storage
```

### Workforce Identity Federation JWT payload (decoded example)

```json
{
  "aud": "/projects/PROJECT_NUMBER/global/backendServices/SERVICE_ID",
  "azp": "/projects/PROJECT_NUMBER/global/backendServices/SERVICE_ID",
  "email": "demo_user@example.com",
  "exp": 1748915703,
  "google": {
    "access_levels": [
      "accessPolicies/ACCESS_POLICY_ID/accessLevels/ACCESS_LEVEL_NAME"
    ]
  },
  "iat": 1748915103,
  "identity_source": "WORKFORCE_IDENTITY",
  "iss": "https://cloud.google.com/iap",
  "sub": "sts.google.com:UNIQUE_USER_ID",
  "workforce_identity": {
    "iam_principal": "principal://iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/subject/SUBJECT_ATTRIBUTE_VALUE",
    "workforce_pool_name": "locations/global/workforcePools/WORKFORCE_POOL_ID"
  }
}
```

## Options / Props

### JWT header claims

| Claim | Name | Required value |
|---|---|---|
| `alg` | Algorithm | `ES256` |
| `kid` | Key ID | Must correspond to one of the public keys in the IAP key file (`public_key` or `public_key-jwk`) |

### JWT payload claims

| Claim | Name | Constraint |
|---|---|---|
| `exp` | Expiration time | Must be in the future (seconds since the UNIX epoch). Allow 30 seconds for skew. The maximum lifetime of a token is 10 minutes + 2 * skew. |
| `iat` | Issued-at time | Must be in the past (seconds since the UNIX epoch). Allow 30 seconds for skew. |
| `aud` | Audience | App Engine: `/projects/PROJECT_NUMBER/apps/PROJECT_ID`. Compute Engine and GKE: `/projects/PROJECT_NUMBER/global/backendServices/SERVICE_ID`. Cloud Run: `/projects/PROJECT_NUMBER/locations/REGION/services/SERVICE_NAME`. |
| `iss` | Issuer | Must be `https://cloud.google.com/iap`. |
| `hd` | Account domain | Provided if the account belongs to a hosted domain. |
| `google` | Google claim | Names of applicable access levels under `access_levels` (array of strings). With a device policy and org access to device data, `DeviceId` is also included; a request going to another org might not have permission to view device data. |

### User identity claims

| Claim | Name | Description |
|---|---|---|
| `sub` | Subject | Unique, stable user identifier. Use this instead of the `x-goog-authenticated-user-id` header. |
| `email` | User email | Use this instead of the `x-goog-authenticated-user-email` header. Unlike that header and `sub`, it has no namespace prefix. |

### External identities (Identity Platform)

| Item | Behavior |
|---|---|
| `gcip` claim | Contains user information such as email, photo URL and provider-specific attributes. |
| `email` / `sub` | Prefixed with the Identity Platform token issuer and tenant ID (if any), for example `securetoken.google.com/PROJECT-ID/TENANT-ID:...`. |
| `sign_in_attributes` | IAM does not support external identities; claims in `gcip.firebase.sign_in_attributes` (SAML / OIDC) can be used by app logic to control access. |
| Size limit | Claims are carried in an IAP cookie, which typically cannot exceed about 4KB in most browsers; too many claims make sign-in fail. Propagate only needed claims or filter them with Identity Platform blocking functions. |

### Workforce Identity Federation payload fields

| Field | Value |
|---|---|
| `identity_source` | `"WORKFORCE_IDENTITY"` |
| `sub` | User identifier prefixed with `sts.google.com:` |
| `email` | Propagated only when a `google.email=assertion.email` attribute mapping is configured on the workforce pool provider |
| `workforce_identity.iam_principal` | `principal://iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/subject/SUBJECT_ATTRIBUTE_VALUE` |
| `workforce_identity.workforce_pool_name` | `locations/global/workforcePools/WORKFORCE_POOL_ID` |

## Notes

- Verify the signed JWT; do not rely on the unsigned `x-goog-authenticated-user-email` / `x-goog-authenticated-user-id` headers alone. If an attacker bypasses IAP they can forge those headers. Signed headers provide secondary security in case someone bypasses IAP; when IAP is enabled, IAP strips the client-supplied `x-goog-*` headers when the request goes through the IAP serving infrastructure.
- The Python `validate_iap_jwt` sample does not raise on failure: it returns `(None, None, error_str)`, so the caller must reject the request when `error_str` is not empty.
- Compute Engine and GKE health checks bypass JWT validation on the configured path; use a non-sensitive path that no other resource shares.
- IAP does not pass other custom claims from third-party identity providers in the JWT when using Workforce Identity Federation.
- Test validation with the `secure_token_test` query parameters (see [query-parameters-and-headers-howto.md](./query-parameters-and-headers-howto.md)).
- The key-caching function in the source is deployed with Terraform (also with a Cloud Scheduler job every 12 hours); the Terraform, the Console steps, and the C#, Go, Java, Node.js, PHP and Ruby verification samples are omitted here.
- The source's sample JSON for `gcip` claims and its `sign_in_attributes` access check are not valid JSON / JavaScript as printed (unquoted keys and stray quotes; `sign_in_attribute` vs `sign_in_attributes`), so they are described in the table rather than reproduced.
- Adapted from the official docs: `google.oauth2.id_token.verify_token` verifies the signature, time claims and audience but not the issuer, so the sample checks that `iss` is `https://cloud.google.com/iap` (the required value in the payload table) and rejects other tokens.
- Adapted from the official docs: the source reads `decoded_jwt["email"]`, which raises `KeyError` (returned as a validation error) for valid tokens without an `email` claim, such as Workforce Identity Federation tokens without a `google.email=assertion.email` mapping; the sample uses `decoded_jwt.get("email")`, which returns `None` in that case.
- Source: https://docs.cloud.google.com/iap/docs/signed-headers-howto (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [authentication-howto.md](./authentication-howto.md)
- [query-parameters-and-headers-howto.md](./query-parameters-and-headers-howto.md)
- [sessions-howto.md](./sessions-howto.md)
