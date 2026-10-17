---
source: https://developer.apple.com/documentation/appintents/adding-parameters-to-an-app-intent
---

# Add Parameters to an App Intent

Declare `@Parameter` properties, require a value, supply dynamic options, and describe the intent with a parameter summary.

```swift
// Declare a parameter with a title and description
@Parameter(title: "Trail", description: "The trail to get information on.")
var trail: TrailEntity

// Ask the system to prompt for a missing optional value
guard let date = date else {
    throw $date.needsValueError("What date would you like to use?")
}

// Provide dynamic options for a String parameter
struct LocationOptionsProvider: DynamicOptionsProvider {
    
    @Dependency
    private var trailManager: TrailDataManager
    
    func results() async throws -> [String] {
        Logger.intentLogging.debug("Getting locations from LocationOptionsProvider")
        
        // Get a list of locations and return it sorted for display, such as in the Shortcuts app.
        return trailManager.uniqueLocations
                .sorted(using: KeyPathComparator(\.self, comparator: .localizedStandard))
    }
}

// Describe the intent in Shortcuts with a parameter summary
static var parameterSummary: some ParameterSummary {
        Summary("Get information on \(\.$trail)")
    }
```

## Notes

- Source article: "Adding parameters to an app intent" (https://developer.apple.com/documentation/appintents/adding-parameters-to-an-app-intent). The article also contains a longer `Switch` / `Case` / `When` conditional parameter summary; only the simple `Summary` form is reproduced here.
- Target OS: App Intents iOS 16.0+ / macOS 13.0+ / watchOS 9.0+ / visionOS 1.0+ (SDK 27.0, Xcode 27.0).
- `needsValueError(_:)` is used on the projected value (`$date`) of an optional parameter whose value the intent requires at runtime.
- `LocationOptionsProvider` is a `DynamicOptionsProvider`; see references/parameters-results/dynamicoptionsprovider.md.
