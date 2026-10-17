---
source: https://docs.flutter.dev/tools/property-editor
---

# Flutter Property Editor

An IDE tool that lets you view and modify widget properties from a visual interface, discovering existing and available constructor arguments without jump-to-definition or manual source edits. Requires Flutter version 3.32 or higher.

## Signature / Usage

Open the Property Editor in a supported IDE (VS Code, Android Studio/IntelliJ), then move the cursor anywhere inside a widget constructor invocation; the panel updates to show that widget's properties:

```dart
@override
Widget build(BuildContext context) {
    return Text(
        'Hello World!',
        overflow: TextOverflow.clip,
    );
}
```

## Runtime usage

- Inspector integration: run and debug the app from the IDE and open the Flutter inspector. Selecting a widget in the inspector's widget tree, or enabling "Select Widget Mode" and clicking a widget in the running app, jumps to the widget's declaration and loads it in the Property Editor.
- Hot reload integration: enable autosave and hot reload on save; edits made in the Property Editor are reflected in the running app.

```json
"files.autoSave": "afterDelay",
"dart.flutterHotReloadOnSave": "all",
```

Android Studio and IntelliJ: `Settings > Tools > Actions on Save` > `Configure autosave options` > `Save files if the IDE is idle for X seconds` (recommended: 2 seconds), and `Settings > Languages & Frameworks > Flutter` > `Perform hot reload on save`.

## Feature set

| Feature | Behavior |
| --- | --- |
| Widget documentation | Shown at the top of the selected widget (truncated; click "Show more"). Follow the Dart style guide to see docs for custom widgets. |
| string, double, int properties | Text input fields; press Tab or Enter to apply the edit to source. |
| boolean and enum properties | Dropdown menus (`true`/`false` or the enum values). |
| object properties (`TextStyle`, `EdgeInsets`, `Color`) | Currently not supported; edit directly in source. |
| Type and name label | Each input shows the constructor parameter type (for example `StackFit`) and name (for example `fit`). |
| Info tooltip | Shows the default value (if defined in the constructor) and the property's documentation. |
| "set" label | The property is explicitly set in source (an argument is passed). |
| "default" label | The current value matches the widget's default parameter value. |
| Filter by text | Matches property name, current value, or type (for example `main`, `true`, `double`). |
| Filter by "set" | Filter menu option "Only include properties that are set in the code." |
| Regex filter | The `*` toggle interprets filter text as a regular expression. |
| Clear filter | The `X` button clears active filters. |

## Notes

- If an input has both "set" and "default" labels, you provided a value equal to the widget's default and can safely remove the argument.

## Related

- [Use the Flutter inspector](./devtools-inspector.md)
- [Hot reload](./hot-reload.md)
- [Flutter Widget Previewer](./widget-previewer.md)
