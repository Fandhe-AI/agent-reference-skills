---
source: https://developers.cloudflare.com/workers/wrangler/commands/containers/
---

# Containers

Interact with Containers using Wrangler.

## Signature / Usage

### `build`

Build a Container image from a Dockerfile.

```txt
wrangler containers build [PATH] [OPTIONS]
```

### `delete`

Delete a Container (application).

```txt
wrangler containers delete <CONTAINER_ID> [OPTIONS]
```

### `images`

Perform operations on images in your containers registry.

#### `images list`

List images in your containers registry.

```txt
wrangler containers images list [OPTIONS]
```

#### `images delete`

Remove an image from your containers registry.

```txt
wrangler containers images delete [IMAGE] [OPTIONS]
```

### `registries`

Configure and view registries available to your container. Read more about the currently supported external registries in the Containers image-management guide (https://developers.cloudflare.com/containers/guides/image-management/#using-amazon-ecr-container-images).

#### `registries list`

List registries your containers are able to use.

```txt
wrangler containers registries list [OPTIONS]
```

#### `registries configure`

Configure a new registry for your account.

```txt
wrangler containers registries configure [DOMAIN] [OPTIONS]
```

The credential flags are mutually exclusive. Use the one that matches the registry you are configuring.

When run interactively, wrangler will prompt you for your secret and store it in Secrets Store. To run non-interactively, you can send your secret value to wrangler through stdin to have the secret created for you.

#### `registries delete`

Remove a registry configuration from your account.

```txt
wrangler containers registries delete [DOMAIN] [OPTIONS]
```

#### `registries credentials`

Generate temporary credentials to push or pull images from the Cloudflare managed registry (`registry.cloudflare.com`).

```txt
wrangler containers registries credentials [OPTIONS]
```

At least one of `--push` or `--pull` must be specified.

### `info`

Get information about a specific Container, including top-level details and a list of instances.

```txt
wrangler containers info <CONTAINER_ID> [OPTIONS]
```

### `instances`

List all Container instances for a given application. Displays instance ID, name, state, location, version, and creation time.

In interactive mode, results are paginated. Press `Enter` to load the next page or `Esc`/`q` to stop. In non-interactive environments (for example, when piping output or running in CI), all pages are fetched automatically.

Use the `--json` flag to return output as a flat JSON array. Each element contains the fields `id`, `name`, `state`, `location`, `version`, and `created`. This is also the default output format in non-interactive environments.

```txt
wrangler containers instances <APPLICATION_ID> [OPTIONS]
```

For example, to list instances for an application:

```sh
wrangler containers instances 12345678-abcd-1234-abcd-123456789abc
```

```sh
INSTANCE                              NAME        STATE          LOCATION  VERSION  CREATED
a1b2c3d4-e5f6-7890-abcd-ef1234567890  worker-12   running        sfo06     3        2025-06-01T12:00:00Z
b2c3d4e5-f6a7-8901-bcde-f12345678901  worker-47   provisioning   iad01     2        2025-06-01T13:00:00Z
```

To get the same data as JSON:

```sh
wrangler containers instances 12345678-abcd-1234-abcd-123456789abc --json
```

```json
[
	{
		"id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
		"name": "worker-12",
		"state": "running",
		"location": "sfo06",
		"version": 3,
		"created": "2025-06-01T12:00:00Z"
	}
]
```

### `list`

List the Containers in your account.

```txt
wrangler containers list [OPTIONS]
```

### `push`

Push a tagged image to a Cloudflare managed registry, which is automatically integrated with your account.

```txt
wrangler containers push [TAG] [OPTIONS]
```

### `ssh`

Connect to a running Container instance using SSH. Refer to the Containers SSH guide (https://developers.cloudflare.com/containers/guides/ssh/) for configuration details.

```txt
wrangler containers ssh <INSTANCE_ID> [OPTIONS]
```

You can also specify a command to run, instead of the default shell. For example:

```txt
wrangler containers ssh <INSTANCE_ID> -- ls -al
```

Only the default shell gets a terminal automatically. To run an interactive command, such as `top`, pass `--tty`:

```txt
wrangler containers ssh <INSTANCE_ID> --tty -- top
```

## Options / Props

### `build`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `PATH` | `string` | — | (optional) Path for the directory containing the Dockerfile to build. |
| `-t, --tag` | `string` | — | (required) Name and optionally a tag (format: "name:tag"). |
| `--path-to-docker` | `string` | "docker" | (optional) Path to your docker binary if it's not on `$PATH`. |
| `-p, --push` | `boolean` | false | (optional) Push the built image to Cloudflare's managed registry. |

### `delete`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `CONTAINER_ID` | `string` | — | (required) The ID of the Container to delete. |

### `images list`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `--filter` | `string` | — | (optional) Regex to filter results. |
| `--json` | `boolean` | false | (optional) Return output as clean JSON. |

### `images delete`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `IMAGE` | `string` | — | (required) Image to delete of the form `IMAGE:TAG` |

### `registries list`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `--json` | `boolean` | false | (optional) Return output as clean JSON. |

### `registries configure`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `DOMAIN` | `string` | — | (required) Domain to configure for the registry. |
| `--dockerhub-username` | `string` | — | (optional) The Docker Hub username to authenticate with. Use with the `docker.io` domain. The secret is a Docker Hub personal access token. |
| `--aws-access-key-id` | `string` | — | (optional) The AWS access key ID to authenticate with. Use with an Amazon ECR domain. The secret is the matching AWS secret access key. |
| `--gar-email` | `string` | — | (optional) The Google service account email to authenticate with. Use with a `*-docker.pkg.dev` domain. |
| `--secret-store-id` | `string` | — | (optional) The ID of the secret store to use to store the registry credentials |
| `--secret-name` | `string` | — | (optional) The name Wrangler should store the registry credentials under |

### `registries delete`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `DOMAIN` | `string` | — | (required) domain of the registry to delete |

### `registries credentials`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `--push` | `boolean` | — | (optional) Generate credentials with push permission. |
| `--pull` | `boolean` | — | (optional) Generate credentials with pull permission. |
| `--expiration-minutes` | `number` | 15 | (optional) How long the credentials should be valid for (in minutes). |

### `info`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `CONTAINER_ID` | `string` | — | (required) The ID of the Container to get information about. |

### `instances`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `APPLICATION_ID` | `string` | — | (required) The UUID of the application to list instances for. Use `wrangler containers list` to find application IDs. |
| `--per-page` | `number` | 25 | (optional) Number of instances per page. |
| `--json` | `boolean` | false | (optional) Return output as clean JSON. |

### `push`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `TAG` | `string` | — | (required) The name and tag of the container image to push. |
| `--path-to-docker` | `string` | "docker" | (optional) Path to your docker binary if it's not on `$PATH`. |

### `ssh`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `INSTANCE_ID` | `string` | — | (required) The ID of the Container instance to SSH into. |
| `-t, --tty` | `boolean` | — | (optional) Force pseudo-terminal (PTY) allocation. Use this when running an interactive command. |

## Notes

- `list` has no command-specific arguments or flags in the official page.
- The "required" / "optional" markers in the Description column come from the official page, which has no separate column for them.
- The Containers product (the `Container` class, images, limits, pricing) is covered by the cloudflare-sandbox-containers skill (https://developers.cloudflare.com/containers/); this page lists only the `wrangler containers` command flags.

## Related

- [Commands overview](./overview.md)
- [Secrets Store](./secrets-store.md)
