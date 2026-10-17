<!-- source: https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes-memory / last verified: 2026-10-17 -->

# Memory stores in self-hosted sandboxes

Attach memory stores to sessions on self-hosted environments exactly as on cloud environments (list them in `resources` at session creation; up to 8 per session). The worker, not Anthropic, downloads each store into the sandbox and syncs the agent's changes back.

## Signature / Usage

```bash
# Prepare the host: parent directory writable by the worker user.
# Do not create per-store directories; the worker creates and removes them.
sudo mkdir -p /mnt/memory && sudo chown "$USER" /mnt/memory
```

```python
worker = EnvironmentWorker(
    client,
    environment_id=environment_id,
    environment_key=environment_key,
    workdir="/workspace",
    memory_sync_interval=10,  # seconds
    memory_sync_deletions="log_only",
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `memory_sync_interval` (typescript: `memorySyncIntervalMs`; go: `MemorySyncInterval`) | seconds / ms / duration | How often attached stores reconcile while the session runs. Default 15 seconds, minimum 5 seconds. Disable memory support with `None` (typescript: `null`; go: `-1`) |
| `memory_sync_deletions` (typescript: `memorySyncDeletions`; go: `MemorySyncDeletions`) | string | `"enabled"` (default): delete from the store once a later sync confirms the file is still gone. `"log_only"`: only log what would be deleted. `"disabled"`: never delete from the store |

## Notes

- Requirements: `ant` CLI 1.33.0 or later, or `EnvironmentWorker` from the Python, TypeScript, or Go SDK; a POSIX filesystem (Windows hosts unsupported because the worker needs `O_NOFOLLOW`; case-sensitive recommended); a writable `/mnt/memory`; and the work item's secret forwarded if your own code launches the worker. The `ant` CLI worker always uses default sync settings.
- Memory stores cannot be attached to self-hosted sessions on Claude Platform on AWS.
- Worker flow: downloads each store to its `mount_path` (e.g. `/mnt/memory/user-preferences/`), opens the directories to the file tools, reconciles after tool calls at most once per sync interval, and on session end runs a final sync (flushing pending uploads for up to 30 seconds) then removes the directories. The store on Anthropic's side stays the source of truth; memory versions, redaction, and Console editing work as for cloud sessions.
- If something already exists at a store's path, the worker refuses to start the session's work. Two sessions cannot mount the same store on one host at once; run one session per filesystem (a sandbox per session satisfies this). No host bind mount is needed in sandbox-per-session since the worker uploads before exit.
- Cross-session visibility is delayed by the sync interval (typically well under a minute at default); cloud sandboxes see changes almost immediately.
- Each store directory holds a `.anthropic-memory-store` marker file; leave it in place, or the worker does not sync that directory.
- A killed (not stopped) worker runs no teardown: unsynced edits are lost and directories stay behind.
- Disable memory support only on workers whose sessions attach no stores; a disabled worker runs stored sessions without them although the system prompt still describes them. While enabled, a work item without a `secret` for a session with attached stores fails.
- Read-only stores (`access: "read_only"`): `write` and `edit` refuse changes and nothing is uploaded. Changes via `bash`, custom tools, or MCP are not blocked locally, never synced, and overwritten by the next remote change. To keep the local copy unchanged, disable `bash` and give no filesystem-writing custom tools; do not mount the store path read-only.
- Conflicts resolve in favor of the store: the worker keeps the store's version, overwrites the local file, and logs a warning. `write`/`edit` succeed and no error reaches the agent.
- Status: beta (`managed-agents-2026-04-01`).

## Related

- [Deploy self-hosted workers](./self-hosted-sandboxes-workers.md)
- [Monitor and troubleshoot self-hosted workers](./self-hosted-sandboxes-operations.md)
- [Self-hosted worker reference](./self-hosted-sandboxes-reference.md)
