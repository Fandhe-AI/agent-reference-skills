# Working with AI

## Signature / Usage

Version-matched agent guidance: when `turbo` detects an AI coding agent, it maintains a managed block in the repository-root `AGENTS.md` telling the agent to use the documentation bundled with the installed package (resolve the `turbo` package from the repository or relevant workspace instead of assuming root `node_modules/turbo`; start at that package's `docs/README.md`, then the relevant pages under `docs/`; version-matched and usable offline). Opt in with `agentGuidance`:

```json
{ "agentGuidance": true }
```

`turbo` creates `AGENTS.md` if needed and updates only its uniquely marked block, preserving existing instructions and other tools' blocks. Opting out does not remove an existing block. Commit the generated block to avoid an uncommitted change on a later agent invocation. New projects from the default starter include it.

Agent Skills (open standard, agentskills.io):

```bash
npx skills add vercel/turborepo
```

Teaches an agent Turborepo's best practices, monorepo patterns and conventions, anti-patterns, and performance optimization techniques.

Parallel agent execution with Git worktrees:

```bash
turbo run build
git branch feature-branch && git worktree add ../agent-2-worktree feature-branch
cd ../agent-2-worktree && turbo run build  # Cache is reused
```

Turborepo automatically shares the local cache across worktrees.

Task descriptions:

```json
{
  "tasks": {
    "build": {
      "description": "Compiles TypeScript and bundles the application",
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "description": "Runs the test suite with coverage",
      "dependsOn": ["build"]
    }
  }
}
```

Task descriptions make it easier for AI to understand the purpose of a task.

Terminal documentation search: if an AI agent can run shell commands, it can search versioned docs directly with `turbo docs`:

```bash
turbo docs [query]
```

## Options / Props

| Method | Description |
|---|---|
| Markdown responses | Send `Accept: text/markdown`, e.g. `curl -sL -H "Accept: text/markdown" https://turborepo.dev/docs` |
| Direct Markdown routes | Append `.md` to the URL (e.g. `https://turborepo.dev/docs.md`, `https://turborepo.dev/docs/crafting-your-repository/caching.md`) |
| Sitemap | `https://turborepo.dev/sitemap.md` lets agents discover what documentation exists |
| Versioned documentation | Specify via subdomain, e.g. the 2.7.6 docs at `https://v2-7-6.turborepo.dev/docs` |

`turbo docs` results link to versioned documentation matching the installed `turbo`. Task `description` fields help AI understand the repository, make better suggestions, and onboard faster.
