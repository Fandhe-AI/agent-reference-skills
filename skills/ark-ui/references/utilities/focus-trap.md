# Focus Trap

Focus trapping confines keyboard navigation to a designated container, preventing users from tabbing outside a specified region. Essential for modal interfaces and other interactive elements that require concentrated user attention.

## Signature / Usage

```tsx
import { FocusTrap } from '@ark-ui/react/focus-trap'

export const App = () => (
  <FocusTrap initialFocus={() => document.getElementById('input')}>
    <div>
      <input id="input" />
      <button>Submit</button>
    </div>
  </FocusTrap>
)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `disabled` | `boolean` | — | Toggles trap functionality on/off |
| `initialFocus` | `VoidFunction \| FocusTargetOrFalse` | — | Specifies the element that receives initial focus, or `false` for no initially focused element (this also prevents `fallbackFocus` from being used) |
| `fallbackFocus` | `FocusTarget` | — | Element to focus if no tabbable elements exist (needs a negative `tabindex`) |
| `returnFocusOnDeactivate` | `boolean` | `true` | Controls whether focus returns to the pre-activation element |
| `persistentElements` | `(() => Element \| null)[]` | — | Additional elements to treat as part of the trap, for portalled content not discoverable via `aria-controls`/`aria-expanded`; getters resolve lazily (added in 5.38.0) |
| `onActivate` | `VoidFunction` | — | Callback executed before focus assignment upon activation |
| `onDeactivate` | `VoidFunction` | — | Callback executed before focus restoration upon deactivation |

## Notes

- Respects HTML elements marked with the `autofocus` attribute
- Available across React, Solid, Vue, and Svelte

## Related

- [Presence](./presence.md)
