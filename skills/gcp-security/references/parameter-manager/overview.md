---
source: https://docs.cloud.google.com/secret-manager/parameter-manager/docs/overview
---

# Parameter Manager overview

Parameter Manager is an extension to the Secret Manager service and provides centralized storage for the configuration parameters of your workload deployments. Parameters are variables, often key-value pairs, that customize how an application functions (configuration settings, environment-specific settings, and secrets).

## Signature / Usage

### Resource model

- Parameter: a parent object holding the parameter's metadata (name, data type such as YAML, JSON, or unstructured, and labels) and all of its parameter versions.
- Parameter version: stores the actual value; structured data (YAML or JSON) or unstructured data (plain text).

### Create a parameter

```bash
gcloud parametermanager parameters create PARAMETER_ID --location=global --parameter-format=FORMAT
```

### Key features

- Data encryption: parameters are encrypted with AES-256.
- Versioning: each parameter can have multiple versions, to track changes and roll back.
- Flexible format support: YAML, JSON, plain text, or custom formats.
- Reference Secret Manager secrets from a parameter, to keep Secret Manager rotation and auditing.
- Regional parameters via regional endpoints (see the list of supported locations on the Secret Manager locations page).

## Options / Props

### Secret Manager vs Parameter Manager

| Feature | Secret Manager | Parameter Manager |
|---|---|---|
| Primary purpose | Sensitive data such as API keys, passwords, OAuth tokens, TLS/SSL certificates; injects credentials into CI/CD pipelines and workloads such as Cloud Run and GKE | Workload configuration data: environment-specific settings, feature flags, other configuration; for applications that fetch configuration at runtime without restarts or redeployments |
| Data types | Binary blobs or text strings; individual credentials | JSON, YAML, and unformatted plaintext |
| Data size limit | Each secret version up to 64 KiB | Each parameter version up to 1 MiB |
| Versioning | Auto-incrementing numbers; aliases (for example `previous`) can pin versions | Users provide names for versions |
| Lifecycle management | Supports automatic rotation | Doesn't support rotation |

## Notes

- Use Secret Manager to securely store and audit sensitive data that needs strict access control and rotation; use Parameter Manager to manage and deliver diverse configuration data (sensitive and non-sensitive) at scale.
- Google Cloud Parameter Manager (Secret Manager extension) is unrelated to Cloudflare Workers secrets (`cloudflare-workers`) and Vercel environment variables (`vercel`).
- Snippet taken from https://docs.cloud.google.com/secret-manager/parameter-manager/docs/create-parameter (the overview page has no code).
- Source: https://docs.cloud.google.com/secret-manager/parameter-manager/docs/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [prepare-environment.md](./prepare-environment.md)
- [create-parameter.md](./create-parameter.md)
- [parameter-templates-overview.md](./parameter-templates-overview.md)
