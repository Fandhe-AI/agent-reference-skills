---
source: https://docs.docker.com/compose/how-tos/environment-variables/envvars-precedence/
---

# Environment variables precedence in Docker Compose

See which value wins when a variable is defined in several places.

```console
$ cat ./webapp.env
NODE_ENV=test

$ cat compose.yaml
services:
  webapp:
    image: 'webapp'
    env_file:
     - ./webapp.env
    environment:
     - NODE_ENV=production

$ docker compose run webapp env | grep NODE_ENV
NODE_ENV=production
```

## Notes

- Highest to lowest: `docker compose run -e`; `environment` / `env_file` with a value interpolated from the shell or an env file; `environment` attribute with a literal value; `env_file` attribute; image `ENV`.
- The Host OS environment and `.env` file do not reach the container by themselves; they only take effect through `environment` / `env_file` interpolation or `run --env VAR`.
- Without `--env-file`, Compose can load up to two `.env` files: the project directory one and, if it sets `COMPOSE_FILE` to another directory, a second one with lower precedence.
