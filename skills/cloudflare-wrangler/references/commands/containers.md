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

- `PATH` `string` optional
  - Path for the directory containing the Dockerfile to build.
- `-t, --tag` `string` required
  - Name and optionally a tag (format: "name:tag").
- `--path-to-docker` `string` optional
  - Path to your docker binary if it's not on `$PATH`.
  - Default: "docker"
- `-p, --push` `boolean` optional
  - Push the built image to Cloudflare's managed registry.
  - Default: false

### `delete`

Delete a Container (application).

```txt
wrangler containers delete <CONTAINER_ID> [OPTIONS]
```

- `CONTAINER_ID` `string` required
  - The ID of the Container to delete.

### `images`

Perform operations on images in your containers registry.

#### `images list`

List images in your containers registry.

```txt
wrangler containers images list [OPTIONS]
```

- `--filter` `string` optional
  - Regex to filter results.
- `--json` `boolean` optional
  - Return output as clean JSON.
  - Default: false

#### `images delete`

Remove an image from your containers registry.

```txt
wrangler containers images delete [IMAGE] [OPTIONS]
```

- `IMAGE` `string` required
  - Image to delete of the form `IMAGE:TAG`

### `registries`

Configure and view registries available to your container. Read more about the currently supported external registries in the Containers image-management guide (https://developers.cloudflare.com/containers/guides/image-management/#using-amazon-ecr-container-images).

#### `registries list`

List registries your containers are able to use.

```txt
wrangler containers registries list [OPTIONS]
```

- `--json` `boolean` optional
  - Return output as clean JSON.
  - Default: false

#### `registries configure`

Configure a new registry for your account.

```txt
wrangler containers registries configure [DOMAIN] [OPTIONS]
```

- `DOMAIN` `string` required
  - Domain to configure for the registry.
- `--dockerhub-username` `string` optional
  - The Docker Hub username to authenticate with. Use with the `docker.io` domain. The secret is a Docker Hub personal access token.
- `--aws-access-key-id` `string` optional
  - The AWS access key ID to authenticate with. Use with an Amazon ECR domain. The secret is the matching AWS secret access key.
- `--gar-email` `string` optional
  - The Google service account email to authenticate with. Use with a `*-docker.pkg.dev` domain.
- `--secret-store-id` `string` optional
  - The ID of the secret store to use to store the registry credentials
- `--secret-name` `string` optional
  - The name Wrangler should store the registry credentials under

The credential flags are mutually exclusive. Use the one that matches the registry you are configuring.

When run interactively, wrangler will prompt you for your secret and store it in Secrets Store. To run non-interactively, you can send your secret value to wrangler through stdin to have the secret created for you.

#### `registries delete`

Remove a registry configuration from your account.

```txt
wrangler containers registries delete [DOMAIN] [OPTIONS]
```

- `DOMAIN` `string` required
  - domain of the registry to delete

#### `registries credentials`

Generate temporary credentials to push or pull images from the Cloudflare managed registry (`registry.cloudflare.com`).

```txt
wrangler containers registries credentials [OPTIONS]
```

- `--push` `boolean` optional
  - Generate credentials with push permission.
- `--pull` `boolean` optional
  - Generate credentials with pull permission.
- `--expiration-minutes` `number` optional
  - How long the credentials should be valid for (in minutes).
  - Default: 15

At least one of `--push` or `--pull` must be specified.

### `info`

Get information about a specific Container, including top-level details and a list of instances.

```txt
wrangler containers info <CONTAINER_ID> [OPTIONS]
```

- `CONTAINER_ID` `string` required
  - The ID of the Container to get information about.

### `instances`

List all Container instances for a given application. Displays instance ID, name, state, location, version, and creation time.

In interactive mode, results are paginated. Press `Enter` to load the next page or `Esc`/`q` to stop. In non-interactive environments (for example, when piping output or running in CI), all pages are fetched automatically.

Use the `--json` flag to return output as a flat JSON array. Each element contains the fields `id`, `name`, `state`, `location`, `version`, and `created`. This is also the default output format in non-interactive environments.

```txt
wrangler containers instances <APPLICATION_ID> [OPTIONS]
```

- `APPLICATION_ID` `string` required
  - The UUID of the application to list instances for. Use `wrangler containers list` to find application IDs.
- `--per-page` `number` optional
  - Number of instances per page.
  - Default: 25
- `--json` `boolean` optional
  - Return output as clean JSON.
  - Default: false

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

- `TAG` `string` required
  - The name and tag of the container image to push.
- `--path-to-docker` `string` optional
  - Path to your docker binary if it's not on `$PATH`.
  - Default: "docker"

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

- `INSTANCE_ID` `string` required
  - The ID of the Container instance to SSH into.
- `-t, --tty` `boolean` optional
  - Force pseudo-terminal (PTY) allocation. Use this when running an interactive command.

## Notes

- Flags are documented per subcommand as bullet lists (name, type, required/optional, description) in the official page; they are kept in that form above.

## Related

- [Commands overview](./overview.md)
- [Secrets Store](./secrets-store.md)
