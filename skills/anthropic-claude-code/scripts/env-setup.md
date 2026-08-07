<!-- source: https://code.claude.com/docs/en/env-vars.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/settings.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/troubleshoot-install.md / last verified: 2026-08-07 -->

# env-setup

Representative environment-variable setups for authentication, model routing, and network/proxy configuration. Full variable list is covered by `references/settings/env-vars.md`; this file only holds runnable setup examples.

## シェルでの一時設定（そのターミナルセッションのみ）

```bash
export API_TIMEOUT_MS="1200000"
claude
```

## 設定ファイルでの永続設定（`claude` 実行のたびに適用）

```json ~/.claude/settings.json
{
  "env": {
    "API_TIMEOUT_MS": "1200000",
    "BASH_DEFAULT_TIMEOUT_MS": "300000"
  }
}
```

## API キー認証

```bash
export ANTHROPIC_API_KEY="sk-ant-..."
```

To use a Pro/Max/Team/Enterprise subscription instead, unset the API key:

```bash
unset ANTHROPIC_API_KEY
```

If you see `This organization has been disabled` despite an active subscription, a stale `ANTHROPIC_API_KEY` is likely overriding subscription OAuth — the same `unset` resolves it.

## カスタム Authorization ヘッダー

```bash
export ANTHROPIC_AUTH_TOKEN="<token>"
```

Sent as `Authorization: Bearer <token>`.

## API エンドポイントのオーバーライド（プロキシ・ゲートウェイ）

```bash
export ANTHROPIC_BASE_URL="https://your-proxy.example.com"
```

Setting a host other than `api.anthropic.com` disables Remote Control.

## モデルの指定

```bash
export ANTHROPIC_MODEL="claude-sonnet-5"
export ANTHROPIC_DEFAULT_OPUS_MODEL="claude-opus-4-6"
export ANTHROPIC_DEFAULT_SONNET_MODEL="claude-sonnet-5"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="claude-haiku-4-5"
```

## HTTP / HTTPS プロキシ

```bash
export HTTP_PROXY="http://proxy.example.com:8080"
export HTTPS_PROXY="http://proxy.example.com:8080"
export NO_PROXY="localhost,127.0.0.1"
```

## Amazon Bedrock 経由の利用

```bash
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_BEARER_TOKEN_BEDROCK="<token>"
```

## Google Cloud（Agent Platform / Vertex）経由の利用

```bash
export CLAUDE_CODE_USE_VERTEX=1
export ANTHROPIC_VERTEX_PROJECT_ID="<project-id>"
```

## Microsoft Foundry 経由の利用

```bash
export CLAUDE_CODE_USE_FOUNDRY=1
export ANTHROPIC_FOUNDRY_API_KEY="<key>"
export ANTHROPIC_FOUNDRY_RESOURCE="<resource-name>"
```

## テレメトリ・自動更新の無効化（オフライン／制限環境向け）

```bash
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
export DISABLE_AUTOUPDATER=1
export DISABLE_TELEMETRY=1
```

## OpenTelemetry の有効化

```bash
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER="otlp"
export OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf"
```

## TLS 証明書の追加（社内プロキシの TLS インスペクション対策）

```bash
export NODE_EXTRA_CA_CERTS="/path/to/corp-ca.pem"
```

Use this when hitting `unable to get local issuer certificate`.

## Notes

- When a variable is set in both a settings file `env` block and a shell export, the settings file value takes precedence.
- The full variable list and precedence rules are covered by `references/settings/env-vars.md`.
