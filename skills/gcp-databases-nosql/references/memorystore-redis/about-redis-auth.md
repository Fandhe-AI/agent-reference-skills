---
source: https://docs.cloud.google.com/memorystore/docs/redis/about-redis-auth
---

# About Redis AUTH

AUTH is optional on Memorystore for Redis. When enabled, incoming connections must authenticate with the instance's AUTH string before running commands.

## Signature / Usage

Enable AUTH at creation by adding the `--enable-auth` flag to `gcloud redis instances create` (see [create-manage-instances.md](./create-manage-instances.md)); if omitted, AUTH is disabled.

Authenticate from a client session:

Adapted (not in the official docs): the lower-case placeholders `instance-ip-address` and `auth-string` were upper-cased so they read as placeholders.

```bash
redis-cli -h INSTANCE_IP_ADDRESS
AUTH AUTH_STRING
```

## Options / Props

### Effect of changing AUTH status on connections

| Action | Versions 3.2 - 5.0 | Versions 6.x - 7.2 |
|---|---|---|
| Enabling | Commands are rejected regardless of whether connections are established | Commands from established connections continue; if the client doesn't provide the correct password on reconnection, commands fail |
| Disabling | Commands from established connections continue; even with the correct password, reconnection fails | (same) |
| Rotating (disable and re-enable) | Commands from established and authenticated connections continue; on reconnection without the correct password, commands fail | (same) |

### Errors

| Error | Versions | Meaning and fix |
|---|---|---|
| `NOAUTH Authentication required.` | All | Client not authenticated but AUTH is enabled; configure the correct password |
| `ERR invalid password.` | 3.2 - 5.0 | Incorrect password; fix client configuration |
| `ERR Client sent AUTH, but no password is set.` | 3.2 - 5.0 | AUTH disabled; disable auth in the client or enable AUTH on the instance |
| `WRONGPASS invalid username-password pair or user is disabled. ` | 6.x - 7.2 | Incorrect username or password |
| `ERR AUTH <password> called without any password configured for the default user. Are you sure your configuration is correct?` | 6.x - 7.2 | AUTH disabled; disable auth in the client or enable AUTH on the instance |

## Notes

- The AUTH string is a 36-character UUID, unique per instance and regenerated each time AUTH is enabled, so toggling AUTH off and on changes it. A client that authenticated stays authenticated for the life of the connection even if the string changes.
- Without in-transit encryption there is no guarantee that commands are encrypted end to end. AUTH does not secure data in transit and does not protect against malicious entities with access to your VPC network; limit VPC access to known users and clients.
- With read replicas enabled, every connection requires initial authentication. The exact behavior may differ depending on the tools or client libraries used.
- Snippet taken from https://docs.cloud.google.com/memorystore/docs/redis/connect-redis-instance (the AUTH overview page has no commands).
- Adapted from the official docs: the original block is `redis-cli -h instance-ip-address` / `AUTH auth-string`.
- The source documents `--enable-auth` only as a standalone flag; neither the create page nor the gcloud reference shows a full create command that includes it, so no create example is reproduced here. "If omitted AUTH is disabled" is from https://docs.cloud.google.com/sdk/gcloud/reference/redis/instances/create.
- Never print the AUTH string; avoid `redis-cli -a` (shell history and process list exposure).
- Source: https://docs.cloud.google.com/memorystore/docs/redis/about-redis-auth (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [connect-redis-instance.md](./connect-redis-instance.md)
- [create-manage-instances.md](./create-manage-instances.md)
- [about-read-replicas.md](./about-read-replicas.md)
