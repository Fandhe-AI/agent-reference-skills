---
source: https://developer.apple.com/documentation/appintents/providing-contextual-cues-to-apple-intelligence-and-siri
---

# Provide Contextual Cues to Apple Intelligence and Siri

Expose a convertible entity with `IntentValueRepresentation` and attach entities to custom-drawn views with `AppEntityUIElement`.

```swift
// 1. Bidirectional conversion with IntentPerson
struct ContactEntity: AppEntity, Transferable {
    static var typeDisplayRepresentation: TypeDisplayRepresentation = "Contact"
    
    var id: String
    @Property var name: String
    @Property var email: String
    
    var displayRepresentation: DisplayRepresentation {
        .init(title: "\(name)")
    }
    
    static var defaultQuery = ContactEntityQuery()
    
    // Bidirectional conversion with IntentPerson.
    static var transferRepresentation: some TransferRepresentation {
        IntentValueRepresentation(
            exporting: { contact in
                IntentPerson(
                    identifier: .applicationDefined(contact.id),
                    name: .displayName(contact.name),
                    handle: .init(emailAddress: contact.email)
                )
            },
            importing: { person in
                guard case let .applicationDefined(id) = person.identifier?.value,
                      let handle = person.handle else {
                    throw ConversionError.missingData
                }
                return ContactEntity(
                    id: id,
                    name: person.name.displayString,
                    email: handle.value
                )
            }
        )
    }
    
    enum ConversionError: Error {
        case missingData
    }

// 2. SwiftUI: supply entities for a custom-drawn view on demand
struct NoteBoardView: View {
    // A collection of `AppEntity` types that the view draws in its content.
    @State private var stickyNotes: [StickyNote]

    var body: some View {
        Canvas { context, size in
            stickyNotes.forEach { note in
                context.fill(
                    Path(
                        roundedRect: note.frame,
                        cornerSize: .zero
                    ),
                    with: .color(note.colorFill)
                )
            }
        }
        .appEntityUIElements { context in
            // Determine which notes, if any, require a UI element.  
            stickyNotes.compactMap { note in
                let includeNote = context.requests.contains { request in
                    switch request {
                        case .visible(let rect):
                            // Return true if the note is in the specified rectangle. 
                            return note.frame.intersects(rect)
                        case .selected:
                            // Return true if the note is selected.
                            return note.isSelected
                        @unknown default:
                            return false
                    }
                }
                // If the note isn’t visible or selected, return nil.  
                guard includeNote else {
                    return nil
                }
        
                // Return an element with the entity identifier and other details.
                return AppEntityUIElement(
                    identifier: EntityIdentifier(
                        for: StickyNote.self,
                        identifier: note.id
                    ),
                    bounds: note.frame,
                    state: State(isSelected: note.isSelected)
                )
            }
        }
    }
}

// 3. UIKit: same closure via appEntityUIElementProvider
class NoteBoardViewController: UIViewController {
    // A collection of `AppEntity` types that the view draws in its content.
    private var stickyNotes: [StickyNote]

    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        
        self.view.appEntityUIElementProvider = { view, context in
           // Determine which notes, if any, require a UI element.  
           stickyNotes.compactMap { note in
                let includeNote = context.requests.contains { request in
                    switch request {
                        case .visible(let rect):
                            // Return true if the note is in the specified rectangle. 
                            return note.frame.intersects(rect)
                        case .selected:
                            // Return true if the note is selected.
                            return note.isSelected
                        @unknown default:
                            return false
                    }
                }
                // If the note isn’t visible or selected, return nil.  
                guard includeNote else {
                    return nil
                }
        
                // Return an element with the entity identifier and other details.
                return AppEntityUIElement(
                    identifier: EntityIdentifier(
                        for: StickyNote.self,
                        identifier: note.id
                    ),
                    bounds: note.frame,
                    state: State(isSelected: note.isSelected)
                )
            }
        }
    }
    
    // Other view controller methods and properties...
}
```

## Notes

- Source article: "Providing contextual cues to Apple Intelligence and Siri" (https://developer.apple.com/documentation/appintents/providing-contextual-cues-to-apple-intelligence-and-siri). Listings are separate fragments; listing 1 is reproduced exactly as published and omits the closing brace of `ContactEntity`.
- Target OS: iOS 18.2+, iPadOS 18.2+, Mac Catalyst 18.2+, macOS 15.2+, tvOS 18.2+, visionOS 2.2+, watchOS 11.2+ (article metadata).
- For views that map one-to-one to an entity, the article uses the SwiftUI `appEntityIdentifier(_:)` modifier or the `AppEntityAnnotatable.appEntityIdentifier` property (UIKit / AppKit) instead; do not attach unrelated entities to a view.
- A single entity can alternatively be delivered through `NSUserActivity.appEntityIdentifier`.
