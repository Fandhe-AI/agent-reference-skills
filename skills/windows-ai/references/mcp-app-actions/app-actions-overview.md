# App Actions on Windows Overview

App Actions on Windows are individual units of behavior that a Windows app can implement and register so they can be accessed from other apps and experiences, integrating into user workflows.

## Notes

- Actions can be implemented via URI launch activation or COM activation implementing the `IActionProvider` interface.
- Apps must have package identity to register an app action; the MSIX package manifest declares the action provider via `uap3:AppExtension`.
- Actions are defined in a JSON format (`actions.json`) shipped as app content: metadata, inputs, outputs. An *entity* is an object an action operates on (Document, Photo, Text, File, etc.); a corresponding WinRT API set is available under the `Windows.AI.Actions` namespace.
- Recommended scenarios: broadly reusable functionality (file operations, printing), composable/extensible by other apps, context-dependent discovery at runtime, integration with system tools, encapsulating complex tasks as a single higher-level action. For functionality specific only to the provider app, use a custom app extension instead.
- Responsible AI: action authors are responsible for content moderation/abuse monitoring of entities returned to users; use `contentAgeRating` in the action JSON to gate child access.
- Namespace: `Windows.AI.Actions` (WinRT/UWP API). Distinct from Android App Actions and other platforms' similarly named "action" concepts.

## Related

- [Get started with App Actions on Windows](./actions-get-started.md)
- [Action definition JSON schema](./actions-json.md)
- [Action provider package manifest XML format](./actions-provider-manifest.md)
- [Discover and invoke registered App Actions](./actions-consume.md)
- [Responsible AI and safety](./actions-rai-safety.md)
