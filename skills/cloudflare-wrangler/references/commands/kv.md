---
source: https://developers.cloudflare.com/workers/wrangler/commands/kv/
---

# KV

Manage Workers KV using Wrangler: namespaces (`kv namespace`), key-value pairs (`kv key`), and batches (`kv bulk`).

## Signature / Usage

```sh
npx wrangler kv namespace create <NAMESPACE>
npx wrangler kv namespace list
npx wrangler kv namespace delete [NAMESPACE]
npx wrangler kv namespace rename [OLD-NAME]
npx wrangler kv key put <KEY> [VALUE]
npx wrangler kv key list
npx wrangler kv key get <KEY>
npx wrangler kv key delete <KEY>
npx wrangler kv bulk get <FILENAME>
npx wrangler kv bulk put <FILENAME>
npx wrangler kv bulk delete <FILENAME>
```

To restrict where a namespace durably stores data, specify `--jurisdiction` when creating it (supported jurisdictions are listed in the KV data-location docs).

### KV Instant namespaces

Workers KV Instant is currently in private beta. To create a Workers KV Instant namespace, pass `--experimental-mode instant`. This example creates a namespace named `APP_CONFIG` for small, infrequently updated configuration:

```sh
npx wrangler@latest kv namespace create APP_CONFIG --experimental-mode instant
```

You can also use the `--x-mode instant` alias.

## Options / Props

Command descriptions:

- `kv namespace create`: Create a new namespace
- `kv namespace list`: Output a list of all KV namespaces associated with your account id
- `kv namespace delete`: Delete a given namespace.
- `kv namespace rename`: Rename a KV namespace
- `kv key put`: Write a single key/value pair to the given namespace
- `kv key list`: Output a list of all keys in a given namespace
- `kv key get`: Read a single value by key from the given namespace
- `kv key delete`: Remove a single key value pair from the given namespace
- `kv bulk get`: Gets multiple key-value pairs from a namespace
- `kv bulk put`: Upload multiple key-value pairs to a namespace
- `kv bulk delete`: Delete multiple key-value pairs from a namespace

### `kv namespace create`

| Flag | Type | Description |
| --- | --- | --- |
| `<NAMESPACE>` | string (required) | The name of the new namespace |
| `--preview` | boolean | Interact with a preview namespace |
| `--jurisdiction` | string | The jurisdiction where the new namespace will be created (e.g. "us", "eu", "fedramp") |
| `--experimental-mode` (alias `--x-mode`) | string | The storage mode for the new namespace. Instant mode offers lower-latency reads and faster global updates [private beta]. Cannot be combined with --jurisdiction. |
| `--use-remote` | boolean | Use a remote binding when adding the newly created resource to your config |
| `--update-config` | boolean | Automatically update your config file with the newly added resource |
| `--binding` | string | The binding name of this resource in your Worker |

### `kv namespace list`

No command-specific flags.

### `kv namespace delete`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `[NAMESPACE]` | string | — | The name of the namespace to delete |
| `--binding` | string | — | The binding name to the namespace to delete from |
| `--namespace-id` | string | — | The id of the namespace to delete |
| `--preview` | boolean | — | Interact with a preview namespace |
| `--skip-confirmation` (alias `--y`) | boolean | false | Skip confirmation |

### `kv namespace rename`

| Flag | Type | Description |
| --- | --- | --- |
| `[OLD-NAME]` | string | The current name of the namespace to rename |
| `--namespace-id` | string | The id of the namespace to rename |
| `--new-name` | string (required) | The new name for the namespace |

### `kv key put`

| Flag | Type | Description |
| --- | --- | --- |
| `<KEY>` | string (required) | The key to write to |
| `[VALUE]` | string | The value to write |
| `--path` | string | Read value from the file at a given path |
| `--binding` | string | The binding name to the namespace to write to |
| `--namespace-id` | string | The id of the namespace to write to |
| `--preview` | boolean | Interact with a preview namespace |
| `--ttl` | number | Time for which the entries should be visible |
| `--expiration` | number | Time since the UNIX epoch after which the entry expires |
| `--metadata` | string | Arbitrary JSON that is associated with a key |
| `--local` | boolean | Interact with local storage |
| `--remote` | boolean | Interact with remote storage |
| `--persist-to` | string | Directory for local persistence |

### `kv key list`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--binding` | string | — | The binding name to the namespace to list |
| `--namespace-id` | string | — | The id of the namespace to list |
| `--preview` | boolean | false | Interact with a preview namespace |
| `--prefix` | string | — | A prefix to filter listed keys |
| `--local` | boolean | — | Interact with local storage |
| `--remote` | boolean | — | Interact with remote storage |
| `--persist-to` | string | — | Directory for local persistence |

### `kv key get`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<KEY>` | string (required) | — | The key value to get. |
| `--text` | boolean | false | Decode the returned value as a utf8 string |
| `--binding` | string | — | The binding name to the namespace to get from |
| `--namespace-id` | string | — | The id of the namespace to get from |
| `--preview` | boolean | false | Interact with a preview namespace |
| `--local` | boolean | — | Interact with local storage |
| `--remote` | boolean | — | Interact with remote storage |
| `--persist-to` | string | — | Directory for local persistence |

### `kv key delete`

| Flag | Type | Description |
| --- | --- | --- |
| `<KEY>` | string (required) | The key value to delete. |
| `--binding` | string | The binding name to the namespace to delete from |
| `--namespace-id` | string | The id of the namespace to delete from |
| `--preview` | boolean | Interact with a preview namespace |
| `--local` | boolean | Interact with local storage |
| `--remote` | boolean | Interact with remote storage |
| `--persist-to` | string | Directory for local persistence |

### `kv bulk get`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<FILENAME>` | string (required) | — | The file containing the keys to get |
| `--binding` | string | — | The binding name to the namespace to get from |
| `--namespace-id` | string | — | The id of the namespace to get from |
| `--preview` | boolean | false | Interact with a preview namespace |
| `--local` | boolean | — | Interact with local storage |
| `--remote` | boolean | — | Interact with remote storage |
| `--persist-to` | string | — | Directory for local persistence |

### `kv bulk put`

| Flag | Type | Description |
| --- | --- | --- |
| `<FILENAME>` | string (required) | The file containing the key/value pairs to write |
| `--binding` | string | The binding name to the namespace to write to |
| `--namespace-id` | string | The id of the namespace to write to |
| `--preview` | boolean | Interact with a preview namespace |
| `--ttl` | number | Time for which the entries should be visible |
| `--expiration` | number | Time since the UNIX epoch after which the entry expires |
| `--metadata` | string | Arbitrary JSON that is associated with a key |
| `--local` | boolean | Interact with local storage |
| `--remote` | boolean | Interact with remote storage |
| `--persist-to` | string | Directory for local persistence |

### `kv bulk delete`

| Flag | Type | Description |
| --- | --- | --- |
| `<FILENAME>` | string (required) | The file containing the keys to delete |
| `--force` (alias `--f`) | boolean | Do not ask for confirmation before deleting |
| `--binding` | string | The binding name to the namespace to delete from |
| `--namespace-id` | string | The id of the namespace to delete from |
| `--preview` | boolean | Interact with a preview namespace |
| `--local` | boolean | Interact with local storage |
| `--remote` | boolean | Interact with remote storage |
| `--persist-to` | string | Directory for local persistence |

## Notes

- The `kv ...` commands manage your Workers KV resources in the Cloudflare network (see the Workers KV get-started guide).
- Since Wrangler 3.60.0, the `kv ...` syntax is supported. Versions below 3.60.0 use the deprecated `kv:...` syntax.
- Workers KV Instant (`--experimental-mode instant`) is in private beta; enroll via your Cloudflare account team.
- KV binding API (`env.KV.get/put`) belongs to the cloudflare-storage skill.
- Each command also accepts the global flags; see the global flags page.

## Related

- [Global flags](./global-flags.md)
- [Commands overview](./overview.md)
