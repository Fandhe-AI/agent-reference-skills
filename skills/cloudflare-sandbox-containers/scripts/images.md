---
source: https://developers.cloudflare.com/containers/guides/image-management/, https://developers.cloudflare.com/workers/wrangler/commands/containers/
---

# Images

Build, push, list, and delete images, and configure authentication for private registries. Full flag tables belong to the cloudflare-wrangler skill. Docker or a compatible CLI is required.

## Signature / Usage

### Build and push an image (one step)

```sh
npx wrangler containers build -p -t <TAG> .
```

Set the printed registry URI (`registry.cloudflare.com/<YOUR_ACCOUNT_ID>/<IMAGE>:<TAG>`) as `image` in the Wrangler configuration.

### Push an image from another registry to the Cloudflare Registry

```sh
docker pull <PUBLIC_IMAGE>
docker tag <PUBLIC_IMAGE> <IMAGE>:<TAG>
npx wrangler containers push <IMAGE>:<TAG>
```

With the `durable_object` scheduling policy, external registries cannot be referenced directly, so this procedure is required.

### Get the digest of a pushed image

```sh
docker image inspect --format '{{join .RepoDigests "\n"}}' registry.cloudflare.com/<YOUR_ACCOUNT_ID>/<IMAGE>:<TAG>
```

Use the line starting with `registry.cloudflare.com/` as the `image` of a named image (in the `@sha256:<DIGEST>` form).

### List images

```sh
npx wrangler containers images list
```

### Delete an image

```sh
npx wrangler containers images delete <IMAGE>:<TAG>
```

> **Warning**: Rolling the Worker back to an earlier version that uses a deleted image results in an error.

### Authenticate to a private Docker Hub image (interactive)

```sh
npx wrangler containers registries configure docker.io --dockerhub-username=<YOUR_DOCKERHUB_USERNAME>
```

Enter the secret (a read-only personal access token) at the interactive prompt; it is stored in Secrets Store.

### Authenticate to Docker Hub (CI / scripts)

```sh
printf '%s' "$DOCKERHUB_PAT" | npx wrangler containers registries configure docker.io --dockerhub-username=<YOUR_DOCKERHUB_USERNAME> --secret-name=<SECRET_NAME> --skip-confirmation
```

Pass the secret on stdin, not as an argument. Supply `DOCKERHUB_PAT` through the environment.

### Authenticate to Amazon ECR (interactive)

```sh
npx wrangler containers registries configure <AWS_ACCOUNT_ID>.dkr.ecr.<AWS_REGION>.amazonaws.com --aws-access-key-id=<AWS_ACCESS_KEY_ID>
```

### Authenticate to Amazon ECR (CI / scripts)

```sh
printf '%s' "$AWS_SECRET_ACCESS_KEY" | npx wrangler containers registries configure <AWS_ACCOUNT_ID>.dkr.ecr.<AWS_REGION>.amazonaws.com --aws-access-key-id=<AWS_ACCESS_KEY_ID> --secret-name=<SECRET_NAME> --skip-confirmation
```

Use a read-only IAM user. Public ECR is not supported.

### Authenticate to Google Artifact Registry (interactive)

```sh
npx wrangler containers registries configure <REGION>-docker.pkg.dev --gar-email=<SERVICE_ACCOUNT_EMAIL>
```

Only `*-docker.pkg.dev` hosts are supported (`gcr.io` is not).

### Authenticate to Google Artifact Registry (CI / scripts)

```sh
cat <PATH_TO_KEY> | npx wrangler containers registries configure <REGION>-docker.pkg.dev --gar-email=<SERVICE_ACCOUNT_EMAIL> --secret-name=<SECRET_NAME> --skip-confirmation
```

Pass the service account JSON key on stdin. Do not keep the key file in the repository.

### Reference an existing Secrets Store secret

```sh
npx wrangler containers registries configure <REGION>-docker.pkg.dev --gar-email=<SERVICE_ACCOUNT_EMAIL> --secret-name=<EXISTING_SECRET_NAME> --skip-confirmation
```

## Notes

- Use read-only registry credentials and pass secrets on stdin or through the environment, never as command arguments.
- `containers images delete` is destructive; confirm the tag first.

## Related

- [Image management](../references/containers/image-management.md)
