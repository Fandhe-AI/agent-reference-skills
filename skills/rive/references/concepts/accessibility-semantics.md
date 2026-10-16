# Accessibility: Semantics

Define semantic role, properties, traits, state, and actions on elements so screen readers can describe and navigate Rive content.

## Signature / Usage

Select an element, click `+` in the **Semantics** panel of the right sidebar, choose a role, then configure properties, traits, and state. Example label for a volume slider:

```text
Label: Volume
Value: 70%
```

To handle assistive actions: create a Listener, choose **Semantic Action** in **Listen to**, then select the action type.

## Options / Props

Architecture: Role / Trait / State / Actions.

| Concept | Description |
| --- | --- |
| Role | What the node is (button, checkbox, tab, image, heading, etc.); **None** if no role fits. Each role has different available properties |
| Label | Describes what the element is or does; announced by screen readers. Text elements use their text content automatically |
| Heading (text only) | **None** or **Heading 1** to **Heading 6**; on web maps to `<h1>` ... `<h6>` |
| Value (inputs only) | Current value of elements such as sliders and switches; use data binding to keep in sync |
| Traits | What a node can do (expandable, selectable, checkable, ...). Enabling a trait exposes its state. A lock icon marks a trait required by the role (for example checkbox always has selectable) |
| State | Current value, for example selected for the selectable trait, toggled for a switch. Key it in a timeline or bind a view model boolean |
| Hidden | Hides the element from the accessibility tree |
| Disabled | Marks the element as disabled and not interactive |
| Live Region | Content may update dynamically and should be announced |

Actions:

| Action | Description |
| --- | --- |
| tap | Activating an element (similar to a click); handle like a standard click |
| increase / decrease | For adjustable elements like sliders (swipe up/down with a screen reader, or arrow keys) |

## Notes

- Runtime support is in development or released as experimental; see Rive's Semantics Feature Support.
- On web, semantics become accessible DOM elements (divs with roles and attributes). On iOS and Android a semantic tree is generated for the platform accessibility APIs.
- Semantic inference: adding semantics to a text element sets the Role to **Text** and derives Value from its text content.
- Elements not visible (hidden by layout or soloing) are removed from the accessibility tree automatically; use **Hidden** for elements still present (for example opacity 0) that should not be exposed.
- It is common to add both a **Click** and a **Semantic Tap** listener to the same element.
- Test with a screen reader: VoiceOver (macOS / iOS), TalkBack (Android), Narrator or NVDA (Windows). Check labels, role, value, state, and navigation order.

## Related

- [Accessibility: Focus](./accessibility-focus.md)
- [Accessibility: Reduced Motion](./accessibility-reduced-motion.md)
- [Listeners](./listeners.md)
- [Data Binding](./data-binding.md)

Source: https://rive.app/docs/editor/accessibility/semantics (fetched 2026-10)
