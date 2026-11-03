---
source: https://developers.cloudflare.com/containers/guides/deploy/
---

# Deploy Containers

Deploy from your machine or from Workers Builds, then verify.

## Signature / Usage

```
npx wrangler deploy
```

If `image` is a Dockerfile path, start Docker (or a compatible engine) first and point `image` at the Dockerfile itself, not its directory. A registry reference (Cloudflare Registry, Docker Hub, Amazon ECR, Google Artifact Registry) needs no Docker at deploy time.

Verify afterwards:

```
npx wrangler containers list
npx wrangler containers images list
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Production branch (Workers Builds) | deploy command | `npx wrangler deploy` | Publishes the image when needed and rolls out instances; Dockerfile builds can run in the Workers Builds environment. |
| Other branches (non-production builds enabled) | deploy command | `npx wrangler versions upload` | Uploads Worker code only; no new image, no rollout. |

## Notes

- `wrangler deploy` activates the Worker first, then builds/pushes the image (Dockerfile) or uses the registry reference. Steps are not transactional, so the new Worker can be live after an image or rollout error. For an existing application a rollout starts when the effective container configuration changes, and the command does not wait for it; new Worker code may briefly talk to containers on the previous image. The first deploy creates the application directly and can take several minutes; the Worker URL may respond before container routes succeed. A deploy with no effective container change starts no rollout.
- Workers Builds production: set the Deploy command to `npx wrangler deploy` (or a script running a full deploy), keep Wrangler config and Dockerfile/image reference under the build root directory, push to the production branch, then check the deploy.
- `wrangler versions upload` does not publish images or roll out instances. Version URLs are not generated for Workers that implement Durable Objects, including Containers Workers.
- Do not set the non-production deploy command on your production Worker to `wrangler deploy` to try an image from a feature branch: it deploys the Worker serving production traffic and can roll live instances. Use local development, or a separate staging Worker or Wrangler environment (for example `npx wrangler deploy --env staging`).
- Check: confirm the Worker deployment is active, send a request that must reach the container, optionally use the commands above or the Containers dashboard.
- Troubleshooting: instances look unchanged means a gradual rollout may still run, or the command did not update containers (`versions upload` or `--containers-rollout=none`). Docker missing matters only for a Dockerfile `image`: start Docker, use Workers Builds, switch to a registry image, or deploy Worker-only with `--containers-rollout=none`. First deploy with routes erroring: wait several minutes, then check logs.

## Related

- [Rollouts](./rollouts.md)
- [Image management](./image-management.md)
- [Local development](./local-dev.md)
