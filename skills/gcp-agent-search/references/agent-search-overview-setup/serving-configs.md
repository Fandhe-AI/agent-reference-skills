---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/serving-configs
---

# Serving configs for media recommendation apps

A serving config holds the settings used when generating media recommendations in Agent Search (formerly Vertex AI Search). Every app gets a default serving config automatically. Only media recommendation apps let you create additional serving configs and change the media recommendation settings on this page (boost/bury, demotion, diversity). A search app keeps its single default serving config `default_search`, to which you attach serving controls (for example boost controls) with `engines.servingConfigs.patch`, as the example below does.

## Signature / Usage

### Address a serving config by ID (REST)

Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/configure-serving-controls (the twin for this page has no code block). It attaches boost controls to the default serving config of a search app (`default_search`) with the `engines.servingConfigs.patch` method (`v1alpha`); replace `BOOST_ID_N` with the control IDs. The official docs don't say whether `update_mask=boost_control_ids` replaces the `boostControlIds` list or adds to it (see Notes). To keep the controls already attached, read the serving config with `engines.servingConfigs.get` (`GET https://discoveryengine.googleapis.com/v1alpha/projects/PROJECT_ID/locations/global/collections/default_collection/engines/APP_ID/servingConfigs/default_search`), send its existing `boostControlIds` plus the new ID, then call `get` again and check the stored list (fix duplicates or missing IDs with another `patch`). The same applies to `filterControlIds`, `synonymsControlIds`, `redirectControlIds` and `promoteControlIds` with their `update_mask` values:

Adapted (not in the official docs): The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell.

```bash
( set +x; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl --fail-with-body -X PATCH \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
-H "Content-Type: application/json" \
-H "X-Goog-User-Project: PROJECT_ID" \
"https://discoveryengine.googleapis.com/v1alpha/projects/PROJECT_ID/locations/global/collections/default_collection/engines/APP_ID/servingConfigs/default_search?update_mask=boost_control_ids" \
-d '{
 "boostControlIds": ["BOOST_ID_1", "BOOST_ID_2"]
}' )
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
- What search apps cannot do: the serving configs page says "However, search and custom recommendations apps don't allow you to modify serving configs or create additional serving configs. Only media recommendation apps have modifiable serving configs and allow multiple serving configs." and "For any media recommendations app, you can create multiple serving configs with different settings for recommendations boost/bury, demotion, and diversity." The create, edit and delete steps above (demotion and diversity settings, more than one serving config) therefore apply to media recommendation apps only.
- What search apps can do: the serving controls guide says "To change the results of a request, first create a serving control. Then, attach that control to the *serving config* of a search app." and "A serving control only affects requests served by the app if the control is attached to the app's serving config." Its examples attach controls to the existing `default_search` serving config with `engines.servingConfigs.patch` (`v1alpha`) by updating `boostControlIds`, `filterControlIds`, `synonymsControlIds`, `redirectControlIds` or `promoteControlIds` with the matching `update_mask`; the borrowed snippet above is the boost case.
- List fields and `update_mask`: the `discoveryengine.v1alpha` Discovery document describes the `servingConfigs.patch` parameter `updateMask` as "Indicates which fields in the provided ServingConfig to update. The following are NOT supported: * ServingConfig.name If not set, all supported fields are updated." and `servingConfigs.get` as "Gets a ServingConfig. Returns a NotFound error if the ServingConfig does not exist."; it does not say how repeated fields are merged. Neither the serving configs page nor the serving controls guide says whether a `*ControlIds` list in the request replaces the stored list or is added to it, so this is not confirmed by the official docs (AIP-134, https://google.aip.dev/134, covers field masks in general, not this service); check the stored list with `servingConfigs.get` after each update.
- Deleting a serving config is destructive; try it in a disposable app or project first.
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/serving-configs (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/configure-serving-controls (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-engine-es.md](./create-engine-es.md)
- [about-generic-search.md](./about-generic-search.md)
