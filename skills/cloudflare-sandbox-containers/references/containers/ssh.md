---
source: https://developers.cloudflare.com/containers/guides/ssh/
---

# SSH

Anyone with write access to a Container can SSH into it through Wrangler when a matching public key is in `authorized_keys`. No public port is exposed; connections go through `wrangler containers ssh`, which authenticates against your Cloudflare account.

## Signature / Usage

```jsonc
{
	"containers": [
		{
			// other options here...
			"authorized_keys": [
				{
					"name": "<NAME>",
					"public_key": "<YOUR_PUBLIC_KEY_HERE>"
				}
			]
		}
	]
}
```

Connect to a running instance (the shell and any command run inside the remote container instance, never on your host):

```bash
wrangler containers ssh <INSTANCE_ID>
```

Run a command instead of the default shell (`--tty` for interactive commands):

```bash
wrangler containers ssh <INSTANCE_ID> --tty -- top
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| ssh.enabled | boolean | `true` | Controls whether you can SSH in through Wrangler; `false` disables SSH access completely. |
| authorized_keys[].name | string | — | Display name of the key. |
| authorized_keys[].public_key | string | — | Public key; only `ssh-ed25519` is supported. |
| `--tty` | flag | — | Allocate a terminal for interactive commands. |
| `--stdio` | flag | — | Force pipe mode for use as a ProxyCommand. |

## Notes

- Find the instance ID with `wrangler containers instances` or in the dashboard. The instance must be running: SSH does not start a stopped container and an active SSH connection does not keep one alive.
- OpenSSH proxy use (Wrangler pipes stdin/stdout to the SSH server in the running container):

```sh
ssh -o ProxyCommand="wrangler containers ssh %h" cloudchamber@<INSTANCE_ID>
```

- Without the `containers_pid_namespace` compatibility flag, all processes in the VM are visible over SSH. The flag is on by default for Workers with a compatibility date of `2026-04-01` or later.
- SSH works with both scheduling policies; the full `ssh` / `authorized_keys` key table is in the cloudflare-wrangler skill.

## Related

- [Wrangler configuration](./wrangler-configuration.md)
- [Scheduling policy](./scheduling-policy.md)
