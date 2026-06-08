# Studio UI

Theatre.js Studio's editor interface, accessible during development. Provides panels for editing scene hierarchy, properties, and animations.

## Overview

The Studio is activated by calling `studio.initialize()` and can be toggled with `Alt/Option + \`.

```
┌──────────────────────────────────────────────────────┐
│  Global Toolbar                                       │
├──────────────┬───────────────────────────────────────┤
│              │                                       │
│  Outline     │  Details Panel                        │
│  Panel       │  (selected object's props)            │
│              │                                       │
├──────────────┴───────────────────────────────────────┤
│  Sequence Editor (Dope Sheet / Graph Editor)         │
└──────────────────────────────────────────────────────┘
```

## Panels

### Outline Panel
Displays the scene hierarchy: Projects → Sheets → Namespaces → Sheet Objects. Used to navigate and select items.

### Details Panel
Shows all properties of the currently selected Sheet Object. Number props can be scrubbed by dragging (`Alt/Option + drag` for fine control).

### Sequence Editor
Theatre.js' animation sequencer. Shows sequenced properties as keyframe tracks for the active Sheet Object.

- **Dope Sheet** (right section): Keyframe visualization and editing. Drag to select keyframes; right-click for context menu (copy, paste, delete).
- **Graph Editor**: Curve editor for easing between keyframes. Navigate presets with arrow keys; `Enter` to confirm, `Escape` to cancel.

### Global Toolbar
Buttons and switches registered by extensions. Provides access to extension-defined actions.

### Extension Panes
Draggable, resizable windows opened by extensions via `studio.createPane()`. Can host custom HTML content and render toolsets via `studio.ui.renderToolset()`.

## studio.ui API

```ts
studio.ui.hide()                                // Hide the Studio overlay
studio.ui.restore()                             // Show the Studio overlay
studio.ui.isHidden                              // boolean
studio.ui.renderToolset(toolsetId, domNode)     // Mount a toolbar into a DOM node
```

## Notes

- The Studio only appears when `studio.initialize()` is called; it has no effect in production if the call is guarded
- `studio.ui.hide()` / `studio.ui.restore()` are useful for integrating with other overlays or entering a preview mode

## Related

- [studio.initialize](./studio-initialize.md)
- [Keyboard & Mouse Controls](./keyboard-mouse-controls.md)
- [Authoring Extensions](./authoring-extensions.md)
