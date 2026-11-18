---
source: https://docs.cloud.google.com/secure-source-manager/docs/configure-branch-protection
---

# Configure branch protection in Secure Source Manager

Branch protection lets repository administrators control who can change branches, who must approve or review changes, and which conditions must be met before an approved change can be merged. Rules are created, modified and deleted on the repository **Settings** page of the web interface (Branch rule tab). Requiring status checks depends on triggers defined in the repository's triggers file.

## Signature / Usage

### Reference a trigger for a required status check

Triggers must exist in the triggers file before they can be selected as status checks. Snippet taken from https://docs.cloud.google.com/secure-source-manager/docs/triggers-file-schema

```yaml
triggers:
- name: presubmit-test
  project: my-project
  configFilePath: test.yaml
  eventType: pull_request
  includedGitRefs: ^main$
  ignoredGitRefs: .*log
  serviceAccount: projects/my-project/serviceAccounts/my-service-account@my-project.iam.gserviceaccount.com
  includedFiles: .*
  ignoredFiles: my-file.txt
  disabled: false
- name: postsubmit-run
  project: my-project
  configFilePath: run.yaml
  eventType: push
  includedGitRefs: ^main$
  ignoredGitRefs: dev-branch
  serviceAccount: projects/my-project/serviceAccounts/my-service-account@my-project.iam.gserviceaccount.com
  disabled: false
  substitutions:
    _NODE_VERSION_1: v6.9.1
    REPO_NAME: dev
```

### Create, modify and delete a rule

1. In the web interface select the repository, click **Settings**, then the **Branch rule** tab.
2. **Add branch rule**, set the **Branch rule ID** and **Branch filter**, choose the options below, click **Submit**.
3. To modify, open the rule from the **Branch rules** tab, edit and click **Update**; to delete, click the delete icon on the rule and confirm with **Yes**.

## Options / Props

### Rule identity

| Field | Constraint |
|-------|-----------|
| Branch rule ID | Lowercase letters, numbers and hyphens. First character a letter, last character a letter or number. 63 characters maximum. |
| Branch filter | A branch name, or `.*` for all branches. Full regular expression matching is not supported. |

### Rule options

| Option | Behavior |
|--------|----------|
| Require a pull request before merging | Direct commits to the branch are blocked. Cannot be applied to all branches with `.*` (it would block pushes to every branch, including new ones). |
| Required number of reviewers | Reviews required to merge the pull request. |
| Required number of approvers | Approvals required to merge the pull request. |
| Block merge on stale reviews and approvals | A review or approval is removed if new commits are pushed after it was granted. |
| Require conversation resolution before merging | All code comments and request-change reviews must be resolved. |
| Require linear history | Pull requests that would create a non-linear Git history cannot be merged. |
| Require status checks | The selected build status checks must succeed; the triggers must be configured in the triggers file first. |

### Required roles

| Role | Scope | Purpose |
|------|-------|---------|
| `roles/securesourcemanager.instanceAccessor` | The instance | Configure rules |
| `roles/securesourcemanager.repoAdmin` | The repository | Configure rules |
| `roles/securesourcemanager.repoPullRequestApprover` and `roles/securesourcemanager.repoWriter` | The instance project | Approve pull requests on protected branches in any repository of the instance |
| `roles/securesourcemanager.repoPullRequestApprover` and `roles/securesourcemanager.repoWriter` | The repository | Approve pull requests on protected branches in a single repository |

## Notes

- Enabled branch filters must be unique within a repository (no two enabled rules with filter `main`); several disabled rules may share a filter.
- When several rules apply to a branch, the rule with a specific branch name overrides the wildcard rule (`main` overrides `.*`); rules are not combined.
- A project-level grant of the approver and writer roles applies to every repository in the instance; prefer the repository-level grant when only one repository needs it.
- The source also shows Terraform (`google_secure_source_manager_branch_rule`) with `include_pattern`, `minimum_approvals_count`, `minimum_reviews_count`, `require_comments_resolved`, `require_linear_history`, `require_pull_request`, `disabled` and `allow_stale_reviews`.
- Snippet taken from https://docs.cloud.google.com/secure-source-manager/docs/triggers-file-schema (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/secure-source-manager/docs/configure-branch-protection (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [triggers-file-schema.md](./triggers-file-schema.md)
- [create-triggers-file.md](./create-triggers-file.md)
- [grant-iam-roles.md](./grant-iam-roles.md)
