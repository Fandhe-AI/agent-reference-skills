---
source: https://docs.docker.com/compose/how-tos/lifecycle/
---

# Using lifecycle hooks with Compose

Run commands right after a container starts (`post_start`) or just before it stops (`pre_stop`), optionally as root.

```yaml
services:
  app:
    image: backend
    user: 1001
    post_start:
      - command: /opt/scripts/register-service.sh
        user: root
```

```yaml
services:
  app:
    image: backend
    volumes:
      - data:/data
    pre_stop:
      - command: cp /data/app.db /data/app.db.bak

volumes:
  data: {} # a Docker volume is created with root ownership
```

## Notes

- `post_start` has no ordering guarantee relative to the container's `entrypoint`; use it only for work that need not finish before the app starts.
- `pre_stop` runs before the stop signal (`docker compose down`, `Ctrl+C`); it does not run if the container exits by itself or is killed.
- Hooks can run with elevated privileges (`user: root`) even when the container runs unprivileged.
