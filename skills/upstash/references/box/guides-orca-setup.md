# Guide: Orca Setup

Use the Upstash Box plugin for Orca to run each Orca workspace and its coding agents in its own box, reached over SSH. Orca creates the box with the workspace, connects over SSH, and deletes the box when the workspace is deleted.

## Signature / Usage

Setup (needs Orca 1.4.245 or newer, Node.js 20 or newer, `git`, and `ssh`, plus an Upstash Box API key):

```bash
npx -y github:upstash/box-orca-plugin#v0.1.1 setup
```

Check it with:

```bash
~/.upstash/box-orca/bin/box-orca doctor
```

In Orca, turn on Settings, Experimental, Cloud VM, then Settings, Plugins, Install from git URL:

```text
https://github.com/upstash/box-orca-plugin.git#v0.1.1
```

Snapshot a set-up box so new workspaces start faster:

```bash
~/.upstash/box-orca/bin/box-orca snapshot
```

## Notes

- Source: https://upstash.com/docs/box/guides/orca-setup (fetched 2026-11-14; no version pin on the site).
- The `setup` command runs code from a GitHub tag (`#v0.1.1`); it asks for your API key, creates an SSH key and adds it to your Upstash account, trusts the Upstash Box SSH gateway's host key, and installs the helper at `~/.upstash/box-orca/bin/box-orca`
- Create a workspace on a project with a Git remote and pick Upstash Box under Run on, Per-Workspace Environment; the plugin uploads the selected commit from your machine and checks out the workspace branch at `/workspace/home/repo` (no Git token is sent for this)
- The first connection to a new box installs Orca's remote runtime (a few minutes); Claude Code and Codex are already in the box, log in the first time from the workspace terminal
- Snapshot after logging in to your agents (`claude`, `codex`): new workspaces start from the snapshot in under a minute; the snapshot copies the box's home directory (including shell history); run `snapshot` again after updating Orca
- To push and open PRs: connect GitHub in the Upstash Console under Box, Settings, GitHub, or run `gh auth login` and `gh auth setup-git` in the workspace terminal before taking a snapshot
- Your agents keep working in the box when Orca is closed; Orca reattaches on open

## Related

- [Shell](./shell.md)
- [Snapshots](./snapshots.md)
- [Guides: Herdr Setup](./guides-herdr-setup.md)
