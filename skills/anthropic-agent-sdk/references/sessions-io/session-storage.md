<!-- source: https://code.claude.com/docs/en/agent-sdk/session-storage.md / last verified: 2026-11-14 -->

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

```python
class SessionKey(TypedDict):
    project_key: str
    session_id: str
    subpath: NotRequired[str]

class SessionStore(Protocol):
    # Required
    async def append(
        self, key: SessionKey, entries: list[SessionStoreEntry]
    ) -> None: ...
    async def load(self, key: SessionKey) -> list[SessionStoreEntry] | None: ...

    # Optional — omit or raise NotImplementedError
    async def list_sessions(
        self, project_key: str
    ) -> list[SessionStoreListEntry]: ...
    async def list_session_summaries(
        self, project_key: str
    ) -> list[SessionSummaryEntry]: ...
    async def delete(self, key: SessionKey) -> None: ...
    async def list_subkeys(self, key: SessionListSubkeysKey) -> list[str]: ...
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
- TypeScript: if you set `CLAUDE_CODE_PROJECT_DIR_NAME` beside `CLAUDE_CONFIG_DIR` in a query's `env` option, the SDK keys that query's entries, and its `resume` and `continue` lookups, by that name instead of the working directory encoding. Standalone helpers such as `listSessions` and `deleteSession` take no `env` and read the process environment, so set `CLAUDE_CONFIG_DIR` and the same name in the host process environment too. Requires Agent SDK v0.3.234 or later.
- When resuming from a store, the SDK seeds a temporary config directory from your real one. TypeScript copies credentials, `.claude.json`, and your user `settings.json`, stripping from `settings.json` the keys `enabledPlugins`, `extraKnownMarketplaces`, its `additionalMarketplaces` alias, and any `CLAUDE_CONFIG_DIR` in the file's `env` block (the alias was not stripped before Agent SDK v0.3.232; before v0.3.222 only credentials and `.claude.json` were copied). Python copies credentials and `.claude.json` only, so an app that authenticates through `apiKeyHelper` in user `settings.json` fails with `Not logged in` when resuming from a store; an `apiKeyHelper` in managed or project settings still works.
- The SDK never deletes from your store on its own; retention (TTLs, lifecycle policies, cleanup) is the adapter's responsibility. Local transcripts are swept independently by `cleanupPeriodDays`; a run resumed from the store leaves no local transcript, so the store's retention is the only one.
- `InMemorySessionStore` ships for development and testing. `projectKey` encodes the working directory, so resume or continue from a matching working directory. `load` must return entries deep-equal to what was appended, in order (byte-equal serialization is not required); treat entries as opaque JSON-safe values.
- Local copy after a run: for a fresh session (or a resume where the store has nothing), the local transcript outlives the run and the store gets a copy; for a run resumed from the store, the local copy is deleted at run end (the SDK uses a temporary `CLAUDE_CONFIG_DIR`). To keep a fresh session off local disk, set `CLAUDE_CONFIG_DIR` to a private temp directory in `options.env` (TypeScript: spread `process.env` too). That breaks claude.ai login and `apiKeyHelper` auth (`Not logged in`); authenticate with `CLAUDE_CODE_OAUTH_TOKEN` (from `claude setup-token`, model requests only, no claude.ai connectors), `ANTHROPIC_API_KEY`, or by copying config files into the temp directory.
- Resume/continue: `resume` loads that session; `continue: true` (TypeScript) / `continue_conversation=True` (Python) loads the store's newest session (needs `listSessions` on the adapter). If the store has nothing: `resume` passes the ID to the subprocess (local transcript); `continue: true` in TypeScript starts a fresh session; `continue_conversation=True` in Python continues from the newest local session.
- `listSubagents({ sessionStore })` needs `listSubkeys`; `getSubagentMessages({ sessionStore })` falls back to the direct subpath without it. Subagent transcripts mirror under `subpath: "subagents/agent-<id>"`.
- A `SessionSummaryEntry` is `{ sessionId, mtime, data }` (Python: `session_id`, `mtime`, `data`); `mtime` must share a clock source with `listSessions` values and `data` is opaque SDK-owned state to persist verbatim.
- Run the conformance suite to validate an adapter: TypeScript copy `shared/conformance.ts` from the example directory; Python `from claude_agent_sdk.testing import run_session_store_conformance` with a zero-argument factory returning an empty store each call (pytest is not an SDK dependency).
- Store-aware TypeScript functions: `query()`, `startup()`, `listSessions()`, `getSessionInfo()`, `getSessionMessages()`, `renameSession()`, `tagSession()`, `deleteSession()`, `forkSession()`, `listSubagents()`, `getSubagentMessages()`.
- Source: https://code.claude.com/docs/en/agent-sdk/session-storage.md (fetched 2026-11-14)
- Reference adapters for S3, Redis, and Postgres ship (unpublished) under `examples/session-stores/` in the TypeScript SDK repository. Both SDKs ship a conformance test suite (`run_session_store_conformance` in Python) to validate a custom adapter.
- In Python, set `session_store` in `ClaudeAgentOptions` for `query()`; other operations use store-backed functions such as `list_sessions_from_store()`, `get_session_messages_from_store()`, `rename_session_via_store()`, `delete_session_via_store()`, `fork_session_via_store()`. `startup()` has no Python equivalent.

## Related

- [sessions](./sessions.md)
