---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/turn-on-advanced-indexing
---

# Turn on advanced website indexing

Advanced website indexing generates an index for the websites you specify when you create a website data store in Agent Search (formerly Vertex AI Search). You can turn it on at data store creation or by upgrading a data store from basic website search.

## Signature / Usage

### Create a website data store with advanced site search through the API

The source page describes only Console steps. This is a related whole example from the parse-and-chunk page: the `createAdvancedSiteSearch=true` query parameter on the `dataStores` create request with `contentConfig` `PUBLIC_WEBSITE`. The `documentProcessingConfig` part is specific to the layout parser (see the parse-and-chunk page).

Adapted (not in the official docs): The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell.

```bash
( set +x; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl --fail-with-body -X POST \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
-H "Content-Type: application/json" \
-H "X-Goog-User-Project: exampleproject" \
"https://discoveryengine.googleapis.com/v1/projects/exampleproject/locations/global/collections/default_collection/dataStores?dataStoreId=datastore123&createAdvancedSiteSearch=true" \
-d '{
  "displayName": "exampledatastore",
  "industryVertical": "GENERIC",
  "contentConfig": "PUBLIC_WEBSITE",
  "documentProcessingConfig": {
    "chunkingConfig": {
      "layoutBasedChunkingConfig": {}
    },
    "defaultParsingConfig": {
      "layoutParsingConfig": {
       "excludeHtmlElements": ["header", "footer", "nav", "aside"],
       "excludeHtmlClasses": ["overlays", "screenreader"],
       "excludeHtmlIds": ["cookie-banner"]
      }
    }
  }
}' )
```

### Upgrade an existing basic website search data store (Console)

1. In the Google Cloud console, go to the Agent Search page, then **Data Stores**.
2. Click the data store; in the **Type** row click **Upgrade**.
3. In the **Verify your domains** pane, verify the domains by domain association or by verifying domain ownership.

## Notes

- A data store is indexed with advanced website indexing only after a successful domain verification.
- Advanced website indexing imposes a quota on the number of pages you can index (the quota can be upgraded) and incurs additional cost; see the Agent Search pricing and quotas pages.
- You cannot turn off advanced website indexing for an existing data store. Create a new data store and don't select the **Advanced website indexing** option.
- Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/parse-chunk-documents (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/turn-on-advanced-indexing (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [domain-verification.md](./domain-verification.md)
- [create-datastore-ingest.md](./create-datastore-ingest.md)
- [prepare-data.md](./prepare-data.md)
