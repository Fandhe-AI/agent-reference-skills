---
source: https://docs.cloud.google.com/secret-manager/docs/using-other-products
---

# Use Secret Manager with other products

Pointers for using Secret Manager from other Google Cloud services. Each integration is documented on the other product's page.

## Signature / Usage

Granting a principal access to one secret before following the product-specific page:

```bash
gcloud secrets add-iam-policy-binding my-secret \
    --member='user:test-user@gmail.com' \
    --role='roles/secretmanager.secretAccessor'
```

## Options / Props

| Product | How Secret Manager is used | Documentation |
|---|---|---|
| Cloud Build | Secrets as environment variables in build steps. | https://docs.cloud.google.com/build/docs/securing-builds/use-encrypted-secrets-credentials |
| Cloud Code | Create, view, update and use secrets in VS Code, IntelliJ or Cloud Shell. | https://docs.cloud.google.com/code/docs/vscode/secret-manager, https://docs.cloud.google.com/code/docs/intellij/secret-manager, https://docs.cloud.google.com/code/docs/shell/secret-manager |
| Cloud Run functions | Expose secrets as environment variables or via the file system; or use a client library or the API directly. | https://docs.cloud.google.com/functions/docs/configuring/secrets |
| Cloud Run | Expose secrets as environment variables or via the file system; or use a client library or the API directly. | https://docs.cloud.google.com/run/docs/configuring/secrets |
| Compute Engine | Client library or direct API access. Instance needs the `cloud-platform` OAuth scope. | https://docs.cloud.google.com/secret-manager/docs/accessing-the-api |
| Google Kubernetes Engine | Client libraries with Workload Identity Federation for GKE (recommended), or the Secret Manager add-on that mounts secrets as volumes in Pods. Node needs the `cloud-platform` OAuth scope. | https://docs.cloud.google.com/kubernetes-engine/docs/tutorials/workload-identity-secrets, https://docs.cloud.google.com/secret-manager/docs/secret-manager-managed-csi-component |
| Config Connector | Declarative creation and management of secrets. | https://docs.cloud.google.com/config-connector/docs/reference/resource-docs/secretmanager/secretmanagersecret |
| Key Access Justifications | With Cloud EKM keys encrypting secrets, adds a justification field to each EKM request so you can approve or deny key access. | https://docs.cloud.google.com/assured-workloads/key-access-justifications/docs/overview |
| Managed Service for Apache Airflow | Secret Manager as an Airflow secrets backend for variables and connections; tasks fetch secrets at runtime. | https://docs.cloud.google.com/composer/docs/composer-2/configure-secret-manager |

## Notes

- To use Secret Manager with workloads on Compute Engine or GKE, the underlying instance or node must have the `cloud-platform` OAuth scope.
- Passing secrets through environment variables or the file system (Cloud Run, Cloud Run functions) is a trade-off; see [best-practices.md](./best-practices.md) for the risks.
- Cloud Run and Cloud Run functions service-side configuration is in the `gcp-run` skill; GKE in the `gcp-gke` skill. Key Access Justifications is in the `gcp-security-compliance` skill.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/secrets/add-iam-policy-binding (gcloud 593.0.0 help). The binding is on the secret, not the project (least privilege, see [best-practices.md](./best-practices.md)).
- Source: https://docs.cloud.google.com/secret-manager/docs/using-other-products (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [best-practices.md](./best-practices.md)
- [overview.md](./overview.md)
