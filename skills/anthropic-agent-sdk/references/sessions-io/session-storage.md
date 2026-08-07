<!-- source: https://code.claude.com/docs/en/agent-sdk/session-storage.md / last verified: 2026-08-07 -->

# Persist sessions to external storage

By default the SDK writes session transcripts to JSONL files under `~/.claude/projects/` on the local filesystem. A `SessionStore` adapter mirrors those transcripts to your own backend (S3, Redis, a database) so a session created on one host can be resumed on another.

## Signature / Usage

```typescript
type SessionKey = {
  projectKey: string;
  sessionId: string;
  subpath?: string;
};

type SessionStore = {
  // Required
  append(key: SessionKey, entries: SessionStoreEntry[]): Promise<void>;
  load(key: SessionKey): Promise<SessionStoreEntry[] | null>;

  // Optional
  listSessions?(projectKey: string): Promise<Array<{ sessionId: string; mtime: number }>>;
  listSessionSummaries?(projectKey: string): Promise<SessionSummaryEntry[]>;
  delete?(key: SessionKey): Promise<void>;
  listSubkeys?(key: { projectKey: string; sessionId: string }): Promise<string[]>;
};
```

```typescript
import { query, InMemorySessionStore } from "@anthropic-ai/claude-agent-sdk";

const store = new InMemorySessionStore();

let sessionId: string | undefined;
for await (const message of query({
  prompt: "List the TypeScript files under src/",
  options: { sessionStore: store },
})) {
  if (message.type === "result") sessionId = message.session_id;
}

// Resume from the store on any host
for await (const message of query({
  prompt: "Summarize what those files do",
  options: { sessionStore: store, resume: sessionId },
})) {
  if (message.type === "result" && message.subtype === "success") {
    console.log(message.result);
  }
}
```

## Options / Props

| Name | Required | Called when |
| --- | --- | --- |
| `append` | Yes | After each batch of transcript entries is written locally. |
| `load` | Yes | Before the subprocess spawns when `resume` is set, and once per session when listing falls back from `listSessionSummaries`. Returns `null` if unknown. |
| `listSessions` | No | By `listSessions({ sessionStore })` and by `continue: true`. Without it, `continue: true` throws. |
| `listSessionSummaries` | No | By `listSessions({ sessionStore })` to read metadata in one call. Falls back to `listSessions` + per-session `load`. |
| `delete` | No | By `deleteSession({ sessionStore })`. Must cascade to all subkeys and remove the summary entry. Without it, deletion is a no-op. |
| `listSubkeys` | No | During resume, to discover subagent transcripts. Without it, only the main transcript is restored. |

## Notes

- `SessionKey.projectKey` is a stable, filesystem-safe encoding of the working directory; `sessionId` is the session UUID; `subpath` is set for subagent transcripts or sidecar files (e.g. `subagents/agent-<id>`), treated as an opaque key suffix.
- Build entries via the exported `foldSessionSummary` / `fold_session_summary` helper inside `append`; skip batches with a `subpath`. Stamp `mtime` at persist time; concurrent `append` calls for the same session must be serialized (transaction, CAS, or per-session lock).
- **Dual-write architecture**: the Claude Code subprocess always writes to local disk first, then the SDK forwards each batch to `append()`. The store is a mirror, not a replacement.
- Combining `sessionStore` with `persistSession: false` (TypeScript) throws. Combining the store with file checkpointing (`enableFileCheckpointing` / `enable_file_checkpointing`) also throws, since checkpoint backup blobs are written directly to local disk and are not mirrored.
- **Mirror writes are best-effort**: a failed `append()` retries up to two more times (three attempts total, no retry on timeout). If it still fails, a `{ type: "system", subtype: "mirror_error" }` message is emitted and the batch is dropped; the local transcript stays durable. Deduplicate by `entry.uuid` since retried batches can re-deliver.
- `getSessionMessages({ sessionStore })` returns the post-compaction linked message chain, not the full raw history — call `store.load(key)` directly for that.
- `forkSession({ sessionStore })` rewrites every `sessionId` field and remaps message UUIDs rather than doing a byte copy.
- The SDK never deletes from your store on its own; retention (TTLs, lifecycle policies, cleanup) is the adapter's responsibility.
- Reference adapters for S3, Redis, and Postgres ship (unpublished) under `examples/session-stores/` in the TypeScript SDK repository. Both SDKs ship a conformance test suite (`run_session_store_conformance` in Python) to validate a custom adapter.
- In Python, set `session_store` in `ClaudeAgentOptions` for `query()`; other operations use store-backed functions such as `list_sessions_from_store()`, `get_session_messages_from_store()`, `rename_session_via_store()`, `delete_session_via_store()`, `fork_session_via_store()`. `startup()` has no Python equivalent.

## Related

- [sessions](./sessions.md)
