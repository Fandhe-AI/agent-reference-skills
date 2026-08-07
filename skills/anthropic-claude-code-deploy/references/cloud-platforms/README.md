# cloud-platforms

Claude Code CLI を Bedrock / Vertex AI / Foundry / Claude Platform on AWS 経由で使う設定。Messages API を直接これらのプラットフォームで呼ぶ場合は anthropic-api-core の platforms を参照。

| Name | Description | Path |
|------|-------------|------|
| Claude Code on Amazon Bedrock | Amazon Bedrock 経由での Claude Code 実行設定。サインインウィザード、環境変数手動設定、IAM 権限 | [amazon-bedrock.md](./amazon-bedrock.md) |
| Claude Code on Claude Platform on AWS | Claude Platform on AWS 経由での Claude API 利用。AWS 認証、IAM アクセス制御、AWS Marketplace 課金 | [claude-platform-on-aws.md](./claude-platform-on-aws.md) |
| Claude Code on Google Cloud's Agent Platform | Google Cloud Agent Platform 経由での Claude Code 実行設定。サインインウィザード、リージョン設定、IAM | [google-vertex-ai.md](./google-vertex-ai.md) |
| Claude Code on Microsoft Foundry | Microsoft Foundry 経由での Claude Code 実行設定。Azure リソースプロビジョニング、認証オプション | [microsoft-foundry.md](./microsoft-foundry.md) |
