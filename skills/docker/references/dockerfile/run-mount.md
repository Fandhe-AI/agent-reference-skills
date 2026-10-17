---
source: https://docs.docker.com/reference/dockerfile/#run---mount
---

# RUN --mount

Creates filesystem mounts that the build can access: bind mounts to the host filesystem or other build stages, build secrets or ssh-agent sockets, and persistent package-manager caches.

## Signature / Usage

```dockerfile
RUN --mount=[type=<TYPE>][,option=<value>[,option=<value>]...]
```

```dockerfile
# syntax=docker/dockerfile:1
FROM golang
RUN --mount=type=cache,target=/root/.cache/go-build \
  go build ...
```

## Options / Props

Mount types:

| Type | Description |
| --- | --- |
| `bind` (default) | Bind-mount context directories (read-only). |
| `cache` | Mount a temporary directory to cache directories for compilers and package managers. |
| `tmpfs` | Mount a `tmpfs` in the build container. |
| `secret` | Allow the build container to access secure files such as private keys without baking them into the image or build cache. |
| `ssh` | Allow the build container to access SSH keys via SSH agents, with support for passphrases. |

### type=bind

Read-only by default.

| Option | Description |
| --- | --- |
| `target`, `dst`, `destination` | Mount path. |
| `source` | Source path in the `from`. Defaults to the root of the `from`. |
| `from` | Build stage, context, or image name for the root of the source. Defaults to the build context. |
| `rw`, `readwrite` | Allow writes on the mount. Written data is discarded after the `RUN` completes and is not committed to the image layer. |

### type=cache

| Option | Description |
| --- | --- |
| `id` | Optional ID to identify separate caches. Defaults to value of `target`. |
| `target`, `dst`, `destination` | Mount path. |
| `ro`, `readonly` | Read-only if set. |
| `sharing` | One of `shared`, `private`, or `locked`. Defaults to `shared`. `shared` can be used concurrently by multiple writers; `private` creates a new mount if there are multiple writers; `locked` pauses the second writer until the first releases the mount. |
| `from` | Build stage, context, or image name to use as a base of the cache mount. Defaults to empty directory. |
| `source` | Subpath in the `from` to mount. Defaults to the root of the `from`. |
| `mode` | File mode for new cache directory in octal. Default `0755`. |
| `uid` | User ID for new cache directory. Default `0`. |
| `gid` | Group ID for new cache directory. Default `0`. |

Example (apt, which needs exclusive access to its data):

```dockerfile
# syntax=docker/dockerfile:1
FROM ubuntu
RUN rm -f /etc/apt/apt.conf.d/docker-clean; echo 'Binary::apt::APT::Keep-Downloaded-Packages "true";' > /etc/apt/apt.conf.d/keep-cache
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,target=/var/lib/apt,sharing=locked \
  apt-get update && apt-get --no-install-recommends install -y gcc
```

### type=tmpfs

| Option | Description |
| --- | --- |
| `target`, `dst`, `destination` | Mount path. |
| `size` | Upper limit on the size of the filesystem. |

### type=secret

By default the secret is mounted as a file; set `env` to mount it as an environment variable.

| Option | Description |
| --- | --- |
| `id` | ID of the secret. Defaults to basename of the target path. |
| `target`, `dst`, `destination` | Mount the secret to the specified path. Defaults to `/run/secrets/` + `id` if unset and if `env` is also unset. |
| `env` | Mount the secret to an environment variable instead of a file, or both. (since Dockerfile v1.10.0) |
| `required` | If `true`, the instruction errors out when the secret is unavailable. Defaults to `false`. |
| `mode` | File mode for secret file in octal. Default `0400`. |
| `uid` | User ID for secret file. Default `0`. |
| `gid` | Group ID for secret file. Default `0`. |

```dockerfile
# syntax=docker/dockerfile:1
FROM python:3
RUN pip install awscli
RUN --mount=type=secret,id=aws,target=/root/.aws/credentials \
  aws s3 cp s3://... ...
```

```console
$ docker buildx build --secret "id=aws,src=${HOME}/.aws/credentials" .
```

Mount as an environment variable:

```dockerfile
# syntax=docker/dockerfile:1
FROM alpine
RUN --mount=type=secret,id=API_KEY,env=API_KEY \
    some-command --token-from-env "${API_KEY}"
```

```console
$ docker buildx build --secret id=API_KEY .
```

### type=ssh

| Option | Description |
| --- | --- |
| `id` | ID of SSH agent socket or key. Defaults to "default". |
| `target`, `dst`, `destination` | SSH agent socket path. Defaults to `/run/buildkit/ssh_agent.${N}`. |
| `required` | If `true`, the instruction errors out when the key is unavailable. Defaults to `false`. |
| `mode` | File mode for socket in octal. Default `0600`. |
| `uid` | User ID for socket. Default `0`. |
| `gid` | Group ID for socket. Default `0`. |

```dockerfile
# syntax=docker/dockerfile:1
FROM alpine
RUN apk add --no-cache openssh-client
RUN mkdir -p -m 0700 ~/.ssh && ssh-keyscan gitlab.com >> ~/.ssh/known_hosts
RUN --mount=type=ssh \
  ssh -q -T git@gitlab.com 2>&1 | tee /hello
```

```console
$ eval "$(ssh-agent)"
$ ssh-add ~/.ssh/id_rsa
(Input your passphrase here)
$ docker buildx build --ssh "default=${SSH_AUTH_SOCK}" .
```

You can also specify a path to a `*.pem` file on the host instead of `$SSH_AUTH_SOCK`; pem files with passphrases are not supported.

## Notes

- Adapted: shell variable expansions in the examples (`"${API_KEY}"`, `"${SSH_AUTH_SOCK}"`, `eval "$(ssh-agent)"`) are quoted; quoting was added to the official examples.
- Cache mount contents persist between builder invocations without invalidating the instruction cache. Use cache mounts only for better performance; your build must work with any contents of the cache directory, since another build may overwrite the files or GC may clean it.
- Cache mounts are stored in the builder's local storage. They are not included in exported build cache (`--cache-to`) and are not restored by `--cache-from`. If each build runs on a new builder (e.g. fresh CI runners), cache mounts start empty on every build.
- Windows containers (secret): the secret is delivered as a single-file, read-only bind mount (no `tmpfs`). An explicit `target` is required (e.g. `--mount=type=secret,id=mysecret,target=C:/path/to/secret`); use forward slashes because the escape character consumes backslashes. `mode`, `uid`, and `gid` are not supported and are ignored. The secret file is restricted via ACL to SYSTEM, Administrators, and the BuildKit daemon account, then removed after the step; it is written in clear text. The `RUN` step must execute as an administrator (e.g. `USER ContainerAdministrator`) to read it. An empty placeholder directory may remain at the `target` path in the resulting layer.

## Related

- [run.md](./run.md)
- [run-network-security.md](./run-network-security.md)
- [copy.md](./copy.md)
