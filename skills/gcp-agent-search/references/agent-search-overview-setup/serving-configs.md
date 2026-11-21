---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/serving-configs
---

# Serving configs for media recommendation apps

A serving config holds the settings used when generating media recommendations in Agent Search (formerly Vertex AI Search). Every app gets a default serving config automatically; only media recommendation apps allow modifying serving configs or creating several.

## Signature / Usage

### Address a serving config by ID (REST)

Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/configure-serving-controls (the twin for this page has no code block). It attaches boost controls to the default serving config of a search app (`default_search`) with the `engines.servingConfigs.patch` method (`v1alpha`); replace `BOOST_ID_N` with the control IDs:

```bash
curl -X PATCH \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
-H "X-Goog-User-Project: PROJECT_ID" \
"https://discoveryengine.googleapis.com/v1alpha/projects/PROJECT_ID/locations/global/collections/default_collection/engines/APP_ID/servingConfigs/default_search?update_mask=boost_control_ids" \
-d '{
 "boostControlIds": ["BOOST_ID_1", "BOOST_ID_2"]
}'
```

### Create, edit or delete a serving config (console)

1. In the console go to **AI Applications** (`https://console.cloud.google.com/gen-app-builder/engines`), click the app name, and go to **Configurations** > **Control**.
2. Create: click **Create new serving config**, enter a name, set demotion and diversity, click **Save and publish**.
3. Edit: click the serving config name (if you have more than one), update demotion or diversity, click **Save and publish**.
4. Delete: only possible if you have multiple serving configs; click the delete action for the serving config, type its name in the confirmation dialog and click **Confirm**.

## Notes

- Serving config settings for media recommendations apps:
  - Recommendation boost/bury: boost or bury media recommendations based on a filter and boost value. Boost/bury controls can only be created through the API; they can't be created using the Google Cloud console.
  - Recommendation demotion: demote media recommendations based on viewer data or content age.
  - Recommendation diversity: diversify recommendations to reduce the likelihood that similar content is shown in a recommendation panel.
- Default serving config IDs: for recommendations apps, the serving config's ID is the same as the engine ID; for search apps, the default serving config's ID is `default_search`.
- The default serving config ID is specified when making `recommend` or `search` API calls. To get recommendations from a specific serving config, specify its ID in the `recommend` request.
- Search apps and custom recommendations apps don't allow you to modify serving configs or create additional ones. Only media recommendation apps have modifiable serving configs and allow multiple serving configs.
- The borrowed snippet comes from the search-app serving controls guide, which updates the `boostControlIds` of the `default_search` serving config with `engines.servingConfigs.patch`. The serving configs page says that search apps don't allow you to modify serving configs; both statements are kept as the sources write them.
- Deleting a serving config is destructive; try it in a disposable app or project first.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/serving-configs (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/configure-serving-controls (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-engine-es.md](./create-engine-es.md)
- [about-generic-search.md](./about-generic-search.md)
