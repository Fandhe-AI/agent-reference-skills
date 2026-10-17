---
source: https://docs.docker.com/build/checks/
---

# Checking your build configuration

Build checks (introduced in Dockerfile 1.8) validate your build configuration and run a series of checks before executing the build; an advanced form of linting for your Dockerfile and build options, or a dry-run mode for builds.

## Signature / Usage

```console
$ docker build --check .
```

Instead of executing the build steps, this only runs the checks and reports issues. Unlike a regular build, if any violations are reported with `--check`, the command exits with a non-zero status code.

Regular builds also run checks by default and display violations in the build output (warnings, exit code 0). Use `--debug` for details (link to the rule docs and a Dockerfile snippet):

```console
$ docker --debug build .
```

Fail the build on violations (checked before the actual build runs):

```dockerfile
# syntax=docker/dockerfile:1
# check=error=true

FROM alpine
CMD echo "Hello, world!"
```

Skip specific checks (CSV of check IDs) or all:

```dockerfile
# syntax=docker/dockerfile:1
# check=skip=JSONArgsRecommended,StageNameCasing
```

```dockerfile
# check=skip=all
```

## Options / Props

`BUILDKIT_DOCKERFILE_CHECK` build argument (CLI equivalent of the `check` directive):

| Value | Effect |
| --- | --- |
| `error=true` | Fail the build on check violations. |
| `skip=<CSV>` / `skip=all` | Skip listed checks / all checks. |
| `skip=...;error=true` | Combine with a semi-colon. |
| `experimental=all` | Enable all experimental checks. |
| `experimental=<CSV>` | Enable selected experimental checks. |

```console
$ docker build --check --build-arg "BUILDKIT_DOCKERFILE_CHECK=skip=JSONArgsRecommended,StageNameCasing;error=true" .
```

## Notes

- Supported in Buildx 0.15.0+, `docker/build-push-action` 6.6.0+, and `docker/bake-action` 5.6.0+. With the GitHub Actions, checks display in the diff view of pull requests.
- Experimental checks are disabled by default. Enable with `BUILDKIT_DOCKERFILE_CHECK=experimental=all` or in the Dockerfile with `# check=experimental=all` (or a CSV of check IDs). The `experimental` directive takes precedence over `skip`: `# check=skip=all;experimental=all` still runs the experimental checks.
- Combine `skip` and `error` with `;` in the directive or build argument.

## Related

- [build-check-rules.md](./build-check-rules.md)
- [parser-directives.md](./parser-directives.md)
