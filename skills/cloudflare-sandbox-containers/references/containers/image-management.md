---
source: https://developers.cloudflare.com/containers/guides/image-management/
---

# Image management

Which images a Container can use and how to configure and update them depends on the scheduling policy: `durable_object` (named images chosen in Durable Object code) or `default` (one `image` per application in Wrangler).

## Signature / Usage

`durable_object` policy, named images:

```jsonc
{
	"containers": [
		{
			"class_name": "AgentComputer",
			"scheduling_policy": "durable_object",
			"images": {
				"base": {
					"dockerfile": "./container/Dockerfile",
					"build_context": ".",
				},
				"tools": {
					"image": "registry.cloudflare.com/<ACCOUNT_ID>/<REPOSITORY>@sha256:<DIGEST>",
				},
			},
		},
	],
}
```

`default` policy, Dockerfile built and pushed during `wrangler deploy`:

```jsonc
{
	"containers": [
		{
			"image": "./Dockerfile"
		}
	]
}
```

Push an image to the Cloudflare Registry (needed for external images under `durable_object`):

```bash
docker pull <PUBLIC_IMAGE>
docker tag <PUBLIC_IMAGE> <IMAGE>:<TAG>
npx wrangler containers push <IMAGE>:<TAG>
```

Get the digest for a `durable_object` named image:

```bash
docker image inspect --format '{{join .RepoDigests "\n"}}' registry.cloudflare.com/<YOUR_ACCOUNT_ID>/<IMAGE>:<TAG>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `cloudflare/debian-trixie` | managed image identifier | — | (durable_object policy only) Node.js 24.20.0 on Debian Trixie slim (`node:24.20.0-trixie-slim` pinned by digest). A Cloudflare-managed identifier, not a public Docker Hub image: `this.ctx.container.start({ image: "cloudflare/debian-trixie", enableInternet: false })`. |
| images.<name>.dockerfile | string | — | (durable_object policy only) Path to a Dockerfile, built on deploy. Exactly one of `dockerfile` or `image` per entry. |
| images.<name>.image | string | — | (durable_object policy only) Digest-pinned Cloudflare managed registry reference. |
| images.<name>.build_context | string | — | (durable_object policy only) Build context for that image. |
| images.<name>.build_vars | Record<string, string> | — | (durable_object policy only) Build variables for that image. |
| image (default policy) | string | — | Local Dockerfile path or a reference from the Cloudflare Registry (`registry.cloudflare.com`), Docker Hub, Amazon ECR, or Google Artifact Registry. |

Registry configuration (default policy, private images) with `wrangler containers registries configure <DOMAIN>`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| docker.io | registry domain | — | Flag `--dockerhub-username=<YOUR_DOCKERHUB_USERNAME>`; secret is a read-only personal access token. |
| `<AWS_ACCOUNT_ID>.dkr.ecr.<AWS_REGION>.amazonaws.com` | registry domain | — | Flag `--aws-access-key-id=<AWS_ACCESS_KEY_ID>`; secret is the AWS secret access key. Public ECR is not supported. |
| `<REGION>-docker.pkg.dev` | registry domain | — | Flag `--gar-email=<SERVICE_ACCOUNT_EMAIL>` (must match `client_email` in the key); secret is the service account JSON key (Artifact Registry Reader role). Only `*-docker.pkg.dev` hosts; `gcr.io` is unsupported. |
| `--secret-name`, `--secret-store-id`, `--skip-confirmation` | flags | — | Name or reuse a Secrets Store secret, target a store, and run non-interactively. In CI pass the secret on stdin. |

## Notes

- Up to 100 named images per configuration; names are 1 to 128 characters. External registries (Docker Hub, ECR, GAR) are not supported as direct `durable_object` image references and registry credentials configured with `wrangler containers registries configure` are not used by that policy; pull, tag and push to the Cloudflare Registry first, then use the digest-pinned reference. A named `dockerfile` entry may use an external image in `FROM` (authenticate Docker locally for a private base).
- Updating a named image (change the Dockerfile or the digest, then deploy) does not restart running containers; each Durable Object sees the image map of the Worker version running it during a gradual deployment. Application code decides when to restart. To keep a running container on its current image, start with the configured image only when `!this.ctx.container.running`. To upgrade immediately, compare `inspect()` with the configured image and `destroy()` when they differ. `inspect().image` is empty while starting and for a snapshot-restored container, so those are skipped:

Adapted (not in the official docs): wrapped in a Durable Object method (the source used `this` and `await` at top level).

```js
import { DurableObject } from "cloudflare:workers";

export class AgentComputer extends DurableObject {
	async ensureCurrentImage() {
		const image = this.ctx.container.images.base;
		const info = await this.ctx.container.inspect();

		if (info && info.image !== "" && info.image !== image) {
			await this.ctx.container.destroy();
		}

		if (!this.ctx.container.running) {
			this.ctx.container.start({
				image,
				instance: "standard-2",
				enableInternet: false,
			});
		}
	}
}
```

- `destroy()` stops the container immediately: in-progress work and filesystem changes since startup are lost. Snapshot first if needed; a snapshot is tied to its image and cannot be restored onto an updated one (see snapshots.md).
- `default` policy: changing `image` deploys through an application-wide rollout. Wrangler builds the Dockerfile locally (Docker or a compatible CLI must be running) and pushes layers to the Cloudflare registry, backed by R2, with authentication handled automatically; later deploys push only changed layers. Cloudflare does not cache images pulled from Docker Hub, Amazon ECR, or Google Artifact Registry; Docker Hub limits and cloud egress charges may apply. Public Docker Hub images need no registry configuration; official images use the `library` namespace (`docker.io/library/<IMAGE>:<TAG>`).
- Private registry examples, CI form with the secret piped on stdin, not argv (commands run on your machine against your account; replace placeholders; never commit secrets):

```bash
printf '%s' "$DOCKERHUB_PAT" | npx wrangler containers registries configure docker.io --dockerhub-username=<YOUR_DOCKERHUB_USERNAME> --secret-name=<SECRET_NAME> --skip-confirmation
```

```bash
cat <PATH_TO_KEY> | npx wrangler containers registries configure <REGION>-docker.pkg.dev --gar-email=<SERVICE_ACCOUNT_EMAIL> --secret-name=<SECRET_NAME> --skip-confirmation
```

- ECR needs an IAM user with a read-only policy: `ecr:GetAuthorizationToken` on `*`, and `ecr:BatchCheckLayerAvailability`, `ecr:GetDownloadUrlForLayer`, `ecr:BatchGetImage` scoped to the repositories (`arn:aws:ecr:<REGION>:<ACCOUNT>:repository/<NAME>`; official page example uses `repository/*`, prefer a specific repository). Reference the image as `<AWS_ACCOUNT_ID>.dkr.ecr.<AWS_REGION>.amazonaws.com/<REPOSITORY>:<TAG>`; GAR as `<REGION>-docker.pkg.dev/<PROJECT_ID>/<REPOSITORY>/<IMAGE>:<TAG>`.
- Build and push in one step: `npx wrangler containers build -p -t <TAG> .` (also usable in CI with `wrangler containers push`). Pushed tags work in `default` policy as `registry.cloudflare.com/<YOUR_ACCOUNT_ID>/<IMAGE>:<TAG>`; `durable_object` needs `@sha256:<DIGEST>`.
- Local development: `wrangler dev` supports all four registries; `vite dev` cannot pull directly from the Cloudflare Registry (workaround: a local Dockerfile with `FROM <IMAGE_REFERENCE>`). Authenticate locally (for example `docker login`) for private images.
- Limits: image size is bounded by the instance type disk; `wrangler containers images delete` frees space but reverting a Worker to a version using a deleted image errors (see limits.md).
- Adapted from the official docs: the ECR policy note recommends scoping to a specific repository instead of the wildcard shown in the page; the IAM JSON is not repeated here because the page's version contains `//` comments that are not valid JSON.

## Related

- [Scheduling policy](./scheduling-policy.md)
- [Snapshots](./snapshots.md)
- [Rollouts](./rollouts.md)
- [Deploy](./deploy.md)
- [Local development](./local-dev.md)
- [Limits](./limits.md)
