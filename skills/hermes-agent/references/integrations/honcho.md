# Honcho Memory

AI-native memory backend (Plastic Labs) that adds dialectic reasoning and deep user modeling on top of Hermes's built-in memory. Honcho is a catalog Memory Provider Plugin installed with `hermes plugins install honcho`; it plugs into the Memory Providers system.

## Signature / Usage

```bash
hermes plugins install honcho   # from the plugin catalog
hermes memory setup             # select "honcho" from the provider list
```

Manual configuration:

```yaml
# ~/.hermes/config.yaml
memory:
  provider: honcho
```

```bash
echo 'HONCHO_API_KEY=***' >> ~/.hermes/.env
```

API key from honcho.dev. Honcho itself is configured in `~/.honcho/config.json` (global) or `$HERMES_HOME/honcho.json` (profile-local); the setup wizard handles this.

## Options / Props

| Key | Default | Description |
|-----|---------|-------------|
| `contextTokens` | `null` (uncapped) | Token budget for auto-injected context per turn |
| `contextCadence` | `1` | Minimum turns between `context()` API calls (base layer refresh) |
| `dialecticCadence` | `2` | Minimum turns between `peer.chat()` LLM calls (recommended 1-5). Irrelevant in `tools` mode |
| `dialecticDepth` | `1` | `.chat()` passes per dialectic invocation, clamped to 1-3 |
| `dialecticDepthLevels` | `null` | Array of reasoning levels per pass, e.g. `["minimal", "low", "medium"]` |
| `dialecticReasoningLevel` | `'low'` | `minimal`, `low`, `medium`, `high`, `max` |
| `dialecticDynamic` | `true` | Model may override reasoning level per call via tool param |
| `dialecticMaxChars` | `600` | Max chars of dialectic result injected into the system prompt |
| `recallMode` | `'hybrid'` | `hybrid` (auto-inject + tools), `context` (inject only), `tools` (tools only) |
| `initOnSessionStart` | `false` | `tools` mode only. `true` creates the Honcho session synchronously at session start |
| `timeout` | `null` (SDK default) | Seconds per Honcho SDK call (`requestTimeout`, `HONCHO_TIMEOUT` also accepted) |
| `writeFrequency` | `'async'` | `async`, `turn`, `session`, or integer N |
| `saveMessages` | `true` | Persist messages to the Honcho API |
| `observationMode` | `'directional'` | `directional` (all on) or `unified` (shared pool); override with an `observation` object |
| `messageMaxChars` | `25000` | Max chars per message via `add_messages()`; chunked if exceeded |
| `dialecticMaxInputChars` | `10000` | Max chars for dialectic query input to `peer.chat()` |
| `sessionStrategy` | `'per-directory'` | `per-directory`, `per-repo`, `per-session`, `global` |
| `pinUserPeer` | `false` | Gateway only. Every platform user collapses to `peerName` |
| `userPeerAliases` | `{}` | Gateway only. Map runtime IDs to peers, e.g. `{"7654321": "alice"}` |
| `runtimePeerPrefix` | `""` | Gateway only. Namespaces unknown runtime IDs when no alias matches |
| `a2aSessions` | `true` | Write DMs from other bots into their own per-sender session; `false` skips bot-authored turns |

Observation override:

```json
"observation": {
  "user": { "observeMe": true,  "observeOthers": true },
  "ai":   { "observeMe": true,  "observeOthers": false }
}
```

## Tools

| Tool | Purpose |
|------|---------|
| `honcho_profile` | Read or update peer card (pass `card` list to update) |
| `honcho_search` | Semantic search over context, raw excerpts |
| `honcho_context` | Full session context: summary, representation, card, recent messages |
| `honcho_reasoning` | Synthesized answer from Honcho's LLM; `reasoning_level` minimal/low/medium/high/max |
| `honcho_conclude` | Create (`conclusion`) or delete (`delete_id`, PII only) conclusions |

## CLI Commands

The `hermes honcho` subcommand is registered only when Honcho is the active memory provider.

```bash
hermes memory setup honcho    # Configure Honcho directly (works before activation)
hermes honcho status          # Connection status, config, and key settings
hermes honcho strategy        # Show or set session strategy
hermes honcho peer            # Show or update peer names + dialectic reasoning level
hermes honcho mode            # Show or set recall mode (hybrid/context/tools)
hermes honcho tokens          # Show or set token budget for context and dialectic
hermes honcho identity        # Seed or show the AI peer's Honcho identity
hermes honcho sync            # Sync Honcho config to all existing profiles
hermes honcho peers           # Show peer identities across all profiles
hermes honcho sessions        # List known Honcho session mappings
hermes honcho map             # Map current directory to a Honcho session name
hermes honcho enable          # Enable Honcho for the active profile
hermes honcho disable         # Disable Honcho for the active profile
hermes honcho migrate         # Migration guide from openclaw-honcho
```

`hermes honcho setup` redirects to `hermes memory setup`.

## Notes

- Two-layer context injection each turn (hybrid/context modes): base context (session summary, user representation, peer card, AI self-representation, AI identity card; refreshed on `contextCadence`) plus a dialectic supplement (LLM-synthesized; refreshed on `dialecticCadence`), truncated to `contextTokens`.
- Cold/warm prompt selection is automatic: cold start asks general user facts; warm asks session-scoped relevance. With `dialecticDepth` > 1: pass 0 cold/warm, pass 1 self-audit, pass 2 reconciliation; passes bail out early on strong signal. Session-start prewarm runs at full depth in the background.
- Query-adaptive reasoning level: +1 level at >=120 chars, +2 at >=400, clamped at `reasoningLevelCap` (default `"high"`); disable with `reasoningHeuristic: false`.
- Session strategy: `per-session` (fresh session each run, recommended for new users), `per-directory`, `per-repo`, `global`. Gateways keep a stable per-chat session key regardless. Auto-generated titles (`derived` / `llm`) do not override `sessionStrategy`; an explicit user title does for non-gateway, non-`per-session` sessions without a manual mapping.
- `initOnSessionStart: true` makes startup wait for Honcho; keep it `false` on Desktop and when Honcho is a local service that may not be running.
- Self-hosted Honcho with auth: setup asks for a local JWT signed with the server's `AUTH_JWT_SECRET` (blank for `AUTH_USE_AUTH=false`); stored at `hosts.<host>.apiKey`, separate from the cloud `apiKey`.
- Gateway identity resolution order: `pinUserPeer`, `userPeerAliases[id]`, `runtimePeerPrefix + id`, raw runtime ID, `peerName`, session-key fallback. Un-pinning (`pinUserPeer` true to false) does not migrate data. `pinPeerName` is a deprecated alias of `pinUserPeer`.
- Observation presets: `directional` (user me/others on, AI me/others on) and `unified` (user me on, others off; AI me off, others on). Server-side toggles set in the Honcho dashboard win over local defaults.
- Migrating from the standalone `hermes honcho setup`: existing `honcho.json` / `~/.honcho/config.json` and server-side data are preserved; set `memory.provider: honcho`.
- Homes upgraded from a release that bundled Honcho get the plugin installed automatically.
- `X-Hermes-Session-Key` on the API Server scopes Honcho's long-term memory per channel.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/honcho (pinned to v0.22.2)

## Related

- [API Server](./api-server.md)
- [Integrations Overview](./overview.md)
