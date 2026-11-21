---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/migrate-from-cse
---

# Migrate from Programmable Search Engine

Replace the Custom Search Site Restricted JSON API of Programmable Search Engine with an Agent Search (formerly Vertex AI Search) website search app. Deploy with the no-code search widget (OAuth 2.0) or through the API, using OAuth 2.0 (`search` / `answer`) or an API key (`searchLite`).

## Signature / Usage

### Search with an API key (`searchLite`)

Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/preview-search-results (the twin for this page has no code block). After deploying with an API key, call `engines.servingConfigs.searchLite` with the key; replace `PROJECT_ID` and `APP_ID` (the command reads `API_KEY`, `QUERY` and `USER_PSEUDO_ID` at the prompt):

Run the command by itself in bash or zsh (it uses process substitution, `<(...)`) and type the API key (not echoed), then the query text and `USER_PSEUDO_ID` on one line each; nothing is sent if a value is empty. The command's exit status is non-zero (1) when nothing was sent, when curl fails, or when the server returns an HTTP status of 400 or greater (`--fail-with-body` needs curl 7.76.0 or later). `jq` (required) encodes `QUERY` and `USER_PSEUDO_ID` as JSON strings. A line that follows the command in the same paste or script is read as the key or query. The command sends no HTTP referrer, so use a key restricted to the external IP address of the machine that runs it (step 3 of "Deploy with an API key"); a key with a website restriction ("only calls from `https://example.com` can use that API key", API keys page) is checked from an allowed site instead.

Adapted (not in the official docs): removed the `servingConfig` body field, because the `discoveryengine.v1` request schema (`SearchRequest`) does not define it and the URL path already carries the serving config (`v1/{+servingConfig}:searchLite`). Also, the request body is built with `printf '%s\n' ... | jq -Rn '[inputs] as [...] | {...}'` from the text read by `IFS= read -r QUERY` and sent on standard input with `--data @-`, instead of putting `"QUERY"` and `"USER_PSEUDO_ID"` inside the single-quoted `-d '{...}'` argument, so apostrophes, double quotes and backslashes in the query cannot break the shell quoting or the JSON; every other field is unchanged. The API key is read with `IFS= read -rs API_KEY` (not echoed, not in the shell history; an empty key or query sends nothing, checked after both lines are read) and sent in the `X-Goog-Api-Key` request header instead of the `?key=API_KEY` query parameter. curl reads that header from a file (`-H @<(printf 'X-Goog-Api-Key: %s\n' "$API_KEY")`): `printf` is a shell builtin and process substitution passes curl only a file name such as `/dev/fd/63`, so the key is in neither the request URL nor any process's arguments. `curl --fail-with-body` makes an HTTP status of 400 or greater a failure (exit code 22), and `rc=$?; unset API_KEY; [ "$rc" -eq 0 ]` clears the variable and then sets the exit status to 0, or to 1 if the request failed, without exiting an interactive shell. `printf` is a shell builtin, so these values reach `jq` on standard input, not in its arguments (the process list). The body is built in its own step (`BODY=$(... | jq ...) &&`) and piped to `curl` with the `printf` builtin, so a `jq` error stops the command before `curl` runs. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the API key, and `API_KEY` does not stay in your shell. `unset API_KEY` at its start also drops an `export` of that variable in your shell, so the new value is not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset API_KEY; IFS= read -rs API_KEY && IFS= read -r QUERY && IFS= read -r USER_PSEUDO_ID && [ -n "$API_KEY" ] && [ -n "$QUERY" ] && [ -n "$USER_PSEUDO_ID" ] &&
BODY=$(printf '%s\n' "$QUERY" "$USER_PSEUDO_ID" |
jq -Rn '[inputs] as [$query, $user_pseudo_id] | {
"query": $query,
"userPseudoId": $user_pseudo_id
}') &&
printf '%s' "$BODY" |
curl -q --fail-with-body -X POST -H "Content-Type: application/json" \
-H @<(printf 'X-Goog-Api-Key: %s\n' "$API_KEY") \
"https://discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/global/collections/default_collection/engines/APP_ID/servingConfigs/default_search:searchLite" \
--data @-; rc=$?; unset API_KEY; [ "$rc" -eq 0 ] )
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

Restrict the key before you deploy it (see Notes for the source's wording):

1. In the console go to **Credentials**, click **Create credentials** > **API key**. Note the key for `searchLite`.
2. Add an API restriction that allows only the Discovery Engine API (`discoveryengine.googleapis.com`); the API keys page says "API keys without API restrictions can be used with all APIs that accept keys generated by Google Cloud."
3. Add an application restriction for the real callers ("API keys without application restrictions can be used from anywhere."). The types are Websites (HTTP referrers), IP addresses ("Specifies the servers or cron jobs that can use the key."), Android apps and iOS apps. If the callers can't be relied on to send a referrer, call `searchLite` from your own servers and restrict the key to their external IP addresses ("Internal IP addresses and `localhost` aren't supported.").
4. Deploy with the API: call `servingConfigs.searchLite` (see "Get search results for an app with website data (API key)" and the request above).

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
- Corrected from the official docs: the source says "*Don't add any referrer restrictions*. Some user privacy settings don't pass the referrer URL." and then "For increased security, add an HTTP restriction to your API Key to restrict access to the Agent Search service at `https://discoveryengine.googleapis.com/*`." The page it links, https://docs.cloud.google.com/docs/authentication/api-keys#api_key_restrictions, separates API restrictions (which APIs the key can call) from application restrictions (HTTP referrers, IP addresses, Android apps, iOS apps); an HTTP referrer restriction matches the website that sends the request, not the API host, so `https://discoveryengine.googleapis.com/*` as a referrer would reject legitimate calls. Step 2 is rewritten to an API restriction to the Discovery Engine API.
- Adapted from the official docs: the source makes the restriction optional ("For increased security") and says not to add referrer restrictions; the steps here make the API restriction and an application restriction part of the deployment, using the restriction types of the API keys page (quoted in steps 2 and 3). API key restrictions are covered in `gcp-foundation`.
- Adapted from the official docs: the source sends the key in the request URL (`?key=API_KEY`); the example above sends it in the `X-Goog-Api-Key` header instead. Treat the key as a credential and don't commit it to code. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the API key, and `API_KEY` does not stay in the calling shell. `unset API_KEY` at its start also drops an `export` of that variable in the calling shell, so the value is not put in the environment of `curl` and the other commands.
- API key header: the Agent Platform express mode page says "Passing your API key as a query parameter isn't required. Pass your API key in the `x-goog-api-key` HTTP header (for example, `-H "x-goog-api-key: API_KEY"`). If your client environment doesn't let you set HTTP headers, you can pass the `key` system query parameter instead (`?key=API_KEY`)." (https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/express-mode/overview, retrieved 2026-11-21), and the Google Cloud system parameters page maps the `key` URL query parameter to the `X-Goog-Api-Key` HTTP header for Google APIs (https://docs.cloud.google.com/apis/docs/system-parameters; retrieved 2026-11-16 as recorded in the gcp-client-libraries skill). The Agent Search pages themselves show only `?key=API_KEY`. The example passes the header to `curl` as `-H @<(printf 'X-Goog-Api-Key: %s\n' "$API_KEY")`, so the key is not in the request URL, the shell history or any process's arguments: the curl 8.7.1 manual page (`man curl`, `-H, --header`) says "This option can take an argument in @filename style, which then adds a header for each line in the input file. Using @- makes curl read the header file from stdin. Added in 7.55.0.", `type printf` reports "printf is a shell builtin" in bash, and process substitution hands curl only a `/dev/fd/N` file name. It needs curl 7.55.0 or later and bash or zsh. The source's command reports success whatever the HTTP status, and a trailing `unset` would make the variable's removal the command's status; the example adds `--fail-with-body` (same manual page: "(HTTP) Return an error on server errors where the HTTP response code is 400 or greater)." ... "This option is mutually exclusive to -f, --fail. Added in 7.76.0.") and ends with a non-zero status after `unset` when the request failed, so it needs curl 7.76.0 or later.
- You can filter or order results (filter expressions and ordering for basic website search), apply promote controls, search for images on websites, and use follow-up questions (multi-turn search); see the linked guides.
- Corrected from the official docs: the borrowed `v1` `searchLite` request body (from the preview-search-results page) includes `"servingConfig": "projects/PROJECT_ID/locations/global/collections/default_collection/engines/APP_ID/servingConfigs/default_search",`; the `discoveryengine.v1` Discovery document defines no `servingConfig` property in `GoogleCloudDiscoveryengineV1SearchRequest` (the `v1beta` and `v1alpha` `SearchRequest` schemas do) and the method path `v1/{+servingConfig}:searchLite` carries the value, so the field is removed.
- Corrected from the official docs: the source writes the query placeholder inside the single-quoted `curl -d '{...}'` body (`"query": "QUERY"`). Replacing it with a query that contains an apostrophe ends the shell quoting, and a query with `"`, `\` or a line break makes the JSON invalid, so the body is built with `jq -Rn` from the values, which the `printf` builtin writes to its standard input (not its arguments), and sent with `--data @-` (`man jq` 1.7.1: `--raw-input / -R` "each line of text is passed to the filter as a string"; `inputs` "Outputs all remaining inputs, one by one."). The source also sends the API key as `?key=API_KEY` in the URL; the key is sent in the `X-Goog-Api-Key` header instead, which Google APIs accept for the `key` system parameter (see the API key Notes line).
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/migrate-from-cse (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/preview-search-results (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/docs/authentication/api-keys (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: every `curl` call starts with `-q`, because the curl manual says for `-q, --disable` "If used as the first parameter on the command line, the curlrc config file is not read or used." (`man curl`, curl 8.7.1); without it, a `trace` or `trace-ascii` line in `.curlrc` writes the request headers, including the token or API key, to a file (checked with curl 8.7.1 against a local 127.0.0.1 server).
- Adapted from the official docs: the subshell starts with `set +a` because it inherits `set -a` from the calling shell. With it on, in bash "Each variable or function that is created or modified is given the export attribute and marked for export to the environment of subsequent commands." (`man bash`, GNU bash 5.3.9), and in zsh "All parameters subsequently defined are automatically exported." (`ALL_EXPORT`, `man zshoptions`, zsh 5.9), so `TOKEN`, `API_KEY` or `BODY` would reach the environment of `curl` and `jq`.

## Related

- [authentication.md](./authentication.md)
- [access-control.md](./access-control.md)
- [website-search-checklist.md](./website-search-checklist.md)
- [about-advanced-features.md](./about-advanced-features.md)
- [create-engine-es.md](./create-engine-es.md)
