---
source: https://docs.cloud.google.com/docs/terraform/best-practices/version-control
---

# Terraform on Google Cloud: Version Control Best Practices

Version control practices for Terraform on Google Cloud: a default branching strategy, environment branches for root configurations, repository layout along team boundaries, and never committing secrets.

## Signature / Usage

### Create a branch for a fix

```bash
git checkout -b bug-fix
```

## Options / Props

| Topic | Recommendation |
|-------|----------------|
| `main` branch | Primary development branch, the latest approved code; protected |
| Feature branches | Named `feature/$feature_name` |
| Bug-fix branches | Named `fix/$bugfix_name` |
| Merging | Merge back to `main` with a pull request; rebase branches before merging to prevent conflicts |
| Root configurations deployed to Google Cloud | A separate branch for each environment; promote by merging changes between the branches |
| Visibility | Make Terraform code and repositories broadly visible (SREs and stakeholders such as developers); encourage merge requests as part of change requests |
| Secrets | Never commit secrets, including in Terraform configuration; upload them to Secret Manager and reference them by using data sources |

### Repository organization

| Model | Description |
|-------|-------------|
| One central repository | A single platform team manages all Terraform code; best with a dedicated infrastructure team that approves all changes |
| Team repositories | Each team owns its Terraform repository (for example security controls, application teams); the best structure for most enterprise scenarios |
| Decoupled repositories | Each logical component (for example networking, project factory) has its own repository; best in highly decentralized environments |

### Sample repository types

| Repository | Content |
|------------|---------|
| Foundational | Major central components such as folders or org IAM; managed by the central cloud team; a directory per major component (folders, networks), each with a folder per environment |
| Application and team-specific | Deployed separately per team for application-specific Terraform configuration |

## Notes

- The version control page has no code. Snippet taken from https://docs.cloud.google.com/secure-source-manager/docs/configure-cicd-terraform-config-as-code
- The borrowed branch name `bug-fix` does not follow this page's `fix/$bugfix_name` convention for bug-fix branches; name the branch `fix/<bugfix_name>` when following it.
- Sensitive values referenced from Secret Manager might still end up in the state file and might also be exposed as outputs. Secret Manager is in `gcp-security`.
- Principle: configurations with different approval and management requirements go in different source control repositories.
- The source also shows diagrams (separate branch per environment, foundational repository, application and team-specific repository) that are omitted here.
- Source: https://docs.cloud.google.com/docs/terraform/best-practices/version-control (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [operations.md](./operations.md)
- [security.md](./security.md)
- [configure-cicd-terraform-config-as-code.md](./configure-cicd-terraform-config-as-code.md)
