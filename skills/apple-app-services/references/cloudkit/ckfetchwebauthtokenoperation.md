# CKFetchWebAuthTokenOperation

An operation that creates an authentication token for use with CloudKit web services.

## Signature / Usage

```swift
class CKFetchWebAuthTokenOperation
```

Adapted (not in the official docs): the official example sets the deprecated `fetchWebAuthTokenCompletionBlock` and force-unwraps the token; this version uses `fetchWebAuthTokenResultBlock`.

```swift
import CloudKit

func fetchWebAuthToken(for apiToken: String,
    completion: @escaping (Result<String, any Error>) -> Void) {
    let operation = CKFetchWebAuthTokenOperation(apiToken: apiToken)
    operation.fetchWebAuthTokenResultBlock = { result in
        completion(result)
    }
    operation.qualityOfService = .utility
    CKContainer.default().privateCloudDatabase.add(operation)
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init(apiToken:)` | `convenience init(apiToken: String)` | Creates a fetch operation for the specified API token |
| `apiToken` | `String?` | API token that allows access to an app's container |
| `fetchWebAuthTokenResultBlock` | `((Result<String, any Error>) -> Void)?` | Closure to execute when the operation finishes |
| `fetchWebAuthTokenCompletionBlock` | `((String?, (any Error)?) -> Void)?` | Block to execute when the operation finishes (deprecated) |

## Notes

- Available iOS 9.2+, iPadOS 9.2+, Mac Catalyst 13.1+, macOS 10.11+, tvOS 9.1+, visionOS 1.0+, watchOS 3.0+. Inherits from `CKDatabaseOperation`.
- CloudKit web services needs an API token per container per environment, configured in CloudKit Dashboard. For requests that need an authenticated user, fetch an authentication token with this operation and append it, with the API token, to the endpoint URL; the request then acts on behalf of the current user.
- Authentication tokens are short-lived and expire after a single use. Treat the token as a credential: don't log or persist it.
- Handlers run on a background queue; redirect to the main queue if needed.
- The official example on the same page uses the deprecated `fetchWebAuthTokenCompletionBlock` and force-unwraps the token (`webToken!`); the snippet above replaces both.
- Source: https://developer.apple.com/documentation/cloudkit/ckfetchwebauthtokenoperation (fetched 2026-11-14)

## Related

- [CKDatabase](./ckdatabase.md)
- [CKContainer](./ckcontainer.md)
