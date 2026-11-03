---
source: https://developers.cloudflare.com/kv/reference/kv-commands/
---

# KV

Copy-paste `wrangler kv ...` commands for namespaces, keys, and bulk operations. For the full flag tables see [kv-commands.md](../references/kv/kv-commands.md). Installing Wrangler, logging in, `dev`, and `deploy` belong to the cloudflare-wrangler skill.

## Create a namespace

```sh
npx wrangler kv namespace create <BINDING_NAME>
```

```sh
npx wrangler kv namespace create USERS_NOTIFICATION_CONFIG
```

Add the printed `kv_namespaces` snippet to your Wrangler configuration file to bind it.

## Create a namespace restricted to a jurisdiction

```sh
npx wrangler@latest kv namespace create <NAMESPACE_NAME> --jurisdiction=eu
```

`--jurisdiction` is the jurisdiction where the new namespace will be created (e.g. "us", "eu", "fedramp"). It can only be set at creation and cannot be changed afterwards. See [data-location.md](../references/kv/data-location.md).

## Create an Instant namespace (private beta)

```sh
npx wrangler@latest kv namespace create APP_CONFIG --experimental-mode instant
```

`--x-mode instant` is an alias. It cannot be combined with `--jurisdiction`. Workers KV Instant requires enrollment in the private beta.

## List and rename namespaces

```sh
npx wrangler kv namespace list
npx wrangler kv namespace rename [OLD-NAME] --new-name <NEW-NAME>
```

## Delete a namespace

> **Warning**: Deleting a namespace removes all of its data. Confirm the target (`--binding` or `--namespace-id`) before running this against production. `--skip-confirmation` (`--y`) skips the confirmation prompt.

```sh
npx wrangler kv namespace delete --binding <BINDING_NAME>
npx wrangler kv namespace delete --namespace-id <NAMESPACE_ID>
```

## Write a key

```sh
npx wrangler kv key put --binding=<BINDING_NAME> "<KEY>" "<VALUE>"
```

```sh
npx wrangler kv key put --binding=USERS_NOTIFICATION_CONFIG "user_1" "enabled"
```

Exactly one of `--binding` or `--namespace-id` is required.

```sh
npx wrangler kv key put --namespace-id=<BINDING_ID> "<KEY>" "<VALUE>"
```

To read the value from a file use `--path`; for expiry and metadata use `--ttl`, `--expiration`, and `--metadata` (see the flag tables in kv-commands.md).

## Local versus remote storage

Per the official getting-started guide, values are written to local storage by default. Add `--remote` to write to the remote KV namespace on Cloudflare.

```sh
npx wrangler kv key put --namespace-id=xxxxxxxxxxxxxxxx "<KEY>" "<VALUE>" --remote
```

> **Warning**: `--remote` writes to the production namespace and overwrites an existing key of the same name.

`kv key get`, `kv key list`, `kv key delete`, and all `kv bulk` commands also accept `--local`, `--remote`, and `--persist-to`.

## Get a key

```sh
npx wrangler kv key get --binding=<BINDING_NAME> "<KEY>"
```

Use `--text` to print the value as a UTF-8 string in the terminal.

```sh
npx wrangler kv key get --binding=USERS_NOTIFICATION_CONFIG "user_1" --text
```

## List keys

```sh
npx wrangler kv key list --binding=<BINDING_NAME>
```

`--prefix` filters listed keys by a prefix (flag table in kv-commands.md).

## Delete a key

> **Warning**: A deleted key cannot be recovered. When targeting a production namespace (`--remote`, or `--namespace-id` of a production namespace) confirm the target first.

```sh
npx wrangler kv key delete --binding=<BINDING_NAME> "<KEY>"
```

## Bulk get and put

```sh
npx wrangler kv bulk get <FILENAME> --binding=<BINDING_NAME>
npx wrangler kv bulk put <FILENAME> --binding=<BINDING_NAME>
```

`<FILENAME>` is the file containing the keys to get, or the key/value pairs to write. The file format is not reproduced here; see the official KV commands page.

## Bulk delete

> **Warning**: Deletes every key listed in `<FILENAME>`. `--force` (`--f`) skips the confirmation prompt. Check the file contents and the target namespace before running this against production.

```sh
npx wrangler kv bulk delete <FILENAME> --binding=<BINDING_NAME>
```

## Deprecated `kv:` syntax

The `kv:...` syntax used by Wrangler versions below 3.60.0 is deprecated and will be removed in a future major version.

```sh
wrangler kv:namespace list
wrangler kv:key get <KEY>
wrangler kv:bulk put <FILENAME>
```
