# Review GitLab merge requests with Codex

Codex code review posts a standard GitLab code review on merge requests, following repository guidance from `AGENTS.md`. GitLab support is in beta, available on all ChatGPT plans, and runs in Codex cloud.

## Signature / Usage

```md
# In a merge request comment
@codex review

# Focus a review
@codex review for issues in the database migration

# Act on findings (requires a configured project environment)
@codex fix the P1 issue

# Any other mention starts a legacy cloud chat with the MR as context
@codex fix the CI failures
```

## Set up

1. Connect a GitLab account. GitLab.com uses the standard connection flow in ChatGPT; self-managed or Dedicated GitLab requires a workspace-admin template to be published first, then each reviewer connects.
2. (Self-managed / Dedicated) In **Codex Cloud** -> **Settings** -> **Connectors**, a workspace admin either selects **Set up service account** -> **Create a service account**, or **Use an existing service account** and pastes a personal access token.
   - Codex-created account: Developer access on **Selected groups** (inherited by projects and subgroups) or **Selected projects only**; token has the `api` scope.
   - Existing account: grant Developer access only where Codex should operate; create a personal access token with the `api` scope and an expiration at least 30 days away. The token is encrypted when saved and never shown again.
   - Codex cannot respond to GitLab activity until a valid token is configured.
3. Route GitLab activity to Codex:
   - Project: in **Codex Cloud** -> **Settings** -> **Environments**, create a project environment and turn on **Enable Codex activity from GitLab** to install the project webhook (merge request, comment, and issue events). Needs Maintainer / Owner, administrator, or a custom role that can administer project webhooks. Required for Codex reviews on GitLab.com.
   - Group (self-managed / Dedicated): **Environments** -> **GitLab activity** -> **Manage groups** installs a group webhook covering the group and its subgroups. The connected user must be a group Owner; requires GitLab Premium or Ultimate and GitLab 19.0 or newer. Group activity enables reviews but does not create project environments.
   - Signed project and group webhooks require GitLab 19.0 or newer. On self-managed 19.0, confirm the `webhook_signing_token` feature flag is enabled (default on; removed in 19.1).
4. Configure review policies in Codex review settings (`chatgpt.com/settings/code-review?provider=gitlab`): choose the repository, turn on **Automatic review** under **Review code**, use **Review** to pick whose merge requests are reviewed and **Trigger** to pick when. Repository settings can override personal defaults.

## Options / Props

Automatic review triggers:

| Name | Type | Description |
|------|------|-------------|
| On MR open | trigger | Review when the merge request is opened |
| On every push | trigger | Review on every push to the merge request |
| Smart Trigger (Experimental) | trigger | Codex decides when to run |

## Customize review rules

Codex searches the repository for `AGENTS.md` files and follows the applicable `## Code Review Rules` section (use `###` headings to group checks). Root `AGENTS.md` holds repository-wide rules; a nested file such as `services/experiment_reporting/AGENTS.md` holds service-specific rules. Codex applies the root and more-specific guidance covering each changed file.

```md
## Code Review Rules

### Experiment cohorts

- Do not filter treatment comparisons on post-exposure behavior, including conversion or retention.
  Safe path: build cohorts from assignment or exposure; report conversion as an outcome.
```

## Troubleshooting

If Codex does not react or post a review:

- Confirm the intended GitLab app is selected and, for project-specific setup, that the project has the intended Codex cloud environment.
- Confirm activity for the project or an ancestor group; in GitLab, check **Webhooks** -> **Recent events** for successful merge request and note deliveries.
- Self-managed / Dedicated: confirm the webhook is signed, SSL verification is enabled, the instance is on GitLab 19.0+, and repair hooks disabled automatically after failures.
- Self-managed / Dedicated: confirm the service-account personal access token is active with the `api` scope, and that the service account (not just the connected user) has Developer access to the project or a parent group.
- Confirm **Code review** or **Automatic reviews** is enabled and the MR matches the repository policy and trigger.
- Use `@codex review`.

## Notes

- Manually requested reviews can include P0, P1, and P2 findings; automatic reviews focus on P0 and P1.
- Codex reacts with an eyes emoji and then posts GitLab discussions and notes on the merge request.
- Fixing findings and other `@codex` tasks require a configured project environment; group activity alone supports reviews only. Codex starts a legacy cloud chat and can push a fix to the branch when it has permission.
- GitHub-style repository controls in the desktop app, such as **Create pull request**, are not included in this beta.
- Code review rules guide Codex; they do not replace tests, branch protections, or required approvals. Keep deterministic checks (formatting, lint) in CI.
- This is the GitLab merge request integration; see the GitHub page for pull requests.
- Source: https://learn.chatgpt.com/docs/third-party/gitlab (retrieved 2026-10).

## Related

- [Review GitHub pull requests with Codex](./github.md)
- [Code review](./code-review.md)
- [Codex cloud](../getting-started/cloud.md)
