---
source: https://docs.flutter.dev/release/breaking-changes/raw-menu-anchor-close-order
---

# Changing RawMenuAnchor close order

Closing a `RawMenuAnchor` now triggers `onCloseRequested` and `onClose` for all descendant `RawMenuAnchor`s in a coordinated sequence.

## Signature / Usage

Before migration:

```dart
RawMenuAnchor(
  controller: menuController,
  onCloseRequested: (hideOverlay) {
    if (!animationController.isForwardOrCompleted) {
      return;
    }

    // Descendant submenus must be closed before the parent menu.
    // This is now handled automatically, so this call is no longer necessary.
    menuController.closeChildren();
    animationController.reverse().whenComplete(hideOverlay);
  },
  onClose: () {
    // This might have executed before descendants called onClose().
    _handleMenuClosed();
  },
  // ...
)
```

After migration:

```dart
RawMenuAnchor(
  controller: menuController,
  onCloseRequested: (hideOverlay) {
    if (!animationController.isForwardOrCompleted) {
      return;
    }

    // `menuController.closeChildren()` is now called automatically.
    animationController.reverse().whenComplete(hideOverlay);
  },
  onClose: () {
    // This now executes only after all descendant submenus have
    // called `onClose()`.
    _handleMenuClosed();
  },
  // ...
)
```

## Notes

- Timeline: landed in version 3.44.0-0.1.pre; in stable release 3.44.
- `onCloseRequested` fires top-down (from the triggering anchor to its descendants); `onClose` fires bottom-up (most recently opened anchor first). If a `RawMenuAnchor` is already closed, `MenuController.close` and `MenuController.closeChildren` do not trigger `onCloseRequested`.
- Migration (Flutter 3.44): no change is needed if you don't override the default `onCloseRequested` or have no submenus. Otherwise remove immediate `controller.closeChildren()` calls inside `onCloseRequested`, and refactor any logic that relied on the parent's `onClose` firing before its descendants.
- Not supported by `dart fix`.

## Related

- [Breaking changes and migration guides](./breaking-changes.md)
- [What's new in Flutter 3.44](./whats-new-3-44.md)
