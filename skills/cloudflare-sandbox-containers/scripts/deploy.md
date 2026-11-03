---
source: https://developers.cloudflare.com/containers/get-started/, https://developers.cloudflare.com/containers/configuration/rollouts/, https://developers.cloudflare.com/sandbox/get-started/build-a-coding-agent-runner/
---

# Deploy

Deployment, rollouts, and post-deploy checks. Full flag tables belong to the cloudflare-wrangler skill.

## Signature / Usage

### Deploy the Worker and containers

```sh
npx wrangler deploy
```

Docker is required when `image` is a Dockerfile path. The Worker is activated first; the image build, push, and rollout happen afterwards (non-transactional). On the first deploy, the container path may return errors for a few minutes.

### Immediate rollout

```sh
npx wrangler deploy --containers-rollout=immediate
```

Targets 100% of container instances in a single step. Use it when the Worker and image must stay compatible.

### Deploy Worker code only

```sh
npx wrangler deploy --containers-rollout=none
```

The image and running instances are not changed. `--containers-rollout` applies only to `wrangler deploy`, not to `wrangler versions upload`.

### Deploy to a staging environment

```sh
npx wrangler deploy --env staging
```

Do not use `wrangler deploy` as the deploy command for non-production branches of a production Worker: it rolls out containers for the same Worker as production. Set up a separate staging Worker or Wrangler environment.

### Deploy the coding agent runner (secrets file)

```sh
npx wrangler deploy --secrets-file .secrets.json
```

> **Warning**: `.secrets.json` contains credentials. Add it to `.gitignore` and never commit it. Delete it after deployment if it is no longer needed.

### Verify after deploying

```sh
npx wrangler containers list
npx wrangler containers images list
```

Lists the containers and their status in the account, and the images in the Cloudflare Registry.

## Notes

- `wrangler deploy` rolls out containers for the Worker it targets; use a separate Worker or environment for non-production branches.
- Keep secrets files such as `.secrets.json` out of version control.

## Related

- [Rollouts](../references/containers/rollouts.md)
- [Wrangler configuration](../references/containers/wrangler-configuration.md)
