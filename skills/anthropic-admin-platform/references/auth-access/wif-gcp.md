<!-- source: https://platform.claude.com/docs/en/manage-claude/wif-providers/gcp / last verified: 2026-08-07 -->

# Use WIF with Google Cloud

Federate Google Cloud workloads (Cloud Run, Cloud Functions, App Engine, GCE, GKE) to the Claude API using Google-signed identity tokens instead of static API keys.

## Signature / Usage

```bash
# Fetch the Google-signed identity token from the metadata server
JWT=$(curl -sS -H "Metadata-Flavor: Google" \
  "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=https://api.anthropic.com&format=full")

RESPONSE=$(curl -sS https://api.anthropic.com/v1/oauth/token \
  -H "content-type: application/json" \
  -d "{\"grant_type\": \"urn:ietf:params:oauth:grant-type:jwt-bearer\", \"assertion\": \"$JWT\", \"federation_rule_id\": \"$ANTHROPIC_FEDERATION_RULE_ID\", \"organization_id\": \"$ANTHROPIC_ORGANIZATION_ID\", \"service_account_id\": \"$ANTHROPIC_SERVICE_ACCOUNT_ID\", \"workspace_id\": \"$ANTHROPIC_WORKSPACE_ID\"}")
```

## Options / Props

| Field | Source |
|-------|--------|
| `iss` | Always `https://accounts.google.com` (single issuer covers Cloud Run, GCE, Cloud Functions, App Engine, GKE with Workload Identity) |
| `sub` | Google service account's opaque numeric unique ID (never reused) |
| `email` | Human-readable service account address; requires `format=full` in the token request |

## Notes

- Claude API WIF for Google Cloud; distinct from OpenAI's `wif-google-cloud.md` under `openai-platform-ops`.
- Attach a dedicated (non-default) service account to the workload; the metadata server (`http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=...&format=full`) returns the token, or use `gcloud auth print-identity-token --audiences=... --include-email`.
- GKE with Workload Identity: bind the Kubernetes service account to a Google service account via the `iam.gke.io/gcp-service-account` annotation; the resulting token is identical in shape to the GCE case. `format=full` tokens from GKE also carry `google.compute_engine.project_id/zone/instance_name`, usable in a CEL `condition`.
- Match on both `sub` (stable, never reused) and `email` (readable) in the federation rule; find the unique ID with `gcloud iam service-accounts describe SA_EMAIL --format='value(uniqueId)'`.
- Google identity tokens expire after roughly one hour; SDKs re-invoke the token provider and re-exchange automatically.
- Scoping warning: the `sub` claim has no stable prefix — never use `subject_prefix` with a trailing `*` for Google tokens; match `sub` exactly via `claims`.

## Related

- [workload-identity-federation.md](./workload-identity-federation.md)
- [wif-kubernetes.md](./wif-kubernetes.md)
