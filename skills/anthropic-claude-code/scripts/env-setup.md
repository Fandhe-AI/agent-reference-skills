<!-- source: https://code.claude.com/docs/en/env-vars.md / last verified: 2026-10-17 -->
<!-- source: https://code.claude.com/docs/en/model-config.md / last verified: 2026-10-17 -->
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
export ANTHROPIC_DEFAULT_OPUS_MODEL="claude-opus-5-5"
```

Aliases point to the recommended version for the provider and update over time. To pin a specific version, use the full model name (for example `claude-opus-5-5`) or set the matching `ANTHROPIC_DEFAULT_*_MODEL` variable. Each value must be a full model name, or the equivalent identifier for the API provider.

## 開始モデルの既定値（新規セッション）

```bash
export ANTHROPIC_DEFAULT_MODEL="claude-opus-5-5"
```

Requires Claude Code v2.1.236 or later. Used only when none of `--model`, `ANTHROPIC_MODEL`, a `model` value in any settings file (including the choice saved with `/model`), or an organization default model selects a model. Ignored when set to `default`, `inherit`, `opusplan`, or `haiku`.

## サードパーティ提供先でのモデル固定

```bash
# Amazon Bedrock
export ANTHROPIC_DEFAULT_OPUS_MODEL='us.anthropic.claude-opus-4-8'
# Google Cloud's Agent Platform
export ANTHROPIC_DEFAULT_OPUS_MODEL='claude-opus-4-8'
# Microsoft Foundry
export ANTHROPIC_DEFAULT_OPUS_MODEL='claude-opus-4-8'
```

Pin model versions before rolling out to users. The same pattern applies to `ANTHROPIC_DEFAULT_FABLE_MODEL`, `ANTHROPIC_DEFAULT_SONNET_MODEL`, and `ANTHROPIC_DEFAULT_HAIKU_MODEL`. Current and legacy model IDs per provider: Models overview on platform.claude.com.

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

## settings の env で shell 由来の変数を空文字にして unset 扱いにする

```json ~/.claude/settings.json
{
  "env": {
    "CLAUDE_CODE_USE_VERTEX": ""
  }
}
```

A settings file can set a variable but cannot remove one. For a variable you cannot unset (such as a stale `CLAUDE_CODE_USE_VERTEX` exported by a shell profile), the empty string makes Claude Code treat it as unset for provider selection. Subprocesses still inherit the empty value.

## Notes

- When a variable is set in both a settings file `env` block and a shell export, the settings file value applies in most sessions: Claude Code writes each `env` entry into the process environment, replacing the value inherited from the shell. Some sessions keep the inherited value instead, and a few variables are special-cased; see the `env` setting in the settings reference.
- Between settings files, `env` values follow settings precedence, so a managed settings entry overrides the same variable in user or project settings. Project and local settings cannot set some variables, such as `CLAUDE_CONFIG_DIR` and the OpenTelemetry exporter variables.
- Shell environment variables are read at startup; `env` entries in settings files are reapplied to a running session when the file changes.
- The full variable list and precedence rules are covered by `references/settings/env-vars.md`.
