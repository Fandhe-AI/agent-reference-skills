---
source: https://docs.cloud.google.com/secure-source-manager/docs/overview
---

# Secure Source Manager overview

Secure Source Manager is a regionally deployed, single-tenant managed source code repository hosted on Google Cloud. Instances are deployed to a Google Cloud region and reached through their instance URIs; repositories are created inside an instance with the web interface or the Secure Source Manager API. Repositories support all Git SCM client commands and have built-in pull requests and issue tracking, over HTTPS and SSH.

## Signature / Usage

### Clone a repository (Git actions)

Snippet taken from https://docs.cloud.google.com/secure-source-manager/docs/use-git

```bash
git clone REPOSITORY_URL
```

### Ways to start builds automatically

- Create a Secure Source Manager triggers file to connect to Cloud Build (see [create-triggers-file.md](./create-triggers-file.md) and [triggers-file-schema.md](./triggers-file-schema.md)).
- Use Secure Source Manager webhooks to connect to Jenkins or other services.

## Options / Props

### Feature summary

| Area | What the page states |
|------|----------------------|
| Instances and repositories | Separate roles and permissions exist for instances and repositories. |
| Git actions | All Git SCM client commands; HTTPS and SSH authentication. |
| Issues and pull requests | Reviewers, labels, milestones, assignees and due dates on pull requests; issues can be opened on a specific branch or tag with labels, milestones and assignees. |
| Notifications | Events in pull requests and issues you participate in, or in repositories you watch. |
| Developer Connect integration | Git proxy gives access without exposing the instance to the public internet (Private Google Access). The proxy supports read operations such as `git clone` only; `git push` is not supported. |
| Branch protection | Multiple rules for different sets of branches (see [configure-branch-protection.md](./configure-branch-protection.md)). |
| Encryption | Google-managed keys by default; customer-managed encryption keys (CMEK) can be chosen when creating the instance. Disabling or destroying the CMEK key makes data encrypted with it inaccessible. |
| Compliance | FedRAMP High compliant; HIPAA compliant. |
| VPC Service Controls | A private instance can be used inside a VPC Service Controls perimeter to guard against data exfiltration. |

### Branch protection options listed in the overview

| Option |
|--------|
| Apply a rule to a single branch or to all branches |
| Require pull requests before merging into protected branches |
| Set the required number of reviewers and approvers |
| Block merging if new commits are added after approvals are granted |
| Require comments to be resolved before merging |
| Require a linear Git history |
| Require successful build status checks before merging |

## Notes

- Related pages of the official docs that this overview links to and that are not in this category: access control with IAM, SSH authentication, issues and pull requests, notifications, webhooks, Connect to Cloud Build, Connect to Jenkins, CMEK, and Configure Secure Source Manager in a VPC Service Controls perimeter.
- Developer Connect (connection setup and Git proxy) is covered by its own pages in `gcp-devops`; Cloud KMS keys and VPC Service Controls are in `gcp-security`.
- Source: https://docs.cloud.google.com/secure-source-manager/docs/overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/secure-source-manager/docs/use-git (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-instance.md](./create-instance.md)
- [create-repository.md](./create-repository.md)
- [use-git.md](./use-git.md)
- [grant-iam-roles.md](./grant-iam-roles.md)
- [csr-ssm-migration-guide.md](./csr-ssm-migration-guide.md)
