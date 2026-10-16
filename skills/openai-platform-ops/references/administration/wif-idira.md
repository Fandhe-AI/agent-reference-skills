# WIF: Idira

Use Idira Secure Workload Access (SWA) to call the OpenAI API without storing an OpenAI API key. SWA assigns the workload a SPIFFE ID and issues a JWT-SVID; the OpenAI SDK exchanges it for a short-lived OpenAI access token with the permissions of a mapped service account.

## Signature / Usage

`spiffe-helper` requests and refreshes the JWT-SVID from the SWA Agent (`helper.conf`), writing `/var/run/spiffe/openai.jwt`:

```hcl
agent_address = "/tmp/swa-agent/public/api.sock"
cert_dir      = "/var/run/spiffe"
daemon_mode   = true

jwt_svids = [{
  jwt_audience       = "https://api.openai.com/v1"
  jwt_svid_file_name = "openai.jwt"
}]
```

```bash
spiffe-helper -config helper.conf
```

Set the provider and service account IDs in the workload environment, then pass a subject token provider to the SDK:

```bash
export OPENAI_IDENTITY_PROVIDER_ID="<workload identity provider ID>"
export OPENAI_SERVICE_ACCOUNT_ID="<service account ID>"
```

```python
import os
from pathlib import Path

from openai import OpenAI
from openai.auth import SubjectTokenProvider

TOKEN_PATH = "/var/run/spiffe/openai.jwt"


def spiffe_jwt_svid_provider(token_path: str) -> SubjectTokenProvider:
    def get_token() -> str:
        token = Path(token_path).read_text().strip()
        if not token:
            raise RuntimeError("The SPIFFE JWT-SVID file is empty.")
        return token

    return {"token_type": "jwt", "get_token": get_token}


client = OpenAI(
    workload_identity={
        "identity_provider_id": os.environ["OPENAI_IDENTITY_PROVIDER_ID"],
        "service_account_id": os.environ["OPENAI_SERVICE_ACCOUNT_ID"],
        "provider": spiffe_jwt_svid_provider(TOKEN_PATH),
    },
)
```

## Options / Props

Workload Identity Provider settings (Organization Settings > Security > Workload Identity Provider):

| Setting | Value |
|---------|-------|
| Name | A unique name, such as `idira-prod`. |
| Description | The application and environment that use this provider. |
| OIDC Issuer URL | The JWT-SVID's `iss` value. |
| Audience | The audience requested by the helper, such as `https://api.openai.com/v1`. |
| Use uploaded JWKS for token verification | Keep off to use OIDC discovery. |
| Attribute transformations | Leave empty when mapping directly from `sub`. |

Token fields to check before creating the provider:

| Field | Expected value |
|-------|----------------|
| Header `alg` | The configured signing algorithm, such as `RS512`. |
| Header `kid` | The ID of a signing key in the trust domain's public JWKS. |
| `iss` | The trust domain's HTTPS issuer URL. |
| `sub` | The SPIFFE ID assigned to this workload. |
| `aud` | Contains the audience chosen for OpenAI access. |
| `iat` and `exp` | Issue and expiry times; use a token that has not expired. |

Service account mapping: set **Key** to `sub` and **Value** to the exact SPIFFE ID (e.g. `spiffe://prod.example.com/k8s-nodegroup/ns/my-namespace/sa/my-service-account`), select the Project and Service account, and select Permissions (e.g. `api.model.request`).

## Notes

- Source: https://developers.openai.com/api/docs/guides/workload-identity-federation/idira (fetched 2026-10-17).
- Prerequisites: an SWA deployment with a trust domain and attestation policy, access to the SWA Agent's Workload API socket, permission to manage Workload Identity Providers / mappings / projects / service accounts, and an OpenAI SDK that supports workload identity credentials.
- Retrieve the trust domain's `jwt.discovery_endpoints.oidc_discovery_url` and `jwt.discovery_endpoints.jwks_uri`. The discovery document and JWKS must be reachable by OpenAI over HTTPS without credentials; otherwise upload the public JWKS and update it when SWA rotates keys.
- SWA defaults to `RS512` signing with a 4096-bit RSA key, which OpenAI's JWT verifier accepts.
- The audience identifies the token's intended recipient; it does not set the token exchange endpoint. Use the same value when requesting the JWT-SVID and configuring the provider.
- Issuer comparison ignores trailing slashes; all other characters (scheme, path) must match. Audience values must match exactly.
- In Kubernetes run the helper as a sidecar with a memory-backed `emptyDir` at `/var/run/spiffe` and mount `/tmp/swa-agent/public`. On VMs use `/run/swa-agent/api.sock` for `agent_address` and keep the token directory on memory-backed storage.
- Permissions on a mapping can narrow the service account's access but cannot grant more; blank adds no WIF-specific restriction. Use one service account per application and environment, prefer an exact SPIFFE ID, and avoid overlapping mappings.
- Inspecting the token decodes claims without verifying the signature; do not log the token or paste it into a web-based decoder, and unset `TOKEN` afterward.
- Verify with `OPENAI_API_KEY` unset. If no mapping matches, check provider ID, service account ID, enabled mapping, and exact `sub`; if more than one matches, narrow or disable overlapping mappings.
- For Codex, use the token delivery steps here, then follow the Codex section of the Workload Identity Federation guide.

## Related

- [Workload Identity Federation](./workload-identity-federation.md)
- [WIF: SPIFFE](./wif-spiffe.md)
