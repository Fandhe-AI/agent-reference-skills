---
source: https://docs.astral.sh/uv/concepts/authentication/git/
---

# Git credentials

uv allows packages to be installed from private Git repositories using SSH or HTTP authentication.

## Signature / Usage

```text
git+ssh://git@github.com/astral-sh/uv
git+https://git:github_pat_asdf@github.com/astral-sh/uv
```

## SSH authentication

Use the `ssh://` protocol:

- `git+ssh://git@<hostname>/...` (e.g., `git+ssh://git@github.com/astral-sh/uv`)
- `git+ssh://git@<host>/...` (e.g., `git+ssh://git@github.com-key-2/astral-sh/uv`)

SSH authentication requires using the username `git`.

## HTTP authentication

HTTP Basic authentication using a password or token:

- `git+https://<user>:<token>@<hostname>/...` (e.g., `git+https://git:github_pat_asdf@github.com/astral-sh/uv`)
- `git+https://<token>@<hostname>/...` (e.g., `git+https://github_pat_asdf@github.com/astral-sh/uv`)
- `git+https://<user>@<hostname>/...` (e.g., `git+https://git@github.com/astral-sh/uv`)

If there are no credentials present in the URL and authentication is needed, the Git credential helper is queried.

## Persistence of credentials

When using `uv add`, uv does not persist Git credentials to `pyproject.toml` or `uv.lock`. If you have a Git credential helper configured, your credentials may be automatically persisted, resulting in successful subsequent fetches. Without a credential helper (or on a machine without credentials seeded), uv fails to fetch the dependency. Passing `--raw` to `uv add` forces uv to persist Git credentials; setting up a credential helper instead is strongly recommended.

## Git credential helpers

If you use GitHub, the simplest way to set up a credential helper is to install the `gh` CLI and run:

```console
$ gh auth login
```

## Notes

- When using a GitHub personal access token, the username is arbitrary. GitHub does not allow account name and password in URLs like this, although other hosts may.
- `gh auth login` interactively configures the credential helper automatically. With `gh auth login --with-token`, run `gh auth setup-git` afterwards.
- `uv auth login` credentials are not yet used for Git requests.

## Related

- [HTTP credentials](./http-credentials.md)
- [The auth CLI](./auth-cli.md)
