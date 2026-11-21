---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/create-engine-es
---

# Create a search app

Create an Agent Search (formerly Vertex AI Search) search app, called an engine in the API, with the Google Cloud console, the `engines.create` REST method, the Python client library, or Terraform. A data store must already exist.

## Signature / Usage

### REST

Find your data store ID first (console **Data Stores** page, then the **Data** page of the data store). In Agent Search the term app can be used interchangeably with engine in the context of APIs. A data store can be attached to only one app and can't be removed from the app later.

```bash
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
-H "X-Goog-User-Project: PROJECT_ID" \
"https://discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/global/collections/default_collection/engines?engineId=APP_ID" \
-d '{
  "displayName": "APP_DISPLAY_NAME",
  "dataStoreIds": ["DATA_STORE_ID"],
  "solutionType": "SOLUTION_TYPE_SEARCH",
  "industryVertical": "GENERIC",
  "searchEngineConfig": {
     "searchTier": "SEARCH_TIER",
     "searchAddOns": ["SEARCH_ADD_ON"]
   }
}'
```

### Python

Uses Application Default Credentials. For a location other than `global`, the sample sets the regional endpoint `{location}-discoveryengine.googleapis.com`.

```python
from typing import List

from google.api_core.client_options import ClientOptions
from google.cloud import discoveryengine_v1 as discoveryengine

# TODO(developer): Uncomment these variables before running the sample.
# project_id = "YOUR_PROJECT_ID"
# location = "YOUR_LOCATION" # Values: "global"
# engine_id = "YOUR_ENGINE_ID"
# data_store_ids = ["YOUR_DATA_STORE_ID"]


def create_engine_sample(
    project_id: str, location: str, engine_id: str, data_store_ids: List[str]
) -> str:
    #  For more information, refer to:
    # https://cloud.google.com/generative-ai-app-builder/docs/locations#specify_a_multi-region_for_your_data_store
    client_options = (
        ClientOptions(api_endpoint=f"{location}-discoveryengine.googleapis.com")
        if location != "global"
        else None
    )

    # Create a client
    client = discoveryengine.EngineServiceClient(client_options=client_options)

    # The full resource name of the collection
    # e.g. projects/{project}/locations/{location}/collections/default_collection
    parent = client.collection_path(
        project=project_id,
        location=location,
        collection="default_collection",
    )

    engine = discoveryengine.Engine(
        display_name="Test Engine",
        # Options: GENERIC, MEDIA, HEALTHCARE_FHIR
        industry_vertical=discoveryengine.IndustryVertical.GENERIC,
        # Options: SOLUTION_TYPE_RECOMMENDATION, SOLUTION_TYPE_SEARCH, SOLUTION_TYPE_CHAT, SOLUTION_TYPE_GENERATIVE_CHAT
        solution_type=discoveryengine.SolutionType.SOLUTION_TYPE_SEARCH,
        # For search apps only
        search_engine_config=discoveryengine.Engine.SearchEngineConfig(
            # Options: SEARCH_TIER_STANDARD, SEARCH_TIER_ENTERPRISE
            search_tier=discoveryengine.SearchTier.SEARCH_TIER_ENTERPRISE,
            # Options: SEARCH_ADD_ON_LLM, SEARCH_ADD_ON_UNSPECIFIED
            search_add_ons=[discoveryengine.SearchAddOn.SEARCH_ADD_ON_LLM],
        ),
        # For generic recommendation apps only
        # similar_documents_config=discoveryengine.Engine.SimilarDocumentsEngineConfig,
        data_store_ids=data_store_ids,
    )

    request = discoveryengine.CreateEngineRequest(
        parent=parent,
        engine=engine,
        engine_id=engine_id,
    )

    # Make the request
    operation = client.create_engine(request=request)

    print(f"Waiting for operation to complete: {operation.operation.name}")
    response = operation.result()

    # After the operation is complete,
    # get information from operation metadata
    metadata = discoveryengine.CreateEngineMetadata(operation.metadata)

    # Handle the response
    print(response)
    print(metadata)

    return operation.operation.name
```

### Console

1. In the console, go to **AI Applications** > **Apps**, click **Create app**, and under **Site search with AI mode** click **Create**.
2. Turn **Enterprise edition features** on or off, and **Generative Responses** on or off.
3. Enter **Your app name** and **External name of your company or organization** (avoid suffixes like Inc or LLC; this helps the LLM identify the company the app represents).
4. Select a location (Enterprise features must be on to pick a location; Google recommends the default **global (Global)** unless you must restrict data to a geography), click **Continue**, then select or create a data store.

## Options / Props

### REST body fields

| Placeholder | Description |
|---|---|
| `PROJECT_ID` | ID of your Google Cloud project |
| `APP_ID` | ID of the Agent Search app to create |
| `APP_DISPLAY_NAME` | Display name of the app |
| `DATA_STORE_ID` | ID of an existing data store to add to the app |
| `SEARCH_TIER` | `SEARCH_TIER_STANDARD` or `SEARCH_TIER_ENTERPRISE`; `SEARCH_TIER_ENTERPRISE` is required for website search and for choosing a region for your app, and Enterprise edition features incur additional cost |
| `SEARCH_ADD_ON` | `SEARCH_ADD_ON_LLM` for generative responses with advanced LLM features (search summaries and search with follow-ups); otherwise specify `SEARCH_ADD_ON_UNSPECIFIED` or remove the `searchAddOns` field |

## Notes

- Python sample enum options (from the sample's comments):
  - `industry_vertical`: `GENERIC`, `MEDIA`, `HEALTHCARE_FHIR`
  - `solution_type`: `SOLUTION_TYPE_RECOMMENDATION`, `SOLUTION_TYPE_SEARCH`, `SOLUTION_TYPE_CHAT`, `SOLUTION_TYPE_GENERATIVE_CHAT`
  - `search_tier`: `SEARCH_TIER_STANDARD`, `SEARCH_TIER_ENTERPRISE`
  - `search_add_ons`: `SEARCH_ADD_ON_LLM`, `SEARCH_ADD_ON_UNSPECIFIED`
- The industry vertical `GENERIC` is used to create custom search apps that contain structured, unstructured, website data stores, or multiple data stores (blended search).
- Data store attachment: if you attach only one data store, you can't attach more later and can't remove it; attaching multiple data stores lets you update the attached data stores later, but the app always requires at least two data stores (see "About blended search" in the data stores guide). The REST step in the source says a data store "can be attached to only one app".
- Terraform: use the `discovery_engine_search_engine` resource of the `hashicorp/google` provider (https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/discovery_engine_search_engine).
- The Python sample waits for the long-running operation with `operation.result()`; the Python sample comment lists `global` as the location value.
- The REST method is `engines.create` (Discovery Engine API `v1`).
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/create-engine-es (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-advanced-features.md](./about-advanced-features.md)
- [enterprise-edition.md](./enterprise-edition.md)
- [long-running-operations.md](./long-running-operations.md)
- [generic-search-checklist.md](./generic-search-checklist.md)
