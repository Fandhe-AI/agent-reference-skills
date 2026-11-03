---
source: https://developers.cloudflare.com/workers/previews/configuration/
---

# Preview Configuration

Configure variables, secrets, and bindings for Previews via the `previews` block (Previews Base configuration, or per branch).

## Signature / Usage

Production settings at the top level; Preview settings in `previews` (required, may be empty). Point Preview bindings at staging/test resources.

```jsonc
{
  // ...
  "vars": {
    "ENVIRONMENT": "production"
  },
  "r2_buckets": [
    {
      "binding": "UPLOADS",
      "bucket_name": "prod-uploads"
    }
  ],
  // ...
  "previews": {
    // ...
    "vars": {
      "ENVIRONMENT": "preview"
    },
    "r2_buckets": [
      {
        "binding": "UPLOADS",
        "bucket_name": "r2-staging"
      }
    ]
    // ...
  }
}
```

```toml
[vars]
ENVIRONMENT = "production"

[[r2_buckets]]
binding = "UPLOADS"
bucket_name = "prod-uploads"

[previews.vars]
ENVIRONMENT = "preview"

[[previews.r2_buckets]]
binding = "UPLOADS"
bucket_name = "r2-staging"
```

Empty `previews` block when only top-level settings are needed:

```jsonc
{
  // Set this to today's date
  "compatibility_date": "2026-11-03",
  "assets": {
    "directory": "./public"
  },
  "previews": {}
}
```

```toml
# Set this to today's date
compatibility_date = "2026-11-03"
previews = { }

[assets]
directory = "./public"
```

## Options / Props

Secrets commands (`--name` defaults to the current git branch):

| I want to | Command |
| --- | --- |
| Add a secret to the **Base configuration** | `npx wrangler preview base-config secret put SECRET_NAME` |
| Add a secret to **one Preview** | `npx wrangler preview secret put SECRET_NAME --name <preview>` |
| Remove a secret from the **Base configuration** | `npx wrangler preview base-config secret delete SECRET_NAME` |
| Remove a secret from **one Preview** | `npx wrangler preview secret delete SECRET_NAME --name <preview>` |

Where each setting belongs:

| Setting | Behavior |
| --- | --- |
| `assets` | Top level only, even with an `ASSETS` binding. `npx wrangler preview` uploads assets from the branch you are previewing. |
| `compatibility_date`, `compatibility_flags` | Top level only. |
| `placement` | Top-level applies to Previews. Add `previews.placement` to override. |
| `observability`, `logpush`, `limits` | Add to `previews` only for Preview-specific values. |
| `vars` | Add `previews.vars` with Preview values. |
| Storage and data bindings | Add the same binding name pointed at a Preview-safe resource (KV, D1, R2, Hyperdrive, Vectorize, Analytics Engine, Pipelines, Secrets Store). |
| D1 migrations | Configure a shared staging database on the base branch. To isolate a branch, update both its Preview binding and migration configuration to a different database; apply migrations before deploying the Preview. |
| Workflows | Add a binding to an existing Workflow; changing the name does not create one. |
| Queue producers | Add `previews.queues.producers` pointed at a Preview-safe queue. |
| `define` | Add `previews.define`; top-level values are not inherited. |
| `tail_consumers` | Add `previews.tail_consumers`; not inherited. |
| Durable Objects | New namespace and storage per Preview automatically. Keep classes and migrations top level. Add `previews.durable_objects.bindings` only if code reads the binding from `env`. |
| Containers | New container app and instances per Preview. Keep migrations top level; put container definitions under `previews.containers` (production stays in top-level `containers`). Add the DO binding under `previews` only if code reads it from `env`. |
| API bindings | Add `ai`, `browser`, `images`, `stream`, `media`, `worker_loaders`, or `version_metadata` under `previews` if code reads the binding from `env`. No staging resource needed. |

## Notes

- Previews do not inherit production settings. Define the Base `previews` block on the branch your team branches from (e.g. `main`); Git carries it into new branches, and `npx wrangler preview` uses the config file on the current branch as the source of truth.
- Later changes to Base secrets apply only to new Previews; active Previews are unchanged. Secrets cannot be stored in config files.
- If `npx wrangler preview` warns that bindings are missing, the URL is live but runtime configuration is incomplete; copy the missing bindings into `previews` with Preview-safe values.
- Do not add Queue consumers, Cron Triggers, or production routes to `previews`. Service bindings from a Preview call the bound Worker's production deployment.
- Dashboard: **Settings** has **Production** / **Previews Base** toggles for Variables and secrets, Bindings, Observability, and Runtime. You can import names/values from production (secrets must be re-entered). Copy the generated `previews` configuration into your Wrangler file to keep deployments in sync.

## Related

- [previews-overview.md](./previews-overview.md)
- [previews-resources.md](./previews-resources.md)
- [previews-test-and-debug.md](./previews-test-and-debug.md)
- [top-level-keys.md](../configuration/top-level-keys.md)
