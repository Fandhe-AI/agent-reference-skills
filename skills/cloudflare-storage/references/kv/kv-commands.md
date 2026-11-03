---
source: https://developers.cloudflare.com/kv/reference/kv-commands/
---

# Wrangler KV commands

Manage Workers KV namespaces, keys, and bulk operations with `wrangler kv ...`.

## Signature / Usage

```sh
# kv namespace
npx wrangler kv namespace create <NAMESPACE>
npx wrangler kv namespace list
npx wrangler kv namespace delete [NAMESPACE]
npx wrangler kv namespace rename [OLD-NAME]

# kv key
npx wrangler kv key put <KEY> [VALUE]
npx wrangler kv key list
npx wrangler kv key get <KEY>
npx wrangler kv key delete <KEY>

# kv bulk
npx wrangler kv bulk get <FILENAME>
npx wrangler kv bulk put <FILENAME>
npx wrangler kv bulk delete <FILENAME>
```

Instant namespace (private beta; `--x-mode instant` is an alias):

```sh
npx wrangler@latest kv namespace create APP_CONFIG --experimental-mode instant
```

## Options / Props

`kv namespace create <NAMESPACE>` (`<NAMESPACE>` string, required: the name of the new namespace):

| Name | Type | Description |
|------|------|-------------|
| --preview | boolean | Interact with a preview namespace |
| --jurisdiction | string | The jurisdiction where the new namespace will be created (e.g. "us", "eu", "fedramp") |
| --experimental-mode (alias --x-mode) | string | The storage mode for the new namespace. Instant mode offers lower-latency reads and faster global updates [private beta]. Cannot be combined with --jurisdiction. |
| --use-remote | boolean | Use a remote binding when adding the newly created resource to your config |
| --update-config | boolean | Automatically update your config file with the newly added resource |
| --binding | string | The binding name of this resource in your Worker |

`kv namespace delete [NAMESPACE]`:

| Name | Type | Description |
|------|------|-------------|
| [NAMESPACE] | string | The name of the namespace to delete |
| --binding | string | The binding name to the namespace to delete from |
| --namespace-id | string | The id of the namespace to delete |
| --preview | boolean | Interact with a preview namespace |
| --skip-confirmation (alias --y) | boolean | Skip confirmation (default: false) |

`kv namespace rename [OLD-NAME]`:

| Name | Type | Description |
|------|------|-------------|
| [OLD-NAME] | string | The current name of the namespace to rename |
| --namespace-id | string | The id of the namespace to rename |
| --new-name | string (required) | The new name for the namespace |

`kv key put <KEY> [VALUE]` (`<KEY>` string, required):

| Name | Type | Description |
|------|------|-------------|
| [VALUE] | string | The value to write |
| --path | string | Read value from the file at a given path |
| --binding | string | The binding name to the namespace to write to |
| --namespace-id | string | The id of the namespace to write to |
| --preview | boolean | Interact with a preview namespace |
| --ttl | number | Time for which the entries should be visible |
| --expiration | number | Time since the UNIX epoch after which the entry expires |
| --metadata | string | Arbitrary JSON that is associated with a key |
| --local | boolean | Interact with local storage |
| --remote | boolean | Interact with remote storage |
| --persist-to | string | Directory for local persistence |

`kv key list`:

| Name | Type | Description |
|------|------|-------------|
| --binding | string | The binding name to the namespace to list |
| --namespace-id | string | The id of the namespace to list |
| --preview | boolean | Interact with a preview namespace (default: false) |
| --prefix | string | A prefix to filter listed keys |
| --local | boolean | Interact with local storage |
| --remote | boolean | Interact with remote storage |
| --persist-to | string | Directory for local persistence |

`kv key get <KEY>` (`<KEY>` string, required):

| Name | Type | Description |
|------|------|-------------|
| --text | boolean | Decode the returned value as a utf8 string (default: false) |
| --binding | string | The binding name to the namespace to get from |
| --namespace-id | string | The id of the namespace to get from |
| --preview | boolean | Interact with a preview namespace (default: false) |
| --local | boolean | Interact with local storage |
| --remote | boolean | Interact with remote storage |
| --persist-to | string | Directory for local persistence |

`kv key delete <KEY>` (`<KEY>` string, required):

| Name | Type | Description |
|------|------|-------------|
| --binding | string | The binding name to the namespace to delete from |
| --namespace-id | string | The id of the namespace to delete from |
| --preview | boolean | Interact with a preview namespace |
| --local | boolean | Interact with local storage |
| --remote | boolean | Interact with remote storage |
| --persist-to | string | Directory for local persistence |

`kv bulk get <FILENAME>` (`<FILENAME>` string, required: the file containing the keys to get):

| Name | Type | Description |
|------|------|-------------|
| --binding | string | The binding name to the namespace to get from |
| --namespace-id | string | The id of the namespace to get from |
| --preview | boolean | Interact with a preview namespace (default: false) |
| --local | boolean | Interact with local storage |
| --remote | boolean | Interact with remote storage |
| --persist-to | string | Directory for local persistence |

`kv bulk put <FILENAME>` (`<FILENAME>` string, required: the file containing the key/value pairs to write):

| Name | Type | Description |
|------|------|-------------|
| --binding | string | The binding name to the namespace to write to |
| --namespace-id | string | The id of the namespace to write to |
| --preview | boolean | Interact with a preview namespace |
| --ttl | number | Time for which the entries should be visible |
| --expiration | number | Time since the UNIX epoch after which the entry expires |
| --metadata | string | Arbitrary JSON that is associated with a key |
| --local | boolean | Interact with local storage |
| --remote | boolean | Interact with remote storage |
| --persist-to | string | Directory for local persistence |

`kv bulk delete <FILENAME>` (`<FILENAME>` string, required: the file containing the keys to delete):

| Name | Type | Description |
|------|------|-------------|
| --force (alias --f) | boolean | Do not ask for confirmation before deleting |
| --binding | string | The binding name to the namespace to delete from |
| --namespace-id | string | The id of the namespace to delete from |
| --preview | boolean | Interact with a preview namespace |
| --local | boolean | Interact with local storage |
| --remote | boolean | Interact with remote storage |
| --persist-to | string | Directory for local persistence |

Global flags (all commands):

| Name | Type | Description |
|------|------|-------------|
| --version (alias -v) | boolean | Show version number |
| --cwd | string | Run as if Wrangler was started in the specified directory instead of the current working directory |
| --config (alias -c) | string | Path to Wrangler configuration file |
| --env (alias -e) | string | Environment to use for operations, and for selecting .env and .dev.vars files |
| --env-file | string | Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files |
| --install-skills | boolean | Install Cloudflare skills for detected AI coding agents before running the command (default: false) |
| --profile | string | Use a specific auth profile |

## Notes

- Corrected from the official docs: the official global-flags block writes the aliases as `--v`, `--c` and `--e`; the real Wrangler short aliases are single-dash `-v`, `-c` and `-e`.
- Deprecation: since Wrangler 3.60.0 the `kv ...` syntax is supported; the older `kv:...` syntax (versions below 3.60.0) is deprecated and will be removed in a future major version.

```sh
wrangler kv namespace list
wrangler kv key get <KEY>
wrangler kv bulk put <FILENAME>
```

The same commands in the deprecated syntax:

```sh
wrangler kv:namespace list
wrangler kv:key get <KEY>
wrangler kv:bulk put <FILENAME>
```

- To restrict where a namespace durably stores data, pass `--jurisdiction` at creation (see `data-location.md`).
- Exactly one of `--binding` or `--namespace-id` should select the target namespace (stated in the getting-started guide).
- Wrangler installation and the general command set belong to the cloudflare-wrangler skill.

## Related

- [get-started.md](./get-started.md)
- [environments.md](./environments.md)
- [data-location.md](./data-location.md)
- [kv-namespaces.md](./kv-namespaces.md)
