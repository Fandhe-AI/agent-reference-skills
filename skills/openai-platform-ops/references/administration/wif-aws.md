# WIF: AWS

Use AWS as a Workload Identity Provider via AWS outbound identity federation (`GetWebIdentityToken`) or Amazon EKS projected service account tokens. SigV4-signed requests and STS temporary access-key credentials are not supported as subject tokens.

## Signature / Usage

Request an AWS-issued OIDC token (outbound identity federation):

```bash
TOKEN=$(aws sts get-web-identity-token \
  --audience "https://api.openai.com/v1" \
  --signing-algorithm ES384 \
  --duration-seconds 300 \
  --query "WebIdentityToken" \
  --output text)
```

Exchange it via the SDK:

```python
client = OpenAI(
    workload_identity={
        "identity_provider_id": os.environ["OPENAI_IDENTITY_PROVIDER_ID"],
        "service_account_id": os.environ["OPENAI_SERVICE_ACCOUNT_ID"],
        "provider": aws_outbound_web_identity_token_provider(
            os.environ["OPENAI_WIF_AUDIENCE"]
        ),
    },
)
```

## Options / Props

| Scenario | Issuer (`iss`) | Subject (`sub`) |
|----------|----------------|------------------|
| AWS outbound identity federation | Account-specific issuer URL from `enable-outbound-web-identity-federation` | IAM principal ARN, e.g. `arn:aws:iam::123456789012:role/OpenAIWifRole` |
| Amazon EKS | `aws eks describe-cluster --query "cluster.identity.oidc.issuer"` | `system:serviceaccount:<namespace>:<service-account-name>` |

## Notes

- The AWS STS `GetWebIdentityToken` API is not on the STS global endpoint — use a regional STS endpoint.
- Restrict `sts:IdentityTokenAudience` and `sts:DurationSeconds` in IAM policy to limit token audience and lifetime.
- AWS-specific claims (account, org, principal/request tags) live nested under `https://sts.amazonaws.com/` — use CEL bracket notation in attribute transformations to derive mapping attributes from them.
- For EKS, mount a projected service account token (audience + `expirationSeconds`) and read it from the mounted file path so rotated tokens are picked up automatically.
- Prefer exact `sub` matching (full IAM role ARN or full Kubernetes service-account subject) over broad account/org-level trust.

## Related

- [Workload Identity Federation](./workload-identity-federation.md)
- [WIF: Kubernetes](./wif-kubernetes.md)
