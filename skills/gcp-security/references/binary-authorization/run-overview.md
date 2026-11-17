---
source: https://docs.cloud.google.com/binary-authorization/docs/run/overview
---

# Set up overview for Cloud Run

You can set a Binary Authorization policy on Cloud Run services and jobs. Cloud Run checks the policy when you deploy a new service revision and each time you execute a job.

## Signature / Usage

### Policy workflow for Cloud Run

Export the current policy to a YAML file:

```bash
gcloud container binauthz policy export > /tmp/policy.yaml
```

After editing the file, import it:

```bash
gcloud container binauthz policy import /tmp/policy.yaml
```

### Setup steps

1. Enable Binary Authorization.
2. Recommended: require Binary Authorization for Cloud Run using an organization policy.
3. Enable Binary Authorization for Cloud Run.
4. Configure the Binary Authorization policy (skip if you want to use attestations): default rule and exempt images.
5. Optional: use the `built-by-cloud-build` attestor to deploy only images built by Cloud Build (Preview).
6. Optional: use attestations.
7. View Binary Authorization for Cloud Run events in Cloud Audit Logs.

## Options / Props

| Resource | When the policy is checked | Non-compliant container | Breakglass |
|---|---|---|---|
| Cloud Run service | Each time you deploy a new revision | The deployment fails | Bypasses the policy so a revision with a non-compliant container can deploy |
| Cloud Run job | Each time you execute the job | You can still update the job; executing the job fails | Bypasses the policy for the execution |

## Notes

- Policy changes do not retroactively apply to existing revisions (services) or to already-running executions (jobs).
- To deploy functions in Cloud Run, the policy administrator must exempt all images from the `REGION-docker.pkg.dev/PROJECT_ID/cloud-run-source-deploy/**` repository and its subdirectories.
- Before you use Binary Authorization for Cloud Run, set up your Cloud Run environment.
- Breakglass bypasses policy enforcement; see "Use breakglass" (https://docs.cloud.google.com/binary-authorization/docs/run/using-breakglass-cloud-run).
- Cloud Run does not support specific (cluster, namespace, service account) rules; only the default rule and exempt images apply (see key-concepts).
- Console steps are omitted; see the source page. Cloud Run service flags are in the `gcp-run` skill.
- Snippet taken from https://docs.cloud.google.com/binary-authorization/docs/configuring-policy-cli
- Source: https://docs.cloud.google.com/binary-authorization/docs/run/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [configuring-policy-cli.md](./configuring-policy-cli.md)
- [key-concepts.md](./key-concepts.md)
- [attestations.md](./attestations.md)
- [overview.md](./overview.md)
