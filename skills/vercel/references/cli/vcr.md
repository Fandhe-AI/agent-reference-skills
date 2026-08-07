# vercel vcr

Entry point for managing Vercel Container Registry (VCR) from the CLI: list, inspect, create, and delete repositories, browse tags, and manage images.

## Signature / Usage

```bash
vercel vcr ls
vercel vcr login docker
```

## Options / Props

| Name | Description |
|------|-------------|
| `login <docker\|podman\|buildah>` | Authenticate the tool with VCR using a short-lived OIDC token |
| `tag` | Browse a repository's tags |
| `image` | List, inspect, or delete images |
| `permissions` | Manage which teams a repository is shared with |

## Notes

- Full subcommand surface is documented in the Container Registry CLI Reference (`/docs/container-registry/cli-reference`); this page is the entry-point summary
- Use Docker-compatible tooling to push/pull images

## Related

- [dev.md](./dev.md)
