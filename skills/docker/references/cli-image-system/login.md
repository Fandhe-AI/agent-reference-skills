---
source: https://docs.docker.com/reference/cli/docker/login/
---

# docker login

Authenticate to a registry. Credentials are stored in the configured credential store.

## Signature / Usage

```console
$ docker login [OPTIONS] [SERVER]
```

```console
$ docker login
$ docker login registry.example.com
$ docker login registry.example.com:1337
$ docker login -u moby
$ cat ~/my_password.txt | docker login --username foo --password-stdin
$ cat ~/my_password.txt | docker login --username foo --password -
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-p`, `--password` |  | Password or Personal Access Token (PAT), or `-` to read from stdin |
| `--password-stdin` |  | Take the Password or Personal Access Token (PAT) from stdin |
| `-u`, `--username` |  | Username |

## Notes

### Credential stores

Configure an external store in `$HOME/.docker/config.json` (Linux) or `%USERPROFILE%/.docker/config.json` (Windows). The value is the suffix after `docker-credential-`:

```json
{
  "credsStore": "osxkeychain"
}
```

Default lookup: `osxkeychain` on macOS, `wincred` on Windows, `pass` on Linux (falls back to `secretservice`). If none is present, credentials are stored base64-encoded in `config.json`. Helpers (D-Bus Secret Service, Apple macOS keychain, Microsoft Windows Credential Manager, pass) come from the `docker-credential-helpers` releases page and must be in the client's `$PATH`.

Per-registry credential helpers take precedence over the default store:

```json
{
  "credHelpers": {
    "myregistry.example.com": "secretservice",
    "docker.internal.example": "pass"
  }
}
```

If currently logged in, run `docker logout` first, then `docker login` again after changing either setting.

### Credential helper protocol

A helper is any program implementing the protocol; the first argument is the action: `store`, `get`, or `erase`.

- `store`: JSON payload on stdin with `ServerURL`, `Username`, and `Secret` (password or identity token; for an identity token `Username` is `<token>`).
- `get`: server address string on stdin; writes JSON with `Username` and `Secret` to STDOUT.
- `erase`: server address string on stdin.

```json
{
  "ServerURL": "https://index.docker.io/v1",
  "Username": "david",
  "Secret": "passw0rd1"
}
```

`store` and `erase` can write error messages to STDOUT that the Engine shows.

### Other notes

- For Docker Hub, `docker login` uses a web-based device code flow by default unless `--username` is specified.
- Registry addresses should include only the hostname and optionally the port, not URL path components (`registry.example.com/foo/` is incorrect); Docker Hub may use `/v1/` for historical reasons. The default port assumed is 443 or 80.
- `--password-stdin` keeps the password out of shell history and log files.
- With Docker Desktop, credentials are saved to the OS native keychain automatically.
- Storing credentials in `config.json` base64-encoded is less secure than an external credential store.
- `docker scout` and `docker build` may also require authentication for subscription-only features.

## Related

- [docker logout](./logout.md)
- [docker image push](./image-push.md)
- [docker image pull](./image-pull.md)
- [docker](./docker.md)
