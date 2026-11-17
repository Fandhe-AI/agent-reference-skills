---
source: https://docs.cloud.google.com/iap/docs/authentication-howto
---

# Programmatic authentication

How to call an Identity-Aware Proxy (IAP) secured app from non-browser clients (command-line tools, service-to-service calls, mobile apps) using a user account or a service account. IAP accepts an OAuth 2.0 ID token (a Google-issued token whose audience is the IAP application's resource ID) or a service account signed JWT, sent in the `Authorization` or `Proxy-Authorization` HTTP header. Only Google identities are supported for user account programmatic access; Identity Platform and Workforce Identity Federation identities are not.

## Signature / Usage

### Desktop app: sign in and get a token

Requires a desktop OAuth 2.0 client ID that is allowlisted for programmatic access to the app. Start a local server that echoes requests:

```bash
  # Example using Netcat (http://netcat.sourceforge.net/)
  nc -k -l 4444
```

Open this URI in a browser (`DESKTOP_CLIENT_ID` is the Desktop app client ID) and copy `CODE` from the request the local server prints:

```text
https://accounts.google.com/o/oauth2/v2/auth?client_id=DESKTOP_CLIENT_ID&response_type=code&scope=openid%20email&access_type=offline&redirect_uri=http://localhost:4444&cred_ref=true
```

Exchange the code for tokens. The response JSON contains `id_token` and `access_token`; either can access the app:

Adapted (not in the official docs): `--verbose` removed: it prints the request headers, including the `Authorization` bearer token, to standard error.

```bash
  curl \
    --data client_id=DESKTOP_CLIENT_ID \
    --data client_secret=DESKTOP_CLIENT_SECRET \
    --data code=CODE \
    --data redirect_uri=http://localhost:4444 \
    --data grant_type=authorization_code \
    https://oauth2.googleapis.com/token
```

Call the app with the token:

Adapted (not in the official docs): the source's garbled markup around `URL` is replaced by a plain `URL` placeholder. `--verbose` removed: it prints the request headers, including the `Authorization` bearer token, to standard error.

```bash
curl --header 'Authorization: Bearer TOKEN' URL
```

Refresh (each token is valid for about one hour):

Adapted (not in the official docs): `--verbose` removed: it prints the request headers, including the `Authorization` bearer token, to standard error.

```bash
curl \
  --data client_id=DESKTOP_CLIENT_ID \
  --data client_secret=DESKTOP_CLIENT_SECRET \
  --data refresh_token=REFRESH_TOKEN \
  --data grant_type=refresh_token \
  https://oauth2.googleapis.com/token
```

### Mobile app

Create or share an OAuth 2.0 client ID and allowlist it for programmatic access, then get an ID token for the OAuth client ID of the IAP-secured resource: on Android use the Google Sign-In API (`requestIdToken` set to the resource's client ID); on iOS use Google Sign-In. Send it in `Authorization: Bearer`.

### Service account JWT

Grant the calling service account `roles/iam.serviceAccountTokenCreator`, create a JWT for the IAP-secured resource, and sign it. The payload carries `iss`, `sub`, `aud`, `iat` and `exp` (see the table below).

Sign with gcloud (the IAM Service Account Credentials API signs without direct access to a private key; set up application default credentials first):

```bash
cat > claim.json << EOM
{
  "iss": "SERVICE_ACCOUNT_EMAIL_ADDRESS",
  "sub": "SERVICE_ACCOUNT_EMAIL_ADDRESS",
  "aud": "TARGET_URL",
  "iat": $(date +%s),
  "exp": $((`date +%s` + 3600))
}
EOM
```

```bash
gcloud iam service-accounts sign-jwt --iam-account="SERVICE_ACCOUNT_EMAIL_ADDRESS" claim.json output.jwt
```

Or with the `signJwt` REST method:

Adapted (not in the official docs): the `payload` field of `SignJwtRequest` is a string holding the serialized JWT claims set (iamcredentials Discovery document), so the placeholder `JWT_PAYLOAD` is quoted.

```bash
cat << EOF > request.json
{
  "payload": "JWT_PAYLOAD"
}
EOF
```

```bash
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d @request.json \
  "https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/SERVICE_ACCOUNT_EMAIL_ADDRESS:signJwt"
```

Use the signed JWT:

Adapted (not in the official docs): `--verbose` removed: it prints the request headers, including the `Authorization` bearer token, to standard error.

```bash
curl --header 'Authorization: Bearer SIGNED_JWT' URL
```

### Service account OIDC token (client library)

Needs an OAuth 2.0 client ID allowlisted for programmatic access, the service account on the app's access list, and an ID token with an `email` claim, scoped to that OAuth 2.0 client ID (see the table below). The source's samples get the token for the default service account (Compute Engine, App Engine, Cloud Run) or Application Default Credentials, for example `id_token.fetch_id_token(Request(), client_id)` in Python; send it as `Authorization: Bearer OIDC_TOKEN`.

### Service account access token

The service account must be on the resource's access list. Generate an access token with the `openid` and `https://www.googleapis.com/auth/userinfo.email` scopes, with gcloud or with the IAM Service Account Credentials API `generateAccessToken` method (`"openid"` and `"https://www.googleapis.com/auth/userinfo.email"` in the `scope` field).

For example, by impersonating the service account with the gcloud CLI:

```bash
gcloud auth print-access-token \
  --impersonate-service-account=SERVICE_ACCOUNT_EMAIL_ADDRESS \
  --scopes=openid,https://www.googleapis.com/auth/userinfo.email
```

Adapted (not in the official docs): `--verbose` removed: it prints the request headers, including the `Authorization` bearer token, to standard error.

```bash
curl \
  --header 'Authorization: Bearer ACCESS_TOKEN' \
  URL
```

### Proxy-Authorization header

If your app uses the `Authorization` header, send the ID token, access token or service account JWT in `Proxy-Authorization: Bearer` instead. IAP authorizes with a valid `Proxy-Authorization` credential and passes `Authorization` to the app untouched; otherwise it processes `Authorization` and strips `Proxy-Authorization`.

Adapted (not in the official docs): garbled markup around `URL` replaced by a plain placeholder. `--verbose` removed: it prints the request headers, including the `Authorization` bearer token, to standard error.

```bash
curl --header 'Proxy-Authorization: Bearer SIGNED_JWT' URL
```

## Options / Props

### Service account credential types

| Feature | Service account JWT | OpenID Connect token | OAuth 2.0 access token |
|---|---|---|---|
| Context-aware access support | Yes | Yes | Yes |
| OAuth 2.0 client ID requirement | — | Yes | — |
| Token scope | URL of IAP-secured resource | OAuth 2.0 client ID | `openid` and `https://www.googleapis.com/auth/userinfo.email` |

### JWT payload fields

| Field | Value |
|---|---|
| `iss`, `sub` | Service account email (`client_email` in the key file), for example `service-account@PROJECT_ID.iam.gserviceaccount.com` |
| `aud` | Exact URL (access to that URL only) or URL with path wildcard `/*` (all URLs prefixed with the `aud` string without the trailing `*`) |
| `iat` | Current Unix epoch time |
| `exp` | Within 3600 seconds after `iat` |

### Roles

| Role | Use |
|---|---|
| `roles/iam.serviceAccountTokenCreator` | Sign a service account JWT (grant on the specific target service account, not the project) |
| `roles/iam.serviceAccountOpenIdTokenCreator` | Calling service account impersonates the target to call `generateIdToken` with `audience` set to the client ID |

## Notes

- Service accounts do not support device policy attributes with context-aware access.
- The refresh token workflow is not supported for access level policies; regenerate an ID token with the full authentication flow.
- With the Google-managed OAuth 2.0 client (the default) and no allowlisted OAuth clients for programmatic access, OAuth client-based programmatic access is unavailable; service accounts can still use self-signed JWTs or service account access tokens.
- Grant `roles/iam.serviceAccountTokenCreator` on a specific target service account, not at project level: a project-level grant lets the caller create tokens for any service account in the project.
- When signing a JWT locally from a service account key file, include a JWT header whose `kid` is the key's `private_key_id`. Key files are credentials: do not commit or share them. The source also shows a Bash script that builds the assertion from a key file; it is not reproduced here.
- When using the IAM API to sign with `projects/-/serviceAccounts/...`, the project in the resource name must be `-`. Signing via the API is a network call.
- The client secret and the tokens end up in shell history and process lists when passed on the command line, and a printed token or refresh token grants access; do not print them in shared terminals or CI logs. Store a client secret in Secret Manager (it is shown only once on creation).
- Source inconsistency: `--scopes` (used with `--impersonate-service-account`) is accepted by `gcloud auth print-access-token` in gcloud 593.0.0 but is a hidden flag that its help does not list.
- Corrected from the official docs: `curl --verbose --header 'Authorization: Bearer TOKEN' <var translate="</var>no">URL` and the same garbled markup in the `Proxy-Authorization` example were replaced by a plain `URL` placeholder, and `"payload": JWT_PAYLOAD` (an unquoted value, not valid JSON) was quoted.
- The source also shows Console steps, an unquoted JWT payload example with a trailing comma (the `claim.json` heredoc above shows the same fields), the Python `make_iap_request` sample and C#, Go, Java, Node.js, PHP, Ruby samples and a Python `sign_jwt` sample; they are omitted here.
- Adapted from the official docs: the source runs these `curl` commands with `--verbose`, which writes the `Authorization` header and its token to standard error, where shared terminals and CI logs keep it; the flag is removed. Without it curl still reports the HTTP or TLS error.
- Source: https://docs.cloud.google.com/iap/docs/authentication-howto (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [signed-headers-howto.md](./signed-headers-howto.md)
- [sessions-howto.md](./sessions-howto.md)
- [query-parameters-and-headers-howto.md](./query-parameters-and-headers-howto.md)
