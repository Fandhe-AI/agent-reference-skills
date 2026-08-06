# WIF: Oracle Cloud Infrastructure

Use OCI instance principals as a Workload Identity Provider by exchanging an OCI identity-domain token for a short-lived OpenAI access token.

## Signature / Usage

```bash
curl --fail --silent \
  --header "Authorization: Bearer Oracle" \
  http://169.254.169.254/opc/v2/instance/id
```

```python
def oracle_token_provider(domain_url: str) -> SubjectTokenProvider:
    def get_token() -> str:
        signer = oci.auth.signers.InstancePrincipalsSecurityTokenSigner()
        response = requests.post(
            f"{domain_url.rstrip('/')}/oauth2/v1/token",
            data={
                "grant_type": "urn:ietf:params:oauth:grant-type:token-exchange",
                "scope": "urn:opc:idm:__myscopes__",
                "requested_token_type": "urn:ietf:params:oauth:token-type:access_token",
            },
            auth=signer, timeout=30,
        )
        return response.json()["access_token"]
    return {"token_type": "jwt", "get_token": get_token}
```

## Options / Props

| Claim | Value |
|-------|-------|
| Issuer (`iss`) | `https://identity.oraclecloud.com/` |
| Audience (`aud`) | Tenant-specific identity-domain URL |
| `ipst_instance` | Instance OCID, e.g. `ocid1.instance.oc1.phx.<id>` |
| `ipst_compartment` | Compartment OCID (broader than instance-level) |
| `sub_type` | `instance` for instance principals |

## Notes

- Requires the OCI Python SDK's `InstancePrincipalsSecurityTokenSigner` to sign the token-exchange request to the identity domain's `/oauth2/v1/token` endpoint.
- Configure Custom OIDC discovery to `https://<identity-domain>/.well-known/openid-configuration`, or upload JWKS from `https://<identity-domain>/admin/v1/SigningCert/jwk`.
- Match `ipst_instance` for single-instance access or `ipst_compartment` for compartment-wide access; add `domain_id` / `ca_ocid` / `sub_type` rows to further narrow the mapping.

## Related

- [Workload Identity Federation](./workload-identity-federation.md)
