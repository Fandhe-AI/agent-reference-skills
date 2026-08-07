# Working with AI

## Signature / Usage

Agent Skills:

```bash
npx skills add vercel/turborepo
```

Teaches an agent Turborepo's best practices, patterns, and anti-patterns.

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
| Markdown route | Append `.md` to the URL (e.g. `https://turborepo.dev/docs.md`) |
| Sitemap | `https://turborepo.dev/sitemap.md` |
| Version pinning | Specify via subdomain, e.g. `https://v2-7-6.turborepo.dev/docs` |
