---
source: https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/
---

# Set, use, and manage variables in a Compose file with interpolation

Substitute `${VAR}` values into a Compose file from `.env`, `--env-file`, or the shell.

```console
$ cat .env
TAG=v1.5
$ cat compose.yaml
services:
  web:
    image: "webapp:${TAG}"
$ docker compose config
services:
  web:
    image: 'webapp:v1.5'
```

Alternate env file:

```console
$ docker compose --env-file ./config/.env.dev config
$ docker compose --env-file .env --env-file .env.override up
```

Inspect the variables Compose used:

```console
$ docker compose config --environment
```

## Notes

- Syntax: `${VAR}`, `${VAR:-default}` / `${VAR-default}`, `${VAR:?error}` / `${VAR?error}`, `${VAR:+replacement}` / `${VAR+replacement}`; the `:` forms treat empty as unset. Applies to unquoted and double-quoted values.
- Precedence: shell environment, then `--env-file`, then the project-directory `.env`. An unset variable becomes an empty string (`postgres:` is not a valid image reference).
- In `.env` files, `#` lines are comments, single-quoted values are literal, and double-quoted values support `\n`, `\r`, `\t`, `\\`.
- Substitution from `.env` is a Compose CLI feature, not supported by `docker stack deploy`.
