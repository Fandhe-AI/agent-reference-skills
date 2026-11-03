---
source: https://developers.cloudflare.com/workers/wrangler/commands/workers-for-platforms/
---

# Workers for Platforms

Wrangler commands for managing Workers for Platforms dispatch namespaces.

## Signature / Usage

```sh
npx wrangler dispatch-namespace list
npx wrangler dispatch-namespace get <NAME>
npx wrangler dispatch-namespace create <NAME>
npx wrangler dispatch-namespace delete <NAME>
npx wrangler dispatch-namespace rename <OLDNAME> <NEWNAME>
```

## Options / Props

| Command | Argument | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `dispatch-namespace list` | — | — | — | List all dispatch namespaces |
| `dispatch-namespace get` | `<NAME>` | string | yes | Name of the dispatch namespace (Get information about a dispatch namespace) |
| `dispatch-namespace create` | `<NAME>` | string | yes | Name of the dispatch namespace (Create a dispatch namespace) |
| `dispatch-namespace delete` | `<NAME>` | string | yes | Name of the dispatch namespace (Delete a dispatch namespace) |
| `dispatch-namespace rename` | `<OLDNAME>` | string | yes | Name of the dispatch namespace (Rename a dispatch namespace) |
| `dispatch-namespace rename` | `<NEWNAME>` | string | yes | New name of the dispatch namespace |

## Notes

- You must delete all user Workers in the dispatch namespace before it can be deleted.
- Each command also accepts the global flags; see the global flags page.

## Related

- [Global flags](./global-flags.md)
- [Workers](./workers.md)
