# vercel link

Link a local directory to a Vercel Project. Stores metadata in `.vercel/project.json`.

## Signature / Usage

```bash
vercel link
vercel link [path-to-directory]
vercel link --yes --project foo
vercel link --repo
vercel link add
vercel link add --yes --scope your_team_slug
```

## Options / Props

| Name | Description |
|------|-------------|
| `--repo` | Link all projects in the repository to their respective Vercel projects (requires Git integration) |
| `--yes` | Skip setup questions; use defaults (does not choose a team; pass `--scope` if you belong to more than one team). With `link add`, selects existing projects without prompts |
| `--project` | Project name or ID to link; useful in non-interactive mode when project name differs from directory name |

## Notes

- `VERCEL_PROJECT_ID` env var can be used instead of `--project`; `--project` takes precedence
- `vercel link add` adds projects to an existing repository link while preserving current mappings. Run `vercel link --repo` first to create `.vercel/repo.json`; the repository needs a Git remote and its Vercel Projects must use the Git integration
- `link add` offers a team/project prompt, excludes projects already in the repository link, can run from the repo root or a subdirectory, and may offer to create projects for detected local applications. With `--yes` it selects existing projects and skips creating new ones; for non-interactive use pass `--scope` and authenticate with a token or existing login
- To use a project without a link (for example in CI/CD), set both `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`; if you run `vercel link` with both set it confirms that project without prompts and does not create or change `.vercel`
- Once linked, other CLI commands auto-detect the project from `.vercel/project.json`
- Source: https://vercel.com/docs/cli/link (fetched 2026-11-14)

## Related

- [deploy.md](./deploy.md)
- [pull.md](./pull.md)
- [dev.md](./dev.md)
- [global-options.md](./global-options.md)
