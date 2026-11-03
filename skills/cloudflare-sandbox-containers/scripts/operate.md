---
source: https://developers.cloudflare.com/containers/guides/ssh/, https://developers.cloudflare.com/workers/wrangler/commands/containers/
---

# Operate

Inspect running container instances and connect over SSH. Full flag tables belong to the cloudflare-wrangler skill.

## Signature / Usage

### List containers

```sh
npx wrangler containers list
```

### List instances

```sh
wrangler containers instances <APPLICATION_ID>
```

Find `<APPLICATION_ID>` with `wrangler containers list`.

### SSH into an instance

```bash
wrangler containers ssh <INSTANCE_ID>
```

An `ssh-ed25519` public key is required in `authorized_keys` in the Wrangler configuration. The target instance must be running (SSH does not start a stopped container).

### Run a command over SSH

```bash
wrangler containers ssh <INSTANCE_ID> --tty -- top
```

Add `--tty` for interactive commands.

### Use as an OpenSSH ProxyCommand

```sh
ssh -o ProxyCommand="wrangler containers ssh %h" cloudchamber@<INSTANCE_ID>
```

### Delete a container application

```sh
wrangler containers delete <CONTAINER_ID>
```

> **Warning**: Destructive operation that deletes the container. Confirm the target ID with `wrangler containers list` before running it.

## Notes

- Commands run over SSH execute inside the container instance, not on your machine.

## Related

- [SSH](../references/containers/ssh.md)
- [Wrangler configuration](../references/containers/wrangler-configuration.md)
