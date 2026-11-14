<!-- source: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/claude-api-skill / last verified: 2026-11-14 -->

# Claude API skill

An open-source Agent Skill (`claude-api`) that gives Claude up-to-date reference material for building on the Messages API and Claude Managed Agents (beta), across eight languages. Bundled with Claude Code and available from the Anthropic skills repository.

## Signature / Usage

```text
/claude-api
/claude-api migrate this project to the latest Claude Opus model
/claude-api preserved-thinking-migration
/claude-api managed-agents-onboard
/claude-api managed-agents-secure
```

```bash
npx skills add https://github.com/anthropics/skills --skill claude-api
```

## Options / Props

| Language | Messages API SDK | Tool runner | Managed Agents |
| --- | --- | --- | --- |
| Python / TypeScript / C# / Go / Java / PHP / Ruby | Yes | Yes (beta) | Yes (beta) |
| cURL | Yes | N/A | Yes (beta) |

## Notes

- Automatic activation: project imports an Anthropic SDK, or the user asks to build/debug/tune something with the Claude API, Anthropic SDK, or Managed Agents, or the user adds, modifies, or tunes a Claude feature in a file (prompt caching, adaptive thinking, compaction, tool use, batch, files, citations, memory) or a model reference. It does not activate for general programming, ML/data-science work, or code importing other AI SDKs. For unsupported languages (Rust, Swift, C++) it provides cURL / raw HTTP examples.
- Install as a Claude Code plugin: `/plugin marketplace add anthropics/skills`, then `/plugin install claude-api@anthropic-agent-skills`. It is bundled with Claude Code and needs no installation there.
- `/claude-api preserved-thinking-migration` finds, measures, and fixes history edits that invalidate preserved `thinking` blocks, in five steps: Scope (checks whether the integration is affected, sends three test requests), Find (diffs consecutive requests from captured multi-turn sessions), Measure (replays sessions with `"drop_block"` and reports which conversations lose `thinking` blocks), Fix (replaces one edit at a time with the matching pattern, measuring after each), Report. The test requests and replays are real Messages API requests billed at normal rates (few output tokens, `tool_choice` `none`); the skill states the cost and asks for approval before sending.
- Refusal fallback configuration (during `/claude-api migrate`): adds `stop_reason: "refusal"` handling, updates fallback code written against earlier preview shapes, and sets up a fallback retry path for six targets: Claude Fable 5.2, Fable 5.1, Fable 5, Opus 5.5, Opus 5, and Sonnet 5.5. The path is server-side fallback (`fallbacks` parameter, typically `"default"` mode), client-side fallback via SDK middleware, or a retry that redeems a fallback credit.
- `/claude-api managed-agents-secure` (skill bundled with Claude Code only) is a read-only check of an agent's settings against the "Secure your Managed Agents deployment" guide. Pass the agent ID after the subcommand. It reads the agent, recent sessions, scheduled deployments, environments and vaults via the `ant` CLI (set up the CLI for the agent's workspace first), lists only file names for secret-looking text in the current folder unless told not to, and changes nothing. Needs a current Claude Code (`claude update`).
- Model migration guides covered: Opus 5.5 (from Opus 5 / 4.8), Sonnet 5.5 (from Sonnet 5), Haiku 5.5, Fable 5.2 / Mythos 5.2. Migration also swaps typed SDK constants (`Model.CLAUDE_OPUS_4_8` to `Model.CLAUDE_OPUS_5_5`), preserves platform-specific ID formats (for example the `anthropic.` prefix on Bedrock), and removes `temperature` / `top_p` / `top_k` for Opus 4.8 and 4.7. An ambiguous scope (for example a bare `/claude-api migrate to claude-opus-5-5`) makes the skill ask for the directory or file list before editing.
- Source: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/claude-api-skill (fetched 2026-11-14)
- `/claude-api migrate` performs Claude model migrations across a codebase (model ID swaps, breaking parameter changes, beta header cleanup, effort calibration, refusal fallback wiring).
- Managed Agents is available on the Claude API and Claude Platform on AWS only (not Bedrock, Google Cloud, or Microsoft Foundry); requires beta header `managed-agents-2026-04-01`.
- This is a Claude API skill for the Messages API / Managed Agents surfaces, distinct from Claude Code's bundled skills mechanism (`anthropic-claude-code-extend`).

## Related

- [overview.md](./overview.md)
- [quickstart.md](./quickstart.md)
