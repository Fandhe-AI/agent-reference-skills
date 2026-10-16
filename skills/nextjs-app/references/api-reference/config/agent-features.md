# AI Coding Agent Options (agentRules, agentUpgrade, agentFeedback)

`next.config.js` options that control how Next.js interacts with AI coding agents during `next dev` / `next build`: `agentRules` (managed `AGENTS.md` block pointing at bundled docs), `experimental.agentUpgrade` (upgrade reminders and default `next upgrade --agent` policy), and `experimental.agentFeedback` (reviewed issue-report flow).

## Signature / Usage

```ts filename="next.config.ts"
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  agentRules: false,
  experimental: {
    agentUpgrade: 'latest',
    agentFeedback: true,
  },
}

export default nextConfig
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `agentRules` | `boolean` | `true` | Whether `next dev` creates and updates version-matched documentation instructions for detected AI coding agents. Added in `v16.3.0`. |
| `experimental.agentUpgrade` | `false \| 'security' \| 'latest' \| 'experimental-future'` | `'security'` | Default policy for `next upgrade --agent` and upgrade reminders during `next dev` / `next build`. Experimental; added in `v16.4.0`. |
| `experimental.agentFeedback` | `boolean` | `false` | Whether `next dev` creates and updates instructions that let detected AI coding agents prepare Next.js issue reports for your review. Requires Next.js Telemetry enabled; does not run in CI. Experimental; added in `v16.4.0`. |

`experimental.agentUpgrade` values:

| Value | Behavior |
|-------|----------|
| `false` | Disables upgrade reminders. |
| `security` (default) | Checks stable installations for security advisories and recommends a safe upgrade when one is available. |
| `latest` | Recommends a newer major or minor release on the app's current stable or canary channel. |
| `experimental-future` | Uses the `latest` policy and also recommends applicable Future Defaults. |

## Notes

- Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/agentRules, https://nextjs.org/docs/app/api-reference/config/next-config-js/agentUpgrade, https://nextjs.org/docs/app/api-reference/config/next-config-js/agentFeedback (v16.4.2)

### agentRules

When enabled and `next dev` detects an AI coding agent, Next.js creates or updates this managed block in `AGENTS.md`:

```md filename="AGENTS.md"
<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
```

- Next.js updates only the content between the markers and preserves the rest of the file.
- Setting `agentRules: false` removes the existing block on the next `next dev` run (since `v16.4.0`), preserves all other content even when no agent is detected, and deletes the file if it contained only the managed block.
- Pass `--no-agents-md` to `create-next-app` to prevent it from creating agent files in a new project.
- `agentRules` and `experimental.agentFeedback` work independently.

### experimental.agentUpgrade

- The option does not upgrade the app automatically. It only controls reminders and the policy used when `next upgrade --agent` has no value.
- In an interactive terminal, a reminder offers: **Upgrade now** (stops the command and starts `next upgrade --agent` with the configured policy), **Skip** (replays buffered output), **Skip until next version** (saves dismissal for installed version and policy). No choice within ten seconds, or buffered output past about 10 MiB, skips automatically.
- When a coding agent runs `next dev` or `next build`, the first eligible reminder stops the command with instructions to report the upgrade. Retrying the same command promptly continues the original task with a warning.
- Reminders require the installed Next.js version to support `experimental.agentUpgrade`; running the current canary upgrade CLI does not add reminders to an older installation.
- During `next dev`, DevTools can show a **Vulnerability Insight** with a copyable prompt for starting a `security` upgrade with a coding agent.

### experimental.agentFeedback

New apps created with recommended `create-next-app` settings enable it in the generated config.

When enabled and an agent is detected, `next dev` creates or updates a managed block delimited by `<!-- BEGIN:nextjs-agent-feedback -->` / `<!-- END:nextjs-agent-feedback -->` in `AGENTS.md`. The block lists friction categories (crashes, incorrect behavior, unclear documentation, unexpected CLI/codemod/upgrade behavior), forbids retaining code, logs, paths, URLs, secrets or personal data, and asks the coding agent to run one reporting pass (via `next internal agent-feedback-instructions`) before its final response. `next dev` restores the block if it is removed.

- Each distinct qualifying issue becomes a separate report draft (generic setup, reproduction steps, observed facts, expected result, optional control or workaround), opened once in a review form in your default browser. Nothing is sent when a form opens; you can edit, remove details, close, or select **Send feedback**.
- Submitting sends the reviewed content, the agent name, and the Next.js version. Project files and machine metadata are not attached automatically.
- To disable, set `experimental.agentFeedback` to `false` or remove it; the next `next dev` removes the managed block and preserves other content (the file is deleted if it held only the block). Disabling Next.js Telemetry also removes the block on the next `next dev`.
- When both `agentRules` and `agentFeedback` are enabled, both managed blocks are kept in `AGENTS.md`.

### Version History

| Version | Changes |
|---------|---------|
| `v16.4.0` | `agentRules: false` removes an existing managed block on `next dev`. |
| `v16.4.0` | `experimental.agentUpgrade` and `experimental.agentFeedback` added. |
| `v16.3.0` | `agentRules` added. |

## Related

- [AI Agents guide](../../guides/ai-agents.md)
- [Upgrade with a coding agent](../../guides/agent-upgrade.md)
