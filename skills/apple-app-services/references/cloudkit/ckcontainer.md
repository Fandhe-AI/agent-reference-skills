# CKContainer

The conduit to your app's CloudKit databases. Manages all access to database contents and coordinates interactions between your app and the CloudKit server.

## Signature / Usage

```swift
// Access the default container
let container = CKContainer.default()

// Create a container with a specific identifier
let container = CKContainer(identifier: "iCloud.com.example.MyApp")

// Access databases
let privateDB = container.privateCloudDatabase
let publicDB  = container.publicCloudDatabase
let sharedDB  = container.sharedCloudDatabase

// Check iCloud account status
container.accountStatus { status, error in
    switch status {
    case .available: break        // user signed in
    case .noAccount: break        // no iCloud account
    case .restricted: break       // parental controls
    case .couldNotDetermine: break
    @unknown default: break
    }
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `default()` | `class func -> CKContainer` | Returns the app's default container |
| `init(identifier:)` | `init` | Creates a container for the specified identifier |
| `containerIdentifier` | `String?` | The container's unique identifier |
| `privateCloudDatabase` | `CKDatabase` | The current user's private database |
| `publicCloudDatabase` | `CKDatabase` | The app's public database |
| `sharedCloudDatabase` | `CKDatabase` | Database containing records shared by other users |
| `database(with:)` | `func(CKDatabase.Scope) -> CKDatabase` | Returns the database for the given scope |
| `accountStatus(completionHandler:)` | `func` | Checks whether the user's iCloud account is available |
| `fetchUserRecordID(completionHandler:)` | `func` | Fetches the current user's record ID |
| `add(_:)` | `func(CKOperation)` | Adds an operation to the container's queue |
| `fetchShareMetadata(with:completionHandler:)` | `func` | Fetches metadata for a share URL |
| `accept(_:completionHandler:)` | `func` | Accepts a share invitation |

## Notes

- Platforms: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 3.0+, visionOS 1.0+
- Every app has a default container; additional containers require explicit entitlements
- Public database is readable without an iCloud account; private and shared databases require one
- Writing to the public database requires an authenticated iCloud account
- Storage in the public database counts against the app's quota; private database uses the user's quota
- Simulator always uses the development environment, never production
- Observe `CKAccountChanged` to detect account status changes at runtime

## Related

- [CKDatabase](./ckdatabase.md)
- [CKError](./ckerror.md)
