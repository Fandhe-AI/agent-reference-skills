---
source: https://developers.cloudflare.com/durable-objects/get-started/, https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/, https://developers.cloudflare.com/durable-objects/reference/durable-object-class-migrations-legacy/, https://developers.cloudflare.com/durable-objects/deployments/durable-objects-code-updates/, https://developers.cloudflare.com/durable-objects/examples/testing-with-durable-objects/
---

# Durable Objects

Copy-paste commands for creating, running, deploying, and retiring Durable Object classes. Durable Objects have no dedicated `wrangler durable-objects` command group in these docs; class lifecycle is driven by `wrangler deploy` plus the Wrangler configuration file. Full flag tables for `wrangler dev`, `wrangler deploy`, and `wrangler versions deploy` belong to the cloudflare-wrangler skill.

## Signature / Usage

### Create a starter project

```sh
npm create cloudflare@latest -- durable-object-starter
```

Run the Durable Object starter template from the Get started guide.

### Run locally

```sh
npx wrangler dev
```

### Deploy (applies Durable Object class lifecycle changes)

```sh
npx wrangler deploy
```

Class creation, deletion, rename, and transfer (via `exports`, or the legacy `migrations` array) are applied only by `wrangler deploy`. The official docs state that `wrangler versions upload` does not apply lifecycle changes and fails fast when `exports` entries are present.

### Declare a live class in exports

Add the binding and the `exports` entry, then run `npx wrangler deploy`.

```jsonc
{
  "durable_objects": {
    "bindings": [
      {
        "name": "MY_DURABLE_OBJECT",
        "class_name": "MyDurableObject"
      }
    ]
  },
  "exports": {
    "MyDurableObject": {
      "type": "durable-object",
      "storage": "sqlite"
    }
  }
}
```

Cloudflare provisions the namespace the first time you deploy. `exports` entries for Durable Objects are mutually exclusive with `migrations`.

### Delete a Durable Object class and its namespace (exports tombstone)

> **Warning**: Deleting a class removes its namespace and all of its stored data permanently. There is no Trash for namespaces deleted through `exports`. Copy any data you need to keep elsewhere first.

Remove the class from your Worker code and its binding from `durable_objects.bindings`, then replace the live entry with a tombstone:

```jsonc
{
  "exports": {
    "OldDurableObject": {
      "type": "durable-object",
      "state": "deleted"
    }
  }
}
```

```sh
npx wrangler deploy
```

The deploy is rejected with `tombstone_delete_class_still_in_code` if the class is still exported in code, and with `tombstone_delete_blocked_by_external_bindings` if another Worker in the account still binds to the namespace. After the namespace is gone, the tombstone is reported as stale and can be removed from `exports`.

### Delete a class with the legacy migrations array

> **Warning**: A delete migration permanently destroys the class's namespace and all stored data. `migrations` and Durable Object `exports` entries cannot be combined in one configuration, and a Worker deployed with `exports` cannot return to `migrations`.

```jsonc
{
  "migrations": [
    {
      "tag": "v3", // Should be unique for each entry
      "deleted_classes": [ // Array of deleted classes
        "DeprecatedObjectClass"
      ]
    }
  ]
}
```

```sh
npx wrangler deploy
```

### Set the code update strategy for one deployment

Pass `--durable-objects-code-update-mode` to `wrangler deploy`, `wrangler versions deploy`, or `wrangler rollback`. It accepts `immediate` or `deferred <duration>`; a duration is required with `deferred`.

```sh
npx wrangler versions deploy <VERSION_ID>@100% --durable-objects-code-update-mode immediate
```

```sh
npx wrangler versions deploy <VERSION_ID>@100% --durable-objects-code-update-mode deferred 30s
```

The flag takes precedence over `durable_objects.code_update_strategy` in the Wrangler configuration.

### Test Durable Objects with Vitest

Adapted (not in the official docs): the version range is quoted so shells such as zsh do not treat `^` as a glob character; see Notes.

```sh
npm i -D "vitest@^4.1.0" @cloudflare/vitest-plugin
```

```sh
npx vitest
```

Install the test dependencies first, then run the suite.

## Notes

- Adapted from the official docs: the testing example installs `vitest@^4.1.0` unquoted; it is quoted here as `"vitest@^4.1.0"`.
- Deleting a class or running a delete migration is irreversible for the namespace's stored data; run those commands only against the intended Worker and environment.
- Lifecycle changes (create, delete, rename, transfer) are applied by `wrangler deploy` only, not by `wrangler versions upload`.

## Related

- [Migrations](../references/durable-objects/migrations.md)
- [Code updates](../references/durable-objects/code-updates.md)
