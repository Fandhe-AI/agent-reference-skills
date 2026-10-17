# vercel vcr

Entry point for managing Vercel Container Registry (VCR) from the CLI: list, inspect, create, and delete repositories, browse tags, and manage images.

## Signature / Usage

```bash
vercel vcr ls
vercel vcr login docker
vercel vcr build docker . --push
vercel vcr build docker ./app my-api:1.2.3 --push
vercel vcr add my-repository
vercel vcr image ls my-repository --untagged
vercel vcr tag inspect my-repository latest
```

## Options / Props

| Name | Description |
|------|-------------|
| `login <docker\|podman\|buildah>` | Authenticate the tool with VCR using a short-lived OIDC token |
| `build docker [dir] [repo:tag] --push` | Build the directory with Docker and, with `--push`, push it in one step (to the linked project's repository when no repo is given) |
| `push` | Publish images |
| `add <repository>` | Create a repository explicitly (repositories are also created on first push) |
| `ls` | List repositories in the linked project |
| `tag` | Browse a repository's tags; `tag inspect <repository> <tag>` inspects one |
| `image` | List, inspect, or delete images; `image ls <repository> [--untagged]` lists images, optionally only untagged ones |
| `permissions` | Manage which teams a repository is shared with |

## Notes

- Full subcommand surface is documented in the Container Registry CLI Reference (`/docs/container-registry/cli-reference`); this page is the entry-point summary
- Use Docker-compatible tooling to push/pull images, e.g. `docker push vcr.vercel.com/<team>/<project>/<repository>:latest` after `vercel vcr login docker`
- The `vercel vcr add`, `image ls --untagged` and `tag inspect` forms come from the 2026-08-20 changelog; the CLI docs page itself lists only the entry-point summary (`login`, `build`, `push`, `tag`, `image`, `permissions`)
- GitHub Actions: `vercel/vcr-action/login@v1` (changelog 2026-09-25) authenticates a workflow to `vcr.vercel.com` via GitHub OIDC without long-lived credentials (it exchanges the workflow's OIDC token for a short-lived Vercel token and revokes it when the job ends). Needs an OIDC policy on the Vercel team granting read-write access to VCR and `id-token: write` on the workflow or job; Docker is the default engine, pass `engines` for Podman or Buildah. See the GitHub Actions guide in the Container Registry docs
- `vercel vcr permissions` manages which teams a repository is shared with (see Container Registry docs, public and shared repositories); the docs page does not detail a public-repository flow, so check `vercel vcr --help`
- After VCR prepares a `linux/amd64` image it can be used as a custom Vercel Sandbox image (changelog 2026-09-25)

## Related

- [dev.md](./dev.md)
