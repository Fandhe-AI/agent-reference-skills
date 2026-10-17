---
source: https://developer.apple.com/documentation/appintents/defining-your-app-s-focus-filter
---

# Define Your App's Focus Filter

Declare a `SetFocusFilterIntent` with parameters, an `AppEntity` parameter type with a suggesting query, and a notification-filter predicate.

```swift
// 1. Focus filter parameters
struct ExampleFocusFilter: SetFocusFilterIntent {
    /// Providing a default value ensures setting this required Boolean value.
    @Parameter(title: "Use Dark Mode", default: false)
    var alwaysUseDarkMode: Bool

    @Parameter(title: "Status Message")
    var status: String?

    /// A representation of a chat account this app uses for notification filtering and suppression.
    /// The user receives suggestions from the suggestedEntities() function that AccountEntityQuery declares.
    @Parameter(title: "Selected Account")
    var account: AccountEntity?
}

// 2. Custom parameter type via AppEntity conformance
struct AccountEntity: AppEntity {
    static var typeDisplayRepresentation: TypeDisplayRepresentation {
        TypeDisplayRepresentation(name: "A chat account")
    }

    static var defaultQuery = AccountEntityQuery()

    let id: String
    let displayName: String
    let displaySubtitle: String
    let image: DisplayRepresentation.Image

    var displayRepresentation: DisplayRepresentation {
        DisplayRepresentation(title: "\(displayName) account",
                              subtitle: "\(displaySubtitle)",
                              image: image)
    }
}

// 3. Suggest entities while configuring the filter in Settings
struct AccountEntityQuery: EntityQuery {
    func entities(for identifiers: [AccountEntity.ID]) async throws -> [AccountEntity] {
        Repository.shared.accountsLoggedIn.filter {
            identifiers.contains($0.id)
        }
    }

    func suggestedEntities() async throws -> [AccountEntity] {
        Repository.shared.accountsLoggedIn
    }
}

// 4. Filter notifications using the app context
struct ExampleFocusFilter: SetFocusFilterIntent {
    var appContext: FocusFilterAppContext {
        logger.debug("App Context Called")
        let predicate: NSPredicate
        if let account = account {
            predicate = NSPredicate(format: "SELF IN %@", [account.id])
        } else {
            predicate = NSPredicate(value: true)
        }
        return FocusFilterAppContext(notificationFilterPredicate: predicate)
    }
}
```

## Notes

- Source article: "Defining your app's Focus filter" (https://developer.apple.com/documentation/appintents/defining-your-app-s-focus-filter), a sample code article tied to WWDC22 session 10121. Listings 1 and 4 are fragments of the same `ExampleFocusFilter` type shown separately in the article.
- Target OS: iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+ (article metadata).
- The article puts the `SetFocusFilterIntent` type in an App Intents extension (target membership: extension only) and shares filter data with the app through App Groups or custom services; the App Group suite name used in the sample is `group.exampleChatApp`.
- When the Focus turns off, the system passes default parameter values (`alwaysUseDarkMode: false`, `status: nil`, `account: nil`).
