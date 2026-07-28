# Accessibility in the Store

When submitting an app to the Microsoft Store for certification, you can declare it as accessible. This adds the **Accessible** tag/filter to the listing, helping users who search specifically for accessible apps discover it.

## Signature / Usage

Declare an app as accessible only after it has basic accessibility information for primary scenarios using one or more of:

- The keyboard
- A high-contrast theme
- A variable DPI setting
- Common assistive technology (Narrator, Magnifier, On-Screen Keyboard)

## Options / Props

| Requirement to declare accessible | Description |
|-------------------------------------|--------------|
| Accessibility information set | Name, role, value, and related metadata set for all relevant UI elements. |
| Full keyboard accessibility | Primary scenarios completable via keyboard only; logical tab order; arrow-key navigation within controls; keyboard shortcuts for primary functionality; Narrator touch-gesture equivalents for Tab/arrow on keyboardless devices. |
| Visual accessibility | Minimum 4.5:1 text contrast ratio; no color-only information; verified visually. |
| Tooling verification | Used `Inspect` and `UIAVerify` (or equivalent) to verify the implementation and resolved all priority-1 errors reported. |
| End-to-end scenario verification | Verified primary scenarios with Narrator, Magnifier, On-Screen Keyboard, a high-contrast theme, and adjusted DPI settings. |

## Notes

- Applies to the Microsoft Store submission process for Windows apps; not specific to any one UI framework version.
- Declaring "accessible" is a self-attested statement to the Store, not an automated certification gate — see [Accessibility checklist](./accessibility-checklist.md) for the full procedure these criteria summarize.

## Related

- [Accessibility checklist](./accessibility-checklist.md)
- [Accessibility testing](./accessibility-testing.md)
- [AutomationProperties (attached properties)](./automation-properties.md)
