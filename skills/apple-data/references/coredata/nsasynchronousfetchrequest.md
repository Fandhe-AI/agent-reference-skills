# NSAsynchronousFetchRequest / NSAsynchronousFetchResult

A fetch request that retrieves results asynchronously and supports progress notification. `NSAsynchronousFetchResult` is the result object that encompasses the response from an executed asynchronous fetch request.

## Signature / Usage

```swift
class NSAsynchronousFetchRequest<ResultType> where ResultType : NSFetchRequestResult

init(
    fetchRequest request: NSFetchRequest<ResultType>,
    completionBlock blk: ((NSAsynchronousFetchResult<ResultType>) -> Void)? = nil
)

class NSAsynchronousFetchResult<ResultType> where ResultType : NSFetchRequestResult
```

## Options / Props

`NSAsynchronousFetchRequest`:

| Name | Type | Description |
|------|------|-------------|
| `completionBlock` | `NSPersistentStoreAsynchronousFetchResultCompletionBlock?` | The block that is executed when the fetch request has completed. |
| `estimatedResultCount` | `Int` | A configuration parameter that assists Core Data with scheduling the asynchronous fetch request. |
| `fetchRequest` | `NSFetchRequest<ResultType>` | The underlying fetch request that is executed asynchronously. |

`NSAsynchronousFetchResult`:

| Name | Type | Description |
|------|------|-------------|
| `fetchRequest` | `NSAsynchronousFetchRequest<ResultType>` | The underlying fetch request that was executed. |
| `finalResult` | `[ResultType]?` | The results that were received from the fetch request. |

## Notes

- Availability (from the source JSON): iOS 8.0+, iPadOS 8.0+, Mac Catalyst 13.1+, macOS 10.10+, visionOS 1.0+, watchOS 2.0+. tvOS has no `introducedAt` value in the source (listed without a version).
- `NSAsynchronousFetchRequest` inherits from `NSPersistentStoreRequest`; `NSAsynchronousFetchResult` inherits from `NSPersistentStoreAsynchronousResult`.
- The initializer's `completionBlock` parameter is optional and defaults to `nil`.
- Source: https://developer.apple.com/documentation/coredata/nsasynchronousfetchrequest , https://developer.apple.com/documentation/coredata/nsasynchronousfetchresult (fetched 2026-10-16, iOS 27 SDK docs)

## Related

- [NSFetchRequest](./nsfetchrequest.md)
- [NSFetchedResultsController](./nsfetchedresultscontroller.md)
- [NSManagedObjectContext](./nsmanagedobjectcontext.md)
