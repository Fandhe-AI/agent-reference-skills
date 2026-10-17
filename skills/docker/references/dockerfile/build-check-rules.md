---
source: https://docs.docker.com/reference/build-checks/
---

# Build checks

BuildKit has built-in support for analyzing your build configuration against pre-defined rules that enforce Dockerfile and build best practices. Checks run as a build invocation but produce no build output. This page aggregates the 21 rules; each rule has its own page at `https://docs.docker.com/reference/build-checks/<rule-slug>/` (kebab-case of the rule name).

## Signature / Usage

```console
$ docker build --check .
```

Skip or promote rules via the `check` parser directive:

```dockerfile
# syntax=docker/dockerfile:1
# check=skip=JSONArgsRecommended,StageNameCasing;error=true
```

## Options / Props

| Rule | Description |
| --- | --- |
| `StageNameCasing` | Stage names should be lowercase |
| `FromAsCasing` | The 'as' keyword should match the case of the 'from' keyword |
| `NoEmptyContinuation` | Empty continuation lines will become errors in a future release |
| `ConsistentInstructionCasing` | All commands within the Dockerfile should use the same casing (either upper or lower) |
| `DuplicateStageName` | Stage names should be unique |
| `ReservedStageName` | Reserved words should not be used as stage names |
| `JSONArgsRecommended` | JSON arguments recommended for ENTRYPOINT/CMD to prevent unintended behavior related to OS signals |
| `MaintainerDeprecated` | The MAINTAINER instruction is deprecated, use a label instead to define an image author |
| `UndefinedArgInFrom` | FROM command must use declared ARGs |
| `WorkdirRelativePath` | Relative workdir without an absolute workdir declared within the build can have unexpected results if the base image changes |
| `UndefinedVar` | Variables should be defined before their use |
| `MultipleInstructionsDisallowed` | Multiple instructions of the same type should not be used in the same stage |
| `LegacyKeyValueFormat` | Legacy key/value format with whitespace separator should not be used |
| `RedundantTargetPlatform` | Setting platform to predefined $TARGETPLATFORM in FROM is redundant as this is the default behavior |
| `SecretsUsedInArgOrEnv` | Sensitive data should not be used in the ARG or ENV commands |
| `InvalidDefaultArgInFrom` | Default value for global ARG results in an empty or invalid base image name |
| `FromPlatformFlagConstDisallowed` | FROM --platform flag should not use a constant value |
| `CopyIgnoredFile` | Attempting to Copy file that is excluded by .dockerignore |
| `InvalidDefinitionDescription` (experimental) | Comment for build stage or argument should follow the format: `# <arg/stage name> <description>`. If this is not intended to be a description comment, add an empty line or comment between the instruction and the comment. |
| `ExposeProtoCasing` | Protocol in EXPOSE instruction should be lowercase |
| `ExposeInvalidFormat` | IP address and host-port mapping should not be used in EXPOSE instruction. This will become an error in a future release |

## Notes

Per-rule details (output message, description, bad/good examples) from the individual rule pages:

- **StageNameCasing** — output: `Stage name 'BuilderBase' should be lowercase`. Bad: `FROM alpine AS BuilderBase`. Good: `FROM alpine AS builder-base`.
- **FromAsCasing** — output: `'as' and 'FROM' keywords' casing do not match`. Mixed case on a `FROM ... AS` line is reported. Bad: `FROM debian:latest as builder`. Good: `FROM debian:latest AS deb-builder` or `from debian:latest as deb-builder`. Related: `ConsistentInstructionCasing`.
- **NoEmptyContinuation** — output: `Empty continuation line found in: RUN apk add     gnupg     curl`. Empty lines following a newline escape are deprecated and will break builds in a future BuildKit release; remove them or add comments (comment lines aren't empty). Good:

  ```dockerfile
  FROM alpine
  EXPOSE \
  # Port
  80
  ```

- **ConsistentInstructionCasing** — output: `Command 'EntryPoint' should be consistently cased`. Use all uppercase or all lowercase (bad: `From alpine` / `Run echo hello` / `EntRYpOiNT [...]`).
- **DuplicateStageName** — output: `Duplicate stage name 'foo-base', stage names should be unique`. Multiple stages with the same name make the stage reference unresolvable (bad: two `AS builder`; good: `AS deb-builder` and `AS go-builder`).
- **ReservedStageName** — output: `'scratch' is reserved and should not be used as a stage name`. Reserved words: `context`, `scratch`. Bad: `FROM alpine AS scratch`; good: `FROM alpine AS builder`.
- **JSONArgsRecommended** — output: `JSON arguments recommended for ENTRYPOINT/CMD to prevent unintended behavior related to OS signals`. Shell form runs the program as a child of a shell, which doesn't pass signals (`SIGTERM`, `SIGKILL`). Bad: `ENTRYPOINT my-program start` (becomes `/bin/sh -c my-program start`). Good: `ENTRYPOINT ["my-program", "start"]`. The program then runs as `PID 1` with its special responsibilities (e.g. reaping child processes). Workarounds when a shell is needed: a wrapper script with a JSON-format `ENTRYPOINT ["/entrypoint.sh"]`, or an explicit `SHELL ["/bin/bash", "-c"]` before the shell-form `ENTRYPOINT` (suppresses the warning).
- **MaintainerDeprecated** — output: `MAINTAINER instruction is deprecated in favor of using label`. Use `LABEL org.opencontainers.image.authors="moby@example.com"`.
- **UndefinedArgInFrom** — output: `FROM argument 'VARIANT' is not declared`. Also tries to detect misspelled built-in args like `BUILDPLATFORM`. Bad: `FROM node:22${VARIANT} AS jsbuilder`. Good: `ARG VARIANT="-alpine3.20"` before it.
- **WorkdirRelativePath** — output: `Relative workdir 'app/src' can have unexpected results if the base image changes`. Warns on a relative `WORKDIR` without a prior absolute `WORKDIR` in the same Dockerfile. `WORKDIR` does not perform shell expansion (`~` is literal). Bad: `WORKDIR usr/share/nginx/html`; good: `WORKDIR /usr/share/nginx/html`.
- **UndefinedVar** — output: `Usage of undefined variable '$foo'`. Not evaluated for shell-form `RUN`, `CMD`, `ENTRYPOINT` (the shell resolves variables). Detects typos, e.g. `ENV PATH=$PAHT:/app/bin` gives `Usage of undefined variable '$PAHT' (did you mean $PATH?)`. Bad: `COPY $foo .`; good: `ARG foo` before it.
- **MultipleInstructionsDisallowed** — output: `Multiple CMD instructions should not be used in the same stage because only the last one will be used`. Applies to `CMD`, `HEALTHCHECK`, `ENTRYPOINT`; a top-level `CMD` and a `CMD` inside `HEALTHCHECK` can coexist.
- **LegacyKeyValueFormat** — output: `"ENV key=value" should be used instead of legacy "ENV key value" format`. Bad: `ARG foo bar`; good: `ARG foo=bar`. Multi-line legacy `ENV DEPS \` + lines: use `ENV DEPS="\` ... `"`. Leading whitespace on continuation lines is preserved inside quotes; remove it if undesired.
- **RedundantTargetPlatform** — output: `Setting platform to predefined $TARGETPLATFORM in FROM is redundant as this is the default behavior`. Bad: `FROM --platform=$TARGETPLATFORM alpine AS builder`; good: omit `--platform`.
- **SecretsUsedInArgOrEnv** — output: `Potentially sensitive data should not be used in the ARG or ENV commands`. `ENV`/`ARG` persist in the final image; use secret mounts instead:

  ```dockerfile
  RUN --mount=type=secret,id=aws_key_id,env=AWS_ACCESS_KEY_ID \
      --mount=type=secret,id=aws_secret_key,env=AWS_SECRET_ACCESS_KEY \
      aws s3 cp s3://my-bucket/file .
  ```

  ```console
  $ docker buildx build \
      --secret id=aws_key_id,env=AWS_ACCESS_KEY_ID \
      --secret id=aws_secret_key,env=AWS_SECRET_ACCESS_KEY .
  ```

- **InvalidDefaultArgInFrom** — output: `Using the global ARGs with default values should produce a valid build.` A build shouldn't need `--build-arg` to be valid. Bad: `ARG TAG` + `FROM busybox:${TAG}`. Good: `ARG TAG=latest`; `ARG VARIANT` + `FROM busybox:stable${VARIANT}` (valid when empty); `ARG TAG` + `FROM alpine:${TAG:-3.14}`.
- **FromPlatformFlagConstDisallowed** — output: `FROM --platform flag should not use constant value "linux/amd64"`. A constant forces a single target platform and prevents multi-platform builds. Recommended: omit `FROM --platform` and use `--platform` on the CLI; use `$BUILDPLATFORM` or a variable combination; include platform/OS/arch in the stage name for platform-specific stages (e.g. `FROM --platform=linux/amd64 alpine AS build_amd64` + `FROM build_${TARGETARCH} AS build`).
- **CopyIgnoredFile** — output: `Attempting to Copy file "./tmp/Dockerfile" that is excluded by .dockerignore`. Files matching `.dockerignore` aren't in the build context, so copying them errors. With `.dockerignore` containing `*/tmp/*`, bad: `COPY ./tmp/helloworld.txt /helloworld.txt`; good: `COPY ./forever/helloworld.txt /helloworld.txt`.
- **InvalidDefinitionDescription** (experimental, not enabled by default) — `--call=outline` / `--call=targets` print descriptions generated from comments immediately preceding `FROM` or `ARG` that begin with the stage or argument name:

  ```dockerfile
  # build-cli builds the CLI binary
  FROM alpine AS build-cli
  # VERSION controls the version of the program
  ARG VERSION=1
  ```

  For non-description comments, add an empty line or comment between the comment and the instruction.
- **ExposeProtoCasing** — output: `Defined protocol '80/TcP' in EXPOSE instruction should be lowercase`. Bad: `EXPOSE 80/TcP`; good: `EXPOSE 80/tcp`.
- **ExposeInvalidFormat** — output: `EXPOSE instruction should not define an IP address or host-port mapping, found '127.0.0.1:80:80'`. Will become an error in a future release. Bad: `EXPOSE 127.0.0.1:80:80`, `EXPOSE 80:80`; good: `EXPOSE 80`.

## Related

- [build-checks.md](./build-checks.md)
- [parser-directives.md](./parser-directives.md)
