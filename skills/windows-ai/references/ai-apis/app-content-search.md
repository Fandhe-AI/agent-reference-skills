# App Content Search

App Content Search lets apps index their own text and image content with the `AppContentIndexer` API and query it by keyword (lexical) and by meaning (semantic), including as a local retrieval step for RAG.

## Signature / Usage

Snippet taken from https://learn.microsoft.com/en-us/windows/ai/apis/app-content-search-tutorial.

```csharp
GetOrCreateIndexResult result = AppContentIndexer.GetOrCreateIndex("myindex");
if (!result.Succeeded)
{
    throw new InvalidOperationException($"Failed to open index. Status = '{result.Status}', Error = '{result.ExtendedError}'");
}
using AppContentIndexer indexer = result.Indexer;
```

## Notes

- Availability: stable channel starting with Windows App SDK 2.5.1 as a Limited Access Feature; obtain a feature token before calling the stable APIs. Experimental-channel availability doesn't require that token, and experimental access doesn't grant access to the stable API. Select a supported package using the Windows App SDK release channels.
- Supported content: text (plain or structured) and images (screenshots, photos, or image files containing text or recognizable visual elements).
- Behind the API: embedding vectors, vector databases, and traditional text indexing are abstracted away. The index is persisted to disk, so re-indexing isn't needed on each app launch.
- Queries accept a plain string and can return lexical matches (exact text, including text found within images) and semantic matches (similar meaning). Descriptive phrases such as "cats sitting on windowsills" work best.
- App-defined content identifiers: items are indexed with app-defined IDs. Text queries return `AppManagedTextQueryMatch` and image queries return `AppManagedImageQueryMatch`; both carry only the `ContentId`, not the content, so the app retrieves content from its own store.
- Privacy: indexes are generated on behalf of your app and stored in its local app data folder. Index only non-sensitive application content; don't use it for data that may contain personal, confidential, or sensitive information.
- Responsible AI: semantic indexing and search apply no content moderation and don't detect or mitigate semantic bias from the underlying models; developers evaluate and manage the risks.
- The AI Dev Gallery app offers an interactive AppContentIndexer sample.
- Prerequisites not stated on the overview page: the quickstart requires package identity (packaged apps, including those with external locations), and semantic indexing and Text Recognition (OCR) additionally require the `systemAIModels` capability (with the `systemai` namespace declared in the manifest); see [Semantic Search quickstart (App Content Search)](./app-content-search-tutorial.md).
- Source: https://learn.microsoft.com/en-us/windows/ai/apis/app-content-search-tutorial (retrieved 2026-11-14)
- Source: https://learn.microsoft.com/en-us/windows/ai/apis/app-content-search (retrieved 2026-11-14)

## Related

- [Semantic Search quickstart (App Content Search)](./app-content-search-tutorial.md)
- [Semantic Search](./semantic-search.md)
- [AI Dev Gallery](./ai-dev-gallery.md)
