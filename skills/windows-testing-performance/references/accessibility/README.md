# Accessibility

| Name | Description | Path |
|------|-------------|------|
| UI Automation overview | UI Automation client/provider model, automation peers, and how built-in XAML controls report accessibility info. | [ui-automation-overview.md](./ui-automation-overview.md) |
| AutomationProperties (attached properties) | Name, HelpText, LabeledBy, AutomationId, LiveSetting, AccessibilityView, IsDialog, AccessKey, AcceleratorKey. | [automation-properties.md](./automation-properties.md) |
| Landmarks and headings | LandmarkType, LocalizedLandmarkType, HeadingLevel, PositionInSet, SizeOfSet for navigable UI structure. | [landmarks-and-headings.md](./landmarks-and-headings.md) |
| Custom automation peers | Implementing AutomationPeer/FrameworkElementAutomationPeer, OnCreateAutomationPeer, GetPatternCore, RaiseAutomationEvent. | [automation-peers.md](./automation-peers.md) |
| Control patterns and interfaces | Full UI Automation control pattern table and WinUI provider interfaces (IInvokeProvider, IToggleProvider, etc.). | [control-patterns-and-interfaces.md](./control-patterns-and-interfaces.md) |
| Keyboard accessibility | TabIndex, IsTabStop, KeyboardAccelerator, AccessKey/AcceleratorKey metadata, F6 pane navigation. | [keyboard-accessibility.md](./keyboard-accessibility.md) |
| Focus visuals | UseSystemFocusVisuals, FocusVisualPrimaryBrush, XYFocusUp/Down/Left/Right for gamepad D-pad navigation. | [focus-visuals.md](./focus-visuals.md) |
| Contrast themes | HighContrastAdjustment, ThemeDictionaries, SystemColor* resources, contrast-theme best practices. | [high-contrast-themes.md](./high-contrast-themes.md) |
| Accessible text requirements | 4.5:1 contrast ratio, text element roles, IsTextScaleFactorEnabled, TextScaleFactor, auto-suggest accessibility. | [accessible-text-requirements.md](./accessible-text-requirements.md) |
| Accessibility testing | Narrator testing steps, Accessibility Insights, Inspect.exe, AccEvent.exe, AccChecker, UIA Verify. | [accessibility-testing.md](./accessibility-testing.md) |
| Accessibility checklist | End-to-end checklist covering names, keyboard, text size, contrast, tooling, CI gating, Store declaration. | [accessibility-checklist.md](./accessibility-checklist.md) |
| Accessibility in the Store | Requirements for declaring an app as accessible during Microsoft Store submission. | [accessibility-in-the-store.md](./accessibility-in-the-store.md) |
| Screen readers and hardware system buttons | SystemButtonEventController and Fn-key event handling for screen readers. | [system-button-narration.md](./system-button-narration.md) |
