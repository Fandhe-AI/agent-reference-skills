# Upgrade with a coding agent

`next upgrade --agent` has a coding agent upgrade and verify a Next.js app (experimental; supports App Router and Pages Router projects).

## Signature / Usage

```bash filename="Terminal"
npx next@canary upgrade --agent=latest
```

```bash filename="Terminal"
npx next@canary upgrade apps/web --agent=latest
```

```ts filename="next.config.ts"
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: 'latest',
  },
}

export default nextConfig
```

## Options / Props

| Policy | Behavior |
|--------|----------|
| `security` | For an affected stable version, selects the latest safe release in the earliest eligible major |
| `latest` | Moves stable, RC, beta, and preview apps to npm's `latest` stable release, or a canary app to the `canary` release |
| `experimental-future` | Applies the `latest` policy, then adopts applicable Future Defaults |

## Notes

- Page front matter marks this guide `version: experimental`.
- Omit the policy to use the string value of `experimental.agentUpgrade`; otherwise the command uses `security`. `--agent` cannot be combined with `--revision`. Without `--agent`, `next upgrade` runs the interactive codemod workflow.
- `security` supports stable installations; canary installations can use `latest` or `experimental-future`; RC, beta, and preview installations can use `latest`. Other prerelease channels are unsupported.
- Using `next@canary` runs the latest upgrade tooling even for an older app. The CLI picks a canary target only when the app already uses canary, and respects a package manager's minimum release age.
- Future Defaults are features Next.js plans to enable by default (Cache Components, Partial Prefetching). For App Router projects on Next.js 16.3 or later, `experimental-future` prepares the Cache Components guide and adoption Skill. Pages Router projects do not get Cache Components until they use the App Router.
- The CLI checks installed version, release metadata, and security data, then copies relevant migration guides to a temporary directory (every major crossed), prepares Skills, and creates a task. The task asks the agent to avoid duplicate work, use a separate Git worktree when available, run checks, verify the result, and save the policy as `experimental.agentUpgrade`.
- Inside a coding agent the CLI prints the task for that agent. In an interactive terminal it can start an installed Codex or Claude Code session or copy the prompt; non-interactive terminals print the task.
- Upgrade reminders are enabled by default with the `security` policy; set `experimental.agentUpgrade` to `false` to disable. `next dev` / `next build` buffer output while the reminder is open (Upgrade now / Skip / Skip until next version). During `next dev`, DevTools can show a Vulnerability Insight with a copyable `security` upgrade prompt.

## Related

- [AI Coding Agents](./ai-agents.md)
- [Codemods](./codemods.md)
- [Migrating to Cache Components](./migrating-to-cache-components.md)
- [Adopting Partial Prefetching](./adopting-partial-prefetching.md)
