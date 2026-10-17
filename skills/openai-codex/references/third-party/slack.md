# Use ChatGPT in Slack

Mention `@ChatGPT` in a Slack channel to start a request. If your workspace has Cloud delegation enabled, ChatGPT can send repository work to a separate Codex Cloud task and return the result to the thread. (Formerly `@Codex`; see "Move to the ChatGPT app".)

## Signature / Usage

```text
@ChatGPT investigate the failing checkout tests in acme/storefront and propose a fix.
```

Follow up in the same thread:

```text
@ChatGPT add a regression test for the fix and summarize the checks you ran.
```

## Set up the Slack app

A ChatGPT workspace owner or admin sets up the workspace's Slack deployment; available controls depend on the workspace's enabled features, and your Slack workspace's app policies also apply. If you don't see the controls, ask your admin whether Slack deployments are available. For admin setup, workspace connections, and access controls, see "Set up and manage @ChatGPT in Slack and Microsoft Teams" (a ChatGPT workspace admin page outside this skill's scope).

Cloud delegation must be available in your workspace and requires a published environment shared with the workspace; ask your admin to enable Codex Cloud for Slack. Where Codex Cloud role-based access control is enabled, both the deployment's service account and your account need Codex Cloud access.

### Connect your account when prompted

Workspace setup and your personal account connection are separate. If ChatGPT asks you to connect: (1) select the connection link in the Slack message and sign in if prompted; (2) connect Slack for the same workspace where you made the request; (3) return to the original thread and mention `@ChatGPT` to retry.

## Start a request

1. In a channel where the app is enabled, mention `@ChatGPT` and describe the result you want; for coding work include the repository and relevant context from the thread.
2. Complete any account-connection or approval prompts; review the requested work and access before you approve.
3. Continue related requests in the same thread, mentioning `@ChatGPT` again.

Use an enabled public or private channel in your workspace. Slack Connect channels shared with another organization aren't supported by this flow.

## Run repository work in Codex Cloud

Cloud delegation requires an eligible workspace-shared environment with a published version (for Enterprise, prepare and publish a tested setup and share it within the Enterprise workspace; see cloud-environments.md). Confirm the environment is available for the requested repository.

- **Environment selection**: ChatGPT selects from accessible workspace-shared Cloud environments and checks that you can access the environment before starting. Personal Cloud environments aren't included. Name the repository or shared environment in your request to help ChatGPT choose.
- **Separate coding task**: repository work runs in a separate task using your account; you need access to the selected environment and any repositories that require authentication.
- **Follow-up work**: related requests in the same Slack thread can continue the coding task and environment when they use the same account; a request using another account may start a separate coding task. Start a new conversation for a different environment.

Sharing an environment doesn't grant repository access or share your personal credential values; review its environment-owned values and prepared files before sharing. If no eligible shared environment is available, resolve the environment or access issue before retrying.

## Review approvals and results

When a request needs your authorization, ChatGPT can show a private approval card with **Allow** and **Deny** controls; review the assignment and any available environment choice first. ChatGPT can post a message in the original thread when the task starts; **Follow along** and **Cancel** controls (when available) appear for the requester, and Follow along opens the task (the channel reply doesn't give every channel member access to the underlying task). ChatGPT returns the result to the thread; review the answer, changes, and reported checks before using or merging it, and mention `@ChatGPT` to request a correction or follow-up.

## Notes

- Data usage, privacy, and security: a response posted to a Slack channel can be read by people with access to that channel (a private approval card doesn't make the resulting channel reply private). Keep secrets out of Slack prompts and use the environment's credential controls. Review Agent Security and the deployment access boundaries, and follow your workspace's data and app policies.
- Move to the ChatGPT app: if you previously used `@Codex`, start new requests with `@ChatGPT` after your admin enables the ChatGPT app, and follow any connection and approval prompts.
- Troubleshooting: no response (confirm ChatGPT is enabled for the channel, mention `@ChatGPT` explicitly, use a channel within your organization rather than Slack Connect); account connection requested again (check you connected to the Slack workspace where you're making the request, retry in the same thread); no eligible Cloud environment (check it is published and shared with the workspace and the running account has access; a personal environment won't appear); a coding task won't start (ask your admin to confirm Cloud delegation and Codex Cloud are enabled, check RBAC for the service account and your account, and your access to the environment and its repositories); different environment needed (start a new conversation and name the repository or shared environment); task controls unavailable (they depend on the deployment configuration and are for the requester); long threads (summarize the issue, expected outcome, and repository in your latest request).
- Distinct from the GitHub Action / non-interactive automation surfaces: this integration is triggered by chat mentions, not CI events.

## Related

- [Codex Cloud](../getting-started/cloud.md)
- [Cloud environments](../environments/cloud-environments.md)
- [Use Codex in Linear](./linear.md)
