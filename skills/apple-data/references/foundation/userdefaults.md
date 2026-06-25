# UserDefaults

A class providing a persistent interface to the user's defaults database for storing lightweight app settings and preferences.

## Signature / Usage

```swift
let defaults = UserDefaults.standard

// Write
defaults.set(true, forKey: "isOnboardingComplete")
defaults.set(42, forKey: "itemCount")
defaults.set("Alice", forKey: "username")

// Read
let done = defaults.bool(forKey: "isOnboardingComplete")
let count = defaults.integer(forKey: "itemCount")
let name = defaults.string(forKey: "username")

// Remove
defaults.removeObject(forKey: "username")
```

## Options / Props

| Method / Property | Description |
|-------------------|-------------|
| `UserDefaults.standard` (class) | Shared defaults for the app |
| `init(suiteName:)` | Defaults shared across an App Group |
| `set(_:forKey:)` | Store `Bool`, `Int`, `Double`, `Float`, `String`, `URL`, `Data`, `Array`, `Dictionary`, or `Any?` |
| `bool(forKey:)` | Read `Bool` (returns `false` if missing) |
| `integer(forKey:)` | Read `Int` (returns `0` if missing) |
| `double(forKey:)` | Read `Double` |
| `float(forKey:)` | Read `Float` |
| `string(forKey:)` | Read `String?` |
| `url(forKey:)` | Read `URL?` |
| `data(forKey:)` | Read `Data?` |
| `array(forKey:)` | Read `[Any]?` |
| `dictionary(forKey:)` | Read `[String: Any]?` |
| `object(forKey:)` | Read `Any?` |
| `removeObject(forKey:)` | Delete a key |
| `register(defaults:)` | Set fallback values loaded at startup |
| `synchronize()` | Force immediate write (deprecated; handled automatically) |
| `dictionaryRepresentation()` | All keys and values |

## Notes

- Available iOS 2.0+, macOS 10.0+.
- Thread-safe.
- **Do not store sensitive data** (passwords, tokens); use Keychain instead.
- Writes are applied in-memory immediately and flushed to disk asynchronously.
- Not suitable for large data blobs; use file system instead.
- For cross-device sync, use `NSUbiquitousKeyValueStore`.
- Domain search order: Managed → Argument → App → Suite → Global → Registration.

## Related

- [Bundle](./bundle.md)
- [NotificationCenter](./notificationcenter.md)
