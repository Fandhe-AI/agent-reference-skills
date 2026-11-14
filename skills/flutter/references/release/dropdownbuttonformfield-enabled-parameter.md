---
source: https://docs.flutter.dev/release/breaking-changes/dropdownbuttonformfield-enabled-parameter
---

# Added enabled to DropdownButtonFormField and made onChanged optional

`DropdownButtonFormField` in `package:material_ui` now has an explicit `enabled` parameter, and its `onChanged` callback is no longer `required`. Backward compatible.

## Signature / Usage

Code before migration (statically disabled):

```dart
final disabledDropdown = DropdownButtonFormField<String>(
  initialValue: 'Option 1',
  items: const [
    DropdownMenuItem(value: 'Option 1', child: Text('Option 1')),
  ],
  onChanged: null, // This was the only way to disable it.
);
```

Code after migration:

```dart diff
  final disabledDropdown = DropdownButtonFormField<String>(
    initialValue: 'Option 1',
    items: const [
      DropdownMenuItem(value: 'Option 1', child: Text('Option 1')),
    ],
-   onChanged: null, // This was the only way to disable it.
+   enabled: false,
  );
```

Code before migration (conditionally disabled):

```dart
final conditionalDropdown = DropdownButtonFormField<String>(
  initialValue: 'Option 1',
  items: const [
    DropdownMenuItem(value: 'Option 1', child: Text('Option 1')),
  ],
  onChanged: condition ? (value) { ... } : null,
);
```

Code after migration:

```dart diff
  final conditionalDropdown = DropdownButtonFormField<String>(
    initialValue: 'Option 1',
    items: const [
      DropdownMenuItem(value: 'Option 1', child: Text('Option 1')),
    ],
-   onChanged: condition ? (value) { ... } : null,
+   onChanged: (value) { ... },
+   enabled: condition,
  );
```

## Options / Props

| `enabled` | Resulting state |
| --- | --- |
| `true` | Interactive, even if `onChanged` is `null` |
| `false` | Not interactive, even if `onChanged` is provided |
| not provided | Interactive only if `onChanged` isn't `null` (backward compatible) |

In all cases the field isn't interactive if `items` is empty or `null`.

## Notes

- Timeline: landed in `package:material_ui` version 1.8.0; minimum supported Flutter version 3.47.
- Only available in `package:material_ui`. `DropdownButtonFormField` in `package:flutter/material.dart` has no `enabled` parameter and its `onChanged` is still required. Migrate to the standalone packages first (see the material_ui / cupertino_ui page).
- Unlike `onChanged: null`, `enabled: false` turns off the field's own `always`, `onUserInteraction`, and `onUserInteractionIfError` autovalidation. `FormState.validate` and the parent `Form`'s `autovalidateMode` still validate the field. To show errors on a disabled field through `AutovalidateMode.always`, keep `onChanged: null` and omit `enabled`.
- If `enabled` is `true` and `onChanged` is `null`, users can still change the selection; the field stores the value in its form state and the parent `Form`'s `onChanged` runs, but the field has no callback of its own.
- The `{ ... }` bodies in the snippets are the official placeholders, not compilable code.
- Source: https://docs.flutter.dev/release/breaking-changes/dropdownbuttonformfield-enabled-parameter (flutter/website `acea420`, fetched 2026-11-14).

## Related

- [Migrate to standalone material_ui and cupertino_ui packages](./material-ui-and-cupertino-ui.md)
- [Breaking changes and migration guides](./breaking-changes.md)
