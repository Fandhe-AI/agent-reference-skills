# WIF: X.509 Certificates

Exchange a workload's TLS client certificate identity for a short-lived OpenAI access token (beta), replacing the API key but not the client certificate itself.

## Signature / Usage

```bash
export OPENAI_MTLS_CERT_CHAIN="/path/to/client-chain.pem"
export OPENAI_MTLS_KEY="/path/to/client-key.pem"
export OPENAI_IDENTITY_PROVIDER_ID="idp_example"
export OPENAI_SERVICE_ACCOUNT_ID="svc_acct_example"

curl --cert "$OPENAI_MTLS_CERT_CHAIN" \
  --key "$OPENAI_MTLS_KEY" \
  --request POST "https://mtls.auth.openai.com/oauth/token" \
  --header "Content-Type: application/json" \
  --data @- <<JSON
{
  "grant_type": "urn:ietf:params:oauth:grant-type:token-exchange",
  "subject_token_type": "urn:openai:params:oauth:token-type:x509",
  "identity_provider_id": "${OPENAI_IDENTITY_PROVIDER_ID}",
  "service_account_id": "${OPENAI_SERVICE_ACCOUNT_ID}"
}
JSON
```

Then call the API mTLS endpoint with the returned bearer token plus an accepted client certificate:

```bash
curl --request POST \
  --cert "$OPENAI_MTLS_CERT_CHAIN" \
  --key "$OPENAI_MTLS_KEY" \
  --header "Authorization: Bearer $OPENAI_WIF_ACCESS_TOKEN" \
  --header "Content-Type: application/json" \
  --data "{\"model\":\"gpt-5.6\",\"input\":\"Say hello in one sentence.\"}" \
  "https://mtls.api.openai.com/v1/responses"
```

## Options / Props

| Field | Description |
|-------|-------------|
| `subject_token_type` | Must be `urn:openai:params:oauth:token-type:x509` |
| `identity_provider_id` | X.509 Workload Identity Provider ID |
| `service_account_id` | OpenAI service account ID to resolve against a matching mapping |
| `openai.subject` (attribute transformation) | Required non-empty derived subject value used by the mapping, e.g. from `assertion.subject.common_name` |
| Attribute conditions (CEL, optional) | Rejects certificates before mapping resolution, e.g. `assertion.subject.organizational_unit == "Production"` |

## Notes

- Five parts: an org-level Mutual TLS trusted root, an X.509 Workload Identity Provider (derives `openai.*` attributes from the verified client certificate), a service account mapping keyed on `openai.subject`, a certificate-based token exchange on `mtls.auth.openai.com` (no `subject_token` in the body — the cert comes from the TLS connection), and an API call on `mtls.api.openai.com` presenting both the bearer token and an accepted certificate.
- Beta feature; requires an administrator to enable it for the organization and reuses the organization's existing Mutual TLS certificate configuration (no separate certificate trust store).
- Certificate facts are available under `assertion.subject` and `assertion.subject_alt_names`; transformation results must be scalar. X.509 mappings match derived `openai.*` attributes only, not raw JWT claims like `sub`/`iss`/`aud`.
- The bearer token is not cryptographically bound to the certificate (no DPoP/`cnf`); the API request still requires a separately accepted client certificate.
- Token lifetime is at most one hour and never outlives the verified client certificate; no refresh token is issued — repeat the exchange.
- This flow does not add support for SPIFFE X.509-SVIDs; the SPIFFE guide continues to use JWT-SVIDs only.

## Related

- [Workload Identity Federation](./workload-identity-federation.md)
- [WIF: SPIFFE](./wif-spiffe.md)
