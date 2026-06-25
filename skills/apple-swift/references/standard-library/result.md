# Result

A value that represents either a success or a failure, each with an associated value.

## Signature

```swift
@frozen enum Result<Success, Failure> where Failure : Error, Success : ~Copyable, Success : ~Escapable
```

## Cases

| Case | Description |
|------|-------------|
| `success(Success)` | A success, storing the `Success` value |
| `failure(Failure)` | A failure, storing the `Failure` (an `Error`) value |

## Usage

```swift
func fetchUser(id: Int) -> Result<User, NetworkError> {
    guard id > 0 else { return .failure(.invalidID) }
    return .success(User(id: id))
}

switch fetchUser(id: 42) {
case .success(let user): print(user)
case .failure(let error): print(error)
}
```

## Key APIs

| Name | Description |
|------|-------------|
| `init(catching:)` | Create from a throwing closure; captures thrown error as `.failure` |
| `get()` | Return the success value or throw the failure error |
| `map(_:)` | Transform the success value; failure passes through |
| `flatMap(_:)` | Transform to another `Result`; failure passes through |
| `mapError(_:)` | Transform the failure value; success passes through |
| `flatMapError(_:)` | Transform failure to another `Result`; success passes through |

## Notes

- Available on iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+.
- Conforms to `Equatable` and `Hashable` (when both type parameters conform), `Sendable`.
- `init(catching:)` is the idiomatic bridge from throwing APIs to `Result`.

## Related

- [Optional](./optional.md)
