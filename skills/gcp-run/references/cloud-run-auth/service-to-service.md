---
source: https://docs.cloud.google.com/run/docs/authenticating/service-to-service
---

# Authenticate service-to-service

How one Cloud Run service securely calls another private service over HTTP: give the caller a per-service user-managed service account with `roles/run.invoker` on the receiver, and send a Google-signed OpenID Connect ID token with the request.

## Signature / Usage

### Grant the calling service account access to the receiving service

```bash
gcloud run services add-iam-policy-binding RECEIVING_SERVICE \
  --member='serviceAccount:CALLING_SERVICE_IDENTITY' \
  --role='roles/run.invoker'
```

`RECEIVING_SERVICE` is the receiving service; `CALLING_SERVICE_IDENTITY` is the calling service account email, by default `PROJECT_NUMBER-compute@developer.gserviceaccount.com`.

### Acquire an ID token and call (Node.js)

Uses the authentication libraries; works in any environment where the libraries can get service account credentials.

```javascript
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// Example: https://my-cloud-run-service.run.app/books/delete/12345
// const url = 'https://TARGET_HOSTNAME/TARGET_URL';

// Example (Cloud Run): https://my-cloud-run-service.run.app/
// const targetAudience = 'https://TARGET_AUDIENCE/';

const {GoogleAuth} = require('google-auth-library');
const auth = new GoogleAuth();

async function request() {
  console.info(`request ${url} with target audience ${targetAudience}`);
  const client = await auth.getIdTokenClient(targetAudience);

  // Alternatively, one can use `client.idTokenProvider.fetchIdToken`
  // to return the ID Token.
  const res = await client.fetch(url);
  console.info(res.data);
}

request().catch(err => {
  console.error(err.message);
  process.exitCode = 1;
});
```

### Acquire an ID token and call (Python)

```python
import urllib

import google.auth.transport.requests
import google.oauth2.id_token


def make_authorized_get_request(endpoint, audience):
    """
    make_authorized_get_request makes a GET request to the specified HTTP endpoint
    by authenticating with the ID token obtained from the google-auth client library
    using the specified audience value.
    """

    # Cloud Run uses your service's hostname as the `audience` value
    # audience = 'https://my-cloud-run-service.run.app/'
    # For Cloud Run, `endpoint` is the URL (hostname + path) receiving the request
    # endpoint = 'https://my-cloud-run-service.run.app/my/awesome/url'

    req = urllib.request.Request(endpoint)

    auth_req = google.auth.transport.requests.Request()
    id_token = google.oauth2.id_token.fetch_id_token(auth_req, audience)

    req.add_header("Authorization", f"Bearer {id_token}")
    response = urllib.request.urlopen(req)

    return response.read()
```

### Fetch an ID token from the metadata server

Use only if you cannot use the authentication libraries. Works only while the container runs on Cloud Run, not from your local machine. The `http://metadata.google.internal` root URL is the metadata server address given by the source.

Adapted (not in the official docs): the source writes `[AUDIENCE]` in square brackets, which curl treats as a range glob; replaced with `AUDIENCE`.

```bash
curl "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=AUDIENCE" \
     -H "Metadata-Flavor: Google"
```

`AUDIENCE` is the URL of the service you are invoking or a configured custom audience.

### Call from outside Google Cloud with workload identity federation

After setting up the service account, configuring workload identity federation, and allowing the external identity to impersonate the service account, call `generateIdToken` instead of `generateAccessToken`:

Adapted (not in the official docs): added `-fsS` so an HTTP error is not parsed as a token, used `application/json`, used `jq -er` so a missing `token` fails instead of yielding the string `null`, and removed `echo $ID_TOKEN` so the credential is not printed to the terminal or logs.

```bash
ID_TOKEN=$(curl -fsS -0 -X POST https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/SERVICE_ACCOUNT:generateIdToken \
  -H "Content-Type: application/json; charset=utf-8" \
  -H "Authorization: Bearer $STS_TOKEN" \
  -d @- <<EOF | jq -er .token
  {
      "audience": "SERVICE_URL"
  }
EOF
)
```

`SERVICE_ACCOUNT` is the email of the service account the workload identity pool is configured to access; `SERVICE_URL` is the URL of the Cloud Run service you are invoking; `$STS_TOKEN` is the Security Token Service token from the federation steps.

### Receive and validate the token (Python, Flask)

Adapted (not in the official docs): `verify_token` is given `audience=os.environ["SERVICE_URL"]` so a Google-signed ID token minted for a different service is rejected; Cloud Run does not set `SERVICE_URL`, so set it at deployment (for example `--update-env-vars SERVICE_URL=https://my-cloud-run-service.run.app/`) to exactly the audience string callers request, and if it is unset the lookup raises `KeyError` and the request fails (fail closed). Verification only authenticates the token, so the verified `email` (with `email_verified` true when that claim is present) must also be listed in the comma-separated `ALLOWED_CALLERS` environment variable, otherwise the request gets `abort(403)`; an unset or empty `ALLOWED_CALLERS` rejects every caller (fail closed). The header is split with `auth_header.split(" ", 1)` without tuple unpacking, and a missing `Authorization` header, a non-bearer scheme, an empty credential and an invalid token (`GoogleAuthError` or `ValueError`) call `abort(401)` instead of returning a message with HTTP 200 or raising an unhandled `ValueError` (HTTP 500); the docstring and the error messages were updated to match.

```python
import os

from flask import Request, abort

from google.auth.exceptions import GoogleAuthError
from google.auth.transport import requests
from google.oauth2 import id_token


def receive_request_and_parse_auth_header(request: Request) -> str:
    """Parse the authorization header, validate the Bearer token,
    decode the token and authorize the caller.

    Args:
        request: Flask request object.

    Returns:
        A greeting with the email from the request's Authorization header.

    Raises:
        werkzeug.exceptions.Unauthorized: HTTP 401 when the header is
        missing, uses another scheme, has no credentials, or carries an
        invalid token.
        werkzeug.exceptions.Forbidden: HTTP 403 when the token's email is
        not verified or not listed in ALLOWED_CALLERS (unset or empty
        ALLOWED_CALLERS rejects every caller).
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        abort(401, description="Missing Authorization header.")

    # Split the auth type and value from the header.
    parts = auth_header.split(" ", 1)
    auth_type = parts[0]
    creds = parts[1].strip() if len(parts) == 2 else ""
    if auth_type.lower() != "bearer":
        abort(401, description=f"Unhandled header format ({auth_type}).")
    if not creds:
        abort(401, description="Missing bearer token.")

    # Find more information about `verify_token` function here:
    # https://google-auth.readthedocs.io/en/master/reference/google.oauth2.id_token.html#google.oauth2.id_token.verify_token
    try:
        decoded_token = id_token.verify_token(
            creds, requests.Request(), audience=os.environ["SERVICE_URL"]
        )
    except (GoogleAuthError, ValueError):
        abort(401, description="Invalid token.")

    # Verification authenticates the token; authorize the caller explicitly.
    allowed_callers = {
        email.strip().lower()
        for email in os.environ.get("ALLOWED_CALLERS", "").split(",")
        if email.strip()
    }
    caller = str(decoded_token.get("email", "")).lower()
    if "email_verified" in decoded_token and decoded_token["email_verified"] is not True:
        abort(403, description="Caller email is not verified.")
    if not caller or caller not in allowed_callers:
        abort(403, description="Caller is not allowed.")

    return f"Hello, {decoded_token['email']}!\n"
```

## Options / Props

| Item | Rule from the source |
|---|---|
| Caller identity | Per-service user-managed service account with the minimum set of permissions (`roles/run.invoker` on the receiving service) |
| ID token audience (`aud`) | URL of the receiving service, or a configured custom audience |
| Audience with traffic tags | If not using a custom audience, `aud` must remain the URL of the service, even when making requests to a specific traffic tag |
| Custom domains | Currently not supported for the `aud` value |
| Header | `Authorization: Bearer ID_TOKEN`, or `X-Serverless-Authorization: Bearer ID_TOKEN` (use when the app already uses `Authorization`; the signature is removed before the token reaches the user container) |
| Both headers sent | Only `X-Serverless-Authorization` is checked |
| Token lifetime | ID tokens are JWTs that expire approximately an hour after creation; metadata-server tokens are always valid; if you cache, decode and check `exp` |
| Metadata request header | `Metadata-Flavor: Google` required on every request (the older `X-Google-Metadata-Request: True` is still supported but not recommended) |
| Self-signed JWT (service account key) | Set `target_audience` to the service URL or custom audience, exchange for a Google-signed ID token with the same `aud`, send in one of the two headers |

Async alternatives (the service manages the interaction): Cloud Tasks (one to one), Pub/Sub (one to many, one to one, many to one), Cloud Scheduler (scheduled), Eventarc (event-based). There are no networking charges for service-to-service traffic between two services in the same region.

## Notes

- The source's console and gcloud steps default the calling identity to `PROJECT_NUMBER-compute@developer.gserviceaccount.com`, but it recommends a per-service user-managed service account with the minimum set of permissions.
- Service account keys are a security risk if not managed correctly. Choose a more secure alternative (workload identity federation) whenever possible. If a key must be used, you are responsible for protecting it and for validating keys acquired from external sources. Key creation might be disabled by organization policy. Setting `GOOGLE_APPLICATION_CREDENTIALS` to a key path works only outside Cloud Run; the code does not accept user account credentials.
- Adapted from the official docs: the metadata-server curl wrote `?audience=[AUDIENCE]`; the square brackets are a curl URL glob, so it is written `?audience=AUDIENCE`.
- Adapted from the official docs: the workload identity federation example was `curl -0 -X POST ... -H "Content-Type: text/json; charset=utf-8" ... | jq -r .token` followed by `echo $ID_TOKEN`; it now uses `curl -fsS`, `application/json`, `jq -er .token`, and no `echo` (printing the ID token leaks a live credential).
- Corrected from the official docs: the source's Python receiving sample calls `id_token.verify_token(creds, requests.Request())` without an `audience` argument, so it accepts a valid Google-signed ID token issued for any audience; the sample above passes `audience=os.environ["SERVICE_URL"]`, matching the source's Java sample, which validates against the `SERVICE_URL` environment variable (Java comment: "Get the service URL from the environment variable set at the time of deployment.").
- `SERVICE_URL` is not one of the variables Cloud Run injects (`PORT`, `K_SERVICE`, `K_REVISION`, `K_CONFIGURATION`; https://docs.cloud.google.com/run/docs/container-contract). Set it yourself at deployment, for example `gcloud run services update SERVICE --update-env-vars SERVICE_URL=https://my-cloud-run-service.run.app/` (the caller samples' audience). `--update-env-vars` adds the variable; `--set-env-vars` would first remove all existing environment variables (gcloud reference: https://docs.cloud.google.com/sdk/gcloud/reference/run/deploy). Without `SERVICE_URL` the receiver raises `KeyError` for every request that carries a bearer token.
- The `aud` check is an exact string match: `SERVICE_URL` must equal the audience the callers request, including any trailing slash. The caller samples above use audiences with a trailing slash (`'https://my-cloud-run-service.run.app/'`, `'https://TARGET_AUDIENCE/'`), while `gcloud run services describe` prints the URL without one; use the same form on both sides.
- Source inconsistency: this page says custom domains are "Currently not supported for the `aud` value"; https://docs.cloud.google.com/run/docs/securing/service-identity says the audience can be "a custom audience, such as a custom domain". A custom domain works as `aud` only when it is configured as a custom audience.
- Corrected from the official docs: the source's Python receiving sample returns `f"Invalid token: {e}\n"`, `f"Unhandled header format ({auth_type}).\n"` and `"Hello, anonymous user.\n"` as plain strings, which a Flask handler sends with HTTP 200, so callers built on it treat a rejected token as success; the sample above calls `abort(401)` in all three branches (fail closed) and does not echo the verification error to the client.
- Per https://docs.cloud.google.com/run/docs/securing/security, when the Invoker IAM check is enabled Cloud Run performs an IAM check on every request before forwarding it to the container; keep it enabled (recommended). In-container `verify_token` only authenticates the token (signature, expiry, audience) and does not authorize the caller: any third party can mint a Google-signed ID token for this audience with its own service account. Authorization therefore comes from the Invoker IAM check (`roles/run.invoker` bindings) or, when that check is disabled, from the `ALLOWED_CALLERS` allowlist in the receiving sample.
- Corrected from the official docs: after `decoded_token = id_token.verify_token(creds, requests.Request())` the source's receiving sample returns `f"Hello, {decoded_token['email']}!\n"` for any valid Google-signed token without checking who the caller is, and it unpacks `auth_type, creds = auth_header.split(" ", 1)` outside the `try`, which raises `ValueError` (HTTP 500 instead of 401) for a header such as `Authorization: Bearer` with no credentials; the sample above authorizes the verified `email` against `ALLOWED_CALLERS` (HTTP 403 otherwise) and splits the header safely (HTTP 401 for a non-bearer scheme or an empty credential).
- Set `ALLOWED_CALLERS` on the receiver at deployment the same way as `SERVICE_URL`, for example `gcloud run services update RECEIVING_SERVICE --update-env-vars ALLOWED_CALLERS=CALLING_SERVICE_IDENTITY` (the calling service account email). gcloud splits `--update-env-vars` values on commas, so for several callers use the alternate-delimiter syntax, for example `--update-env-vars '^:^ALLOWED_CALLERS=SA_EMAIL_1,SA_EMAIL_2'` (https://docs.cloud.google.com/sdk/gcloud/reference/topic/escaping).
- The source also shows Console, Terraform, Go, and Java samples (not reproduced). It links the securing Cloud Run services tutorial: https://docs.cloud.google.com/run/docs/tutorials/secure-services
- Source: https://docs.cloud.google.com/run/docs/authenticating/service-to-service (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Distance: Cloud Run is Google Cloud's serverless container platform, distinct from Cloudflare Workers (`cloudflare-workers`) and Vercel Functions (`vercel`). See `gcp-foundation` for service accounts and workload identity federation.

## Related

- [public.md](./public.md)
- [managing-access.md](./managing-access.md)
- Service identity: https://docs.cloud.google.com/run/docs/securing/service-identity
