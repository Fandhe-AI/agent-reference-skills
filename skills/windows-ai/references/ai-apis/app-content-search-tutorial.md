# Semantic Search quickstart (App Content Search)

Create a semantic index of in-app content with `AppContentIndexer`, add text or image data, query by meaning, feed results into RAG prompts, and manage the indexer lifetime.

## Signature / Usage

```csharp
GetOrCreateIndexResult result = AppContentIndexer.GetOrCreateIndex("myindex");
if (!result.Succeeded)
{
    throw new InvalidOperationException($"Failed to open index. Status = '{result.Status}', Error = '{result.ExtendedError}'");
}
using AppContentIndexer indexer = result.Indexer;

// Add text
IndexableAppContent textContent = AppManagedIndexableAppContent.CreateFromString("item1", "Cats are cute and fluffy.");
indexer.AddOrUpdate(textContent);

// Semantic text query
AppIndexTextQuery queryCursor = indexer.CreateTextQuery("Facts about kittens.");
IReadOnlyList<TextQueryMatch> textMatches = queryCursor.GetNextMatches(5);
foreach (var match in textMatches)
{
    if (match.ContentKind == QueryMatchContentKind.AppManagedText)
    {
        var textResult = (AppManagedTextQueryMatch)match;
        // textResult.TextOffset / textResult.TextLength locate the match in the original string
    }
}
```

Image data and image query:

```csharp
IndexableAppContent imageContent = AppManagedIndexableAppContent.CreateFromBitmap("item1", softwareBitmap);
indexer.AddOrUpdate(imageContent);

AppIndexImageQuery query = indexer.CreateImageQuery("cute pictures of kittens");
IReadOnlyList<ImageQueryMatch> imageMatches = query.GetNextMatches(5);
// match is AppManagedImageQueryMatch when ContentKind == QueryMatchContentKind.AppManagedImage; see imageResult.Subregion
```

## Options / Props

| Member | Description |
|------|-------------|
| `AppContentIndexer.GetOrCreateIndex(name)` | Opens the index if it exists for the current app identity and user, otherwise creates it. `Status` is `CreatedNew` or `OpenedExisting`. |
| `AppManagedIndexableAppContent.CreateFromString(id, text)` | Wraps text of arbitrary size for indexing; chunking is handled by the indexer. |
| `AppManagedIndexableAppContent.CreateFromBitmap(id, SoftwareBitmap)` | Wraps image data for indexing. |
| `indexer.AddOrUpdate(content)` | Adds or updates content by content ID. |
| `indexer.CreateTextQuery(text)` / `CreateImageQuery(text)` | Creates a query cursor; `GetNextMatches(n)` returns matches sorted by relevancy. |

## Notes

- Requires package identity (packaged apps, including those with external locations). To enable semantic indexing and Text Recognition (OCR), the app must also declare the `systemaimodels` capability.
- `QueryMatch` has only `ContentId` and `TextOffset`/`TextLength`, not the matching text; the app must keep the original text. Indexing is asynchronous, so queries may run on partial data.
- Only content is indexed, not files; the indexer does not monitor file changes, so the app must update the index when content changes.
- RAG: use the user prompt as the query text, include matched snippets in the augmented prompt sent to the language model. The page's `Helpers.GetUserPrompt()` / `Helpers.GetResponseFromChatAgent()` are placeholders, not real functions.
- `AppContentIndexer` is agile (not thread-affine) but some calls are slow; avoid calling it on the UI thread.
- It implements `IClosable` (`IDisposable` in C#, so `using` works). Each open instance must be closed; opening and closing an index is expensive, so keep a single instance for the app lifetime.
- Distinct from Windows Search / keyword indexing: this is a semantic and lexical index local to the app.

## Related

- [Semantic Search](./semantic-search.md)
- [TextRecognizer](./text-recognizer.md)
- [Get started building an app with Windows AI APIs](./get-started.md)
