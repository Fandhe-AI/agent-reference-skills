<!-- source: https://code.claude.com/docs/en/github-actions-cloud-providers.md / last verified: 2026-08-07 -->

# Use Claude Code GitHub Actions with cloud providers

Run Claude Code GitHub Actions through Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry instead of the Claude API, authenticating via OIDC so no long-lived cloud credential is stored in the repository.

## Signature / Usage

```yaml
- uses: anthropics/claude-code-action@v1
  with:
    use_bedrock: "true"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `use_bedrock` | input | `"true"` routes inference through Amazon Bedrock |
| `use_vertex` | input | `"true"` routes inference through Google Cloud's Agent Platform |
| `use_foundry` | input | `"true"` routes inference through Microsoft Foundry |
| `AWS_ROLE_TO_ASSUME` | secret | ARN of the IAM role trusted by the GitHub OIDC provider (Amazon Bedrock) |
| `GCP_WORKLOAD_IDENTITY_PROVIDER` / `GCP_SERVICE_ACCOUNT` | secret | Workload Identity Federation provider resource name / service account email (Google Cloud's Agent Platform) |
| `AZURE_CLIENT_ID` / `AZURE_TENANT_ID` / `AZURE_SUBSCRIPTION_ID` | secret | Microsoft Entra application client ID / tenant ID / subscription ID (Microsoft Foundry) |
| `APP_ID` / `APP_PRIVATE_KEY` | secret | Custom GitHub App ID and private key, when using a custom app instead of the official Claude GitHub App |

## Notes

- Setup involves four parts: choose a GitHub identity (official Claude GitHub App, custom app, or `GITHUB_TOKEN`), configure cloud-side OIDC trust, add repository secrets, and write the workflow file with `id-token: write` permission.
- On public repositories, credential steps run before the write-access check, so an unauthorized trigger still consumes Actions minutes and leaves audit-log entries; add a write-access check step before the credential steps to avoid this.
- Amazon Bedrock model IDs need a cross-region inference profile prefix (e.g. `us.`) matching the granted region group.
- Google Cloud's Agent Platform example reads the project ID from the `auth` step's output rather than hardcoding it, and sets `CLOUD_ML_REGION` in the job's `env`.
- Microsoft Foundry builds the endpoint URL from `ANTHROPIC_FOUNDRY_RESOURCE`; the `azure/login` step signs in via OIDC and Claude Code uses the Azure default credential chain.
- Bound run length/cost with `--max-turns` in `claude_args` as with the direct-API setup.

## Related

- [Claude Code GitHub Actions](./github-actions.md)
- [Roll out an LLM gateway for your organization](../llm-gateway/llm-gateway-rollout.md)
