---
source: https://developers.cloudflare.com/r2/reference/wrangler-commands/
---

# Wrangler commands (R2)

Wrangler CLI commands for managing R2 buckets and objects (`r2 bucket ...`, `r2 object ...`, plus `basin catalog ...`). General Wrangler usage and configuration belong to the cloudflare-wrangler skill.

## Signature / Usage

```sh
npx wrangler r2 bucket create <NAME>
npx wrangler r2 bucket info <BUCKET>
npx wrangler r2 bucket delete <BUCKET>
npx wrangler r2 bucket list
npx wrangler r2 bucket cors set <BUCKET> --file <FILE>
npx wrangler r2 bucket cors delete <BUCKET>
npx wrangler r2 bucket cors list <BUCKET>
npx wrangler r2 bucket dev-url enable <BUCKET>
npx wrangler r2 bucket dev-url disable <BUCKET>
npx wrangler r2 bucket dev-url get <BUCKET>
npx wrangler r2 bucket domain add <BUCKET> --domain <DOMAIN> --zone-id <ZONE_ID>
npx wrangler r2 bucket domain remove <BUCKET> --domain <DOMAIN>
npx wrangler r2 bucket domain update <BUCKET> --domain <DOMAIN>
npx wrangler r2 bucket domain get <BUCKET> --domain <DOMAIN>
npx wrangler r2 bucket domain list <BUCKET>
npx wrangler r2 bucket lifecycle add <BUCKET> [NAME] [PREFIX]
npx wrangler r2 bucket lifecycle remove <BUCKET> --name <RULE>
npx wrangler r2 bucket lifecycle list <BUCKET>
npx wrangler r2 bucket lifecycle set <BUCKET> --file <FILE>
npx wrangler r2 bucket lock add <BUCKET> [NAME] [PREFIX]
npx wrangler r2 bucket lock remove <BUCKET> --name <RULE>
npx wrangler r2 bucket lock list <BUCKET>
npx wrangler r2 bucket lock set <BUCKET> --file <FILE>
npx wrangler r2 bucket notification create <BUCKET> --event-types <TYPE> --queue <QUEUE>
npx wrangler r2 bucket notification delete <BUCKET> --queue <QUEUE>
npx wrangler r2 bucket notification list <BUCKET>
npx wrangler r2 bucket sippy enable <NAME>
npx wrangler r2 bucket sippy disable <NAME>
npx wrangler r2 bucket sippy get <NAME>
npx wrangler r2 object get <OBJECTPATH>
npx wrangler r2 object put <OBJECTPATH>
npx wrangler r2 object delete <OBJECTPATH>
npx wrangler basin catalog enable <BUCKET_NAME>
npx wrangler basin catalog disable <BUCKET_NAME>
npx wrangler basin catalog get <BUCKET_NAME>
npx wrangler basin catalog compaction enable my-bucket --token <TOKEN>
npx wrangler basin catalog compaction enable my-bucket my-namespace my-table --target-size 256
npx wrangler basin catalog compaction disable my-bucket
npx wrangler basin catalog compaction disable my-bucket my-namespace my-table
npx wrangler basin catalog snapshot-expiration enable <BUCKET_NAME>
npx wrangler basin catalog snapshot-expiration disable <BUCKET_NAME>
```

## Options / Props

| Command | Option | Description |
| --- | --- | --- |
| `r2 bucket create` | `--location` | Optional location hint for geographic placement |
| | `--storage-class`, `--s` | Default storage class for objects uploaded to this bucket |
| | `--jurisdiction`, `--J` | Jurisdiction where the bucket will be created |
| | `--use-remote` | Use a remote binding when adding the new resource to your config |
| | `--update-config` | Automatically update your config file with the new resource |
| | `--binding` | Binding name of this resource in your Worker |
| `r2 bucket info` | `--json` | Return bucket information as JSON (default false) |
| `r2 bucket cors set` | `--file` (required) | Path to the JSON file with the CORS configuration |
| | `--force`, `--y` | Skip confirmation |
| `r2 bucket domain add` | `--domain` (required), `--zone-id` (required) | Custom domain and its zone ID |
| | `--min-tls` | Minimum TLS version (defaults to 1.0 if not set) |
| `r2 bucket domain update` | `--domain` (required), `--min-tls` | Update minimum TLS version |
| `r2 bucket lifecycle add` | `[NAME]` (alias `--id`), `[PREFIX]` | Unique rule name; prefix condition (empty for all prefixes) |
| | `--expire-days` / `--expire-date` | Expire objects after N days / after YYYY-MM-DD |
| | `--ia-transition-days` / `--ia-transition-date` | Transition to Infrequent Access after N days / after YYYY-MM-DD |
| | `--abort-multipart-days` | Abort incomplete multipart uploads after N days |
| | `--force`, `--y` | Skip confirmation and Basin Catalog validation prompt |
| `r2 bucket lifecycle remove`, `r2 bucket lock remove` | `--name` (alias `--id`, required) | Unique name of the rule to remove |
| `r2 bucket lifecycle set`, `r2 bucket lock set` | `--file` (required) | Path to the JSON configuration file |
| `r2 bucket lock add` | `--retention-days` / `--retention-date` / `--retention-indefinite` | Retain for N days / until YYYY-MM-DD / indefinitely |
| | `[PREFIX]` | Prefix condition (set to "" for all prefixes) |
| `r2 bucket notification create` | `--event-types` (alias `--event-type`, required) | `object-create` or `object-delete` |
| | `--queue` (required) | Queue receiving the messages |
| | `--prefix`, `--suffix` | Object prefix / suffix filters (regular expressions not supported) |
| | `--description` | Description for identifying the rule |
| `r2 bucket notification delete` | `--queue` (required), `--rule` | Queue of the rule; ID of the rule (without it, all rules for bucket and queue are deleted) |
| `r2 bucket sippy enable` | `--provider` (`"AWS"` or `"GCS"`), `--bucket` | Upstream provider and bucket |
| | `--region`, `--access-key-id`, `--secret-access-key` | AWS provider only |
| | `--service-account-key-file`, `--client-email`, `--private-key` | GCS provider only |
| | `--r2-access-key-id`, `--r2-secret-access-key` | Credentials for this R2 bucket |
| `r2 object get` | `<OBJECTPATH>` (`{bucket}/{key}`), `--file`/`--f`, `--pipe`/`--p` | Destination file; pipe to stdout |
| `r2 object put` | `--file`/`--f`, `--pipe`/`--p` | Path of file to upload; read from pipe |
| | `--content-type` (`--ct`), `--content-disposition` (`--cd`), `--content-encoding` (`--ce`), `--content-language` (`--cl`), `--cache-control` (`--cc`), `--expires` | HTTP metadata |
| | `--storage-class` (`--s`) | Storage class of the object |
| | `--force` (`--y`) | Skip Basin Catalog validation prompt |
| `r2 object get/put/delete` | `--local`, `--remote`, `--persist-to` | Local storage, remote storage, local persistence directory |

All `r2 bucket` commands also accept `--jurisdiction` (`--J`); `r2 object` commands accept `--jurisdiction` for the object's jurisdiction.

Global flags: `--v` (version), `--cwd`, `--config` (`--c`), `--env` (`--e`), `--env-file`, `--install-skills` (default false), `--profile`.

## Notes

- Docs inconsistency: other R2 pages show `lifecycle remove` / `lock remove` with `--id <RULE_ID>` and `notification create` with `--event-type`; this reference lists `--name` (alias `--id`) and `--event-types` (alias `--event-type`), so both spellings work.
- `r2 bucket local-uploads enable|disable <BUCKET_NAME>` is documented on the Local uploads page but not listed on this Wrangler commands page.

## Related

- [Create new buckets](./buckets-create.md)
- [Object lifecycles](./buckets-object-lifecycles.md)
- [Bucket locks](./buckets-bucket-locks.md)
- [Event notifications](./buckets-event-notifications.md)
- [Sippy](./data-migration-sippy.md)
- [Local uploads](./buckets-local-uploads.md)
