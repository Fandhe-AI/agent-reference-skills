# Kick off coding tasks from Slack

Delegate repository work from Slack threads.

```text
@ChatGPT investigate the issue described in this thread for [repository].
Use the workspace-shared Cloud environment for [project or environment].
Make the smallest useful fix, run the relevant checks, and report the result here.
```

## Notes

- Source: OpenAI Codex use-case (https://learn.chatgpt.com/use-cases/slack-coding-tasks). `suggestedModel: cloud`. Requires the ChatGPT app enabled in Slack by a workspace admin, Cloud delegation enabled, and an eligible workspace-shared Cloud environment that has a published version
- Personal Cloud environments are not included in this Slack flow. The account running the task needs the required environment, repository, and service access
- Best for: async handoffs with enough context in the Slack thread to act on, issue triage, bug fixes, or scoped implementation work from Slack
- Related: Use ChatGPT in Slack (https://learn.chatgpt.com/codex/third-party/slack), Codex Cloud environments (https://learn.chatgpt.com/codex/environments/cloud-environments)
