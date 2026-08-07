<!-- source: https://code.claude.com/docs/en/amazon-bedrock.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/claude-platform-on-aws.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/google-vertex-ai.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/microsoft-foundry.md / last verified: 2026-08-07 -->

# cloud-env-setup

Authentication and environment-variable setup for running Claude Code through Amazon Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform (Vertex AI), and Microsoft Foundry, plus configuration-verification commands. Full variable lists live in `references/cloud-platforms/`.

## Amazon Bedrock: AWS 認証情報の設定

```bash
aws configure
```

```bash
# SSO プロファイル
aws sso login --profile=your-profile-name
export AWS_PROFILE=your-profile-name
```

```bash
# Amazon Bedrock API キー
export AWS_BEARER_TOKEN_BEDROCK=your-bedrock-api-key
```

## Amazon Bedrock の有効化

```bash
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1  # optional if your AWS profile already sets a region
```

## Amazon Bedrock: モデルバージョンの固定

```bash
export ANTHROPIC_DEFAULT_OPUS_MODEL='us.anthropic.claude-opus-4-8'
export ANTHROPIC_DEFAULT_SONNET_MODEL='us.anthropic.claude-sonnet-4-6'
export ANTHROPIC_DEFAULT_HAIKU_MODEL='us.anthropic.claude-haiku-4-5-20251001-v1:0'
```

Unpinned `opus`/`sonnet` aliases resolve to Claude Code's built-in Bedrock default, which can lag or be unavailable in-account.

## Amazon Bedrock: リージョン切り分け（トラブルシュート）

```bash
aws bedrock list-inference-profiles --region your-region
export AWS_REGION=us-east-1
```

## Amazon Bedrock: Mantle エンドポイントの利用

```bash
export CLAUDE_CODE_USE_MANTLE=1
export AWS_REGION=us-east-1
claude --model anthropic.claude-haiku-4-5
```

## Claude Platform on AWS の有効化

```bash
aws sso login --profile my-profile
export AWS_PROFILE=my-profile

export CLAUDE_CODE_USE_ANTHROPIC_AWS=1
export ANTHROPIC_AWS_WORKSPACE_ID=wrkspc_01ABCDEFGHIJKLMN
export AWS_REGION=us-east-1
```

```bash
# Workspace API key (takes precedence over SigV4)
export ANTHROPIC_AWS_API_KEY=sk-ant-xxxxx
```

## Google Cloud's Agent Platform (Vertex AI) の有効化

```bash
gcloud config set project YOUR-PROJECT-ID
gcloud services enable aiplatform.googleapis.com

export CLAUDE_CODE_USE_VERTEX=1
export CLOUD_ML_REGION=global
export ANTHROPIC_VERTEX_PROJECT_ID=YOUR-PROJECT-ID
```

## Google Cloud: Application Default Credentials

```bash
gcloud auth application-default login
```

## Google Cloud: モデルバージョンの固定

```bash
export ANTHROPIC_DEFAULT_OPUS_MODEL='claude-opus-4-8'
export ANTHROPIC_DEFAULT_SONNET_MODEL='claude-sonnet-5'
export ANTHROPIC_DEFAULT_HAIKU_MODEL='claude-haiku-4-5@20251001'
```

## Microsoft Foundry の有効化

```bash
export CLAUDE_CODE_USE_FOUNDRY=1
export ANTHROPIC_FOUNDRY_RESOURCE={resource}
# or export ANTHROPIC_FOUNDRY_BASE_URL=https://{resource}.services.ai.azure.com/anthropic
```

Microsoft Foundry has no interactive setup wizard; environment variables are the only configuration path.

## Microsoft Foundry: Entra ID ログイン（デフォルト認証情報チェーン）

```bash
az login
```

## Microsoft Foundry: API キー認証

```bash
export ANTHROPIC_FOUNDRY_API_KEY=your-azure-api-key
```

## Microsoft Foundry: モデルバージョンの固定

```bash
export ANTHROPIC_DEFAULT_OPUS_MODEL='claude-opus-4-8'
export ANTHROPIC_DEFAULT_SONNET_MODEL='claude-sonnet-5'
export ANTHROPIC_DEFAULT_HAIKU_MODEL='claude-haiku-4-5'
```

Microsoft Foundry has no startup model-availability check, so an unpinned/unavailable default fails requests outright.

## 設定の確認（全プラットフォーム共通）

```text
/status
```

`/status` shows the resolved `API provider` / region / project / model lines. Interactive re-configuration wizards are also slash commands, not shell commands:

```text
/setup-bedrock
/setup-vertex
```

## Notes

- Installing and updating the `claude` binary itself is covered by the anthropic-claude-code skill.
- Full variable lists, IAM/RBAC requirements, and troubleshooting for each platform: `references/cloud-platforms/amazon-bedrock.md`, `references/cloud-platforms/claude-platform-on-aws.md`, `references/cloud-platforms/google-vertex-ai.md`, `references/cloud-platforms/microsoft-foundry.md`.
- Calling the Messages API directly against Bedrock/Vertex/Foundry (rather than routing the Claude Code CLI through them) is covered by the anthropic-api-core skill's platforms pages.
