<!-- source: https://code.claude.com/docs/en/claude-apps-gateway-on-gcp.md / last verified: 2026-08-07 -->

# Deploy Claude apps gateway on Google Cloud

Worked example of Claude apps gateway on Google Cloud with Google Cloud's Agent Platform as the model upstream: Cloud Run or GKE, Cloud SQL for PostgreSQL, Secret Manager, and service-account auth.

## Signature / Usage

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

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Cloud Run / GKE | compute | Runs the gateway container; Cloud Run requires `linux/amd64` and `min-instances: 1` to avoid cold OIDC discovery |
| Cloud SQL for PostgreSQL | store | Private-IP-only via Private Services Access |
| Secret Manager | secrets | `gateway.yaml`, JWT secret, OIDC client secret, Postgres URL |
| Service account (`roles/aiplatform.user`) | auth | Attached directly on Cloud Run or via Workload Identity on GKE |
| `--no-invoker-iam-check` / `--allow-unauthenticated` | Cloud Run flag | Required: the gateway runs its own OIDC, so Cloud Run's invoker IAM check must admit unauthenticated requests |

## Notes

- The Cloud Run `*.run.app` URL resolves to a public address by default, which fails the `/login` private-network check; front with an internal Application Load Balancer or rely on Private Service Connect for a privately resolvable hostname.
- GKE Ingress backend timeout defaults to 30s and cuts off streaming; attach a BackendConfig with a raised `timeoutSec`.
- Google id_tokens carry no `groups` claim; configure `oidc.google_groups` (Admin SDK Directory API + domain-wide delegation) to use group-based `managed.policies`.
- A companion Terraform/`setup.sh` bundle at `examples/gateway/gcp` automates the Cloud Run path.

## Related

- [claude-apps-gateway-deploy.md](./claude-apps-gateway-deploy.md)
- [claude-apps-gateway-config.md](./claude-apps-gateway-config.md)
- [claude-apps-gateway-on-aws.md](./claude-apps-gateway-on-aws.md)
