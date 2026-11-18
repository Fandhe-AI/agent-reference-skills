---
source: https://docs.cloud.google.com/secret-manager/docs/best-practices
---

# Secret Manager best practices

Non-exhaustive recommendations for access control, coding practices, administration and data residency when using Secret Manager.

## Signature / Usage

### Pin to a version number and disable before destroying

```bash
gcloud secrets versions access 123 --secret=my-secret
```

```bash
gcloud secrets versions disable 123 --secret=my-secret
```

### Access control

- Access to the Secret Manager API is protected by IAM; follow least privilege.
- Limit organization ownership to a secured super admin account.
- Segment applications and environments (staging, production) into separate projects; this isolates environments with project-level IAM bindings and enforces quotas independently.
- Choose a curated role with minimal permissions, or a custom role.
- When secrets for many services share a project, use secret-level IAM bindings or IAM Conditions. IAM Recommender can identify over-privileged bindings.
- Authenticate through Application Default Credentials: `gcloud auth application-default login` locally; the instance metadata server on Compute Engine and Cloud Run functions; workload identity on GKE; workload identity federation on AWS / Azure. All are preferred to exporting a service account credential.

### Coding practices

- Avoid passing secrets to your application through the file system or environment variables (directory traversal raises severity when secrets are on disk; debug endpoints or dependencies that log process environment can leak environment variables; when syncing to another datastore such as Kubernetes Secrets, check whether it expands access, supports auditing, and meets encryption and regionalization requirements).
- Use the Secret Manager API directly through a client library, REST or gRPC. Serverless integrations may use the file system or environment variables (see [using-other-products.md](./using-other-products.md)).

### Administration

- Choose the automatic replication policy unless the workload has specific location requirements (enforceable with the `constraints/gcp.resourceLocations` constraint).
- Reference secrets by version number rather than the `latest` alias, and deploy updates to version numbers through existing release processes, so a bad new version can be validated and rolled back.
- Disable secret versions before destroying them or deleting secrets; wait (for example a week) to be sure no dependencies remain before permanently deleting data.
- Don't set expiration on production secrets unless they should be irreversibly deleted; expiration suits automated cleanup of temporary environments. Consider time-based IAM conditions instead.
- Rotate secrets periodically (limits leak impact, cuts off people who no longer need access, reduces outage likelihood).
- Monitor secrets with Cloud Asset Inventory (find secrets, detect non-conformance in rotation, encryption, location).
- Enable data access logs to analyze `AccessSecretVersion` requests; enable at folder or organization level to enforce logging without per-secret or per-project configuration.
- Add network controls with a VPC Service Controls perimeter; limit identities in secret IAM policies with `constraints/iam.allowedPolicyMemberDomains`.
- Estimate peak usage (a thundering herd from concurrent deploys or autoscaling) and make sure the project has enough quota; request an increase if needed.

### Data residency compliance

- Choose regional secrets for strict data residency and sovereignty requirements; they keep sensitive data within a location with at-rest, in-use and in-transit guarantees.

## Notes

- Destroying a secret version or deleting a secret is irreversible; disabling is reversible. Try destructive operations on a disposable secret first.
- `gcloud secrets versions access` prints the secret value; do not run it in shared terminals or CI logs.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/secrets/versions/access (gcloud 593.0.0 help).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/secrets/versions/disable (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/secret-manager/docs/best-practices (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [rotation-recommendations.md](./rotation-recommendations.md)
- [choosing-replication.md](./choosing-replication.md)
- [overview.md](./overview.md)
