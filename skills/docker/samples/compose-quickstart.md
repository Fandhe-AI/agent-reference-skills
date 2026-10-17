---
source: https://docs.docker.com/compose/gettingstarted/
---

# Docker Compose Quickstart

Flask hit counter with Redis: health-check ordering, Compose Watch, a named volume, and `include`.

`app.py`:

```python
import os
import redis
from flask import Flask

app = Flask(__name__)
cache = redis.Redis(
    host=os.getenv("REDIS_HOST", "redis"),
    port=int(os.getenv("REDIS_PORT", "6379")),
)

@app.route("/")
def hello():
    count = cache.incr("hits")
    return f"Hello from Docker! I have been seen {count} time(s).\n"
```

`Dockerfile`:

```dockerfile
# syntax=docker/dockerfile:1

# Build an image with the Python 3.12 image
FROM python:3.12-alpine

# Set the working directory to `/code`
WORKDIR /code

# Set environment variables used by the `flask` command
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# Install `gcc` and other dependencies
RUN apk add --no-cache gcc musl-dev linux-headers

# Copy `requirements.txt`
COPY requirements.txt .

# Install the Python dependencies
RUN pip install -r requirements.txt

# Copy the current directory `.` in the project to the workdir `.` in the image
COPY . .

EXPOSE 5000

# Set the default command for the container to `flask run --debug`
CMD ["flask", "run", "--debug"]
```

`.env`:

```text
APP_PORT=8000
REDIS_HOST=redis
REDIS_PORT=6379
```

`compose.yaml` (single-file version with health check, watch, and a named volume):

```yaml
services:
  web:
    build: .
    ports:
      - "${APP_PORT}:5000"
    environment:
      - REDIS_HOST=${REDIS_HOST}
      - REDIS_PORT=${REDIS_PORT}
    depends_on:
      redis:
        condition: service_healthy
    develop:
      watch:
        - action: sync+restart
          path: .
          target: /code
        - action: rebuild
          path: requirements.txt

  redis:
    image: redis:alpine
    volumes:
      - redis-data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5
      start_period: 10s

volumes:
  redis-data:
```

Run and inspect:

```console
$ docker compose up --watch
$ docker compose config
$ docker compose logs -f web
$ docker compose exec redis redis-cli GET hits
$ docker compose down
```

## Notes

- `requirements.txt` contains `flask` and `redis`; add `.env`, `*.pyc`, `__pycache__`, `redis-data` to `.dockerignore` so secrets stay out of the build context.
- `docker compose down` keeps named volumes; `docker compose down -v` deletes them (and the counter).
- The guide's last step moves the `redis` service and `redis-data` volume into `infra.yaml` and adds `include: - path: ./infra.yaml` to `compose.yaml`; see the include sample.
- `docker compose config` shows the fully resolved model (interpolated variables, expanded ports, project-prefixed names).
