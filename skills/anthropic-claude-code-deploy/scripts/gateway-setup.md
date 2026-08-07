<!-- source: https://code.claude.com/docs/en/claude-apps-gateway.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/claude-apps-gateway-config.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/claude-apps-gateway-deploy.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/claude-apps-gateway-on-aws.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/claude-apps-gateway-on-gcp.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/claude-apps-gateway-spend-limits.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/llm-gateway-connect.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/llm-gateway-rollout.md / last verified: 2026-08-07 -->

# gateway-setup

Start, health-check, and deploy Claude apps gateway (Anthropic's self-hosted gateway, bundled in the `claude` binary), configure spend limits, and connect to a third-party LLM gateway. Full `gateway.yaml` reference lives in `references/apps-gateway/claude-apps-gateway-config.md`.

## Claude apps gateway の起動

> **警告**: Deploy on a private-network-only address. A trusted gateway can push settings that run commands on developer machines, so exposing it publicly enables arbitrary code execution. `/login` rejects any hostname that resolves to a public IP.

```bash
claude gateway --config gateway.yaml
```

## Claude apps gateway: ヘルスチェック

```bash
curl https://claude-gateway.internal.example.com/healthz   # liveness
curl https://claude-gateway.internal.example.com/readyz    # readiness (verifies store reachable)
```

## Claude apps gateway: 認証エンドポイントの確認

```bash
curl -s https://claude-gateway.internal.example.com/.well-known/oauth-authorization-server | jq
curl -s -X POST https://claude-gateway.internal.example.com/oauth/device_authorization | jq
```

## Claude apps gateway: AWS 上のデプロイ準備 (ECS/EKS + Amazon Bedrock)

```bash
export AWS_REGION=us-east-1
export ACCOUNT_ID="$(aws sts get-caller-identity --query Account --output text)"
export VPC_ID=<your-vpc-id>
export PRIVATE_SUBNETS="<subnet-id-a> <subnet-id-b>"
```

A companion Terraform/`setup.sh` bundle at `examples/gateway/aws` in the `anthropics/claude-code` repository automates this walkthrough (ECS Fargate or EKS, Amazon RDS for PostgreSQL, AWS Secrets Manager, IAM/IRSA auth).

## Claude apps gateway: GCP 上のデプロイ準備 (Cloud Run/GKE + Google Cloud's Agent Platform)

```bash
export PROJECT_ID=<your-project>
export REGION=us-east5
gcloud config set project "$PROJECT_ID"

gcloud services enable aiplatform.googleapis.com artifactregistry.googleapis.com \
  sqladmin.googleapis.com secretmanager.googleapis.com run.googleapis.com container.googleapis.com

gcloud iam service-accounts create claude-gateway --display-name="Claude apps gateway"
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:claude-gateway@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/aiplatform.user" --condition=None
```

A companion Terraform/`setup.sh` bundle at `examples/gateway/gcp` automates the Cloud Run path (Cloud SQL for PostgreSQL, Secret Manager, service-account auth).

## Claude apps gateway: spend limit の設定

> **警告**: `scope.type: "organization"` overwrites the org-wide default cap live, for every developer. `amount: "0"` blocks every request.

```bash
# Org-wide default: $500/month per developer
curl -sS https://claude-gateway.internal.example.com/v1/organizations/spend_limits \
  -H "x-api-key: $GATEWAY_ADMIN_WRITE_KEY" -H "Content-Type: application/json" \
  -d '{"scope": {"type": "organization"}, "amount": "50000", "period": "monthly"}'

# Tighter cap on a group: $100/day for "contractors"
curl -sS https://claude-gateway.internal.example.com/v1/organizations/spend_limits \
  -H "x-api-key: $GATEWAY_ADMIN_WRITE_KEY" -H "Content-Type: application/json" \
  -d '{"scope": {"type": "rbac_group", "rbac_group_id": "contractors"}, "amount": "10000", "period": "daily"}'
```

## サードパーティ LLM gateway への接続

```bash
export ANTHROPIC_BASE_URL=https://llm-gateway.example.com
export ANTHROPIC_AUTH_TOKEN=sk-gateway-key
```

## LLM gateway: 疎通確認

```bash
curl -X POST "https://llm-gateway.example.com/v1/messages" \
  -H "Authorization: Bearer <gateway-key>" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model": "claude-sonnet-4-6", "max_tokens": 1, "messages": [{"role": "user", "content": "."}]}'
```

## 設定の確認

```text
/status
```

Confirms the `Anthropic base URL` and `Auth token`/`API key` lines are active for a gateway connection.

## Notes

- Required `gateway.yaml` sections (`listen` / `oidc` / `session` / `store` / `upstreams`) and optional blocks are covered by `references/apps-gateway/claude-apps-gateway-config.md`.
- JWT secret rotation has no dedicated command, only a procedure: prepend the new secret to the array, roll, wait `ttl_hours` plus margin, then drop the old secret. There is no per-session revocation otherwise.
- The official docs describe no Dockerfile or Helm chart ("no admin UI or Helm chart"). The container command is `claude gateway --config /etc/claude/gateway.yaml`; the image requirement is a glibc-based `claude` binary with a writable `CLAUDE_CONFIG_DIR`.
- Claude apps gateway sign-in is the browser device flow only, with no service-token flow, so unattended CI pipelines cannot authenticate through it directly (connect CI to the provider or a third-party gateway instead).
