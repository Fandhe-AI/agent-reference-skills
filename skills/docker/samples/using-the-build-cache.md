---
source: https://docs.docker.com/get-started/docker-concepts/building-images/using-the-build-cache/
---

# Using the build cache

Reorder Dockerfile instructions so dependency installation stays cached until `package.json` / `yarn.lock` change.

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production 
COPY . . 
EXPOSE 3000
CMD ["node", "src/index.js"]
```

Add a `.dockerignore` next to the Dockerfile:

```plaintext
node_modules
```

Rebuild after editing a source file; the dependency layers are reused:

```console
$ docker build -t node-app:3.0 .
```

## Notes

- Cache invalidation: a changed `RUN` command, changed files copied by `COPY` / `ADD`, and every layer after an invalidated layer.
- The original Dockerfile used `COPY . .` before `RUN yarn install`, so any source change re-ran the install.
- Cached steps show as `CACHED` in the build output.
