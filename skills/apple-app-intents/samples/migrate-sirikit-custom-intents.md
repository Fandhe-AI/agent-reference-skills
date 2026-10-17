---
source: https://developer.apple.com/documentation/sirikit/soup-chef-with-app-intents-migrating-custom-intents
---

# Migrate SiriKit Custom Intents to App Intents

Convert an intent-definition custom intent into an `AppIntent` that adopts `CustomIntentMigratedAppIntent`, back its parameters with entities and queries, and expose it as an App Shortcut.

```swift
// 1. Output of "Convert to AppIntents" in the intent definition file
struct OrderSoup: AppIntent, CustomIntentMigratedAppIntent {

// 2. Suggested entities returned as an item collection (SoupAppEntity query)
func suggestedEntities() async throws -> IntentItemCollection<SoupAppEntity> {
            let soupMenuManager = SoupMenuManager()
            
            // Only adopt `EntityStringQuery` for searching large catalogs, not for small static collections.
            // The Shortcuts app supports filtering of small collections by default.
            let availableRegularItems = soupMenuManager.findItems(exactlyMatching: [.available, .regularItem])
            let availableDailySpecialItems = soupMenuManager.findItems(exactlyMatching: [.available, .dailySpecialItem])
            
            return ItemCollection {
                ItemSection<SoupAppEntity>(
                    items:
                        availableRegularItems .map {
                            IntentItem<SoupAppEntity>(
                                SoupAppEntity($0),
                                title: SoupAppEntity($0).localizedStringResource,
                                image: SoupAppEntity($0).displayRepresentation.image)
                        }
                )
                ItemSection<SoupAppEntity>(
                    title: "Specials",
                    items: availableDailySpecialItems .map {
                        IntentItem<SoupAppEntity>(
                            SoupAppEntity($0),
                            title: SoupAppEntity($0).localizedStringResource,
                            image: SoupAppEntity($0).displayRepresentation.image)
                    }
                )
            }
        }

// 3. Resolve a topping by string with an entity query
  func entities(matching string: String) async throws -> [ToppingAppEntity] {
            let menuItemTopping = Order.MenuItemTopping.allCases.filter { $0.rawValue == string }
            let result = menuItemTopping.map { (topping) -> ToppingAppEntity in
                return ToppingAppEntity(
                    id: topping.rawValue, displayString: topping.localizedName(useDeferredIntentLocalization: true))
            }
            return result
        }

// 4. Validate input inside perform() and return a dialog result
    func perform() async throws -> some ProvidesDialog & ShowsSnippetView {
        if quantity > menuItem[0].itemsInStock {
                let errorPrompt = OrderSoupError.notEnoughInStock(quantity ).localizedStringResource
                            return .result(value: OrderDetailsAppEntity(), dialog: IntentDialog(errorPrompt))
        }

// 5. App Shortcut for the migrated intent
@available(iOS 16.0, macOS 13.0, watchOS 9.0, tvOS 16.0, *)
struct SoupChefAppShortcutsProvider: AppShortcutsProvider {
    static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: OrderSoup(),
            phrases: [
                "Order \(.applicationName)",
                "Order \(\.$soup) from \(.applicationName)"
            ],
            shortTitle: "Order Soup"
        )
    }
    static var shortcutTileColor: ShortcutTileColor = .orange
}
```

```text
"TOMATO_SOUP" = "Tomato Soup";
"NE_CLAM_CHOWDER" = "New England Clam Chowder";
"CHICKEN_NOODLE_SOUP" = "Chicken Noodle Soup";
```

## Notes

- Source article: "Soup Chef with App Intents: Migrating custom intents" (https://developer.apple.com/documentation/sirikit/soup-chef-with-app-intents-migrating-custom-intents), a SiriKit sample code article tied to the tech talk "Migrate Custom Intents to App Intents". Listings are separate fragments in article order; listings 1, 2 (indentation), and 4 are reproduced exactly as published, and listing 4 omits the remaining body of `perform()`.
- Target OS: the article metadata lists iOS 14.3+, iPadOS 14.3+, Mac Catalyst 14.3+ and Xcode 17.0; the App Shortcut availability annotation in listing 5 is iOS 16.0 / macOS 13.0 / watchOS 9.0 / tvOS 16.0.
- This migrates from SiriKit custom intents (`INIntent` subclasses generated from an intent definition, handled by an Intents extension); App Intents replaces the resolve / confirm / handle steps with parameter types, queries, and `perform()`. See references/intent-types/customintentmigratedappintent.md.
- Use `AppShortcuts.strings` to localize App Shortcut phrases (the third listing). `OrderType` becomes an `AppEnum` and `OrderDetails` a `TransientAppEntity` (no unique identifier); the article's "Provide dynamic options" section shows an `AppShortcutsProvider` listing rather than a `DynamicOptionsProvider` one.
