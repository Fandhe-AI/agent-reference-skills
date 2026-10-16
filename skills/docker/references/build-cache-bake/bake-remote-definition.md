---
source: https://docs.docker.com/build/bake/remote-definition/
---

# Remote Bake file definition

Bake files can be built directly from a remote Git repository or HTTPS URL.

## Signature / Usage

```console
$ docker buildx bake "https://github.com/docker/cli.git#v20.10.11" --print
```

Use the local context with a remote definition via the `cwd://` prefix:

```hcl
target "default" {
  context = "cwd://"
  dockerfile-inline = <<EOT
FROM alpine
WORKDIR /src
COPY . .
RUN ls -l && stop
EOT
}
```

Combine local and remote definitions:

```console
docker buildx bake -f bake.hcl -f cwd://local.hcl "https://github.com/crazy-max/buildx.git#remote-with-local" --print
```

## Notes

- The Bake definition is fetched from the remote location and its groups or targets are executed. If the remote definition doesn't specify a build context, the context is set to the Git remote automatically.
- `cwd://` defines contexts relative to the directory where the Bake command runs. You can append a path (`cwd://src/docs/content`); the path must be within the working directory, otherwise (absolute path or relative path leaving the working directory) Bake throws an error. Without the `cwd://` prefix a named-context path is resolved relative to the build context.

```hcl
target "default" {
  contexts = {
    docs = "cwd://src/docs/content"
  }
  dockerfile = "Dockerfile"
}
```

- If the repository contains more than one Bake file, choose with `--file` / `-f`: `docker buildx bake -f bake.hcl "https://github.com/crazy-max/buildx.git#remote-with-local"`.
- With `-f`, `bake.hcl` loads relative to the Git URL, `cwd://local.hcl` relative to the current working directory. Combining is needed e.g. in GitHub Actions with `docker/metadata-action`, which generates a Bake file in the runner's local context:

```yml
      - name: Build
        uses: docker/bake-action@v7
        with:
          files: |
            ./docker-bake.hcl
            cwd://${{ steps.meta.outputs.bake-file }}
          targets: build
```

- Private repositories: if you can authenticate with the default `SSH_AUTH_SOCK`, no extra parameters are needed. For HTTP token or custom SSH agents use the environment variables `BUILDX_BAKE_GIT_AUTH_TOKEN`, `BUILDX_BAKE_GIT_AUTH_HEADER`, `BUILDX_BAKE_GIT_SSH`.

## Related

- [Bake file reference](./bake-file-reference.md)
- [Using Bake with additional contexts](./bake-contexts.md)
