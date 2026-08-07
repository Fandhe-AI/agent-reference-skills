# WIF: Google Cloud

Use Google Cloud as a Workload Identity Provider via the metadata-server identity endpoint (Compute Engine, Cloud Run, GKE with attached service accounts) or GKE projected Kubernetes service account tokens.

## Signature / Usage

Request a Google identity token from the metadata server:

```bash
AUDIENCE="https://api.openai.com/v1"
TOKEN=$(curl -sS -G -H "Metadata-Flavor: Google" \
  "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity" \
  --data-urlencode "audience=${AUDIENCE}")
```

```python
client = OpenAI(
    workload_identity={
        "identity_provider_id": os.environ["OPENAI_IDENTITY_PROVIDER_ID"],
        "service_account_id": os.environ["OPENAI_SERVICE_ACCOUNT_ID"],
        "provider": google_metadata_identity_token_provider(
            audience=os.environ["OPENAI_WIF_AUDIENCE"]
        ),
    },
)
```

## Options / Props

| Scenario | Issuer (`iss`) | Subject (`sub`) |
|----------|----------------|------------------|
| Google workload identity (metadata server) | `https://accounts.google.com` | Google service account numeric ID; `email` claim available too |
| GKE (projected token) | `kubectl get --raw /.well-known/openid-configuration \| jq -r .issuer` | `system:serviceaccount:<namespace>:<service-account-name>` |
| GKE Workload Identity (bound Google SA) | `https://accounts.google.com` | Same as metadata-server flow |

## Notes

- Never create or download service-account key files for this flow — the workload uses the attached service account and the metadata server to mint short-lived tokens.
- If a GKE workload already uses GKE Workload Identity and can reach the metadata server, follow the Google-workload-identity path instead of the GKE-projected-token path.
- For GKE projected tokens, mount the token with the configured audience and expiration, and read it from the mounted file path.
- Prefer `sub` as the primary identity binding (stable and unique); `email` may be added for readability only.

## Related

- [Workload Identity Federation](./workload-identity-federation.md)
- [WIF: Kubernetes](./wif-kubernetes.md)
