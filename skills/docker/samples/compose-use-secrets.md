---
source: https://docs.docker.com/compose/how-tos/use-secrets/
---

# Manage secrets securely in Docker Compose

Grant services file-based secrets (mounted at `/run/secrets/<name>`) and pass a build-time secret from an environment variable.

```yaml
services:
   db:
     image: mysql:latest
     volumes:
       - db_data:/var/lib/mysql
     environment:
       MYSQL_ROOT_PASSWORD_FILE: /run/secrets/db_root_password
       MYSQL_DATABASE: wordpress
       MYSQL_USER: wordpress
       MYSQL_PASSWORD_FILE: /run/secrets/db_password
     secrets:
       - db_root_password
       - db_password

   wordpress:
     depends_on:
       - db
     image: wordpress:latest
     ports:
       - "8000:80"
     environment:
       WORDPRESS_DB_HOST: db:3306
       WORDPRESS_DB_USER: wordpress
       WORDPRESS_DB_PASSWORD_FILE: /run/secrets/db_password
     secrets:
       - db_password


secrets:
   db_password:
     file: db_password.txt
   db_root_password:
     file: db_root_password.txt

volumes:
    db_data:
```

Build secret taken from the `NPM_TOKEN` environment variable:

```yaml
services:
  myapp:
    build:
      secrets:
        - npm_token
      context: .

secrets:
  npm_token:
    environment: NPM_TOKEN
```

## Notes

- Two steps: define the top-level `secrets` element, then reference it from each service's `secrets` attribute; access is granted per service.
- Linux containers only (Compose bind-mounts a single file per secret).
- The `*_FILE` environment variables are an image convention (for example Docker Official Images `mysql` and `postgres`), not a Compose feature.
- Keep the secret files (`db_password.txt` and so on) out of version control.
