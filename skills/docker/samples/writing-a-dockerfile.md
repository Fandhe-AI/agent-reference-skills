---
source: https://docs.docker.com/get-started/docker-concepts/building-images/writing-a-dockerfile/
---

# Writing a Dockerfile

Write a minimal Dockerfile for a Node.js app using FROM / WORKDIR / COPY / RUN / CMD.

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "./src/index.js"]
```

A fuller Python example from the same page (non-root user, `EXPOSE`):

```dockerfile
FROM python:3.13
WORKDIR /usr/local/app

# Install the application dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy in the source code
COPY src ./src
EXPOSE 8080

# Setup an app user so the container doesn't run as the root user
RUN useradd app
USER app

CMD ["uvicorn", "app.main:app", "--app-dir", "src", "--host", "0.0.0.0", "--port", "8080"]
```

## Notes

- The `Dockerfile` has no file extension.
- The Node.js Dockerfile is intentionally not production-ready (no build-cache ordering, runs as root, single stage); see the build cache and multi-stage samples.
- Typical order: determine base image, install dependencies, copy source, configure the final image.
- Adapted: the official CMD omits --app-dir; since the source is copied to ./src, --app-dir src is added so uvicorn can import app.main (assumes src/app/main.py).
