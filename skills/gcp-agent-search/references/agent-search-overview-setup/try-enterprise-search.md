---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/try-enterprise-search
---

# Get started with custom search

Console tutorial that creates an Agent Search app (formerly Vertex AI Search) over custom, non-vertical data: website data crawled from `cloud.google.com/generative-ai-app-builder/`, structured data (an NDJSON dataset in Cloud Storage), or unstructured data (PDFs in Cloud Storage). Complete "Before you begin" first.

## Signature / Usage

### Create a data store: website data

Turn **Advanced website indexing** off. In **Sites to include**, enter:

```text
cloud.google.com/generative-ai-app-builder/*
```

Select **global (Global)** as the location, name the data store and note the generated **ID**.

### Create a data store: structured data

Select **Cloud Storage**, then **Structured data (JSONL)**, make sure **File** is selected, and in the `gs://` field enter:

```text
cloud-samples-data/gen-app-builder/search/kaggle_movies/movie_metadata.ndjson
```

The bucket holds an NDJSON file of movies from Kaggle. Assign key properties, select **global (Global)** and create the data store.

### Create a data store: unstructured data

Select **Cloud Storage**, then **Unstructured documents (PDF, HTML, TXT and more)**, make sure **Folder** is selected, and in the `gs://` field enter:

```text
cloud-samples-data/gen-app-builder/search/alphabet-investor-pdfs
```

The bucket holds earnings report PDFs from the Alphabet investor site. Select **global (Global)** and create the data store.

### Create a search app

1. Go to **Create App**, under **Site search with AI mode** click **Create**.
2. Make sure **Enterprise edition features** is turned on (the unstructured section of the source says **Enterprise features**).
3. Enter the app name and the **External name of your company or organization** (the tutorial uses `Google Cloud`, `Cymbal Cinemas` or `Alphabet`).
4. Select **global (Global)** as the app location, click **Continue**, select the data store you created, click **Create**.
5. Structured / unstructured: on the app's **Data** page, the **Activity** tab shows ingestion status; **Import completed** typically appears after two to three minutes for these datasets.

### Preview, configure and deploy

- **Preview** in the navigation menu: search `Agent Search` (website), `trains` (structured) or `Google` (unstructured).
- **Configurations**: **UI** tab (click **Save and publish** after changes), **Autocomplete** tab, **Response Settings** tab.
- **Integration** > **Widget** tab: select **JWT or OAuth based** as the widget authorization type, enter the **Domain** (for `example.com/ai.html` enter `example.com`), **Add**, **Save**, copy the snippet, generate an authorization token in your codebase, and pass it with the "Set authorization token" snippet by replacing `<JWT or OAuth token provided by your backend>`.

## Options / Props

### Structured data key properties

| Field name | Key property |
|---|---|
| `homepage` | `uri` |
| `overview` | `description` |

## Notes

- Data store location for the tutorial: **global (Global)**.
- Clean up: delete the project, or delete the app (see the "Delete an app" page) and turn off Agent Search; this avoids charges. Delete only resources you created for the tutorial, ideally in a disposable project.
- The source is Console-only; the `text` fences above are the values the tutorial asks you to type.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/try-enterprise-search (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [before-you-begin.md](./before-you-begin.md)
- [about-generic-search.md](./about-generic-search.md)
- [create-engine-es.md](./create-engine-es.md)
- [generic-search-checklist.md](./generic-search-checklist.md)
