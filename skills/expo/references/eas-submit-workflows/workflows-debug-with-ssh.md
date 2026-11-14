---
source: https://docs.expo.dev/eas/workflows/debug-with-ssh/
---

# Debug a workflow run with SSH

Open an interactive SSH session on the worker that runs a job in Expo Workflows (experimental).

## Signature / Usage

Start a run with SSH enabled:

```sh
eas workflow:run .eas/workflows/my-workflow.yml --ssh
```

To debug a workflow that GitHub started, run the same workflow file at the same Git reference:

```sh
eas workflow:run .eas/workflows/my-workflow.yml --ref my-branch --ssh
```

Connect with the command printed by the **Start SSH session** step in the job logs (`SSH session ready. Connect with: eas workflow:ssh ID`):

```sh
eas workflow:ssh ID
```

Keep the session open after the job ends (seconds, 0 to 3600, default 0):

```sh
eas workflow:run .eas/workflows/my-workflow.yml --ssh --ssh-idle-timeout 600
```

Print the connection command for another SSH client or a script:

```sh
eas workflow:ssh --show-connect ID
```

## Options / Props

| Flag / command | Description |
| --- | --- |
| `eas workflow:run --ssh` | Opens an SSH session on each job that runs on a worker, before its steps start |
| `eas workflow:run --ssh-idle-timeout <seconds>` | After the job ends, keeps the session open until no client has been connected for this long; 0 to 3600, default 0 |
| `eas workflow:ssh ID` | Connects to the session; waits if the session is not ready yet |
| `eas workflow:ssh --show-connect ID` | Prints the connection command, which contains a token |

Troubleshooting:

| Message | Cause | Next step |
| --- | --- | --- |
| `SSH was not enabled for "ID"` | The run started without `--ssh`, or the role on the account is Runner | Start a new run with `--ssh`; connecting needs Developer or higher |
| `This ssh session has ended.` | The job ended with no client connected, or the run was canceled | Start a new run with `--ssh`; add `--ssh-idle-timeout` to get time to connect after the job ends |
| `Timed out waiting for the ssh session to open.` | The worker is still starting | Run the command again |
| Could not run `ssh` | No SSH client in the terminal | Install an OpenSSH client |
| `Failed to open the SSH session. The job will continue without it.` | The worker could not open the session (shown in job logs) | Start a new run with `--ssh`; if it recurs, contact workflows@expo.dev |

## Notes

- SSH access is experimental; commands, flags, and behavior may change.
- Requirements: EAS CLI 24.12.0 or later, an `ssh` client in the terminal, and Developer, Release Manager, Admin, or Owner role on the project's account. A Runner role can start a run with `--ssh` but cannot connect.
- Jobs that run without a worker (such as `slack` and `require-approval`) do not open a session. Jobs in called reusable workflows, and jobs that run again after a re-run on the Expo dashboard, also open sessions.
- SSH can be enabled only when starting a run with `eas workflow:run`.
- The job does not wait for you to connect. The shell starts in the build directory `~/workingdir/build`; the project files appear there after the **Prepare project** step (build job) or the `eas/checkout` step (custom job), which replace the directory. If you connected earlier, run `cd ~/workingdir/build`.
- The session stays open for the whole job and, after it ends, while a client is connected. With `--ssh-idle-timeout`, the job and run stay in progress until the session closes, which uses build minutes and a concurrency slot on the account. Canceling the run closes open sessions immediately and the jobs end as Canceled.
- The `--show-connect` output contains a token that lets anyone connect until the session closes; do not share it or save it in logs. It also prints a second command for networks that block SSH.
- Source: https://docs.expo.dev/eas/workflows/debug-with-ssh/ (docs/pages/eas/workflows/debug-with-ssh.mdx at tag expo@58.0.25).

## Related

- [Manage workflow runs](./workflows-manage-runs.md)
- [Reusable workflows in Expo Workflows](./workflows-reusable-workflows.md)
- [EAS CLI reference](./eas-cli.md)
