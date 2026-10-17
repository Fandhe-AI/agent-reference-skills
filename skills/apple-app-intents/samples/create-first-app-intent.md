---
source: https://developer.apple.com/documentation/appintents/creating-your-first-app-intent
---

# Create Your First App Intent

Declare an app intent, add a parameter, implement `perform()`, return a result, and register a dependency.

```swift
// 1. Declare the intent type (photos-domain schema, Xcode code completion output)
@AppIntent(schema: .photos.search)
struct SearchMediaIntent: ShowInAppSearchResultsIntent {
    static var searchScopes: [StringSearchScope] = [.general]
    
    var criteria: StringSearchCriteria
    
    func perform() async throws -> some IntentResult {
    }
}

// 2. Add a parameter
@Parameter(defaultUnit: .kilometers, supportsNegativeNumbers: false)
var searchRadius: Measurement<UnitLength>?

// 3. Write code for the action
    func perform() async throws -> some IntentResult {
        await navigator.navigate(to: navigationOption)

        return .result()
    }

// 4. Return a value, dialog and snippet view
    func perform() async throws -> some IntentResult & ReturnsValue<TrailEntity> & ProvidesDialog & ShowsSnippetView {
        guard let trailData = trailManager.trail(with: trail.id) else {
            throw TrailIntentError.trailNotFound
        }
                
        /**
         You provide a custom view by conforming the return type of the `perform()` function to the `ShowsSnippetView` protocol.
         */
        let snippet = TrailInfoView(trail: trailData, includeConditions: true)
        
        /**
         This intent displays a custom view that includes the trail conditions as part of the view. The dialog includes the trail conditions when
         the system can only read the response, but not display it. When the system can display the response, the dialog omits the trail
         conditions.
         */
        let dialog = IntentDialog(full: "The latest reported conditions for \(trail.name) indicate: \(trail.currentConditions).",
                                  supporting: "Here's the latest information on trail conditions.")
        
        return .result(value: trail, dialog: dialog, view: snippet)
    }

// 5. Register dependencies at app launch
struct AppIntentsSampleApp: App {
    
    private var trailManager: TrailDataManager
    
    init() {
        let trailDataManager = TrailDataManager.shared
        trailManager = trailDataManager

        let navigationModel = NavigationModel(selectedCollection: trailDataManager.nearMeCollection)
        sceneNavigationModel = navigationModel
                
        // Register the trail data manager as a dependent object.
        AppDependencyManager.shared.add(dependency: trailDataManager)
        AppDependencyManager.shared.add(dependency: navigationModel)

        // Additional app initialization...
    }

    // Additional content.
}

// 6. Consume the dependencies inside an intent
struct OpenFavorites: AppIntent {
    
    // Configure any dependent objects on which the app intent relies.
     @Dependency
    private var navigationModel: NavigationModel
    
    @Dependency
    private var trailManager: TrailDataManager

   @MainActor
    func perform() async throws -> some IntentResult {
        navigationModel.selectedCollection = trailManager.favoritesCollection
        
        /// Return an empty result, indicating that the intent is complete.
        return .result()
    }
    
}
```

## Notes

- Source article: "Creating your first app intent" (https://developer.apple.com/documentation/appintents/creating-your-first-app-intent). Listings are shown in article order as separate fragments; they are not one compilable file.
- Target OS: App Intents iOS 16.0+ / macOS 13.0+ / watchOS 9.0+ / visionOS 1.0+; `AppIntent.supportedModes` / `IntentModes` are iOS 26.0+ (see references/intents/intentmodes.md). SDK: Xcode 27.0.
- The article says the `@AppIntent` property wrapper is only for intents that support a system schema; `@Parameter` is only needed for custom (non-schema) intents.
- `@Dependency` property names must match the registration; register objects early because the system may run intents right after launch.
