---
source: https://docs.cloud.google.com/deployment-manager/docs/deprecations
---

# Deployment Manager End of Support

Support for Deployment Manager was discontinued on April 1, 2026, and the service will be turned down after June 30, 2027. Resources created by Deployment Manager continue to function; migrate deployments to Infrastructure Manager (Infra Manager) or another tool.

## Signature / Usage

Migration path from the source: convert with DM Convert, import into Infra Manager, then delete the Deployment Manager deployment with abandon.

```bash
gcloud deployment-manager deployments delete DEPLOYMENT_NAME --delete-policy ABANDON
```

## Options / Props

### Key dates (as written in the source)

| Date | Event |
|------|-------|
| April 1, 2026 | Support for Deployment Manager discontinued; "As of April 1, 2026, Deployment Manager is not supported on Google Cloud." |
| June 30, 2026 | New users are blocked from enabling the Deployment Manager V2 API or creating their first deployment; attempts are redirected to Infra Manager |
| Before March 31, 2026 | Required actions: review use cases, decide whether Infra Manager fits, migrate deployments |
| March 31, 2027 | "The maximum extension for support ends"; support tickets are rejected unless they are blockers or migration issues |
| June 30, 2027 | Service turned down; all related APIs and functions no longer supported |

### Deployment Manager vs Infra Manager

| Feature | Deployment Manager | Infra Manager | Considerations |
|---------|--------------------|---------------|----------------|
| Configuration language | YAML with Jinja/Python templates | Terraform HCL | Learn HCL and convert existing configurations |
| Template management | Reusable templates and composite types (deprecated) | Terraform modules | Adapt to Terraform's module system |
| Source code management | Various options | Public and private Git repositories and Cloud Storage buckets, but "lacks direct support for private Git repositories" | Private-Git users may face challenges migrating |
| State management | Managed internally | State files stored in Cloud Storage | Infra Manager handles state automatically |
| Update mechanism | In-place and rolling updates | `CreateDeployment` and `UpdateDeployment` methods | Terraform update mechanisms may differ |
| Rollback | Rollback to previous deployments | Roll forward by deploying previous Terraform configurations | Rolling back is manual; state file is available per revision |
| Preview | Preview changes | `CreatePreview` creates and reviews a Terraform plan | Same as `terraform plan` |
| Service integration | Various Google Cloud services | Through Terraform providers | Broader coverage, but some Google Cloud-specific features may be missing |
| Access control | IAM | IAM | The service account that creates a deployment needs permissions for every resource to deploy |

## Notes

- Deprecated: the Deployment Manager documentation says "Support for Google Cloud Deployment Manager was discontinued on April 1, 2026." and "After June 30, 2027, you won't be able to use the Deployment Manager service, and it will be turned down."; use Infrastructure Manager (https://docs.cloud.google.com/deployment-manager/docs/deprecations, retrieved 2026-11-19).
- This page says April 1, 2026 for the discontinuation while the required-actions list says "before March 31, 2026"; both are kept as written.
- Existing resources created by Deployment Manager continue to function and can be managed with standard Google Cloud tools, but not with Deployment Manager or `gcloud deployment-manager`. Until June 30, 2027 you can use the service to manage, migrate or delete existing resources "at your own risk"; there are no new features or non-critical bug fixes.
- The source-code-management row says Infra Manager supports private Git repositories and also that it "lacks direct support for private Git repositories"; it is kept as written. The Infrastructure Manager deployment pages of this skill (deploy-resources.md and update-deployment.md in the `infrastructure-manager-deployments` category) describe private Git repositories connected through Cloud Build or Developer Connect.
- App Engine Flex customers who do not use Deployment Manager are not affected.
- Migration steps from the source: (1) convert configurations and templates into a Terraform configuration and state file, (2) import the Terraform resources into Infra Manager, (3) delete the Deployment Manager deployment using abandon.
- Destructive operation: `--delete-policy` accepts `abandon` or `delete` (default `delete`) in gcloud 593.0.0 help; `abandon` only removes the resource reference from the deployment. Try it on a disposable project first. gcloud 593.0.0 also accepts the upper-case `ABANDON` used in the command above.
- Snippet taken from https://docs.cloud.google.com/deployment-manager/docs/dm-convert/convert (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/deployment-manager/docs/deprecations (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [dm-convert.md](./dm-convert.md)
- [convert.md](./convert.md)
- [fundamentals.md](./fundamentals.md)
