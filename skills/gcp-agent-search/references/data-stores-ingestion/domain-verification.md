---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/domain-verification
---

# Verify website domains

Domain verification is required for the URL patterns of a website data store when you turn on advanced website indexing at creation or upgrade from basic website search. Agent Search (formerly Vertex AI Search) offers two approaches: domain association and domain ownership verification through Google Search Console.

## Signature / Usage

### Create a website data store with advanced website indexing (API)

Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/parse-chunk-documents (the twin for this page has no code block). Creating a website data store with `createAdvancedSiteSearch=true` turns on advanced website indexing, which is the case that requires domain verification; the `documentProcessingConfig` part is specific to the layout parser.

Adapted (not in the official docs): The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X POST \
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

After the create operation is done ([long-running-operations.md](../agent-search-overview-setup/long-running-operations.md)), add the URL patterns with `siteSearchEngine.targetSites.create` (`discoveryengine.v1`: `POST .../v1/{+parent}/targetSites`, parent `.../dataStores/DATA_STORE_ID/siteSearchEngine`; returns an operation), then verify the domains; the source says advanced website indexing "is activated only after the domain verification".

### Verify domains in the Console

1. Go to the **AI Applications** page, then **Data Stores**, then the data store; select **Data**.
2. On the **Website** tab click **Verify** (for all domains), or **Verify** in the **Status** column for one URL pattern (available only after indexing is complete).
3. In the **Domain verification** pane, expand **Verify the DOMAIN_NAME domain** and use one of:
   - Domain association: **Send association request**, then **Send request**. The domain owner approves in Google Search Console; you get confirmation emails.
   - Domain ownership: **Verify in Search Console** and follow the Search Console instructions to verify a domain or a URL prefix.
4. Repeat for every URL pattern that requires verification.

## Notes

- Verification approaches (domain association or domain ownership verification):
  - Domain association: You're not the domain owner or lack Google Search Console access. The association request is sent to the domain owner through the Google Cloud console, who approves it in Google Search Console.
  - Domain ownership verification: You own the domain, can contact the owner for verification through Search Console, or have Search Console access to verify the domain.
- Domain ownership is ownership of the domain the URL patterns belong to; it is different from owning a Google Cloud project (an IAM role).
- If the domain owner isn't found in Google Search, reach out to the owner yourself and use domain ownership verification. If you get no response within a week you can resend the association request; if you own the domain it is verified automatically after you send the request.
- You verify the entire domain: after verifying `www.mysite.com/abc`, adding `www.mysite.com/def` needs no new verification (both are in `mysite.com`).
- A verified domain is automatically verified for all data stores in that project, and this persists even if you no longer own the domain.
- If the domain isn't verified, the website can't be indexed with advanced website indexing; you can verify any time after creating the data store and indexing is activated only after verification.
- If verification is blocked, contact your customer engineer or Google account team, who can submit a domain-verification exemption request after confirming your organization owns the domains.
- Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/parse-chunk-documents (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell. `unset` at its start also drops an `export` of the variables it sets in the calling shell, so their values are not put in the environment of `curl` and the other commands.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/domain-verification (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: every `curl` call starts with `-q`, because the curl manual says for `-q, --disable` "If used as the first parameter on the command line, the curlrc config file is not read or used." (`man curl`, curl 8.7.1); without it, a `trace` or `trace-ascii` line in `.curlrc` writes the request headers, including the token or API key, to a file (checked with curl 8.7.1 against a local 127.0.0.1 server).
- Adapted from the official docs: the subshell starts with `set +a` because it inherits `set -a` from the calling shell. With it on, in bash "Each variable or function that is created or modified is given the export attribute and marked for export to the environment of subsequent commands." (`man bash`, GNU bash 5.3.9), and in zsh "All parameters subsequently defined are automatically exported." (`ALL_EXPORT`, `man zshoptions`, zsh 5.9), so `TOKEN`, `API_KEY` or `BODY` would reach the environment of `curl` and `jq`.

## Related

- [turn-on-advanced-indexing.md](./turn-on-advanced-indexing.md)
- [prepare-data.md](./prepare-data.md)
