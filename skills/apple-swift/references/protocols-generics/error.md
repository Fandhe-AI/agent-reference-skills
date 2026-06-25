# Error

A type representing an error value that can be thrown.

## Signature

```swift
protocol Error : Sendable
```

## Usage

```swift
enum NetworkError: Error {
    case notFound
    case unauthorized
    case serverError(statusCode: Int)
}

func fetchUser(id: Int) throws -> User {
    guard id > 0 else { throw NetworkError.notFound }
    // ...
}

do {
    let user = try fetchUser(id: -1)
} catch NetworkError.notFound {
    print("User not found")
} catch let NetworkError.serverError(code) {
    print("Server error: \(code)")
} catch {
    print("Unexpected: \(error)")
}
```

## Notes

- Availability: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- `Error` has no requirements — any type can conform
- Enumerations are the most common choice; use associated values for recovery information
- Conforms to `Sendable`, enabling use in concurrent contexts
- `LocalizedError` adds `errorDescription`, `failureReason`, `recoverySuggestion` for user-facing messages
- Use `throws` / `try` / `catch` / `throw` keywords; `async throws` for async throwing functions

## Related

- [Codable](./codable.md)
