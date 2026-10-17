---
source: https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/
---

# Set environment variables within your container's environment

Set container environment variables with `environment`, `env_file`, or `docker compose run -e`.

```yaml
services:
  webapp:
    environment:
      DEBUG: "true"
```

Pass a shell value through, or interpolate with a warning when unset:

```yaml
web:
  environment:
    - DEBUG
```

```yaml
web:
  environment:
    - DEBUG=${DEBUG}
```

Load from files (the second is optional):

```yaml
services:
  webapp:
    env_file:
      - path: ./default.env
        required: true # default
      - path: ./override.env
        required: false
```

One-off override:

```console
$ docker compose run -e DEBUG=1 web python console.py
$ docker compose run -e DEBUG web python console.py
```

## Notes

- A container's environment is only set by explicit entries; do not pass passwords this way, use secrets.
- `env_file` paths are relative to the Compose file; multiple files are evaluated in order and later ones override earlier ones.
- `required: false` needs Docker Compose 2.24.0+; the `format` attribute needs 2.30.0+.
- Interpolation inside `.env` files is a Compose CLI feature, not supported by `docker run --env-file`.
