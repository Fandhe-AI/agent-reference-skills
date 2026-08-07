<!-- source: https://code.claude.com/docs/en/self-hosted-environments-quickstart.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/self-hosted-environments-deploy.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/self-hosted-environments-testing.md / last verified: 2026-08-07 -->

# self-hosted-environments-setup

Install and register self-hosted runners for Claude Code cloud sessions, build the runner image, deploy it under Kubernetes/Docker Compose, and run the CI end-to-end test loop. Full concepts and CLI/env-var reference live in `references/self-hosted-environments/`.

## ホスト側の準備確認

```bash
claude self-hosted-runner --help
```

Requires Claude Code v2.1.224 or later; the `self-hosted-runner` subcommand doesn't exist on older versions, which print the general `claude --help` output instead.

## Guided setup（対話式）

```bash
claude self-hosted-runner setup
```

Run on a machine signed in with `claude auth login` using an Owner-or-admin account; walks through creating the environment, starting a local runner, and writes a cheat sheet to `./runner-setup/CHEAT-SHEET.md`. Not available with API keys or third-party model providers.

## Manual setup: runner の起動

> **警告**: `mkdir -p /etc/claude` と secret 書き込みコマンドは root 権限のパスを前提にしている。secret ファイルはターミナル入力でシェル履歴に残さないこと。

```bash
mkdir -p /etc/claude
```

```bash
# secret の値を貼り付け、Enter、Ctrl-D で確定（umask によりオーナーのみ読み取り可）
(umask 077 && cat > /etc/claude/environment-secret)
```

```bash
mkdir -p '<writable-dir>'
```

```bash
claude self-hosted-runner --environment-secret-file '/etc/claude/environment-secret' --base-dir '<writable-dir>'
```

Environment secret is issued once from claude.ai admin settings (**Cloud environments** page → **New** → **Copy environment key**) and cannot be retrieved again; it expires 365 days after creation.

## 稼働中セッションへのフォローアップ送信

```bash
claude -p "your message" --cloud <session-id>
```

`<session-id>` accepts the bare `session_...`/`cse_...` ID or the session's claude.ai/code URL.

## Runner イメージのビルド

```dockerfile
FROM debian:bookworm-slim
ARG CLAUDE_CODE_VERSION
RUN apt-get update && apt-get install -y --no-install-recommends git curl ca-certificates openssh-client \
 && rm -rf /var/lib/apt/lists/*
RUN curl -fsSL "https://downloads.claude.ai/claude-code-releases/${CLAUDE_CODE_VERSION:?set with --build-arg CLAUDE_CODE_VERSION}/linux-x64/claude" \
      -o /usr/local/bin/claude && chmod +x /usr/local/bin/claude
RUN git config --system user.name "Claude" \
 && git config --system user.email "noreply@anthropic.com" \
 && git config --system --add safe.directory '*'
ENTRYPOINT ["claude"]
```

Swap `linux-x64` for `linux-arm64`/`linux-x64-musl`/`linux-arm64-musl` to match the node architecture and libc.

```bash
docker build --build-arg CLAUDE_CODE_VERSION=2.1.224 -t <your-registry>/claude-runner:latest .
```

> **警告**: The recipe's `--capacity 4` lets one container serve multiple sessions from the same locked account, which is not the per-session isolation the official hardening guidance requires before connecting production systems. Use `--capacity 1` with one ephemeral container per session (default `--drain-grace-sec 0`) in production, or use on-demand runners.

## Kubernetes へのデプロイ

```bash
kubectl create namespace claude-runners
```

```bash
# secret ファイルは (umask 077 && cat > ./environment-secret) で作成してからロード
kubectl create secret generic claude-runner-environment-secret -n claude-runners --from-file=environment-secret=./environment-secret
```

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: claude-runner
  namespace: claude-runners
spec:
  replicas: 3
  selector:
    matchLabels:
      app: claude-runner
  template:
    metadata:
      labels:
        app: claude-runner
        app.kubernetes.io/part-of: claude-code-self-hosted-runner
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: runner
          image: <your-registry>/claude-runner:latest
          args:
            - self-hosted-runner
            - --environment-secret-file
            - /etc/claude/environment-secret
            - --capacity
            - "4"
          volumeMounts:
            - name: environment-secret
              mountPath: /etc/claude
              readOnly: true
          ports:
            - name: health
              containerPort: 8080
          readinessProbe:
            httpGet:
              path: /healthz
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /healthz
              port: 8080
            initialDelaySeconds: 30
            periodSeconds: 30
      volumes:
        - name: environment-secret
          secret:
            secretName: claude-runner-environment-secret
```

`terminationGracePeriodSeconds: 90` matches the runner's drain path (up to `--session-stop-grace-sec` + `--drain-wait-sec` + `--post-session-hook-timeout-sec` + 15s fixed overhead, +30s more with `--push-outcome-on-release`); Kubernetes' 30-second default is shorter and kills the pod mid-cleanup.

## Docker Compose へのデプロイ

```yaml
services:
  claude-runner:
    image: <your-registry>/claude-runner:latest
    command:
      - self-hosted-runner
      - --environment-secret-file
      - /run/secrets/environment-secret
      - --capacity
      - "4"
    secrets:
      - environment-secret
    restart: always
    stop_grace_period: 90s

secrets:
  environment-secret:
    file: ./environment-secret
```

A Docker restart policy reuses the same writable layer across restarts rather than a fresh filesystem; use this recipe for evaluation only, not production isolation.

## Troubleshooting: doctor

```bash
claude self-hosted-runner doctor
```

Interactive read-only diagnosis session; the only state change it can make is requeuing a stuck session. Sign in with `claude auth login` on the runner host first for full access to environment/runner/queue state (API-key auth limits it to the local health endpoint, metrics, and the runner's own log when started with `--log-file`).

## CI end-to-end テストループ

> **警告**: Both `claude -p ... --environment` and `claude -p ... --cloud` require a claude.ai OAuth token; API keys are not accepted. Run `claude auth login` on a dedicated automation account and re-authenticate every 30 days (refresh-token cap), or provision `CLAUDE_CODE_OAUTH_REFRESH_TOKEN` / `CLAUDE_CODE_OAUTH_SCOPES` for ephemeral runners.

```bash
# 1. セッション作成（git checkout から実行し、origin remote で repo を自動検出）
claude -p "<prompt>" --environment <environment-id> --ref <branch> --output-format json
```

```bash
# 2. 稼働中セッションへのフォローアップ
claude -p "<message>" --cloud <session_id> --output-format json
```

Requires v2.1.224+. Reply read-back is via a Stop hook (`~/.claude/hooks/e2e-stop-hook-capture.sh` on the runner host) writing to `$E2E_REPLY_DIR/<session_id>.txt` — see `references/self-hosted-environments/self-hosted-environments-testing.md` for the full hook script and polling loop.

## CI 用テスト専用環境の作成・削除

> **警告**: `pool_secret` in the create response is a long-lived credential that can register runners into the environment; store it only as a masked CI secret, never echo it.

```bash
# ADMIN_TOKEN は Owner/admin ロールの claude.ai OAuth access token（stdin 経由で渡し引数・ログに残さない）
create=$(curl -fsS -X POST -H @- \
  -H "anthropic-beta: ccr-byoc-2025-07-29" -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"name":"ci-test-environment"}' \
  https://api.anthropic.com/v1/code/runners/self-hosted/pools \
  <<<"Authorization: Bearer $ADMIN_TOKEN")
ENVIRONMENT_ID=$(jq -er .pool.pool_id <<<"$create")
ENVIRONMENT_SECRET=$(jq -er .pool_secret <<<"$create")
```

`-H @-` for reading the header from stdin requires curl 7.55+.

```bash
curl -fsS -X DELETE -H @- \
  -H "anthropic-beta: ccr-byoc-2025-07-29" -H "anthropic-version: 2023-06-01" \
  "https://api.anthropic.com/v1/code/runners/self-hosted/pools/$ENVIRONMENT_ID" \
  <<<"Authorization: Bearer $ADMIN_TOKEN"
```

## Notes

- Self-hosted environments are public beta on Team/Enterprise plans, off by default; an Owner/admin must turn on **Allow self-hosted environments** on the **Cloud environments** admin page first.
- Full concepts, CLI flags/env vars, git-credential options (`--configure-git` / `--use-anthropic-git-proxy` / URL rewrite flags), network requirements, and session-identity JWT verification: `references/self-hosted-environments/`.
- Calling the Messages API directly, or CI/CD around GitHub Actions/GitLab pipelines that don't involve self-hosted runners, is covered by `cloud-env-setup.md` and `cicd-setup.md` in this same directory.
