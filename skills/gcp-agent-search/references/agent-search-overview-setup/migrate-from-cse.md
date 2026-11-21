---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/migrate-from-cse
---

# Migrate from Programmable Search Engine

Replace the Custom Search Site Restricted JSON API of Programmable Search Engine with an Agent Search (formerly Vertex AI Search) website search app. Deploy with the no-code search widget (OAuth 2.0) or through the API, using OAuth 2.0 (`search` / `answer`) or an API key (`searchLite`).

## Signature / Usage

### Search with an API key (`searchLite`)

Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/preview-search-results (the twin for this page has no code block). After deploying with an API key, call `engines.servingConfigs.searchLite` with the key; replace `PROJECT_ID`, `APP_ID` and `USER_PSEUDO_ID` (the command reads `API_KEY` and `QUERY` at the prompt):

Run the command by itself in bash or zsh (it uses process substitution, `<(...)`) and type the API key (not echoed), then the query text on one line at the prompt; nothing is sent if the key is empty. `jq` (required) encodes `QUERY` as a JSON string. A line that follows the command in the same paste or script is read as the key or query.

Adapted (not in the official docs): removed the `servingConfig` body field, because the `discoveryengine.v1` request schema (`SearchRequest`) does not define it and the URL path already carries the serving config (`v1/{+servingConfig}:searchLite`). Also, the request body is built with `jq -n --arg query "$QUERY" '{...}'` from the text read by `IFS= read -r QUERY` and sent on standard input with `--data @-`, instead of putting `"QUERY"` inside the single-quoted `-d '{...}'` argument, so apostrophes, double quotes and backslashes in the query cannot break the shell quoting or the JSON; every other field is unchanged. The API key is read with `IFS= read -rs API_KEY` (not echoed, not in the shell history; an empty key sends nothing) and sent in the `X-Goog-Api-Key` request header instead of the `?key=API_KEY` query parameter. curl reads that header from a file (`-H @<(printf 'X-Goog-Api-Key: %s\n' "$API_KEY")`): `printf` is a shell builtin and process substitution passes curl only a file name such as `/dev/fd/63`, so the key is in neither the request URL nor any process's arguments; `unset` clears the variable afterwards.

```bash
IFS= read -rs API_KEY && [ -n "$API_KEY" ] && IFS= read -r QUERY && jq -n --arg query "$QUERY" '{
"query": $query,
"userPseudoId": "USER_PSEUDO_ID"
}' |
curl -X POST -H "Content-Type: application/json" \
-H @<(printf 'X-Goog-Api-Key: %s\n' "$API_KEY") \
"https://discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/global/collections/default_collection/engines/APP_ID/servingConfigs/default_search:searchLite" \
--data @-; unset API_KEY
```

### Console steps

1. Select the project you used for the Custom Search Site Restricted JSON API and turn on Agent Search.
2. **AI Applications** > **Create app**, under **Site search with AI mode** click **Create**.
3. Keep **Enterprise edition features** on (required for website search). Turn **Generative Responses** off for functionality similar to the Custom Search Site Restricted JSON API; turn it off if you don't need search summarization or search with follow-ups.
4. Enter the app name and **External name of your company or organization**; select **global (Global)** as the location.
5. **Data Stores** > **Create data store** > **Website Content**; turn **Advanced website indexing** off for functionality similar to the Custom Search Site Restricted JSON API; turn it off if you don't need search summarization or search with follow-ups, or if you don't own the domains that you specify.
6. In **Sites to include** enter the URL patterns to search, then create the data store, select it, and click **Create**.

### Deploy with OAuth 2.0

Set up OAuth 2.0 per "On Google Cloud" in the authentication page, and add the Discovery Engine User (`roles/discoveryengine.user`) or Discovery Engine Viewer (`roles/discoveryengine.viewer`) role to the service account. Then use the search widget (no coding) or the API (`servingConfigs.search`).

### Deploy with an API key

1. In the console go to **Credentials**, click **Create credentials** > **API key**. Don't add any referrer restrictions (some user privacy settings don't pass the referrer URL). Note the key for `searchLite`.
2. For increased security, add an API restriction to the key that allows only the Discovery Engine API (`discoveryengine.googleapis.com`). If you also add an application restriction, set it to match the real callers of the key (the source advises against HTTP referrer restrictions, see step 1).
3. Deploy with the API: call `servingConfigs.searchLite` (see "Get search results for an app with website data (API key)" and the request above).

## Options / Props

### `searchLite` vs `search`

| Feature/Methods | `searchLite` method | `search` method |
|---|---|---|
| **Authentication** | API key | OAuth 2.0 |
| **Search widget available** | ✘ | ✔ |
| **Search summaries** | ✔ | ✔ |
| **Search public websites** | ✔ | ✔ |

## Notes

- The Custom Search Site Restricted JSON API of Programmable Search Engine authenticates with an API key; Agent Search requires OAuth 2.0 with a couple of exceptions. To keep using an API key, use `searchLite`; with OAuth 2.0 use `search` and `answer`, and optionally the no-code search widget.
- Advanced features (summaries, search with follow-ups, extractive answers) for web search require domain verification and incur additional indexing costs; see the Agent Search pricing page.
- Corrected from the official docs: the source says "*Don't add any referrer restrictions*. Some user privacy settings don't pass the referrer URL." and then "For increased security, add an HTTP restriction to your API Key to restrict access to the Agent Search service at `https://discoveryengine.googleapis.com/*`." The page it links, https://docs.cloud.google.com/docs/authentication/api-keys#api_key_restrictions, separates API restrictions (which APIs the key can call) from application restrictions (HTTP referrers, IP addresses, Android apps, iOS apps); an HTTP referrer restriction matches the website that sends the request, not the API host, so `https://discoveryengine.googleapis.com/*` as a referrer would reject legitimate calls. Step 2 is rewritten to an API restriction to the Discovery Engine API. API key restrictions are covered in `gcp-foundation`.
- The source sends the key in the request URL (`?key=API_KEY`); the example above sends it in the `X-Goog-Api-Key` header instead. Treat the key as a credential and don't commit it to code.
- API key header: the Agent Platform express mode page says "Passing your API key as a query parameter isn't required. Pass your API key in the `x-goog-api-key` HTTP header (for example, `-H "x-goog-api-key: API_KEY"`). If your client environment doesn't let you set HTTP headers, you can pass the `key` system query parameter instead (`?key=API_KEY`)." (https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/express-mode/overview, retrieved 2026-11-21), and the Google Cloud system parameters page maps the `key` URL query parameter to the `X-Goog-Api-Key` HTTP header for Google APIs (https://docs.cloud.google.com/apis/docs/system-parameters; retrieved 2026-11-16 as recorded in the gcp-client-libraries skill). The Agent Search pages themselves show only `?key=API_KEY`. The example passes the header to `curl` as `-H @<(printf 'X-Goog-Api-Key: %s\n' "$API_KEY")`, so the key is not in the request URL, the shell history or any process's arguments: the curl 8.7.1 manual page (`man curl`, `-H, --header`) says "This option can take an argument in @filename style, which then adds a header for each line in the input file. Using @- makes curl read the header file from stdin. Added in 7.55.0.", `type printf` reports "printf is a shell builtin" in bash, and process substitution hands curl only a `/dev/fd/N` file name. It needs curl 7.55.0 or later and bash or zsh.
- You can filter or order results (filter expressions and ordering for basic website search), apply promote controls, search for images on websites, and use follow-up questions (multi-turn search); see the linked guides.
- Corrected from the official docs: the borrowed `v1` `searchLite` request body (from the preview-search-results page) includes `"servingConfig": "projects/PROJECT_ID/locations/global/collections/default_collection/engines/APP_ID/servingConfigs/default_search",`; the `discoveryengine.v1` Discovery document defines no `servingConfig` property in `GoogleCloudDiscoveryengineV1SearchRequest` (the `v1beta` and `v1alpha` `SearchRequest` schemas do) and the method path `v1/{+servingConfig}:searchLite` carries the value, so the field is removed.
- Corrected from the official docs: the source writes the query placeholder inside the single-quoted `curl -d '{...}'` body (`"query": "QUERY"`). Replacing it with a query that contains an apostrophe ends the shell quoting, and a query with `"`, `\` or a line break makes the JSON invalid, so the body is built with `jq --arg` from standard input and sent with `--data @-`. The source also sends the API key as `?key=API_KEY` in the URL; the key is sent in the `X-Goog-Api-Key` header instead, which Google APIs accept for the `key` system parameter (see the API key Notes line).
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/migrate-from-cse (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/preview-search-results (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [authentication.md](./authentication.md)
- [access-control.md](./access-control.md)
- [website-search-checklist.md](./website-search-checklist.md)
- [about-advanced-features.md](./about-advanced-features.md)
- [create-engine-es.md](./create-engine-es.md)
