---
source: https://developer.apple.com/documentation/appintents/appintent
---

# AppIntent

An interface you use to express app-specific actions and make them available to the rest of the system.

## Signature / Usage

```swift
protocol AppIntent : PersistentlyIdentifiable, _SupportsAppDependencies, Sendable
```

```swift
struct OrderAlbum: AppIntent {
    static var title: LocalizedStringResource { "Order Album" }
    static var description = IntentDescription("Order a vinyl record album.")

    @Parameter(title: "Album", description: "The name of the album to order.")
    var albumName: String

   @Dependency
    private var albumManager: AlbumDataManager

    func perform() async throws -> some IntentResult {
        // Perform the action...
        return .result()
    }

    static var parameterSummary: some ParameterSummary {
        Summary("Order \(\.$albumName)")
    }
}
```

## Options / Props

Members (declarations verbatim from the symbol pages' fragments):

| Member | Declaration | Description |
|--------|-------------|-------------|
| `init()` | `init()` | Creates and returns the app intent. |
| `title` | `static var title: LocalizedStringResource` | A short, localized, human-readable string that conveys the app intent's action. |
| `description` | `static var description: IntentDescription?` | A localized string that describes what the app intent does. |
| `isDiscoverable` | `static var isDiscoverable: Bool` | Whether system features can discover this app intent. |
| `authenticationPolicy` | `static var authenticationPolicy: IntentAuthenticationPolicy` | The authentication policy to enforce when running the app intent. |
| `allowedExecutionTargets` | `static var allowedExecutionTargets: IntentExecutionTargets` | The list of targets this intent can be executed against. |
| `ExecutionTargets` | `typealias ExecutionTargets` | Type alias. |
| `perform()` | `func perform() async throws -> Self.PerformResult` | Performs the intent's action and returns a result, after resolving any parameters. |
| `PerformResult` | `associatedtype PerformResult : IntentResult` | Result type of `perform()`. |
| `systemContext` | `var systemContext: IntentSystemContext` | Contextual information that the system provides while it performs the app intent. |
| `supportedModes` | `static var supportedModes: IntentModes` | The foreground and background modes the app intent supports. |
| `continueInForeground(_:alwaysConfirm:)` | `func continueInForeground(IntentDialog?, alwaysConfirm: Bool) async throws` | Attempts to transition the app to the foreground after optionally requesting permission to do so. |
| `needsToContinueInForegroundError(_:alwaysConfirm:)` | `func needsToContinueInForegroundError(IntentDialog?, alwaysConfirm: Bool) -> AppIntentError` | Asks the person to continue the intent's action in the foreground. |
| `requestChoice(between:dialog:)` | `func requestChoice(between: [IntentChoiceOption], dialog: IntentDialog?) async throws -> IntentChoiceOption` | Pauses the app intent and asks the person to choose an option from the specified list. |
| `requestChoice(between:dialog:content:)` | `func requestChoice<Content>(between: [IntentChoiceOption], dialog: IntentDialog?, content: () -> Content) async throws -> IntentChoiceOption` | Asks the person to choose, and provides additional content related to the options. |
| `requestChoice(between:dialog:view:)` | `func requestChoice<Content>(between: [IntentChoiceOption], dialog: IntentDialog?, view: Content) async throws -> IntentChoiceOption` | Asks the person to choose, and provides a view with additional data. |
| `requestConfirmation()` | `func requestConfirmation() async throws` | Displays a prompt that asks the person for confirmation before performing the app intent. |
| `requestConfirmation(conditions:actionName:dialog:)` | `func requestConfirmation(conditions: ConfirmationConditions, actionName: ConfirmationActionName, dialog: IntentDialog) async throws` | Displays a confirmation prompt that includes the specified text and action details. |
| `requestConfirmation(conditions:actionName:dialog:showDialogAsPrompt:content:)` | `func requestConfirmation<Content>(conditions: ConfirmationConditions, actionName: ConfirmationActionName, dialog: IntentDialog?, showDialogAsPrompt: Bool, content: () -> Content) async throws` | Displays a confirmation prompt with an interactive snippet. |
| `requestConfirmation(conditions:actionName:dialog:showDialogAsPrompt:snippetIntent:)` | `func requestConfirmation<Snippet>(conditions: ConfirmationConditions, actionName: ConfirmationActionName, dialog: IntentDialog?, showDialogAsPrompt: Bool, snippetIntent: Snippet) async throws` (two overloads; the `-jxb8` overload additionally returns `Snippet.PerformResult.Value`) | Displays a confirmation prompt that includes an interactive snippet. |
| `donate()` | `func donate() -> IntentDonationIdentifier` / `func donate() async throws -> IntentDonationIdentifier` | Donates the app intent to the system (sync / async overloads). |
| `donate(result:)` | `func donate(result: some IntentResult) -> IntentDonationIdentifier` / `... async throws -> IntentDonationIdentifier` | Donates the app intent and a result to the system (sync / async overloads). |
| `callAsFunction(donate:)` | `func callAsFunction(donate: Bool) async throws` / `... async throws -> Self.PerformResult.Value` | Runs the intent's action after resolving any parameters, and optionally donates the intent to the system. |
| `SummaryContent` | `associatedtype SummaryContent : ParameterSummary` | The type of parameter summary representing this intent. |
| `parameterSummary` | `static var parameterSummary: Self.SummaryContent` | The parameter summary the Shortcuts app uses to generate shortcuts for this intent. |
| `Parameter`, `Case`, `DefaultCase`, `Summary`, `Switch`, `When`, `Option` | `typealias` | Convenience type aliases used when declaring a parameter summary / choice option within the scope of an app intent. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+. The page JSON lists visionOS without an `introducedAt` value; the App Intents framework was introduced in visionOS 1.0.
- Implement this protocol in all app intents; supplement it with other protocols for specific kinds of actions. The type can live in an app, app extension, framework, or Swift package.
- Apply `@Parameter` to variables that need input; the system resolves them before calling `perform()`. Apply `@Dependency` to variables that need app-specific data.
- Deprecated members: `openAppWhenRun` (`static var openAppWhenRun: Bool`), `requestConfirmation(result:confirmationActionName:showPrompt:)`, `requestConfirmation(output:confirmationActionName:showPrompt:)`.
- System-defined schemas (for example `AssistantSchemas.PhotosIntent.openAlbum`) define the intent protocol and parameters a type needs; see app schema domains. Additional intent protocols are listed under app intent types.
- Inherited by many protocols, including `CancellableIntent`, `LongRunningIntent`, `PredictableIntent`, `UndoableIntent`, `OpenIntent`, `DeleteIntent`, `SetValueIntent`, `SnippetIntent`, `WidgetConfigurationIntent`, `ControlConfigurationIntent`, `LiveActivityIntent`, `SetFocusFilterIntent`, `URLRepresentableIntent`; conforming structs include `OpenURLIntent`, `EmptySnippetIntent`, `RunSystemShortcutIntent`.
- Distinct from SwiftUI: `Button(intent:)` and `Toggle(isOn:intent:)` initializers that take an `AppIntent` belong to apple-swiftui.
- Distinct from other platforms: this is not Android's `android.content.Intent` or `ShortcutManager` App Shortcuts (android-platform-core), and not Windows App Actions (windows-ai).

## Related

- [UndoableIntent](./undoableintent.md)
- [CancellableIntent](./cancellableintent.md)
- [LongRunningIntent](./longrunningintent.md)
- [PredictableIntent](./predictableintent.md)
- [IntentModes](./intentmodes.md)
- [IntentSystemContext](./intentsystemcontext.md)
- [IntentExecutionTargets](./intentexecutiontargets.md)
- [IntentDescription](./intentdescription.md)
- [AppIntentError](./appintenterror.md)
