---
source: https://docs.flutter.dev/release/breaking-changes/deprecate-onreorder-callback
---

# Deprecate onReorder callback

The `onReorder` callback is deprecated in favor of `onReorderItem` in `ReorderableListView`, `ReorderableListView.builder`, `ReorderableList`, and `SliverReorderableList`. The new callback corrects `newIndex` automatically.

## Signature / Usage

Before migration:

```dart
ReorderableListView(
  onReorder: (int oldIndex, int newIndex) {
    if (oldIndex < newIndex) {
      newIndex -= 1;
    }

    // Handle reorder ...
  }
)
```

After migration:

```dart
ReorderableListView(
  onReorderItem: (int oldIndex, int newIndex) {
    // Handle reorder ...
  }
)
```

Opt out for complex `onReorder` implementations by approximating the old `newIndex` (see Notes):

```dart
ReorderableListView(
  onReorderItem: (int oldIndex, int newIndex) {
    // To get the equivalent of the old newIndex:
    if (oldIndex < newIndex) {
      newIndex += 1;
    }

    return handleSomeComplexReorder(oldIndex, newIndex);
  }
)
```

## Notes

- Timeline: landed in version 3.41.0-1.0.pre-364; in stable release 3.44.
- Migration (Flutter 3.44): the four widgets share the same reordering logic, so the same steps apply to each. The meaning of the second callback parameter changed, so this migration is not supported by `dart fix`.
- Limitation of the official opt-out snippet (clarification not in the official docs): it cannot distinguish the old newIndex values oldIndex and oldIndex + 1 (both meant "no move" and both arrive as newIndex == oldIndex), so it returns oldIndex for both; handlers that only apply the old `newIndex -= 1` correction behave identically, but logic that depends on the raw old index value should be migrated to use the corrected newIndex directly.

## Related

- [Breaking changes and migration guides](./breaking-changes.md)
- [Deprecated cacheExtent and cacheExtentStyle](./scroll-cache-extent.md)
