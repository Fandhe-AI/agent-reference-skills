# Actor

Common protocol to which all actors conform.

## Signature

```swift
protocol Actor : AnyObject, Sendable
```

## Notes

- **Availability:** iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- All `actor` types implicitly conform to `Actor`.
- By default, actors execute on the shared global concurrency thread pool. A custom executor can be provided via `unownedExecutor`.
- Methods on a different actor must be called with `await`; methods on `self` within an actor are synchronous.

### Requirements

| Member | Description |
|---|---|
| `unownedExecutor` (required) | The serial executor for this actor |

### Isolation checks (default implementations)

| Method | Description |
|---|---|
| `assertIsolated(_:file:line:)` | Fatal error if not running on this actor's executor |
| `preconditionIsolated(_:file:line:)` | Precondition if not on this actor's executor |
| `assumeIsolated(_:file:line:)` | Synchronous access assuming current isolation; aborts otherwise |

## Usage

```swift
actor BankAccount {
    private var balance: Decimal = 0

    func deposit(_ amount: Decimal) {
        balance += amount
    }

    func withdraw(_ amount: Decimal) throws {
        guard balance >= amount else { throw InsufficientFunds() }
        balance -= amount
    }
}

let account = BankAccount()
await account.deposit(100)
try await account.withdraw(40)
```

## Related

- [MainActor](./mainactor.md)
- [GlobalActor](./globalactor.md)
- [Sendable](./sendable.md)
