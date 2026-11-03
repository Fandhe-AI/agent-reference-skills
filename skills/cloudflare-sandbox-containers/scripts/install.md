---
source: https://developers.cloudflare.com/containers/get-started/, https://developers.cloudflare.com/sandbox/get-started/, https://developers.cloudflare.com/sandbox/get-started/build-a-coding-agent-runner/, https://developers.cloudflare.com/sandbox/get-started/build-an-ai-code-interpreter/, https://developers.cloudflare.com/sandbox/get-started/dynamic-workers/
---

# Install

Commands for creating Sandbox / Containers starter projects and adding dependencies.

## Signature / Usage

### Create the Containers starter template

```sh
npm create cloudflare@latest -- --template=cloudflare/templates/containers-template
```

`pnpm create cloudflare@latest --template=cloudflare/templates/containers-template` and `yarn create cloudflare --template=cloudflare/templates/containers-template` also work. Docker is required at deploy time (check that it is running with `docker info`).

### Check that Docker is running

```sh
docker info
```

If Docker is not running, this fails with an error containing "Cannot connect to the Docker daemon" or hangs.

### Create a Sandbox Worker project (Linux command execution)

```sh
npm create cloudflare@latest -- sandbox-linux --category=hello-world --type=hello-world --lang=ts --no-deploy --no-git --no-agents
cd sandbox-linux
```

For the contents of `wrangler.jsonc` and `src/index.ts`, see the sandbox pages under references.

### Add dependencies for the coding agent runner

```sh
npm create cloudflare@latest -- sandbox-coding-agent --category=hello-world --type=hello-world --lang=ts --no-deploy --no-git --no-agents
cd sandbox-coding-agent
npm i @cloudflare/sandbox zod
```

### Add dependencies for the AI code interpreter

```sh
npm create cloudflare@latest -- sandbox-code-interpreter --category=hello-world --type=hello-world --lang=ts --no-deploy --no-git --no-agents
cd sandbox-code-interpreter
npm i agents ai @ai-sdk/provider zod
```

### Create a Dynamic Workers (JavaScript execution) project

```sh
npm create cloudflare@latest -- sandbox-dynamic-worker --category=hello-world --type=hello-world --lang=ts --no-deploy
cd sandbox-dynamic-worker
```

## Notes

- `npm create cloudflare@latest` runs the latest published scaffolder; review the generated project before deploying.

## Related

- [Get started](../references/containers/get-started.md)
