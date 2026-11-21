---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/domain-verification
---

# Verify website domains

Domain verification is required for the URL patterns of a website data store when you turn on advanced website indexing at creation or upgrade from basic website search. Agent Search (formerly Vertex AI Search) offers two approaches: domain association and domain ownership verification through Google Search Console.

## Signature / Usage

### Create a website data store with advanced website indexing (API)

Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/parse-chunk-documents (the twin for this page has no code block). Creating a website data store with `createAdvancedSiteSearch=true` turns on advanced website indexing, which is the case that requires domain verification; the `documentProcessingConfig` part is specific to the layout parser.

```bash
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
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
}'
```

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
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/domain-verification (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [turn-on-advanced-indexing.md](./turn-on-advanced-indexing.md)
- [prepare-data.md](./prepare-data.md)
