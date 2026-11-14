---
source: https://docs.expo.dev/eas/workflows/manage-workflow-runs/
---

# Manage workflow runs in Expo Workflows

View, cancel, and re-run workflow runs in Expo Workflows.

## Signature / Usage

Show the branch and commit of a run started from EAS CLI (push the commit to the linked GitHub repository first, then pass both flags together):

```sh
eas workflow:run .eas/workflows/build.yml --git-branch "$(git branch --show-current)" --git-commit-hash "$(git rev-parse HEAD)"
```

Follow a run, inspect it, or cancel it from EAS CLI:

```sh
eas workflow:view
eas workflow:logs
eas workflow:status WORKFLOW_RUN_ID --wait
eas workflow:cancel WORKFLOW_RUN_ID
```

## Options / Props

Workflow run statuses:

| Status | Meaning |
| --- | --- |
| New | Created but not started yet |
| Queued | Waiting for another run in its concurrency group; has no jobs until it starts |
| In progress | One or more jobs are running |
| Action required | A job is waiting for a manual action, such as an approval |
| Success | All jobs completed successfully (terminal) |
| Failure | At least one job failed (terminal) |
| Canceled | Canceled before it completed (terminal) |

Re-run options (Expo dashboard only):

| Option | Behavior |
| --- | --- |
| Re-run from failed jobs | New run from the same workflow revision, project source, event data, and inputs. Successful jobs are not run again (results, outputs, logs, and artifacts are reused); failed jobs run again; jobs blocked by a failed dependency run once their dependencies and conditions allow; jobs skipped by an `if` stay skipped if the condition is still false |
| Re-run all jobs | New run that executes every job from the beginning (for a successful workflow, **Re-run workflow** does this) |

## Notes

- `eas workflow:view` selects a recent run, or takes a workflow run ID. `eas workflow:cancel` accepts multiple run IDs; with none, it prompts to select in-progress or queued runs.
- By default `eas workflow:run` uploads local project files, so the run has no branch or commit and is not listed under the dashboard branch filter. With `--git-branch` and `--git-commit-hash` the dashboard links the run to that branch and commit, and an `update` job without `branch` or `channel` publishes to the Expo Update branch with the same name as the Git branch. The run still uses the uploaded project files, even if they differ from that commit; no commit status is posted to GitHub. Workflow expressions see the branch and commit in the `github` context.
- Cancel from the dashboard with **Cancel workflow** on a non-terminal run: completed jobs keep their final status, remaining work stops, and the run is marked canceled.
- You cannot pick an arbitrary job as the starting point of a re-run.
- A re-run can reuse source and artifacts only while Expo Services retains them. If the dashboard no longer shows the re-run options, start a new run with `eas workflow:run`.
- Status values returned by the REST API are documented on the official REST API page, which is not included in this skill.
- Source: https://docs.expo.dev/eas/workflows/manage-workflow-runs/ (docs/pages/eas/workflows/manage-workflow-runs.mdx at tag expo@58.0.25).

## Related

- [Debug a workflow run with SSH](./workflows-debug-with-ssh.md)
- [Syntax for Expo Workflows](./workflows-syntax.md)
- [Get started with Expo Workflows](./workflows-get-started.md)
- [Environment variables in Expo Workflows](./workflows-environment.md)
