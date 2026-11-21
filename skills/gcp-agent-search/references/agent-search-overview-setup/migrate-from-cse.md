---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/migrate-from-cse
---

# Migrate from Programmable Search Engine

Replace the Custom Search Site Restricted JSON API of Programmable Search Engine with an Agent Search (formerly Vertex AI Search) website search app. Deploy with the no-code search widget (OAuth 2.0) or through the API, using OAuth 2.0 (`search` / `answer`) or an API key (`searchLite`).

## Signature / Usage

### Search with an API key (`searchLite`)

Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/preview-search-results (the twin for this page has no code block). After deploying with an API key, call `engines.servingConfigs.searchLite` with the key; replace `API_KEY`, `PROJECT_ID`, `APP_ID`, `QUERY` and `USER_PSEUDO_ID`:

```bash
curl -X POST -H "Content-Type: application/json" \
"https://discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/global/collections/default_collection/engines/APP_ID/servingConfigs/default_search:searchLite?key=API_KEY" \
-d '{
"servingConfig": "projects/PROJECT_ID/locations/global/collections/default_collection/engines/APP_ID/servingConfigs/default_search",
"query": "QUERY",
"userPseudoId": "USER_PSEUDO_ID"
}'
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
2. For increased security, add an HTTP restriction to the key to restrict access to `https://discoveryengine.googleapis.com/*`.
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
- Source wording (API key restriction): the source says "*Don't add any referrer restrictions*. Some user privacy settings don't pass the referrer URL." and then "For increased security, add an HTTP restriction to your API Key to restrict access to the Agent Search service at `https://discoveryengine.googleapis.com/*`." It doesn't say which restriction type "HTTP restriction" means. Its link goes to https://docs.cloud.google.com/docs/authentication/api-keys#api_key_restrictions, which treats API restrictions (the APIs a key can call) and application restrictions (HTTP referrers, IP addresses, Android apps, iOS apps) as separate settings; an HTTP referrer restriction matches the website that sends the request, not the API host. API key restrictions are covered in `gcp-foundation`. Both sentences are kept as written.
- The key is sent in the request URL (`?key=API_KEY`); treat it as a credential and don't commit it to code.
- You can filter or order results (filter expressions and ordering for basic website search), apply promote controls, search for images on websites, and use follow-up questions (multi-turn search); see the linked guides.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/migrate-from-cse (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/preview-search-results (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [authentication.md](./authentication.md)
- [access-control.md](./access-control.md)
- [website-search-checklist.md](./website-search-checklist.md)
- [about-advanced-features.md](./about-advanced-features.md)
- [create-engine-es.md](./create-engine-es.md)
