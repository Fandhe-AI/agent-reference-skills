---
source: https://developer.apple.com/documentation/appintents/acceleratingappinteractionswithappintents
---

# Accelerate App Interactions with App Intents

Expose a trail app's actions and data to Siri, Spotlight, and Shortcuts: an intent, an App Shortcut, dialog and snippet results, parameters, entity queries, Spotlight donation, and a universal-link `OpenIntent`.

```swift
// 1. Intent metadata and perform() (members of the OpenFavorites intent)
/// Each intent needs to include metadata, such as a localized title. The title of the intent displays throughout the system.
static let title: LocalizedStringResource = "Open Favorite Trails"

/// An intent can optionally provide a localized description that the Shortcuts app displays.
static let description = IntentDescription("Opens the app and goes to your favorite trails.")

/// Tell the system to bring the app to the foreground when the intent runs.
static let openAppWhenRun: Bool = true

/**
 When the system runs the intent, it calls `perform()`.
 
 Intents run on an arbitrary queue. Intents that manipulate UI need to annotate `perform()` with `@MainActor`
 so that the UI operations run on the main actor.
 */
@MainActor
func perform() async throws -> some IntentResult {
    navigationModel.selectedCollection = trailManager.favoritesCollection
    
    /// Return an empty result, indicating that the intent is complete.
    return .result()
}

// 2. App Shortcut with phrases
AppShortcut(intent: OpenFavorites(), phrases: [
    "Open Favorites in \(.applicationName)",
    "Show my favorite \(.applicationName)"
],
shortTitle: "Open Favorites",
systemImageName: "star.circle")

// 3. Teach the phrase with a Siri tip
SiriTipView(intent: OpenFavorites(), isVisible: $displaySiriTip)

// 4. Return a value, dialog, and snippet view
func perform() async throws -> some IntentResult & ReturnsValue<TrailEntity> & ProvidesDialog & ShowsSnippetView {

let snippet = TrailInfoView(trail: trailData, includeConditions: true)

/**
 This intent displays a custom view that includes the trail conditions as part of the view. The dialog includes the trail conditions when
 the system can only read the response, but not display it. When the system can display the response, the dialog omits the trail
 conditions.
 */
let dialog = IntentDialog(full: "The latest reported conditions for \(trail.name) indicate: \(trail.currentConditions).",
                          supporting: "Here's the latest information on trail conditions.")

return .result(value: trail, dialog: dialog, view: snippet)

// 5. Ask the person to disambiguate a parameter
let dialog = IntentDialog("Multiple locations match \(location). Did you mean one of these locations?")
let disambiguationList = suggestedMatches.sorted(using: KeyPathComparator(\.self, comparator: .localizedStandard))
throw $location.needsDisambiguationError(among: disambiguationList, dialog: dialog)

// 6. Intent parameter of an entity type
@Parameter(title: "Trail", description: "The trail to get information for.")
var trail: TrailEntity

// 7. Entity default query and exposed properties
static let defaultQuery = TrailEntityQuery()

/**
 The trail's name. The `EntityProperty` property wrapper makes this property's data available to the system as part of the intent,
 such as when an intent returns a trail in a shortcut.
 
 The system automatically generates the title for this property from the variable name when it displays it in a system UI, like Shortcuts.
 Generated titles are available for both `EntityProperty` and `IntentIntentParameter` property wrappers.
 */
@Property var name: String

/**
 A description of the trail's location, such as a nearby city name, or the national park encompassing it.
 
 If you want the displayed title for the property to be different from the variable name, use a `title` parameter with the
 `EntityProperty` property wrapper.
 */
@Property(title: "Region")
var regionDescription: String

// 8. EntityQuery: lookup by identifier, suggestions, and string search
func entities(for identifiers: [TrailEntity.ID]) async throws -> [TrailEntity] {
    Logger.entityQueryLogging.debug("[TrailEntityQuery] Query for IDs \(identifiers)")
    
    return trailManager.trails(with: identifiers)
            .map { TrailEntity(trail: $0) }
}

func suggestedEntities() async throws -> [TrailEntity] {
    Logger.entityQueryLogging.debug("[TrailEntityQuery] Request for suggested entities")
    
    return trailManager.trails(with: trailManager.favoritesCollection.members)
            .map { TrailEntity(trail: $0) }
}

func entities(matching string: String) async throws -> [TrailEntity] {
    Logger.entityQueryLogging.debug("[TrailEntityQuery] String query for term \(string)")
    
    return trailManager.trails { trail in
        trail.name.localizedCaseInsensitiveContains(string)
    }.map { TrailEntity(trail: $0) }
}

// 9. EnumerableEntityQuery adds a Find intent in Shortcuts
func allEntities() async throws -> [TrailCollection] {
    Logger.entityQueryLogging.debug("[FeaturedCollectionEntityQuery] Request for all entities")
    return trailManager.featuredTrailCollections
}

// 10. Spotlight: searchable attributes and entity association
var searchableAttributes: CSSearchableItemAttributeSet {
    let attributes = CSSearchableItemAttributeSet()
    
    attributes.title = name
    attributes.namedLocation = regionDescription
    attributes.keywords = activities.localizedElements
    
    attributes.latitude = NSNumber(value: coordinate.latitude)
    attributes.longitude = NSNumber(value: coordinate.longitude)
    attributes.supportsNavigation = true
    
    return attributes
}

// Create an array of the searchable information for each `Trail`.
let searchableItems = trails.map { trail in
    let item = CSSearchableItem(uniqueIdentifier: String(trail.id),
                                domainIdentifier: nil,
                                attributeSet: trail.searchableAttributes)
    
    let isFavorite = favoritesCollection.members.contains(trail.id)
    let weight = isFavorite ? 10 : 1
    let intent = TrailEntity(trail: trail)
    
    /**
     Associate `TrailEntity` with the data that the `Trail` structure provides so the system recognizes that
     both types represent the same data. You need to create this association before adding the `CSSearchableItem`
     to a `CSSearchableIndex`.
     */
    item.associateAppEntity(intent, priority: weight)
    return item
}

do {
    // Add the trails to the search index so people can find them through Spotlight.
    // You need to do this as part of the app's initial setup on launch.
    let index = CSSearchableIndex.default()
    try await index.indexSearchableItems(searchableItems)
    Logger.spotlightLogging.info("[Spotlight] Trails indexed by Spotlight")
} catch let error {
    Logger.spotlightLogging.error("[Spotlight] Trails were not indexed by Spotlight. Reason: \(error.localizedDescription)")
}

// 11. Universal-link URL for the entity (OpenTrail is an OpenIntent and URLRepresentableIntent)
extension TrailEntity: URLRepresentableEntity {
    static var urlRepresentation: URLRepresentation {
        // Use string interpolation to fill values from your entity necessary for constructing the universal link URL.
        // This example URL uses the unique and persistant identifier for the `TrailEntity` in the URL.
        "https://example.com/trail/\(.id)/details"
    }
}
```

## Notes

- Source article: "Accelerating app interactions with App Intents" (https://developer.apple.com/documentation/appintents/acceleratingappinteractionswithappintents), a sample code article. The 16 listings are shown in article order as separate fragments grouped under 11 numbered comments; sections 4 and 5 are partial bodies exactly as published, and the set is not one compilable file.
- Target OS: iOS 18.1+, iPadOS 18.1+, Mac Catalyst 18.1+, macOS 15.1+, visionOS 2.1+, watchOS 11.0+, Xcode 26.0 (article metadata).
- The article recommends App Shortcuts for only the most common actions (usually two to five, not more than ten), and calls `updateAppShortcutParameters()` on the `AppShortcutsProvider` in the `App` initializer. `EnumerableEntityQuery` suits small fixed sets; `EntityPropertyQuery` suits large sets; either adds a Find intent to Shortcuts.
- Conforming `OpenTrail` to both `OpenIntent` and `URLRepresentableIntent` lets the app omit `perform()`; the system passes the URL through the normal universal-link path. For Action button handling on Apple Watch Ultra, see samples/watch-action-button.md.
