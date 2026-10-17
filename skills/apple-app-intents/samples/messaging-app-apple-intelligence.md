---
source: https://developer.apple.com/documentation/appintents/integrating-your-messaging-app-with-apple-intelligence
---

# Integrate Your Messaging App with Apple Intelligence

Adopt the messages-domain schemas: schema entities with queries, `Transferable`, Spotlight indexing, view and notification annotations, a `sendMessage` intent, and intent donation.

```swift
// 1. Entity conforming to the message schema
@AppEntity(schema: .messages.message)
struct MessageEntity: IndexedEntity {
    
    // MARK: Static
    
    static let defaultQuery = MessageQuery()
    
    // MARK: Properties
    
    var id: UUID
    
    /// The type of message.
    var messageType: MessageType
    
    /// The author of this message.
    var author: ContactEntity
    
    /// A Boolean value that indicates whether the recipient read this message.
    var isRead: Bool
    
    /// A set of attributes that describe this message's state.
    var attributes: Set<MessageAttribute>
    
    /// The conversation that contains this message.
    var conversation: ConversationEntity
    
    /// The send or receive date for this message.
    /// For a scheduled message, this represents the scheduled send date.
    var date: Date
    
    /// The subject line, when available.
    var subject: AttributedString?
    
    /// The text content of the message.
    var body: AttributedString?
    
    /// File attachments that the message contains.
    var attachments: [IntentFile]
    
    /// An audio recording that accompanies the message.
    var audioMessage: IntentFile?
    
    /// Attachments that don't conform to uniform type identifiers.
    var customAttachments: [CustomAttachment]
    
    /// Location data that the message contains.
    var locations: [PlaceDescriptor]
    
    /// Any detected links in the message.
    var links: [LinkPresentation.LinkMetadata]
    
    /// A message effect for this message.
    var messageEffect: MessageEffect?
    
    /// A custom reaction for this message.
    var reaction: MessageReaction?
    
    /// The parent message for a thread or reaction.
    var referencedMessage: MessageEntity?
    
    /// An identifier the system associates with this message
    /// for notification announcements.
    var notificationIdentifier: String?
    
    var displayRepresentation: DisplayRepresentation {
        DisplayRepresentation(
            title: "\(body ?? "")",
            subtitle: "\(conversation.displayName)",
            image: attachments.reduce(into: conversation.image) { image, file in
                image = DisplayRepresentation.Image(data: file.data)
            }
        )
    }
    
    // ...
}

// 2. Identifier-lookup query with suggested entities
extension MessageEntity {
    struct MessageQuery: EntityQuery {
        @Dependency
        var model: ModelManager

        func entities(for identifiers: [MessageEntity.ID]) async throws -> [MessageEntity] {
            try await model.messageEntities(for: identifiers)
        }
        
        // Implement this callback to provide suggested entities in the Shortcuts app.
        func suggestedEntities() async throws -> [MessageEntity] {
            try await model.fetchRecentMessageEntities(limit: 5)
        }
    }
}

// 3. Supporting entity required by the message schema
@AppEntity(schema: .messages.customAttachment)
struct CustomAttachment: AppEntity {
    static let defaultQuery = CustomAttachmentQuery()

    var id: UUID

    /// The source plugin for this attachment.
    var sourceName: AttributedString?

    /// A description the system presents in a dialog for this attachment.
    var description: AttributedString?

    var displayRepresentation: DisplayRepresentation {
        DisplayRepresentation(
            title: "\(description ?? "")"
        )
    }

    struct CustomAttachmentQuery: EntityQuery {
        func entities(for identifiers: [CustomAttachment.ID]) async throws -> [CustomAttachment] {
            // The app doesn't support custom attachments for messages, returning an empty
            // array.
            []
        }
    }
}

// 4. Make entities transferable
extension MessageEntity: Transferable {

    static var transferRepresentation: some TransferRepresentation {
        DataRepresentation(exportedContentType: .png) { message in
            message.attachments.first?.data ?? Data()
        }
        .exportingCondition { $0.attachments.first != nil }
    }
}

// 5. Index entities in Spotlight
func storeDidFinishLaunching() async throws {
    // ...

    // Fetch entities.
    let contactEntities = try fetchRecentContacts(limit: nil).map(\.entity)
    let conversationEntities = try fetchRecentConversations(limit: nil).map(\.entity)
    let messageEntities = try fetchRecentMessages(limit: nil).map(\.entity)

    // Index content to Spotlight.
    try? await CSSearchableIndex.default().indexAppEntities(contactEntities)
    try? await CSSearchableIndex.default().indexAppEntities(conversationEntities)
    try? await CSSearchableIndex.default().indexAppEntities(messageEntities)

    // ...
}

// 6. Annotate the view with the onscreen entity
var body: some View {
    HStack(alignment: .lastTextBaseline, spacing: 0) {
        // ...
    }
    .frame(maxWidth: .infinity, alignment: isMe ? .trailing : .leading)
    .listRowSeparator(.hidden)
    .listRowInsets(EdgeInsets())
    .padding(.horizontal)
    .padding(.vertical, 4)
    .task(id: message) {
        await markMessageAsRead(message)
    }
    .appEntityIdentifier(EntityIdentifier(for: MessageEntity.self, identifier: message.id))
}

// 7. Associate a local notification with the entity
func scheduleNotification(for message: Message, from author: Contact, in conversation: Conversation) {
    let content = UNMutableNotificationContent()
    content.title = author.name
    content.body = message.body
    content.sound = .default
    content.threadIdentifier = conversation.id.uuidString
    content.categoryIdentifier = "MESSAGE_CATEGORY"
    content.appEntityIdentifiers = [
        EntityIdentifier(for: MessageEntity.self, identifier: message.id)
    ]

    // ...    
}

// 8. Intent conforming to the sendMessage schema
import AppIntents
import GeoToolbox
import SwiftData
import UniformTypeIdentifiers

typealias Recipients = [ContactEntity]

@UnionValue
enum MessageDestination {
    case contact(ContactEntity)
    case recipients(Recipients)

    var persons: [ContactEntity] {
        switch self {
        case let .contact(contact):
            return [contact]
        case let .recipients(recipients):
            return recipients
        }
    }
}

@AppIntent(schema: .messages.sendMessage)
struct SendMessageIntent: AppIntent {
    var destination: MessageDestination
    var subject: AttributedString?
    var content: AttributedString?
    @Parameter(supportedContentTypes: [.image]) var attachments: [IntentFile]
    @Parameter(supportedContentTypes: [.audio]) var audioMessage: IntentFile?
    var locations: [PlaceDescriptor]
    var links: [URL]
    var scheduledDate: Date?

    @Dependency
    var model: ModelManager

    // MARK: Methods

    func perform() async throws -> some ReturnsValue<[MessageEntity]> {
        let recipientIDs = destination.persons.map(\.id)
        let messageText = content.flatMap { String($0.characters) } ?? ""
        let messageIDs = try await model.sendMessage(toRecipientIDs: recipientIDs,
                                                     conversationID: nil,
                                                     messageText: messageText,
                                                     attachments: attachments)
        let messages = try await model.messageEntities(for: messageIDs)
        return .result(value: messages)
    }
}

// 9. Donate the intent after the user sends a message
@discardableResult
func sendMessage(
    toRecipientIDs recipientIDs: [Contact.ID],
    conversationID: Conversation.ID? = nil,
    messageText: String,
    attachments: [IntentFile] = [],
    donateIntent: Bool = false
) async throws -> [Message.ID] {
     // ...

    if donateIntent {
        let intent = SendMessageIntent()
        intent.destination = .recipients(conversation.recipients.map(\.entity))
        intent.content = AttributedString(messageText)
        let result = messages.map(\.entity)

        // Donate the intent so the system can improve future suggestions.
        Task {
            do {
                try await IntentDonationManager.shared.donate(intent: intent, result: .result(value: result))
            } catch {
                print("Failed to donate intent: \(error)")
            }
        }
    }

    // ...
}
```

## Notes

- Source article: "Integrating your messaging app with Apple Intelligence" (https://developer.apple.com/documentation/appintents/integrating-your-messaging-app-with-apple-intelligence), a sample code article (UnicornChat) tied to WWDC26 session 240. Listings are separate fragments in article order.
- Target OS: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, Xcode 27.0 (article metadata).
- `IndexedEntity` conformance is not part of the schema; it is a prerequisite for Spotlight indexing. A schema entity can require supporting entity and enum types that also conform to schemas (here `CustomAttachment`).
- The messages domain requires several intents for a consistent experience; this sample shows only `sendMessage`. See references/app-schemas/domain-messages.md for the full list.
