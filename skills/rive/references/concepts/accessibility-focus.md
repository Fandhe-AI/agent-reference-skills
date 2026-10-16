# Accessibility: Focus

Lets users move through a file with a keyboard or gamepad and controls which element receives input, using focus nodes.

## Signature / Usage

Select an element, click **+** in the **Focus** section of the Inspector, then configure its properties.

```text
Listener action: Focus
  mode: target | traverse (next, previous, up, down, left, right) | clear
```

## Options / Props

Focus properties:

| Property | Description |
| --- | --- |
| Focusable | Turns focus on or off for the element. When off it cannot receive focus at all |
| Traversable | Includes the element in Tab, Shift+Tab, and arrow-key navigation. When off it can still receive focus from a click or a Focus action |
| Behavior | What happens when focus reaches the first or last element inside this one (focus scope) |

Focus scope Behavior:

| Behavior | Description |
| --- | --- |
| Parent Scope | Focus leaves the group and continues to the next element outside it. Default |
| Closed Loop | Focus wraps last to first and first to last; cannot leave by tabbing (use to trap focus in a dialog) |
| Stop | Focus stays on the first or last element |

Focus action modes:

| Mode | Description |
| --- | --- |
| target | Moves focus to a specific element; the target must have a focus node |
| traverse | Moves focus next, previous, up, down, left, or right |
| clear | Removes focus from the current element |

## Notes

- Requires a runtime that supports it; see Rive's Focus Feature Support.
- Only one element has primary focus, but its focusable ancestors are also considered focused.
- Tab / Shift+Tab follow hierarchy order top to bottom; reorder the hierarchy to change it. Arrow keys move to the nearest focusable element in that direction.
- A hidden element cannot hold focus: if the focused element is collapsed, hidden, or has opacity 0, focus moves to the nearest focusable ancestor.
- **Focusable** and **Traversable** can be keyed on the timeline and data bound (for example turn off Focusable on buttons behind an open modal).
- **Focus** and **Blur** listeners fire when an element gains or loses focus; on a container they fire when focus enters or leaves it, not when moving between its children. A **Focus** transition condition is true when the element or any focusable descendant has primary focus.
- **Keyboard** and **Text Input** listeners respond on the element with primary focus; unhandled keys pass to the nearest focusable ancestor. If such a listener is not firing, check that its target has a focus node.
- Always give focused elements a visible focus indicator.
- Editor preview: brackets are drawn around the focused element (toggle **Focus Indicator** in viewport options). Press Option+Space or click **Toggle Keyboard Capture** to send keys to the file.
- Elements with a focus node automatically get the **Focusable** trait in the Semantics panel.

## Related

- [Accessibility: Semantics](./accessibility-semantics.md)
- [Listeners](./listeners.md)
- [Transitions](./transitions.md)
- [State Machine](./state-machine.md)

Source: https://rive.app/docs/editor/accessibility/focus (fetched 2026-10)
