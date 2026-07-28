# Accessibility checklist

A step-by-step checklist covering the core accessibility expectations for keyboard use, readable content, assistive-technology compatibility, and Microsoft Store discoverability, to run through during design, implementation, and testing.

## Signature / Usage

Checklist items, in order:

1. **Set accessible names and descriptions** for content and interactive elements (`AutomationProperties.Name`/`HelpText`, `LabeledBy` for form fields).
2. **Implement keyboard accessibility**: correct tab order (`TabIndex`), arrow-key navigation for composite controls, keyboard-invokable actions (Invoke pattern), access/accelerator keys, and correct `AutomationPeer` support (including key-handling overrides) for custom controls.
3. **Ensure text is a readable size**: validate against Magnifier, system display scale/layout settings, and the **Make text bigger** setting.
4. **Verify color and contrast**: minimum 4.5:1 text contrast ratio, correct rendering in high-contrast themes, no information conveyed by color alone.
5. **Run accessibility tools and verify screen reading**: `Inspect` for programmatic access, `AccChecker` for common errors, and manual Narrator verification.
6. **Add automated accessibility regression checks to CI**: block merges/releases on critical regressions in pull requests and continuous integration.
7. **Verify app manifest settings** follow assistive-technology security guidance.
8. **Declare the app as accessible in the Microsoft Store**, once the above are implemented and tested — see [Accessibility in the Store](./accessibility-in-the-store.md).

## Notes

- Applies to WinUI 3 / Windows App SDK apps; item 2 references `Microsoft.UI.Xaml.UIElement.TabIndex` and `Microsoft.UI.Xaml.Automation.Provider.IInvokeProvider`.
- This checklist is a condensed cross-reference — for full implementation detail on any item, follow the linked pages (basic accessibility information, keyboard accessibility, contrast themes, accessible text requirements, accessibility testing).
- Treat item 6 (CI regression gating) as equally important as manual review; automation catches regressions cheaply while templates/logic are still easy to fix.

## Related

- [AutomationProperties (attached properties)](./automation-properties.md)
- [Keyboard accessibility](./keyboard-accessibility.md)
- [Contrast themes](./high-contrast-themes.md)
- [Accessible text requirements](./accessible-text-requirements.md)
- [Accessibility testing](./accessibility-testing.md)
- [Accessibility in the Store](./accessibility-in-the-store.md)
