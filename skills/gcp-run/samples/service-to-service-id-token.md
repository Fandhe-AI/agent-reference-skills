---
source: https://docs.cloud.google.com/run/docs/authenticating/service-to-service
---

# Service-to-Service Authentication with ID Tokens

A private Cloud Run service calls another private service: the caller runs as its own service account holding `roles/run.invoker` on the receiver, sends a Google-signed ID token, and the receiver verifies the token audience and checks the caller against an allowlist.

## Signature / Usage

### 1. Run the caller as a dedicated service account

```bash
gcloud run services update SERVICE_NAME --service-account SERVICE_ACCOUNT
```

`SERVICE_NAME` is the calling service; the deployer needs `roles/iam.serviceAccountUser` on `SERVICE_ACCOUNT`.

### 2. Allow that service account to invoke the receiver

```bash
gcloud run services add-iam-policy-binding RECEIVING_SERVICE \
  --member='serviceAccount:CALLING_SERVICE_IDENTITY' \
  --role='roles/run.invoker'
```

`CALLING_SERVICE_IDENTITY` is the email of the service account from step 1.

### 3a. Caller (Node.js)

The audience is the receiver URL, for example `https://my-cloud-run-service.run.app/`.

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

### 3b. Caller (Python)

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

### 4. Receiver (Python, Flask) verifies the audience and authorizes the caller

Set `SERVICE_URL` on the receiver at deployment, for example `gcloud run services update RECEIVING_SERVICE --update-env-vars SERVICE_URL=https://my-cloud-run-service.run.app/`; it must equal the audience string the callers request, including any trailing slash. Also set `ALLOWED_CALLERS` to the calling service account email, for example `--update-env-vars ALLOWED_CALLERS=CALLING_SERVICE_IDENTITY`; requests from any other identity get HTTP 403.

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
| Caller identity | Per-service user-managed service account with `roles/run.invoker` on the receiving service |
| ID token audience (`aud`) | URL of the receiving service, or a configured custom audience |
| Header | `Authorization: Bearer ID_TOKEN`, or `X-Serverless-Authorization: Bearer ID_TOKEN` (only the latter is checked when both are sent) |
| Token lifetime | About one hour; if you cache tokens, check `exp` |

## Notes

- The source's console and gcloud steps default the caller to `PROJECT_NUMBER-compute@developer.gserviceaccount.com`; it recommends a per-service user-managed service account with minimum permissions, which is what step 1 sets up.
- Corrected from the official docs: the source's Python receiving sample calls `id_token.verify_token(creds, requests.Request())` without an `audience` argument, so it accepts a valid Google-signed ID token issued for any audience; the sample above passes `audience=os.environ["SERVICE_URL"]`, matching the source's Java sample, which validates against the `SERVICE_URL` environment variable.
- `SERVICE_URL` is not injected by Cloud Run; without it the receiver raises `KeyError` for every request that carries a bearer token. `--update-env-vars` adds the variable, while `--set-env-vars` would first remove all existing environment variables.
- The `aud` check is an exact string match, so use the same form (trailing slash or not) on both sides. `gcloud run services describe` prints the URL without a trailing slash.
- Corrected from the official docs: the source's receiving sample returns `f"Invalid token: {e}\n"`, `f"Unhandled header format ({auth_type}).\n"` and `"Hello, anonymous user.\n"` as plain strings, which a Flask handler sends with HTTP 200, so callers built on it treat a rejected token as success; the sample above calls `abort(401)` in all three branches (fail closed) and does not echo the verification error to the client.
- Per https://docs.cloud.google.com/run/docs/securing/security, when the Invoker IAM check is enabled Cloud Run performs an IAM check on every request before forwarding it to the container; keep it enabled (recommended). In-container `verify_token` only authenticates the token (signature, expiry, audience) and does not authorize the caller: any third party can mint a Google-signed ID token for this audience with its own service account. Authorization therefore comes from the Invoker IAM check (`roles/run.invoker` bindings) or, when that check is disabled, from the `ALLOWED_CALLERS` allowlist in the receiving sample.
- Corrected from the official docs: after `decoded_token = id_token.verify_token(creds, requests.Request())` the source's receiving sample returns `f"Hello, {decoded_token['email']}!\n"` for any valid Google-signed token without checking who the caller is, and it unpacks `auth_type, creds = auth_header.split(" ", 1)` outside the `try`, which raises `ValueError` (HTTP 500 instead of 401) for a header such as `Authorization: Bearer` with no credentials; the sample above authorizes the verified `email` against `ALLOWED_CALLERS` (HTTP 403 otherwise) and splits the header safely (HTTP 401 for a non-bearer scheme or an empty credential).
- Set `ALLOWED_CALLERS` on the receiver at deployment the same way as `SERVICE_URL`, for example `gcloud run services update RECEIVING_SERVICE --update-env-vars ALLOWED_CALLERS=CALLING_SERVICE_IDENTITY` (the calling service account email). gcloud splits `--update-env-vars` values on commas, so for several callers use the alternate-delimiter syntax, for example `--update-env-vars '^:^ALLOWED_CALLERS=SA_EMAIL_1,SA_EMAIL_2'` (https://docs.cloud.google.com/sdk/gcloud/reference/topic/escaping).
- Async alternatives where the platform manages the call: Cloud Tasks, Pub/Sub, Cloud Scheduler, Eventarc. See `gcp-foundation` for service accounts and workload identity federation.
- Cloud Run / Cloud Run functions are Google Cloud's serverless containers/functions, distinct from Cloudflare Workers (`cloudflare-workers`), Vercel Functions (`vercel`), and HTTP frameworks (`hono`, `fastify`) that only run inside the container.
- The `gcloud run` commands that omit `--region` follow the source; pass `--region=REGION` or set the `run/region` property (for example `gcloud config set run/region REGION`), otherwise gcloud prompts for a region or, in non-interactive runs, fails.
- Source: https://docs.cloud.google.com/run/docs/authenticating/service-to-service (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/troubleshooting (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [scheduler-oidc-private-service.md](./scheduler-oidc-private-service.md)
- [tasks-http-target-oidc.md](./tasks-http-target-oidc.md)
- Service identity: https://docs.cloud.google.com/run/docs/securing/service-identity
