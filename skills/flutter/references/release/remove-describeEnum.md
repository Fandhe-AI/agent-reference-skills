---
source: https://docs.flutter.dev/release/breaking-changes/remove-describeEnum
---

# Remove describeEnum

The `describeEnum` method has been removed from the Flutter framework; since Dart 2.14 enums have a `name` getter that does the same thing.

## Signature / Usage

```dart
  enum Theme { light, dark }

- final theme = describeEnum(Theme.light);

+ Theme.light.name;
```

## Notes

- Removed in Flutter (3.47 index listing "Released in Flutter 3.47"); the guide's own timeline says "Landed in version: TBD" and "In stable release: TBD".
- Migration (Flutter 3.47): replace `describeEnum(value)` with `value.name`.
- Not supported by `dart fix`.
- `describeEnum` had already been deprecated in Flutter 3.16 ("Deprecate `describeEnum` and update `EnumProperty` to be type strict" in the 3.16 breaking changes list).

## Related

- [Breaking changes and migration guides](./breaking-changes.md)
