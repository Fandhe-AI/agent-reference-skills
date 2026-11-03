---
source: https://developers.cloudflare.com/workers/wrangler/commands/secrets-store/
---

# Secrets Store

Interact with Secrets Store using Wrangler: `secrets-store secret` manages account secrets, `secrets-store store` manages stores.

## Signature / Usage

```sh
npx wrangler secrets-store secret create <STORE-ID>
npx wrangler secrets-store secret update <STORE-ID>
npx wrangler secrets-store secret duplicate <STORE-ID>
npx wrangler secrets-store secret get <STORE-ID>
npx wrangler secrets-store secret delete <STORE-ID>
npx wrangler secrets-store secret list <STORE-ID>
npx wrangler secrets-store store create <NAME>
npx wrangler secrets-store store delete <STORE-ID>
npx wrangler secrets-store store list
```

Example of `secret create`:

```sh
npx wrangler secrets-store secret create 8f7a1cdced6342c18d223ece462fd88d --name ServiceA_key-1 --scopes workers --remote
```

```sh
✓ Enter a secret value: › ***

🔐 Creating secret... (Name: ServiceA_key-1, Value: REDACTED, Scopes: workers, Comment: undefined)
✓ Select an account: › My account
✅ Created secret! (ID: 13bc7498c6374a4e9d13be091c3c65f1)
```

Example of `secret get`:

```sh
npx wrangler secrets-store secret get 8f7a1cdced6342c18d223ece462fd88d --secret-id 13bc7498c6374a4e9d13be091c3c65f1 --remote
```

```sh
🔐 Getting secret... (ID: 13bc7498c6374a4e9d13be091c3c65f1)
✓ Select an account: › My account
| Name            | ID                                  | StoreID                             | Comment | Scopes  | Status  | Created                | Modified               |
|-----------------|-------------------------------------|-------------------------------------|---------|---------|---------|------------------------|------------------------|
| ServiceA_key-1  | 13bc7498c6374a4e9d13be091c3c65f1    | 8f7a1cdced6342c18d223ece462fd88d    |         | workers | active  | 4/9/2025, 10:06:01 PM  | 4/15/2025, 09:13:05 AM |
```

Example of `store create`:

```sh
npx wrangler secrets-store store create default --remote
```

```sh
🔐 Creating store... (Name: default)
✅ Created store! (Name: default, ID: 2e2a82d317134506b58defbe16982d54)
```

Example of `store delete`:

```sh
npx wrangler secrets-store store delete d2dafaeac9434de2b6d08b292ce08211 --remote
```

```sh
🔐 Deleting store... (Name: d2dafaeac9434de2b6d08b292ce08211)
✅ Deleted store! (ID: d2dafaeac9434de2b6d08b292ce08211)
```

Example of `store list`:

```sh
npx wrangler secrets-store store list --remote
```

```sh
🔐 Listing stores...
┌─────────┬──────────────────────────────────┬──────────────────────────────────┬──────────────────────┬──────────────────────┐
│ Name    │ ID                               │ AccountID                        │ Created              │ Modified             │
├─────────┼──────────────────────────────────┼──────────────────────────────────┼──────────────────────┼──────────────────────┤
│ default │ 8876bad33f164462bf0743fe8adf98f4 │ REDACTED                         │ 4/9/2025, 1:11:48 PM │ 4/9/2025, 1:11:48 PM │
└─────────┴──────────────────────────────────┴──────────────────────────────────┴──────────────────────┴──────────────────────┘
```

## Options / Props

### `secrets-store secret create` — Create a secret within a store

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<STORE-ID>` | string (required) | — | ID of the store in which the secret resides |
| `--name` | string (required) | — | Name of the secret |
| `--value` | string | — | Value of the secret (Note: Only for testing. Not secure as this will leave secret value in plain-text in terminal history, exclude this flag and use automatic prompt instead) |
| `--scopes` | string (required) | — | Scopes for the secret (comma-separated list of scopes eg:"workers") |
| `--comment` | string | — | Comment for the secret |
| `--remote` | boolean | false | Execute command against remote Secrets Store |
| `--persist-to` | string | — | Directory for local persistence |

### `secrets-store secret update` — Update a secret within a store

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<STORE-ID>` | string (required) | — | ID of the store in which the secret resides |
| `--secret-id` | string (required) | — | ID of the secret to update |
| `--value` | string | — | Updated value of the secret (Note: Only for testing. Not secure as this will leave secret value in plain-text in terminal history, exclude this flag and use automatic prompt instead) |
| `--scopes` | string | — | Updated scopes for the secret (comma-separated list of scopes eg:"workers") |
| `--comment` | string | — | Updated comment for the secret |
| `--remote` | boolean | false | Execute command against remote Secrets Store |
| `--persist-to` | string | — | Directory for local persistence |

### `secrets-store secret duplicate` — Duplicate a secret within a store

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<STORE-ID>` | string (required) | — | ID of the store in which the secret resides |
| `--secret-id` | string (required) | — | ID of the secret to duplicate the secret value of |
| `--name` | string (required) | — | Name of the new secret |
| `--scopes` | string (required) | — | Scopes for the new secret |
| `--comment` | string | — | Comment for the new secret |
| `--remote` | boolean | false | Execute command against remote Secrets Store |
| `--persist-to` | string | — | Directory for local persistence |

### `secrets-store secret get` — Get a secret within a store

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<STORE-ID>` | string (required) | — | ID of the store in which the secret resides |
| `--secret-id` | string (required) | — | ID of the secret to retrieve |
| `--remote` | boolean | false | Execute command against remote Secrets Store |
| `--persist-to` | string | — | Directory for local persistence |

### `secrets-store secret delete` — Delete a secret within a store

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<STORE-ID>` | string (required) | — | ID of the store in which the secret resides |
| `--secret-id` | string (required) | — | ID of the secret to delete |
| `--remote` | boolean | false | Execute command against remote Secrets Store |
| `--persist-to` | string | — | Directory for local persistence |

### `secrets-store secret list` — List secrets within a store

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<STORE-ID>` | string (required) | — | ID of the store in which to list secrets |
| `--page` | number | 1 | Page number of secrets listing results, can configure page size using "per-page" |
| `--per-page` | number | 10 | Number of secrets to show per page |
| `--remote` | boolean | false | Execute command against remote Secrets Store |
| `--persist-to` | string | — | Directory for local persistence |

### `secrets-store store create` — Create a store within an account

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<NAME>` | string (required) | — | Name of the store |
| `--remote` | boolean | false | Execute command against remote Secrets Store |

### `secrets-store store delete` — Delete a store within an account

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<STORE-ID>` | string (required) | — | ID of the store |
| `--remote` | boolean | false | Execute command against remote Secrets Store |

### `secrets-store store list` — List stores within an account

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--page` | number | 1 | Page number of stores listing results, can configure page size using "per-page" |
| `--per-page` | number | 10 | Number of stores to show per page |
| `--remote` | boolean | false | Execute command against remote Secrets Store |

## Notes

- `--remote`: In order to interact with Secrets Store in production, append `--remote` to your command. Without it, your command will default to local development mode. Local secrets are stored unencrypted in your project's local data directory.
- Store limitation: Secrets Store is in open beta. Currently, you can only have one store per Cloudflare account.
- Each command also accepts the global flags; see the global flags page.

## Related

- [Containers](./containers.md)
- [Global flags](./global-flags.md)
