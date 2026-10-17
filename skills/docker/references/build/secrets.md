---
source: https://docs.docker.com/build/building/secrets/
---

# Build secrets

A build secret is sensitive information (password, API token) consumed during the build. Build arguments and environment variables persist in the final image, so use secret mounts or SSH mounts instead.

## Signature / Usage

Two steps: pass the secret to the build, then consume it in the Dockerfile.

```console
$ docker build --secret "id=aws,src=${HOME}/.aws/credentials" .
```

```hcl
variable "HOME" {
  default = null
}

target "default" {
  secret = [
    "id=aws,src=${HOME}/.aws/credentials"
  ]
}
```

```dockerfile
RUN --mount=type=secret,id=aws \
    AWS_SHARED_CREDENTIALS_FILE=/run/secrets/aws \
    aws s3 cp ...
```

## Notes

### Types

- Secret mounts: general-purpose; the secret is temporarily available in the build container for the duration of the instruction.
- SSH mounts: SSH sockets or keys inside builds (e.g. fetch private Git repositories).
- Git authentication for remote contexts: pre-defined "pre-flight" secrets used by the builder to fetch a private Git context.

### Secret mounts

Source is a file or an environment variable (type auto-detected; or `type=file` / `type=env`).

```console
$ docker build --secret id=kube,env=KUBECONFIG .
$ docker build --secret id=API_TOKEN .
```

The second form mounts the `API_TOKEN` variable at `/run/secrets/API_TOKEN`. Default mount path is `/run/secrets/<id>`; customize with `target` and `env` on `RUN --mount`:

```dockerfile
RUN --mount=type=secret,id=aws,target=/root/.aws/credentials \
    aws s3 cp ...

RUN --mount=type=secret,id=aws-key-id,env=AWS_ACCESS_KEY_ID \
    --mount=type=secret,id=aws-secret-key,env=AWS_SECRET_ACCESS_KEY \
    --mount=type=secret,id=aws-session-token,env=AWS_SESSION_TOKEN \
    aws s3 cp ...
```

`target` and `env` can be combined to mount a secret as both a file and an environment variable.

### SSH mounts

```dockerfile
# syntax=docker/dockerfile:1
FROM alpine
ADD git@github.com:me/myprivaterepo.git /src/
```

```console
$ docker buildx build --ssh default .
```

### Git authentication for remote contexts

Pre-defined secrets `GIT_AUTH_TOKEN` and `GIT_AUTH_HEADER` provide HTTP authentication for private Git contexts and for `ADD` of private Git repositories.

- `GIT_AUTH_TOKEN`: Basic authentication with fixed username `x-access-token` (GitHub-style): `Authorization: Basic <base64("x-access-token:<GIT_AUTH_TOKEN>")>`.
- `GIT_AUTH_HEADER`: the exact value you provide is used as the `Authorization` header (any Git provider).

```console
$ GIT_AUTH_TOKEN=$(gh auth token) docker build \
  --secret id=GIT_AUTH_TOKEN \
  https://github.com/example/todo-app.git

$ export GIT_AUTH_HEADER="Basic $(echo -n "gitlab-ci-token:${CI_JOB_TOKEN}" | base64)"
$ docker build \
  --secret id=GIT_AUTH_HEADER \
  https://gitlab.com/example/todo-app.git
```

Per-host secrets: append the hostname to the secret ID.

```console
$ docker build \
  --secret id=GIT_AUTH_TOKEN.github.com,env=GITHUB_TOKEN \
  --secret id=GIT_AUTH_HEADER.gitlab.com,env=GITLAB_AUTH_HEADER \
  https://github.com/example/todo-app.git
```

### HTTP authentication for COPY and ADD

Create `HTTP_AUTH_TOKEN_<host>` or `HTTP_AUTH_HEADER_<host>` secrets. For example `HTTP_AUTH_TOKEN_127.0.0.1=token` makes requests to `127.0.0.1` add `Authorization: Bearer token`. These follow the same convention as the Git HTTP authentication scheme.

### Other notes

- Bake equivalents: `target.secret` / `target.ssh` in the Bake file reference.

## Related

- [Build variables](./build-variables.md)
- [Build context](./build-context.md)
