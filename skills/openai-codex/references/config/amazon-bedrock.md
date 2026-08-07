# Amazon Bedrock

Configure local ChatGPT Work and Codex surfaces (desktop app, CLI, IDE extension, SDK) to use OpenAI models through Amazon Bedrock instead of the OpenAI-hosted Responses API. The local client sends model requests to Bedrock using AWS-managed authentication; ChatGPT sign-in and `OPENAI_API_KEY` are not used for this provider.

## Signature / Usage

```toml
# ~/.codex/config.toml
model_provider = "amazon-bedrock"
```

```bash
export AWS_BEARER_TOKEN_BEDROCK=<your-bedrock-api-key>
export AWS_REGION=us-east-2
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `model_provider = "amazon-bedrock"` | config.toml | Selects the Amazon Bedrock Mantle path in supported commercial AWS Regions (not AWS GovCloud). |
| Bedrock API key | env vars | `AWS_BEARER_TOKEN_BEDROCK` + `AWS_REGION` (Region is required with this auth path). Checked first. |
| AWS SDK credential chain | fallback | Shared `aws configure` files, `AWS_ACCESS_KEY_ID`/`AWS_SECRET_ACCESS_KEY`/`AWS_SESSION_TOKEN`, `aws login`, `aws sso login --profile <name>` + `AWS_PROFILE`, or a federated identity via `credential_process`. |

## Notes

- Desktop app and IDE extension may not inherit shell environment variables — put `AWS_BEARER_TOKEN_BEDROCK`/`AWS_REGION` in `~/.codex/.env` and restart the app/extension.
- Verify with `/status` in the CLI (confirms the `amazon-bedrock` provider) or by starting a new task after restarting the desktop app/IDE extension.
- Supported model IDs (Bedrock-side, exact strings): `openai.gpt-5.6-sol`, `openai.gpt-5.6-terra`, `openai.gpt-5.6-luna`, `openai.gpt-5.5`, `openai.gpt-5.4`; availability varies by AWS Region.
- Fast Mode is unavailable (Bedrock supports on-demand inference only, not priority processing). Also unavailable: Codex cloud, ChatGPT Work on the web, image generation/voice dictation/web search, GitHub/Slack/Linear cloud integrations, workspace SSO/RBAC/SCIM/analytics/compliance API. Local features (sandboxing, permission controls, `requirements.toml`, MCP, subagents, Codex Security plugin/CLI, scheduled tasks, worktrees) remain available.
- Troubleshooting checklist: exact model ID, Region where the model is available, valid/non-expired Bedrock API key or AWS credentials, IAM permission for the selected model. AWS credential/quota/billing/regional-availability issues go to the customer's AWS administrator, not OpenAI Support.
- A brief `[model_providers.amazon-bedrock.aws]` (`profile`/`region`) form also appears among the generic custom-provider examples in `config-advanced.md`; this page is the dedicated Bedrock setup guide (auth options, verification, feature-availability matrix).

## Related

- Advanced Configuration (`./config-advanced.md`)
- Environment variables (`./environment-variables.md`)
- Models (`../getting-started/models.md`)
