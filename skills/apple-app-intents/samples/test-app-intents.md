---
source: https://developer.apple.com/documentation/appintentstesting/testing-your-app-intents-code
---

# Test Your App Intents Code

Run intents, look up entities and enums by name, chain intents, and verify transferable conformance, Spotlight indexing, and view annotations from a UI Testing target.

```swift
// 1. Set up in a UI Testing target
let app = XCUIApplication()
var definitions: IntentDefinitions!

override func setUp() async throws {
    app.launch()
    definitions = IntentDefinitions(
        bundleIdentifier: "com.example.my-app"
    )
}

// 2. Run an intent and assert the result
func testOpenFavorites() async throws {
    let intent = definitions.intent["OpenFavorites"]
    let instance = intent.makeIntent()
    let result = try await instance.run()
    XCTAssertEqual(try result.value.count, 5)
}

// 3. Find entities by string
func testFindCalendarByName() async throws {
    let calendarDef = definitions.entities["CalendarEntity"]
    let results = try await calendarDef.entities(matching: "Work")
    XCTAssertFalse(results.isEmpty)
    
    let name: String = try results[0].name
    XCTAssertEqual(name, "Work")
    let colorName: String = try results[0].colorName
    XCTAssertEqual(colorName, "blue")
}

// 4. Make an entity reference from an identifier
let calendar = definitions
    .entities["CalendarEntity"]
    .makeReference(identifier: "work-calendar-id")

// 5. Make an enum case from its raw string
let priority = definitions
    .enums["EventPriority"]
    .makeCase("high")

// 6. Chain intents: the result entity of one is the parameter of the next
func testCreateEventOnCalendar() async throws {
    let calendarDef = definitions
        .entities["CalendarEntity"]
    let calendars = try await calendarDef
        .entities(matching: "Work")
    let workCalendar = calendars[0]

    let createResult = try await definitions
        .intents["CreateEvent"]
        .makeIntent(
            title: "Sprint Planning",
            calendar: workCalendar
        )
        .run()

    let event: AnyAppEntity = try createResult.value
    let addResult = try await definitions
        .intents["AddAttendee"]
        .makeIntent(
            event: event,
            email: "jada@example.com"
        )
        .run()
    let count: Int = try addResult.value.attendeeCount
    XCTAssertEqual(count, 1)
}

// 7. Testing-only setup intent (debug builds only, hidden from Shortcuts and Siri)
#if DEBUG
struct ResetDatabaseIntent: AppIntent {
    static let title: LocalizedStringResource =
        "Reset Database"
    static let isDiscoverable = false

    func perform() async throws -> some IntentResult {
        // Clear all data and insert seed records.
    }
}
#endif

func testEventCreation() async throws {
    try await definitions
        .intents["ResetDatabaseIntent"]
        .makeIntent()
        .run()
    // Now test against known seed data.
}

// 8. Transferable round trip
func testEventTransferable() async throws {
    let eventDef = definitions.entities["EventEntity"]
    let events = try await eventDef
        .entities(matching: "Design Review")
    let original = events[0]
    
    // Export the entity.
    let exported = try await original.exported(
        as: .json
    )
    
    // Re-import the entity.
    let reimported = try await eventDef.resolved(
        from: exported
    )
    
    // Verify that the full export-reimport flow preserved the title.
    let title: String = try reimported.title
    XCTAssertEqual(title, "Design Review")

// 9. Spotlight index
func testEventAppearsInSpotlight() async throws {
    let eventDef = definitions.entities["EventEntity"]
    let results = try await eventDef
        .spotlightQuery("Design Review")
    XCTAssertFalse(results.isEmpty)
    let title: String = try results[0].title
    XCTAssertEqual(title, "Design Review")
}

func testAllEventsIndexed() async throws {
    let eventDef = definitions.entities["EventEntity"]
    let allIndexed = try await eventDef
        .spotlightQuery(nil)
    XCTAssertGreaterThanOrEqual(allIndexed.count, 3)
}

// 10. Onscreen entity annotations
func testEventDetailShowsAnnotation() async throws {
    try await definitions
        .intents["NavigateToEvent"]
        .makeIntent(eventId: "design-review-id")
        .run()
    let eventDef = definitions.entities["EventEntity"]
    let annotations = try await eventDef
        .viewAnnotations()
    XCTAssertFalse(annotations.isEmpty)
    let title: String = try annotations[0]
        .entity.title
    XCTAssertEqual(title, "Design Review")
    XCTAssertTrue(annotations[0].isSelected)
}
```

## Notes

- Source article: "Testing your App Intents code" (https://developer.apple.com/documentation/appintentstesting/testing-your-app-intents-code). The 15 article listings are shown in article order; consecutive listings that continue one function (chain, view annotations) are joined, and listing 8 is truncated exactly as published (no closing brace).
- Target OS: App Intents Testing is iOS 27.0+, iPadOS 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+ (Xcode 27.0); the article itself lists no platform versions.
- Tests belong in a UI Testing target (same code signing team as the app), because intents run in the live app process through the real App Intents infrastructure. Types are looked up by string name, and results use `@dynamicMemberLookup`, so no app types are imported.
- Listing 2 uses `definitions.intent[...]` while the other listings use `definitions.intents[...]` (the `IntentDefinitions.intents` property); the article text refers to `intents`, so prefer that.
