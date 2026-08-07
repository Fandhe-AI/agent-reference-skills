<!-- source: https://platform.claude.com/docs/en/manage-claude/wif-providers/aws / last verified: 2026-08-07 -->

# Use WIF with AWS

Authenticate AWS workloads on Lambda, EC2, ECS, or EKS to the Claude API with Workload Identity Federation and STS-issued identity tokens.

## Signature / Usage

```bash
# STS web identity tokens (Lambda, EC2, ECS, EKS)
JWT=$(aws sts get-web-identity-token \
  --region us-east-1 \
  --audience "https://api.anthropic.com" \
  --signing-algorithm RS256 \
  --duration-seconds 900 \
  --query WebIdentityToken --output text)

RESPONSE=$(curl -sS https://api.anthropic.com/v1/oauth/token \
  -H "content-type: application/json" \
  -d "{\"grant_type\": \"urn:ietf:params:oauth:grant-type:jwt-bearer\", \"assertion\": \"$JWT\", \"federation_rule_id\": \"$ANTHROPIC_FEDERATION_RULE_ID\", \"organization_id\": \"$ANTHROPIC_ORGANIZATION_ID\", \"service_account_id\": \"$ANTHROPIC_SERVICE_ACCOUNT_ID\", \"workspace_id\": \"$ANTHROPIC_WORKSPACE_ID\"}")
ACCESS_TOKEN=$(echo "$RESPONSE" | jq -r .access_token)
```

## Options / Props

| Path | Issuer | Subject claim |
|------|--------|----------------|
| STS `GetWebIdentityToken` (recommended) | `https://<uuid>.tokens.sts.global.api.aws` (per-account, from IAM Account settings) | IAM role ARN: `arn:aws:iam::<account>:role/<role-name>` |
| EKS projected service-account token | `https://oidc.eks.<region>.amazonaws.com/id/<id>` (per-cluster) | `system:serviceaccount:<namespace>:<service-account>` |

## Notes

- Claude API WIF for AWS; distinct from OpenAI's own `wif-aws.md` under `openai-platform-ops` (different token-exchange endpoint and resource ID scheme).
- STS path requires enabling **Outbound web identity federation** account-level flag (off by default) and granting the workload's IAM role `sts:GetWebIdentityToken` permission. `GetWebIdentityToken` is only available on regional STS endpoints — pin the client to a region.
- The STS token also carries an `https://sts.amazonaws.com/` claim with `aws_account`, `org_id`, `principal_id`, `request_tags`, matchable via `claims` or a CEL `condition`.
- EKS path: project a dedicated token with `audience: https://api.anthropic.com` — don't reuse the IRSA default `sts.amazonaws.com`-audience token exposed as `AWS_WEB_IDENTITY_TOKEN_FILE`.
- Scoping warning: `subject_prefix` of `arn:aws:iam::<account>:role/*` matches every IAM role in the account; pin the full role ARN or `system:serviceaccount:<namespace>:<name>` with no trailing `*`.

## Related

- [workload-identity-federation.md](./workload-identity-federation.md)
- [wif-kubernetes.md](./wif-kubernetes.md)
