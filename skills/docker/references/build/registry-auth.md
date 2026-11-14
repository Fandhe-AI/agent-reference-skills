---
source: https://docs.docker.com/build/building/registry-auth/
---

# Registry authentication

Buildx uses Docker's credential configuration to authenticate when pulling images for a build and pushing build results, and can select separate credential configurations by repository and scope.

## Signature / Usage

Sign in to the registry before building:

```console
$ docker login registry.example.com
```

For repository- and scope-specific credentials, the default config directory can contain:

```text
~/.docker/buildx/config/
└── registry.example.com/
    └── team/
        ├── app@pull/
        │   └── config.json
        └── app@pull,push/
            └── config.json
```

Populate these files with Docker credential configurations. For example, use the Docker CLI's `--config` flag to store credentials in the pull config directory:

```console
$ docker --config \
    ~/.docker/buildx/config/registry.example.com/team/app@pull \
    login registry.example.com
```

## Options / Props

| Item | Description |
| --- | --- |
| `$BUILDX_CONFIG/config/<registry>[/<repository>][@<scope>[,<scope>...]]` | Directory holding a Docker `config.json` for the given registry, optional repository, and optional scopes. |
| `<repository>` | Must match the full repository name. |
| `<scope>` | Registry token actions, such as `pull` and `push`. |

## Notes

### Select credentials by repository and scope

- Buildx can load separate Docker credential configurations for specific registry repositories and token scopes. Use this when a build needs different credentials for repositories on the same registry, or for pull and push requests.
- If `BUILDX_CONFIG` isn't set, use the config directory lookup order described for `BUILDX_CONFIG` in Build variables.
- Use a different config directory and credentials for the combined `pull,push` scope. Buildx prefers repository-specific matches over registry-wide matches, then prefers the match with more scope actions. Every action in a config's directory suffix must be present in the requested scope.
- If no alternative matches, Buildx uses the normal Docker credential config. Alternative matching applies when authentication requests contain a single repository scope; requests involving multiple repositories use the normal config.
- This is a Buildx-specific compatibility mechanism. Docker commands don't automatically select these configs by repository or scope. The `--config` example only chooses where `docker login` stores credentials.
- See the `docker login` reference for credential stores and authentication methods.
- Source: https://docs.docker.com/build/building/registry-auth/ (docker/docs @ 553482c, retrieved 2026-11-14 JST)

## Related

- [Build variables](./build-variables.md)
- [Build secrets](./secrets.md)
