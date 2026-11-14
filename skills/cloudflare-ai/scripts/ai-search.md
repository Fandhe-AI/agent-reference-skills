---
source: https://developers.cloudflare.com/ai-search/get-started/wrangler/, https://developers.cloudflare.com/ai-search/wrangler-commands/, https://developers.cloudflare.com/ai-search/get-started/api/, https://developers.cloudflare.com/ai-search/api/namespaces/rest-api/, https://developers.cloudflare.com/ai-search/configuration/data-source/d1/
---

# AI Search

Commands (Wrangler and REST API) for creating AI Search instances, checking indexing, searching, and managing namespaces and jobs.

Wrangler global flags belong to the cloudflare-wrangler skill. Commands default to the `default` namespace; `--namespace` (alias `-n`) selects another.

## Signature / Usage

### Install Wrangler

```sh
npm install wrangler
```

### Create an instance

Adapted (not in the official docs): run with `npx` (local Wrangler install); see Notes.

```sh
npx wrangler ai-search create my-instance
```

Upload files via the dashboard or the Items REST API.

### Create an instance with a website as the data source

Adapted (not in the official docs): run with `npx` (local Wrangler install), and the official `--source developers.cloudflare.com` is replaced with `example.com` because only domains onboarded onto your own Cloudflare account can be crawled. See Notes.

```sh
npx wrangler ai-search create my-instance --type web-crawler --source example.com
```

Replace `example.com` with a domain that is onboarded onto the same Cloudflare account; other domains cannot be crawled.

### Create an instance with an R2 bucket as the data source

Adapted (not in the official docs): run with `npx` (local Wrangler install); see Notes.

```sh
npx wrangler ai-search create my-instance --type r2 --source my-bucket
```

### Create an instance in another namespace

Adapted (not in the official docs): run with `npx` (local Wrangler install); see Notes.

```sh
npx wrangler ai-search create my-instance --namespace my-namespace
```

### Check indexing status

Adapted (not in the official docs): run with `npx` (local Wrangler install); see Notes.

```sh
npx wrangler ai-search stats my-instance
```

### Run a search

Adapted (not in the official docs): run with `npx` (local Wrangler install); see Notes.

```sh
npx wrangler ai-search search my-instance --query "What is Cloudflare?"
```

Overrides: `--max-num-results`, `--score-threshold`, `--reranking`, `--filter key=value` (repeatable).

### List instances and get details

Adapted (not in the official docs): run with `npx` (local Wrangler install); see Notes.

```sh
npx wrangler ai-search list
```

Adapted (not in the official docs): run with `npx` (local Wrangler install); see Notes.

```sh
npx wrangler ai-search get <NAME>
```

`list` accepts `--page`, `--per-page`, `--json`.

### Update instance settings

Adapted (not in the official docs): run with `npx` (local Wrangler install); see Notes.

```sh
npx wrangler ai-search update <NAME>
```

Options: `--embedding-model`, `--generation-model`, `--chunk-size`, `--chunk-overlap`, `--max-num-results`, `--reranking`, `--reranking-model`, `--hybrid-search`, `--cache`, `--score-threshold`, `--paused`.

### Manage indexing jobs

Adapted (not in the official docs): run with `npx` (local Wrangler install); see Notes.

```sh
npx wrangler ai-search jobs list <NAME>
```

Adapted (not in the official docs): run with `npx` (local Wrangler install); see Notes.

```sh
npx wrangler ai-search jobs create <NAME>
```

Adapted (not in the official docs): run with `npx` (local Wrangler install); see Notes.

```sh
npx wrangler ai-search jobs get <NAME> <JOB-ID>
```

Adapted (not in the official docs): run with `npx` (local Wrangler install); see Notes.

```sh
npx wrangler ai-search jobs logs <NAME> <JOB-ID>
```

### Cancel an indexing job

> **Warning**: Cancels an in-progress indexing job. `--force` (alias `-y`) skips the confirmation prompt.

Adapted (not in the official docs): run with `npx` (local Wrangler install); see Notes.

```sh
npx wrangler ai-search jobs cancel <NAME> <JOB-ID>
```

### Manage namespaces

Adapted (not in the official docs): run with `npx` (local Wrangler install); see Notes.

```sh
npx wrangler ai-search namespace list
```

Adapted (not in the official docs): run with `npx` (local Wrangler install); see Notes.

```sh
npx wrangler ai-search namespace create <NAME>
```

Adapted (not in the official docs): run with `npx` (local Wrangler install); see Notes.

```sh
npx wrangler ai-search namespace get <NAME>
```

Adapted (not in the official docs): run with `npx` (local Wrangler install); see Notes.

```sh
npx wrangler ai-search namespace update <NAME>
```

`create` and `update` accept `--description` (max 256 chars).

### Delete a namespace

> **Warning**: Deleting a namespace is destructive. `--force` (alias `-y`) skips the confirmation prompt.

Adapted (not in the official docs): run with `npx` (local Wrangler install); see Notes.

```sh
npx wrangler ai-search namespace delete <NAME>
```

### Delete an instance

> **Warning**: Deleting an instance is destructive. `--force` (alias `-y`) skips the confirmation prompt.

Adapted (not in the official docs): run with `npx` (local Wrangler install); see Notes.

```sh
npx wrangler ai-search delete <NAME>
```

### REST API credentials

```sh
export CLOUDFLARE_ACCOUNT_ID="<ACCOUNT_ID>"
export CLOUDFLARE_API_TOKEN="<API_TOKEN>"
```

### Create an instance (REST API)

Adapted (not in the official docs): uses the environment variables above instead of the official `<ACCOUNT_ID>` / `<API_TOKEN>` placeholders. See Notes.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai-search/namespaces/default/instances" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "id": "my-instance"
  }'
```

### Create an instance with a website as the data source (REST API)

Adapted (not in the official docs): uses the environment variables above instead of the official `<ACCOUNT_ID>` / `<API_TOKEN>` placeholders. See Notes.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai-search/namespaces/default/instances" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "id": "my-instance",
    "type": "web-crawler",
    "source": "example.com"
  }'
```

### Create an instance with an R2 bucket as the data source (REST API)

Adapted (not in the official docs): uses the environment variables above instead of the official `<ACCOUNT_ID>` / `<API_TOKEN>` placeholders. See Notes.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai-search/namespaces/default/instances" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "id": "my-instance",
    "type": "r2",
    "source": "<R2_BUCKET_NAME>",
    "token_id": "<SERVICE_TOKEN_ID>"
  }'
```

R2 sources require a service API token; the `token_id` field is needed if your account has no service API token registered yet (if you omit it, AI Search uses the most recently registered service API token for your account).

### Create an instance with a D1 database as the data source (REST API, beta)

Adapted (not in the official docs): uses the environment variables above instead of the official `<ACCOUNT_ID>` / `<API_TOKEN>` placeholders. See Notes.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai-search/namespaces/default/instances" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "id": "my-instance",
    "type": "d1",
    "source": "<D1_DATABASE_ID>",
    "token_id": "<SERVICE_TOKEN_ID>",
    "source_params": {
      "d1": {
        "query": "SELECT article_id AS id, title, content\nFROM articles"
      }
    }
  }'
```

D1 sources always require `token_id`; the query must be a read-only `SELECT` / `WITH` statement that returns an `id` column.

### Upload a file (REST API)

Adapted (not in the official docs): uses the environment variables above instead of the official `<ACCOUNT_ID>` / `<API_TOKEN>` placeholders. See Notes.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai-search/namespaces/default/instances/my-instance/items" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -F "file=@/path/to/your/file.pdf"
```

Not needed when a website, R2 bucket, or D1 database is connected.

### Check indexing status (REST API)

Adapted (not in the official docs): uses the environment variables above instead of the official `<ACCOUNT_ID>` / `<API_TOKEN>` placeholders. See Notes.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai-search/namespaces/default/instances/my-instance/stats" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}"
```

### Search (REST API)

Adapted (not in the official docs): uses the environment variables above instead of the official `<ACCOUNT_ID>` / `<API_TOKEN>` placeholders. See Notes.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai-search/namespaces/default/instances/my-instance/search" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "content": "How do I get started?",
        "role": "user"
      }
    ]
  }'
```

### Create a namespace (REST API)

Adapted (not in the official docs): uses the environment variables above instead of the official `<ACCOUNT_ID>` / `<API_TOKEN>` placeholders. See Notes.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai-search/namespaces" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "support",
    "description": "Customer support content"
  }'
```

## Notes

- Source: https://developers.cloudflare.com/ai-search/get-started/wrangler/, https://developers.cloudflare.com/ai-search/api/namespaces/rest-api/, and https://developers.cloudflare.com/ai-search/configuration/data-source/d1/ (pin 34d908a / fetched 2026-11-14)
- Corrected from the official docs: Wrangler is installed locally with `npm install wrangler`, so bare `wrangler` is not on `PATH` unless also installed globally; every command uses `npx wrangler`.
- Corrected from the official docs: the Wrangler web-crawler example uses `--source developers.cloudflare.com`, but the website data source page states that only domains onboarded onto the same Cloudflare account can be crawled; `example.com` (as in the REST example) stands in for your own domain.
- Adapted from the official docs: REST examples read `CLOUDFLARE_ACCOUNT_ID` / `CLOUDFLARE_API_TOKEN` from the environment. The token needs the Account permissions `AI Search:Edit` and `AI Search:Run`.
- Do not commit these values; keep them out of git.

## Related

- [Wrangler commands](../references/ai-search/wrangler-commands.md)
- [REST API instances and items](../references/ai-search/rest-api-instances-items.md)
